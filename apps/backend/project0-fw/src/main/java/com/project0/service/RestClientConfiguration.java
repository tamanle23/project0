package com.project0.service;

import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients
@LoadBalancerClient(name = "project0-ms-aio", configuration = UserServiceConfiguration.class)
public class RestClientConfiguration {
}
