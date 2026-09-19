/* eslint-disable react-refresh/only-export-components */
import React, { Suspense } from 'react'
import { type QueryClient } from '@tanstack/react-query'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { Toaster } from '@/components/ui/sonner'
import { NavigationProgress } from '@/components/navigation-progress'
import { GeneralError } from '@/features/errors/general-error'
import { NotFoundError } from '@/features/errors/not-found-error'

const isDevtoolsDisabled =
  import.meta.env.MODE === 'production' ||
  import.meta.env.VITE_DISABLE_DEVTOOLS === 'true' ||
  import.meta.env.VITE_DEVTOOLS === 'false'

const ReactQueryDevtools = isDevtoolsDisabled
  ? () => null
  : React.lazy(() =>
      import('@tanstack/react-query-devtools').then((res) => ({
        default: res.ReactQueryDevtools,
      }))
    )

const TanStackRouterDevtools = isDevtoolsDisabled
  ? () => null
  : React.lazy(() =>
      import('@tanstack/react-router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
      }))
    )

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  component: () => {
    return (
      <>
        <NavigationProgress />
        <Outlet />
        <Toaster duration={5000} />
        {!isDevtoolsDisabled && import.meta.env.MODE === 'development' && (
          <Suspense fallback={null}>
            <ReactQueryDevtools buttonPosition='bottom-left' />
            <TanStackRouterDevtools position='bottom-right' />
          </Suspense>
        )}
      </>
    )
  },
  notFoundComponent: NotFoundError,
  errorComponent: GeneralError,
})
