import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { FilePlus } from 'lucide-react'

type HeaderProps = React.HTMLAttributes<HTMLElement> & {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export function Header({ className, fixed, children, ...props }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const top = document.body.scrollTop || document.documentElement.scrollTop
          setIsScrolled(top > 10)
          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'z-50 h-16 transition-colors duration-200',
        fixed && 'header-fixed peer/header sticky top-0 w-[inherit]',
        'backdrop-blur-[var(--glass-blur,16px)]',
        isScrolled && fixed
          ? 'bg-[rgba(255,255,255,calc(0.35+var(--glass-intensity,0.2)*0.35))] dark:bg-[rgba(15,23,42,calc(0.4+var(--glass-intensity,0.2)*0.35))] border-b border-[rgba(255,255,255,calc(0.2+var(--glass-intensity,0.2)*0.3))] dark:border-white/10 shadow-lg shadow-black/5 dark:shadow-black/20'
          : 'bg-[rgba(255,255,255,calc(0.15+var(--glass-intensity,0.2)*0.25))] dark:bg-[rgba(15,23,42,calc(0.2+var(--glass-intensity,0.2)*0.25))] border-b border-[rgba(255,255,255,calc(0.1+var(--glass-intensity,0.2)*0.2))] dark:border-white/5',
        className
      )}
      {...props}
    >
      <div
        className='relative flex h-full items-center gap-3 p-4 sm:gap-4'
      >
        <SidebarTrigger variant='outline' className='max-md:scale-125' />
        <Separator orientation='vertical' className='h-6' />
        <Button
          variant='outline'
          size='sm'
          className='h-8 data-[state=open]:bg-accent'
        >
          <FilePlus />
          <span>Create</span>
        </Button>
        <Separator orientation='vertical' className='h-6' />
        {children}
      </div>
    </header>
  )
}
