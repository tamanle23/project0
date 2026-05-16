import { Hono, type Context } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { z } from 'zod';
import type { HonoEnv } from '../lib/hono-env.js';

// Zod スキーマ定義
const createUserSchema = z.object({
  name: z.string().min(1, '名前は必須です'),
  email: z.string().email('有効なメールアドレスを入力してください'),
});

const updateUserSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
});

const userIdSchema = z.object({
  id: z.string().min(1),
});


export const apiRouter = new Hono<HonoEnv>();

apiRouter.get('/', async (c: Context) => {
    // const users = await firstValueFrom(c.var.services.users.list());
    return c.json({ hello: "world" });
  })

// GET /users/:id - 特定ユーザー取得
apiRouter.get('/:id', zValidator('param', userIdSchema), async (c) => {
    const { id } = c.req.valid('param');
    // const user = await firstValueFrom(c.var.services.users.get(id));

    // if (user == null) {
    //   return c.json({ error: 'User not found' }, 404);
    // }

    return c.json({ user: null });
  })

  // POST /users - ユーザー作成
  // .post('/', zValidator('json', createUserSchema), async (c) => {
  //   const data = c.req.valid('json');
  //   const result = await c.var.services.users.create(data);

  //   return result.match(
  //     (user) => c.json({ user }, 201),
  //     (error) => c.json({ error: error.message }, 500),
  //   );
  // })

  // PUT /users/:id - ユーザー更新
  // .put('/:id', zValidator('param', userIdSchema), zValidator('json', updateUserSchema), async (c) => {
  //   const { id } = c.req.valid('param');
  //   const data = c.req.valid('json');
  //   const result = await c.var.services.users.update(id, data);

  //   return result.match(
  //     () => c.json({ success: true }),
  //     (error) => c.json({ error: error.message }, 500),
  //   );
  // })

  // DELETE /users/:id - ユーザー削除
  // .delete('/:id', zValidator('param', userIdSchema), async (c) => {
  //   const { id } = c.req.valid('param');
  //   const result = await c.var.services.users.delete(id);

  //   return result.match(
  //     () => c.json({ success: true }),
  //     (error) => c.json({ error: error.message }, 500),
  //   );
  // });
