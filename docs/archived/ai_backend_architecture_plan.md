# `ai-backend` Architecture & Implementation Plan

**Role:** Asynchronous AI Inference Backend Worker
**Tech Stack:** Java 21, Spring Boot 3.x, LangChain4j, Netflix Conductor OSS SDK, Maven
**Integration Strategy:** Add to existing Turborepo monorepo at `apps/ai-backend`

## 1. Overview & Objectives

`ai-backend` is a dedicated, low-footprint AI inference microservice within your Turborepo project. By utilizing the **Conductor Worker Pattern**, it decouples CPU/GPU-heavy LLM inference from your Bun/TypeScript rendering pipelines.

### Multi-Model Scalability & Regression-Free Design

To support multiple specialized models and dynamic routing, we will implement a combination of design patterns:

1. **Registry / Factory Pattern:** Spring `@Configuration` acts as a registry, securely binding specific `.gguf` models to their respective engines.
2. **Strategy Pattern:** For tasks with identical purposes (e.g., layout generation), we define multiple strategies backed by different models. This allows dynamic model switching at runtime (e.g., using Qwen by default, but falling back to Llama if requested).
3. **Task-Specific Command Pattern (via Conductor):** Distinct Conductor tasks map to distinct Worker Adapters, ensuring zero regression bleed between different domains (e.g., layouts vs. copywriting).

## 2. Monorepo Integration Note

Bootstrap the Spring Boot project inside the `apps/ai-backend` directory. Add a `package.json` to alias the Maven wrapper (`mvnw`) commands:

```json
{
  "name": "ai-backend",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "build": "./mvnw clean package -DskipTests",
    "test": "./mvnw test",
    "dev": "./mvnw spring-boot:run"
  }
}
```

## 3. Dependency Specification (`pom.xml`)

Include the Spring Boot parent and the specific LangChain4j adapters for local, low-footprint inference.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.3.0</version>
        <relativePath/> 
    </parent>

    <groupId>com.acc</groupId>
    <artifactId>ai-backend</artifactId>
    <version>1.0.0-SNAPSHOT</version>
    <name>ai-backend</name>
    
    <properties>
        <java.version>21</java.version>
        <langchain4j.version>0.35.0</langchain4j.version>
        <conductor.version>3.15.0</conductor.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>com.netflix.conductor</groupId>
            <artifactId>conductor-client</artifactId>
            <version>${conductor.version}</version>
        </dependency>
        <dependency>
            <groupId>dev.langchain4j</groupId>
            <artifactId>langchain4j-spring-boot-starter</artifactId>
            <version>${langchain4j.version}</version>
        </dependency>
        <dependency>
            <groupId>dev.langchain4j</groupId>
            <artifactId>langchain4j-jlama</artifactId>
            <version>${langchain4j.version}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```

## 4. The Strategy Pattern: Dynamic Model Switching

Sometimes we need to generate layouts using different models (e.g., A/B testing Qwen against Llama, or handling varying complexity levels). We implement the **Strategy Pattern** to swap the inference engine dynamically without altering the domain logic.

### Step A: Define the Base Model Beans

```java
package com.acc.aibackend.config;

import dev.langchain4j.model.chat.ChatLanguageModel;
import dev.langchain4j.model.jlama.JlamaChatModel;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.nio.file.Path;

@Configuration
public class InferenceEngineConfig {

    @Bean(name = "qwenModel")
    public ChatLanguageModel qwenModel() {
        return JlamaChatModel.builder()
                .modelPath(Path.of("/models/qwen-2.5-coder-1.5b.gguf"))
                .temperature(0.1f)
                .maxTokens(2048)
                .build();
    }

    @Bean(name = "llamaModel")
    public ChatLanguageModel llamaModel() {
        return JlamaChatModel.builder()
                .modelPath(Path.of("/models/llama-3.2-1b-instruct.gguf"))
                .temperature(0.2f)
                .maxTokens(2048)
                .build();
    }
}
```

### Step B: Create the Strategy Registry

We instantiate multiple instances of our declarative `LayoutGenerationService` (one for each model) and register them into a Strategy Map. 

```java
package com.acc.aibackend.inference;

