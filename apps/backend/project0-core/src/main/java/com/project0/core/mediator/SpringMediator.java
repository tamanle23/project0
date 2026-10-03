package com.project0.core.mediator;

import org.springframework.context.ApplicationContext;
import org.springframework.core.ResolvableType;
import org.springframework.stereotype.Component;

@Component
public class SpringMediator implements CommandDispatcher, QueryDispatcher {

    private final ApplicationContext applicationContext;

    public SpringMediator(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    @SuppressWarnings("unchecked")
    public <R, C extends Command<R>> R dispatch(C command) {
        String[] beanNames = applicationContext.getBeanNamesForType(CommandHandler.class);
        for (String beanName : beanNames) {
            CommandHandler<?, ?> handler = applicationContext.getBean(beanName, CommandHandler.class);
            if (canHandle(handler, CommandHandler.class, command.getClass())) {
                return ((CommandHandler<C, R>) handler).handle(command);
            }
        }
        throw new IllegalArgumentException("No handler found for command: " + command.getClass().getName());
    }

    @Override
    @SuppressWarnings("unchecked")
    public <R, Q extends Query<R>> R dispatch(Q query) {
        String[] beanNames = applicationContext.getBeanNamesForType(QueryHandler.class);
        for (String beanName : beanNames) {
            QueryHandler<?, ?> handler = applicationContext.getBean(beanName, QueryHandler.class);
            if (canHandle(handler, QueryHandler.class, query.getClass())) {
                return ((QueryHandler<Q, R>) handler).handle(query);
            }
        }
        throw new IllegalArgumentException("No handler found for query: " + query.getClass().getName());
    }

    private boolean canHandle(Object handler, Class<?> handlerType, Class<?> targetClass) {
        ResolvableType resolvableType = ResolvableType.forClass(handler.getClass()).as(handlerType);
        if (resolvableType.hasGenerics()) {
            Class<?> commandOrQueryType = resolvableType.resolveGeneric(0);
            return targetClass.equals(commandOrQueryType);
        }
        return false;
    }
}
