import { Hono } from 'hono'
import { auth } from '../lib/auth.js'
import type { AuthType } from '../lib/auth.js'

const authRouter = new Hono<{ Bindings: AuthType }>({
  strict: false,
})

authRouter.on(['POST', 'GET'], '/auth/*', (c) => {
  return auth.handler(c.req.raw)
})

export default authRouter;