import dev.langchain4j.service.AiServices;
import dev.langchain4j.model.chat.ChatLanguageModel;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Map;

@Configuration
public class LayoutStrategyConfig {

    // Strategy 1: Qwen-backed service
    @Bean("qwenLayoutStrategy")
    public LayoutGenerationService qwenLayoutStrategy(@Qualifier("qwenModel") ChatLanguageModel model) {
        return AiServices.builder(LayoutGenerationService.class)
                .chatLanguageModel(model)
                .build();
    }

    // Strategy 2: Llama-backed service
    @Bean("llamaLayoutStrategy")
    public LayoutGenerationService llamaLayoutStrategy(@Qualifier("llamaModel") ChatLanguageModel model) {
        return AiServices.builder(LayoutGenerationService.class)
                .chatLanguageModel(model)
                .build();
    }

    // The Strategy Context / Registry
    @Bean("layoutStrategyRegistry")
    public Map<String, LayoutGenerationService> layoutStrategyRegistry(
            @Qualifier("qwenLayoutStrategy") LayoutGenerationService qwen,
            @Qualifier("llamaLayoutStrategy") LayoutGenerationService llama) {
        
        return Map.of(
            "qwen", qwen,
            "llama", llama
        );
    }
}
```

## 5. Task-Specific Conductor Workers (Command Pattern)

The Worker Adapter acts as the Context for our Strategy. It inspects the incoming task payload to determine which model strategy to execute at runtime.

### Worker: Layout Generation with Dynamic Routing

```java
package com.acc.aibackend.worker;

import com.acc.aibackend.inference.LayoutGenerationService;
import com.acc.aibackend.domain.LayoutSpec;
import com.netflix.conductor.client.worker.Worker;
import com.netflix.conductor.common.metadata.tasks.Task;
import com.netflix.conductor.common.metadata.tasks.TaskResult;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class LayoutWorkerAdapter implements Worker {

    private final Map<String, LayoutGenerationService> strategyRegistry;
    private static final String DEFAULT_STRATEGY = "qwen";

    // Inject the Strategy Registry
    public LayoutWorkerAdapter(
            @Qualifier("layoutStrategyRegistry") Map<String, LayoutGenerationService> strategyRegistry) {
        this.strategyRegistry = strategyRegistry;
    }

    @Override
    public String getTaskDefName() {
        return "generate_ai_layout"; 
    }

    @Override
    public TaskResult execute(Task task) {
        TaskResult result = new TaskResult(task);
        try {
            // 1. Extract Inputs
            String theme = (String) task.getInputData().get("theme");
            
            // 2. Resolve Strategy Dynamically (fallback to Qwen if unspecified)
            String modelPreference = (String) task.getInputData().getOrDefault("model_preference", DEFAULT_STRATEGY);
            LayoutGenerationService aiService = strategyRegistry.getOrDefault(modelPreference, strategyRegistry.get(DEFAULT_STRATEGY));
            
            // 3. Execute Strategy
            LayoutSpec layout = aiService.generateLayout(theme);
            
            // 4. Return Output
            result.getOutputData().put("layoutSpec", layout);
            result.getOutputData().put("executed_model", modelPreference);
            result.setStatus(TaskResult.Status.COMPLETED);
            
        } catch (Exception e) {
            result.setStatus(TaskResult.Status.FAILED_WITH_TERMINAL_ERROR);
            result.setReasonForIncompletion("Strategy Execution Failed: " + e.getMessage());
        }
        return result;
    }
}
```

## 6. Scaling and Memory Isolation

By adopting this Registry/Strategy approach:

1. **A/B Testing & Overrides:** The frontend or orchestration layer (Bun/TypeScript) can now pass `{"model_preference": "llama"}` into the Conductor workflow to effortlessly test a different LLM without altering the Java code.
2. **Regression Free:** If the prompt requirements for Llama change, you can update the `LlamaLayoutStrategy` class specifically without touching the `QwenLayoutStrategy`.
3. **Memory Controls:** Because the Spring Application holds multiple models in memory, ensure your host environment respects the 1.5B/3B footprint. If VRAM gets tight, you can isolate specific strategies using `@Profile` to boot multiple Spring applications (e.g., one JVM dedicated to the Qwen strategy, one to Llama).