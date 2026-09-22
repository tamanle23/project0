import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { ChevronDown } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { fonts } from '@/config/fonts'
import { showSubmittedData } from '@/lib/show-submitted-data'
import { cn } from '@/lib/utils'
import { useFont } from '@/context/font-provider'
import { useTheme } from '@/context/theme-provider'
import { Button, buttonVariants } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Slider } from '@/components/ui/slider'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark']),
  font: z.enum(fonts),
  glassIntensity: z.number().min(0).max(100),
  wallpaper: z.enum(['liquid', 'mesh', 'none']),
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

export function AppearanceForm() {
  const { font, setFont } = useFont()
  const { theme, setTheme, glassIntensity, setGlassIntensity, previewGlassIntensity, wallpaper, setWallpaper } = useTheme()
  const [previewIntensity, setPreviewIntensity] = useState<number>(glassIntensity ?? 20)

  // This can come from your database or API.
  const defaultValues: Partial<AppearanceFormValues> = {
    theme: theme as 'light' | 'dark',
    font,
    glassIntensity: glassIntensity ?? 20,
    wallpaper: wallpaper ?? 'liquid',
  }

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues,
  })

  function onSubmit(data: AppearanceFormValues) {
    if (data.font != font) setFont(data.font)
    if (data.theme != theme) setTheme(data.theme)
    if (data.glassIntensity !== undefined && data.glassIntensity !== glassIntensity) {
      setGlassIntensity(data.glassIntensity)
    }
    if (data.wallpaper && data.wallpaper !== wallpaper) {
      setWallpaper(data.wallpaper)
    }

    showSubmittedData(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <FormField
          control={form.control}
          name='font'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Font</FormLabel>
              <div className='relative w-max'>
                <FormControl>
                  <select
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-[200px] appearance-none font-normal capitalize',
                      'dark:bg-background dark:hover:bg-background'
                    )}
                    {...field}
                  >
                    {fonts.map((font) => (
                      <option key={font} value={font}>
                        {font}
                      </option>
                    ))}
                  </select>
                </FormControl>
                <ChevronDown className='absolute end-3 top-2.5 h-4 w-4 opacity-50' />
              </div>
              <FormDescription className='font-manrope'>
                Set the font you want to use in the dashboard.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='theme'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Theme</FormLabel>
              <FormDescription>
                Select the theme for the dashboard.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className='grid max-w-md grid-cols-2 gap-8 pt-2'
              >
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='light' className='sr-only' />
                    </FormControl>
                    <div className='items-center rounded-md border-2 border-muted p-1 hover:border-accent'>
                      <div className='space-y-2 rounded-sm bg-[#ecedef] p-2'>
                          <div className='space-y-2 rounded-md bg-white/65 dark:bg-slate-900/65 backdrop-blur-md border border-white/30 p-2 shadow-sm'>
                          <div className='h-2 w-[80px] rounded-lg bg-[#ecedef]' />
                          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-white/65 dark:bg-slate-900/65 backdrop-blur-md border border-white/30 p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-white/65 dark:bg-slate-900/65 backdrop-blur-md border border-white/30 p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-[#ecedef]' />
                          <div className='h-2 w-[100px] rounded-lg bg-[#ecedef]' />
                        </div>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center font-normal'>
                      Light
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary'>
                    <FormControl>
                      <RadioGroupItem value='dark' className='sr-only' />
                    </FormControl>
                    <div className='items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground'>
                      <div className='space-y-2 rounded-sm bg-slate-950 p-2'>
                        <div className='space-y-2 rounded-md bg-slate-900/65 backdrop-blur-md border border-white/10 p-2 shadow-sm'>
                          <div className='h-2 w-[80px] rounded-lg bg-slate-400' />
                          <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-slate-900/65 backdrop-blur-md border border-white/10 p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-slate-400' />
                          <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                        </div>
                        <div className='flex items-center space-x-2 rounded-md bg-slate-900/65 backdrop-blur-md border border-white/10 p-2 shadow-sm'>
                          <div className='h-4 w-4 rounded-full bg-slate-400' />
                          <div className='h-2 w-[100px] rounded-lg bg-slate-400' />
                        </div>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center font-normal'>
                      Dark
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='glassIntensity'
          render={({ field }) => (
            <FormItem className='max-w-md space-y-3'>
              <div className='flex items-center justify-between'>
                <FormLabel>Liquid Glass Intensity</FormLabel>
                <span className='rounded-md border border-white/30 dark:border-white/15 bg-white/40 dark:bg-white/10 px-2 py-0.5 text-xs font-semibold backdrop-blur-md'>
                  {previewIntensity}%
                </span>
              </div>
              <FormControl>
                <Slider
                  min={0}
                  max={100}
                  step={5}
                  value={[previewIntensity]}
                  onValueChange={(vals) => {
                    const val = vals[0] ?? 20
                    field.onChange(val)
                    setPreviewIntensity(val)
                    previewGlassIntensity(val)
                  }}
                  onValueCommit={(vals) => {
                    const val = vals[0] ?? 20
                    setGlassIntensity(val)
                  }}
                  className='py-2'
                />
              </FormControl>
              <FormDescription>
                Dynamically adjust the frosted blur, translucency, and specular refraction of glass surfaces across the console.
              </FormDescription>

              {/* Live Interactive Liquid Glass Preview Card */}
              <div className='mt-2 relative overflow-hidden rounded-2xl p-5 border border-[rgba(255,255,255,calc(0.2+var(--glass-intensity,0.2)*0.45))] dark:border-[rgba(255,255,255,calc(0.08+var(--glass-intensity,0.2)*0.18))] bg-[rgba(255,255,255,calc(0.15+var(--glass-intensity,0.2)*0.5))] dark:bg-[rgba(15,23,42,calc(0.2+var(--glass-intensity,0.2)*0.5))] backdrop-blur-[var(--glass-blur,8px)] shadow-[0_8px_32px_0_rgba(0,0,0,0.08),inset_0_1px_1.5px_0_rgba(255,255,255,var(--glass-specular-alpha,0.3))] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.4),inset_0_1px_1px_0_rgba(255,255,255,calc(var(--glass-specular-alpha,0.2)*0.65))] transition-[backdrop-filter,background-color,border-color,box-shadow] duration-75'>
                {/* Specular gloss sheen gradient */}
                <div className='pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-b from-[rgba(255,255,255,calc(var(--glass-specular-alpha,0.3)*0.55))] via-white/5 to-transparent' />

                <div className='relative z-10 flex flex-col gap-4'>
                  <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-2'>
                      <span className='size-2.5 rounded-full bg-emerald-500 animate-pulse' />
                      <span className='text-xs font-semibold tracking-wide uppercase text-foreground/80'>
                        Live Glass Preview
                      </span>
                    </div>
                    <span className='rounded-full border border-white/40 dark:border-white/15 bg-white/30 dark:bg-white/10 px-2 py-0.5 text-[11px] font-mono font-medium text-foreground'>
                      {previewIntensity}% Intensity
                    </span>
                  </div>

                  {/* Live metrics */}
                  <div className='grid grid-cols-3 gap-2 py-1'>
                    <div className='rounded-xl border border-white/25 dark:border-white/10 bg-white/20 dark:bg-white/5 p-2 text-center backdrop-blur-xs'>
                      <div className='text-[10px] text-muted-foreground uppercase font-medium'>Blur</div>
                      <div className='text-sm font-bold font-mono text-foreground'>
                        {Math.round((previewIntensity / 100) * 36)}px
                      </div>
                    </div>
                    <div className='rounded-xl border border-white/25 dark:border-white/10 bg-white/20 dark:bg-white/5 p-2 text-center backdrop-blur-xs'>
                      <div className='text-[10px] text-muted-foreground uppercase font-medium'>Opacity</div>
                      <div className='text-sm font-bold font-mono text-foreground'>
                        {Math.round(15 + (previewIntensity / 100) * 50)}%
                      </div>
                    </div>
                    <div className='rounded-xl border border-white/25 dark:border-white/10 bg-white/20 dark:bg-white/5 p-2 text-center backdrop-blur-xs'>
                      <div className='text-[10px] text-muted-foreground uppercase font-medium'>Refraction</div>
                      <div className='text-sm font-bold font-mono text-foreground'>
                        {Math.round((0.15 + (previewIntensity / 100) * 0.8) * 100)}%
                      </div>
                    </div>
                  </div>

                  <p className='text-xs text-foreground/75 leading-relaxed'>
                    Move the slider above to see real-time optical blur, light refraction, and edge specular sheen dynamically transform on this card.
                  </p>

                  <div className='flex items-center gap-2 pt-1'>
                    <button
                      type='button'
                      className='liquid-glass-interactive px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer shadow-xs'
                    >
                      Interactive Glass Button
                    </button>
                    <span className='text-[11px] text-muted-foreground'>
                      Hover to test sheen
                    </span>
                  </div>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='wallpaper'
          render={({ field }) => (
            <FormItem className='space-y-3'>
              <FormLabel>Ambient Glass Background</FormLabel>
              <FormDescription>
                Choose an ambient wallpaper underneath the glass layer to test blur and refraction.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={(val) => {
                  field.onChange(val)
                  setWallpaper(val as 'liquid' | 'mesh' | 'none')
                }}
                defaultValue={field.value}
                className='grid max-w-xl grid-cols-3 gap-4 pt-1'
              >
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary cursor-pointer'>
                    <FormControl>
                      <RadioGroupItem value='liquid' className='sr-only' />
                    </FormControl>
                    <div className='items-center rounded-xl border-2 border-white/20 dark:border-white/10 p-1 hover:border-accent transition-all'>
                      <div className='h-20 rounded-lg overflow-hidden relative border border-white/20'>
                        <img
                          src={theme === 'dark' ? '/images/liquid-glass-bg.jpg' : '/images/liquid-glass-bg-light.jpg'}
                          alt='Liquid Caustic'
                          className='h-full w-full object-cover'
                        />
                        <div className='absolute inset-0 bg-black/20 flex items-center justify-center'>
                          <span className='rounded bg-black/50 px-1.5 py-0.5 text-[10px] text-white font-medium backdrop-blur-xs'>
                            Liquid Caustic
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center text-xs font-medium'>
                      Liquid Caustic (Dynamic)
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary cursor-pointer'>
                    <FormControl>
                      <RadioGroupItem value='mesh' className='sr-only' />
                    </FormControl>
                    <div className='items-center rounded-xl border-2 border-white/20 dark:border-white/10 p-1 hover:border-accent transition-all'>
                      <div className='h-20 rounded-lg bg-gradient-to-tr from-indigo-500/30 via-pink-500/25 to-sky-400/30 flex items-center justify-center border border-white/20'>
                        <span className='rounded bg-white/40 dark:bg-black/40 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-xs'>
                          Mesh Glow
                        </span>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center text-xs font-medium'>
                      Ambient Mesh
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className='[&:has([data-state=checked])>div]:border-primary cursor-pointer'>
                    <FormControl>
                      <RadioGroupItem value='none' className='sr-only' />
                    </FormControl>
                    <div className='items-center rounded-xl border-2 border-white/20 dark:border-white/10 p-1 hover:border-accent transition-all'>
                      <div className='h-20 rounded-lg bg-muted/40 flex items-center justify-center border border-white/10'>
                        <span className='rounded bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground font-medium'>
                          Clean
                        </span>
                      </div>
                    </div>
                    <span className='block w-full p-2 text-center text-xs font-medium'>
                      Minimalist
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button type='submit'>Update preferences</Button>
      </form>
    </Form>
  )
}
