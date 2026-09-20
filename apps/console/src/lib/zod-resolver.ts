import { zodResolver as baseZodResolver } from '@hookform/resolvers/zod/dist/zod.js'
import type { Resolver } from 'react-hook-form'

export const zodResolver: <TFieldValues extends Record<string, unknown>, TContext>(
  schema: unknown,
  schemaOptions?: unknown,
  resolverOptions?: unknown
) => Resolver<TFieldValues, TContext> = baseZodResolver as unknown as <
  TFieldValues extends Record<string, unknown>,
  TContext,
>(
  schema: unknown,
  schemaOptions?: unknown,
  resolverOptions?: unknown
) => Resolver<TFieldValues, TContext>
