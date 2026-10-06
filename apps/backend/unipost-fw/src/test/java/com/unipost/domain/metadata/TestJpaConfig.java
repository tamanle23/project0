package com.unipost.domain.metadata;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.unipost.boot.config.BeanNameGenerator;
import com.unipost.repository.jpa.AttributeDefinitionRepository;
import com.unipost.repository.jpa.EntityRecordRepository;
import com.unipost.repository.jpa.EntityTypeRepository;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Primary;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.Properties;

@SpringBootConfiguration
@EnableAutoConfiguration
@EnableJpaRepositories(
        basePackageClasses = {
                EntityTypeRepository.class,
                AttributeDefinitionRepository.class,
                EntityRecordRepository.class
        }
)
@ComponentScan(
        basePackages = { "com.unipost.domain.metadata" },
        nameGenerator = BeanNameGenerator.class
)
public class TestJpaConfig {

    @Bean
    public ObjectMapper objectMapper() {
        return new ObjectMapper();
    }

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean entityManagerFactory(DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean em = new LocalContainerEntityManagerFactoryBean();
        em.setDataSource(dataSource);
        em.setPackagesToScan("com.unipost.domain", "com.unipost.domain.metadata");

        HibernateJpaVendorAdapter vendorAdapter = new HibernateJpaVendorAdapter();
        vendorAdapter.setGenerateDdl(true);
        vendorAdapter.setShowSql(true);
        em.setJpaVendorAdapter(vendorAdapter);

        Properties jpaProperties = new Properties();
        jpaProperties.put("hibernate.hbm2ddl.auto", "create-drop");
        jpaProperties.put("hibernate.dialect", "org.hibernate.dialect.PostgreSQLDialect");
        em.setJpaProperties(jpaProperties);

        return em;
    }

    @Bean
    @Primary
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
