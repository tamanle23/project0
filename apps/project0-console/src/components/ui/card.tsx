import * as React from 'react'
import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card'
      className={cn(
        'relative flex flex-col gap-6 rounded-2xl py-6 text-card-foreground overflow-hidden',
        'bg-[rgba(255,255,255,calc(0.25+var(--glass-intensity,0.2)*0.3))] dark:bg-[rgba(15,23,42,calc(0.3+var(--glass-intensity,0.2)*0.35))]',
        'backdrop-blur-[var(--glass-blur,20px)]',
        'border border-[rgba(255,255,255,calc(0.2+var(--glass-intensity,0.2)*0.35))] dark:border-[rgba(255,255,255,calc(0.08+var(--glass-intensity,0.2)*0.12))]',
        'shadow-[0_8px_32px_0_rgba(0,0,0,0.08),inset_0_1px_1px_0_rgba(255,255,255,var(--glass-specular-alpha,0.85))]',
        'dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37),inset_0_1px_0_0_rgba(255,255,255,calc(var(--glass-specular-alpha,0.2)*0.65))]',
        'before:pointer-events-none before:absolute before:inset-0 before:rounded-2xl before:bg-gradient-to-b before:from-[rgba(255,255,255,calc(var(--glass-specular-alpha,0.3)*0.45))] before:via-white/5 before:to-transparent dark:before:from-[rgba(255,255,255,calc(var(--glass-specular-alpha,0.2)*0.3))] dark:before:to-transparent',
        'transition-[box-shadow,border-color] duration-200 hover:shadow-xl',
        className
      )}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-header'
      className={cn(
        '@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6',
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-title'
      className={cn('leading-none font-semibold', className)}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-description'
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-action'
      className={cn(
        'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-content'
      className={cn('px-6', className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot='card-footer'
      className={cn('flex items-center px-6 [.border-t]:pt-6', className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
