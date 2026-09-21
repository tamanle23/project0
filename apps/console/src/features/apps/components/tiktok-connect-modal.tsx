import { useState } from 'react'
import {
  Check,
  ChevronDown,
  Copy,
  ExternalLink,
  Eye,
  EyeOff,
  Key,
  Loader2,
  RefreshCw,
  Settings2,
  ShieldCheck,
  Unplug,
} from 'lucide-react'
import { toast } from 'sonner'
import { IconTiktok } from '@/assets/brand-icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import {
  buildTikTokOAuthUrl,
  exchangeAuthCodeForTokens,
  fetchTikTokProfile,
  refreshAccessToken,
  simulateDemoTokenExchange,
  simulateDemoTikTokAuthCode,
} from '../services/tiktok-service'
import { useTikTokStore, TIKTOK_ENV_CONFIG } from '../stores/tiktok-store'

type TikTokConnectModalProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function TikTokConnectModal({
  open,
  onOpenChange,
}: TikTokConnectModalProps) {
  const {
    isConnected,
    clientKey,
    clientSecret,
    authCode,
    accessToken,
    refreshToken,
    expiresAt,
    connectedProfile,
    isDemoMode,
    setCredentials,
    setAuthCode,
    setTokens,
    setConnectedProfile,
    setDemoMode,
    disconnect,
  } = useTikTokStore()

  // Local state
  const [showConfig, setShowConfig] = useState(false)
  const [customClientKey, setCustomClientKey] = useState(clientKey)
  const [customClientSecret, setCustomClientSecret] = useState(clientSecret)

  const [isProcessing, setIsProcessing] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const [showAccessToken, setShowAccessToken] = useState(false)
  const [showRefreshToken, setShowRefreshToken] = useState(false)
  const [copiedToken, setCopiedToken] = useState<'access' | 'refresh' | 'code' | null>(null)

  const activeClientKey = customClientKey || TIKTOK_ENV_CONFIG.clientKey
  const activeClientSecret = customClientSecret || TIKTOK_ENV_CONFIG.clientSecret

  const handleSaveConfig = () => {
    setCredentials(customClientKey, customClientSecret)
    toast.success('Custom TikTok credentials saved locally')
    setShowConfig(false)
  }

  // --- STAGE 1: Launch OAuth to get Authorization Code ---
  const handleLaunchOAuth = () => {
    if (!activeClientKey) {
      toast.error('Client Key missing. Please configure credentials.')
      return
    }
    // Launch standard TikTok consent screen
    const oauthUrl = buildTikTokOAuthUrl(
      activeClientKey,
      TIKTOK_ENV_CONFIG.redirectUri
    )
    // Normally we'd redirect the whole window. For this demo we'll show toast.
    toast.info('Would redirect to: ' + oauthUrl)
    // Simulating the user returning back to our redirect_uri with ?code=XYZ
    setTimeout(() => {
      setAuthCode('live_auth_code_simulated')
      setDemoMode(false)
      toast.success('Acquired Live Authorization Code')
    }, 1500)
  }

  const handleSandboxDemoAuth = () => {
    setDemoMode(true)
    setAuthCode(simulateDemoTikTokAuthCode())
    toast.success('Acquired Sandbox Demo Authorization Code')
  }

  // --- STAGE 2: Exchange Code for Tokens & Fetch Profile ---
  const handleExchangeTokens = async () => {
    if (!authCode) return
    setIsProcessing(true)

    try {
      if (isDemoMode) {
        // Fast-path sandbox mode
        await new Promise((resolve) => setTimeout(resolve, 800))
        const demoData = simulateDemoTokenExchange()
        setTokens(
          demoData.tokens.accessToken,
          demoData.tokens.refreshToken,
          demoData.tokens.expiresAt
        )
        setConnectedProfile(demoData.profile)
        toast.success('Sandbox token exchange successful')
      } else {
        // Live token exchange
        if (!activeClientSecret) {
          throw new Error('Client Secret missing for live exchange.')
        }
        const tokens = await exchangeAuthCodeForTokens(
          activeClientKey,
          activeClientSecret,
          authCode,
          TIKTOK_ENV_CONFIG.redirectUri
        )
        setTokens(tokens.accessToken, tokens.refreshToken, tokens.expiresAt)

        // Fetch Profile
        const profile = await fetchTikTokProfile(tokens.accessToken)
        setConnectedProfile(profile)
        toast.success('Successfully connected to TikTok Account')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Token exchange failed')
    } finally {
      setIsProcessing(false)
    }
  }

  // --- STAGE 3: Refresh Access Token ---
  const handleRefreshToken = async () => {
    if (!refreshToken) return
    setIsRefreshing(true)

    try {
      if (isDemoMode) {
        await new Promise((resolve) => setTimeout(resolve, 600))
        toast.success('Sandbox token successfully refreshed')
        // In sandbox, just extend expiry
        const newExpiry = new Date(Date.now() + 86400 * 1000).toISOString()
        setTokens(accessToken!, refreshToken, newExpiry)
      } else {
        if (!activeClientSecret) {
          throw new Error('Client Secret missing for live refresh.')
        }
        const newTokens = await refreshAccessToken(
          activeClientKey,
          activeClientSecret,
          refreshToken
        )
        setTokens(
          newTokens.accessToken,
          newTokens.refreshToken,
          newTokens.expiresAt
        )
        toast.success('Access Token refreshed')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to refresh token')
    } finally {
      setIsRefreshing(false)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    toast.info('Disconnected from TikTok')
  }

  const handleCopy = (text: string | null, type: 'access' | 'refresh' | 'code') => {
    if (!text) return
    navigator.clipboard.writeText(text)
    setCopiedToken(type)
    toast.success('Copied to clipboard')
    setTimeout(() => setCopiedToken(null), 2000)
  }

  const maskString = (str: string | null | undefined) => {
    if (!str) return ''
    if (str.length <= 10) return '•'.repeat(str.length)
    return `${str.substring(0, 4)}••••••••••••${str.substring(str.length - 4)}`
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='sm:max-w-[500px] bg-white/65 dark:bg-slate-900/65 backdrop-blur-xl border border-white/30 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] rounded-2xl'>
        <DialogHeader>
          <DialogTitle className='flex items-center gap-2'>
            <IconTiktok className='size-5' />
            Connect TikTok
          </DialogTitle>
          <DialogDescription>
            {isConnected
              ? 'Manage your TikTok Account connection and active OAuth tokens.'
              : 'Authorize access to publish videos and view your TikTok profile stats.'}
          </DialogDescription>
        </DialogHeader>

        {!isConnected ? (
          <div className='flex flex-col gap-4 mt-2'>
            {/* Configuration Dropdown */}
            <div className='rounded-xl border border-border/60 bg-muted/20'>
              <button
                onClick={() => setShowConfig(!showConfig)}
                className='flex w-full items-center justify-between p-3 text-sm font-medium hover:bg-muted/40 transition-colors rounded-xl'
              >
                <div className='flex items-center gap-2'>
                  <Settings2 className='size-4 text-muted-foreground' />
                  OAuth Application Credentials
                </div>
                <ChevronDown
                  className={`size-4 text-muted-foreground transition-transform ${showConfig ? 'rotate-180' : ''}`}
                />
              </button>
              
              {showConfig && (
                <div className='border-t border-border/60 p-4 space-y-3'>
                  <div className='space-y-1.5'>
                    <label className='text-xs font-medium text-foreground'>Client Key</label>
                    <Input
                      type='text'
                      value={customClientKey}
                      onChange={(e) => setCustomClientKey(e.target.value)}
                      placeholder='TikTok Client Key'
                      className='h-8 bg-background/50'
                    />
                  </div>
                  <div className='space-y-1.5'>
                    <label className='text-xs font-medium text-foreground'>Client Secret</label>
                    <Input
                      type='password'
                      value={customClientSecret}
                      onChange={(e) => setCustomClientSecret(e.target.value)}
                      placeholder='TikTok Client Secret'
                      className='h-8 bg-background/50'
                    />
                  </div>
                  <Button onClick={handleSaveConfig} size='sm' className='w-full h-8'>
                    Save Client Credentials
                  </Button>
                </div>
              )}
            </div>

            {/* If NO Auth Code yet (Stage 1) */}
            {!authCode && (
              <div className='space-y-3 mt-2'>
                <Button
                  onClick={handleLaunchOAuth}
                  className='w-full h-11 relative overflow-hidden bg-black hover:bg-black/80 dark:bg-white dark:hover:bg-white/90 text-white dark:text-black font-semibold'
                >
                  <ExternalLink className='me-2 size-4' />
                  Launch TikTok Login
                </Button>
                <div className='relative'>
                  <div className='absolute inset-0 flex items-center'>
                    <span className='w-full border-t border-muted-foreground/20' />
                  </div>
                  <div className='relative flex justify-center text-xs uppercase'>
                    <span className='bg-background/80 px-2 text-muted-foreground backdrop-blur-md'>
                      Or for local testing
                    </span>
                  </div>
                </div>
                <Button
                  variant='outline'
                  onClick={handleSandboxDemoAuth}
                  className='w-full h-11 border-dashed border-border/80 text-muted-foreground hover:text-foreground'
                >
                  Try Sandbox Demo Flow
                </Button>
              </div>
            )}

            {/* If Auth Code exists (Stage 2: Exchange) */}
            {authCode && (
              <div className='space-y-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 mt-2'>
                <div className='flex items-start gap-3'>
                  <div className='rounded-full bg-emerald-500/20 p-1.5'>
                    <Check className='size-4 text-emerald-600 dark:text-emerald-400' />
                  </div>
                  <div>
                    <h4 className='text-sm font-semibold text-emerald-900 dark:text-emerald-400'>
                      Authorization Code Acquired
                    </h4>
                    <p className='text-xs text-emerald-700/80 dark:text-emerald-500/80 mt-0.5 mb-2'>
                      The user has authorized your application. Exchange this short-lived code for access and refresh tokens.
                    </p>
                    <div className='flex items-center gap-1.5 bg-black/5 dark:bg-white/5 p-1.5 rounded text-xs font-mono break-all text-muted-foreground mb-3'>
                      <Key className='size-3.5 shrink-0' />
                      {maskString(authCode)}
                      <Button
                        variant='ghost'
                        size='sm'
                        onClick={() => handleCopy(authCode, 'code')}
                        className='size-5 p-0 ms-auto shrink-0'
                      >
                        {copiedToken === 'code' ? <Check className='size-3 text-emerald-600' /> : <Copy className='size-3' />}
                      </Button>
                    </div>
                  </div>
                </div>

                <Button
                  onClick={handleExchangeTokens}
                  disabled={isProcessing}
                  className='w-full h-10 bg-emerald-600 hover:bg-emerald-700 text-white'
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className='me-2 size-4 animate-spin' /> Exchanging...
                    </>
                  ) : (
                    <>
                      <ShieldCheck className='me-2 size-4' /> Exchange for Access & Refresh Tokens
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className='flex flex-col gap-5 mt-2'>
            {/* Connected Profile Card */}
            <div className='rounded-xl bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 p-4 relative overflow-hidden'>
              <div className='flex justify-between items-start'>
                <div className='flex gap-3'>
                  {connectedProfile?.avatar_url ? (
                    <img 
                      src={connectedProfile.avatar_url} 
                      alt={connectedProfile.display_name} 
                      className='size-12 rounded-full border-2 border-emerald-500/30'
                    />
                  ) : (
                    <div className='size-12 rounded-full border-2 border-emerald-500/30 bg-emerald-500/20 flex items-center justify-center'>
                      <IconTiktok className='size-6' />
                    </div>
                  )}
                  <div>
                    <div className='flex items-center gap-2'>
                      <h4 className='font-semibold text-sm text-foreground'>
                        {connectedProfile?.display_name}
                      </h4>
                      <Badge
                        variant='outline'
                        className='border-emerald-500/40 bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 text-[10px]'
                      >
                        Active
                      </Badge>
                      {isDemoMode && (
                        <Badge variant='secondary' className='text-[10px]'>
                          Sandbox
                        </Badge>
                      )}
                    </div>
                    <p className='text-xs text-muted-foreground'>
                      Union ID: {maskString(connectedProfile?.union_id)}
                    </p>
                  </div>
                </div>

                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleDisconnect}
                  className='text-xs text-destructive hover:bg-destructive/10 h-8 px-2.5'
                >
                  <Unplug className='me-1 size-3.5' /> Disconnect
                </Button>
              </div>
            </div>

            {/* Token Inspector Section */}
            <div className='space-y-3 rounded-xl border border-border/60 bg-muted/20 p-4'>
              <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Token Vault
              </span>

              {/* 1. Refresh Token */}
              <div className='rounded-lg border border-border/60 bg-background/80 p-3'>
                <div className='flex items-center justify-between mb-1.5'>
                  <div className='flex items-center gap-1.5'>
                    <span className='text-xs font-medium text-foreground'>
                      Refresh Token
                    </span>
                    <Badge
                      variant='outline'
                      className='border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300 text-[10px]'
                    >
                      Long-Lived
                    </Badge>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setShowRefreshToken(!showRefreshToken)}
                      className='size-7 p-0 text-muted-foreground hover:text-foreground'
                    >
                      {showRefreshToken ? (
                        <EyeOff className='size-3.5' />
                      ) : (
                        <Eye className='size-3.5' />
                      )}
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopy(refreshToken, 'refresh')}
                      className='size-7 p-0 text-muted-foreground hover:text-foreground'
                    >
                      {copiedToken === 'refresh' ? (
                        <Check className='size-3.5 text-emerald-600' />
                      ) : (
                        <Copy className='size-3.5' />
                      )}
                    </Button>
                  </div>
                </div>
                <div className='font-mono text-xs text-muted-foreground truncate'>
                  {showRefreshToken ? refreshToken : maskString(refreshToken)}
                </div>
              </div>

              {/* 2. Short-Lived Access Token */}
              <div className='rounded-lg border border-border/60 bg-background/80 p-3'>
                <div className='flex items-center justify-between mb-1.5'>
                  <div className='flex items-center gap-1.5'>
                    <span className='text-xs font-medium text-foreground'>
                      Access Token
                    </span>
                    <Badge variant='secondary' className='text-[10px]'>
                      Short-Lived (24 Hours)
                    </Badge>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => setShowAccessToken(!showAccessToken)}
                      className='size-7 p-0 text-muted-foreground hover:text-foreground'
                    >
                      {showAccessToken ? (
                        <EyeOff className='size-3.5' />
                      ) : (
                        <Eye className='size-3.5' />
                      )}
                    </Button>
                    <Button
                      variant='ghost'
                      size='sm'
                      onClick={() => handleCopy(accessToken, 'access')}
                      className='size-7 p-0 text-muted-foreground hover:text-foreground'
                    >
                      {copiedToken === 'access' ? (
                        <Check className='size-3.5 text-emerald-600' />
                      ) : (
                        <Copy className='size-3.5' />
                      )}
                    </Button>
                  </div>
                </div>
                <div className='font-mono text-xs text-muted-foreground truncate'>
                  {showAccessToken ? accessToken : maskString(accessToken)}
                </div>
                {expiresAt && (
                  <div className='mt-1 text-[10px] text-muted-foreground'>
                    Expires: {new Date(expiresAt).toLocaleTimeString()} ({new Date(expiresAt).toLocaleDateString()})
                  </div>
                )}
              </div>

              {/* Refresh Action Trigger */}
              <Button
                variant='outline'
                size='sm'
                onClick={handleRefreshToken}
                disabled={isRefreshing}
                className='w-full text-xs h-8 border-dashed border-border/80'
              >
                {isRefreshing ? (
                  <>
                    <Loader2 className='me-1.5 size-3.5 animate-spin' /> Refreshing Token...
                  </>
                ) : (
                  <>
                    <RefreshCw className='me-1.5 size-3.5' /> Refresh Access Token with Refresh Token
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
