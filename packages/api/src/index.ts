import { Hono } from 'hono'
import { logger } from "hono/logger";
import { createFactory } from 'hono/factory';


export const app = new Hono()

app.use(logger());


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

// サービス型
type Services = {
  users: IUserService;
  settings: ISettingsService;
};

// 外部依存
type ExternalDependencies = {
  services: Services;
};


const factory = (deps: ExternalDependencies) =>
  createFactory<HonoEnv>({
    initApp(app) {
      app.use(logger());

      app.use((c, next) => {
        c.set('services', deps.services);
        return next();
      });
    },
  });

/**
 * Hono アプリケーションファクトリ
 * サービスを注入してアプリケーションを生成する
 */
export const createApp = (...args: Parameters<typeof factory>) => {
  return factory(...args)
    .createApp()
    .route('/api', usersRoute)
    ;
};

export type CallableType = ReturnType<typeof createApp>;

// export type ApiType = typeof app
