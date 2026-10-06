package com.unipost.service;

import org.springframework.cloud.loadbalancer.annotation.LoadBalancerClient;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableFeignClients
@LoadBalancerClient(name = "unipost-ms-aio", configuration = UserServiceConfiguration.class)
public class RestClientConfiguration {
}
