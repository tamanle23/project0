import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from '@tanstack/react-router'
import { Loader2, LogIn, ShieldAlert } from 'lucide-react'
import { toast } from 'sonner'
import { IconFacebook, IconGithub } from '@/assets/brand-icons'
import { useSpringAuthStore, springApiClient } from '@/features/spring-auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'

const formSchema = z.object({
  email: z.string().min(1, 'Please enter your email or username'),
  password: z
    .string()
    .min(1, 'Please enter your password')
    .min(5, 'Password must be at least 5 characters long'),
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLFormElement> {
  redirectTo?: string
}

export function UserAuthForm({
  className,
  redirectTo,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  
  // Use the new Spring Security dual-token store
  const { setTokens } = useSpringAuthStore()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      const response = await springApiClient.post('/api/auth/login', {
        username: data.email,
        password: data.password,
      });

      setTokens(response.data.accessToken, response.data.refreshToken);
      toast.success(`Welcome back, ${data.email}!`);
      
      const targetPath = redirectTo || '/'
      navigate({ to: targetPath, replace: true })
    } catch (error) {
      toast.error('Invalid credentials or network error');
    } finally {
      setIsLoading(false);
    }
  }

  // Sandbox bypass logic
  const handleSandboxBypass = async (role: 'admin' | 'creator' | 'user') => {
    setIsLoading(true);
    try {
      const response = await springApiClient.post('/api/auth/login', {
        username: `${role}_bypass`,
        password: 'bypass',
      }, {
        headers: {
          'X-Sandbox-Mock': 'true'
        }
      });

      setTokens(response.data.accessToken, response.data.refreshToken);
      toast.success(`Sandbox Login Successful (${role.toUpperCase()})`);
      
      const targetPath = redirectTo || '/';
      navigate({ to: targetPath, replace: true });
    } catch (e) {
      toast.error('Sandbox login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email or Username</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='absolute end-0 -top-0.5 text-sm font-medium text-muted-foreground hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        <Button className='mt-2' disabled={isLoading}>
          {isLoading ? <Loader2 className='animate-spin' /> : <LogIn />}
          Sign in
        </Button>

        {import.meta.env.DEV && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type='button'
                variant='outline'
                className='border-emerald-500/30 bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 dark:text-emerald-400'
                disabled={isLoading}
              >
                <ShieldAlert className='me-2 size-4' />
                Bypass with Sandbox...
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-[var(--radix-dropdown-menu-trigger-width)]">
              <DropdownMenuItem onClick={() => handleSandboxBypass('admin')} className="cursor-pointer text-emerald-600 dark:text-emerald-400">
                Admin Role (All Access)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSandboxBypass('creator')} className="cursor-pointer">
                Creator Role (Content)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSandboxBypass('user')} className="cursor-pointer">
                User Role (Read Only)
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='bg-background px-2 text-muted-foreground'>
              Or continue with
            </span>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-2'>
          <Button variant='outline' type='button' disabled={isLoading}>
            <IconGithub className='h-4 w-4' /> GitHub
          </Button>
          <Button variant='outline' type='button' disabled={isLoading}>
            <IconFacebook className='h-4 w-4' /> Facebook
          </Button>
        </div>
      </form>
    </Form>
  )
}
