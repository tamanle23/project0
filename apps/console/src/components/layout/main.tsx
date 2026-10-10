import { cn } from '@/lib/utils'

type MainProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  fluid?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Main({ fixed, className, fluid, id = 'content', ...props }: MainProps) {
  return (
    <main
      id={id}
      tabIndex={-1}
      data-layout={fixed ? 'fixed' : 'auto'}
      className={cn(
        'outline-none px-4 py-6',

        // If layout is fixed, make the main container flex and grow; pinned on desktop, scrollable on mobile
        fixed && 'flex grow flex-col max-lg:min-h-0 max-lg:overflow-y-auto lg:overflow-hidden',

        // If layout is not fluid, set the max-width
        !fluid &&
          '@7xl/content:mx-auto @7xl/content:w-full @7xl/content:max-w-7xl',
        className
      )}
      {...props}
    />
  )
}
