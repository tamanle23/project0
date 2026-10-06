package com.acc.aibackend.inference.embedded;

import org.springframework.stereotype.Component;

import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class NativeModelRegistry {

    private final Map<String, EmbeddedModelProvider> providers = new ConcurrentHashMap<>();

    public NativeModelRegistry() {
    }

    public NativeModelRegistry(List<EmbeddedModelProvider> initialProviders) {
        if (initialProviders != null) {
            initialProviders.forEach(this::register);
        }
    }

    public void register(EmbeddedModelProvider provider) {
        if (provider != null) {
            providers.put(provider.getModelName().toLowerCase(), provider);
        }
    }

    public Optional<EmbeddedModelProvider> getProvider(String modelName) {
        if (modelName == null) {
            return getPrimaryProvider();
        }
        return Optional.ofNullable(providers.get(modelName.toLowerCase()));
    }

    public Optional<EmbeddedModelProvider> getPrimaryProvider() {
        return providers.values().stream()
                .filter(EmbeddedModelProvider::isAvailable)
                .min(Comparator.comparingInt(EmbeddedModelProvider::getPriority));
    }

    public Map<String, EmbeddedModelProvider> getAllProviders() {
        return Map.copyOf(providers);
    }
}
