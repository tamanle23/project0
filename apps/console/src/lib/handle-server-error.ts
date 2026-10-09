import { AxiosError } from 'axios'
import { toast } from 'sonner'

export function handleServerError(error: unknown) {
  // eslint-disable-next-line no-console
  console.log(error)

  let errMsg = 'Something went wrong!'

  if (
    error &&
    typeof error === 'object' &&
    'status' in error &&
    Number(error.status) === 204
  ) {
    errMsg = 'Content not found.'
  }

  if (error instanceof AxiosError) {
    if (error.response?.status === 429) {
      const retryAfter = error.response.headers['retry-after'] || error.response.headers['Retry-After']
      errMsg = retryAfter 
        ? `Rate limit exceeded. Please wait ${retryAfter} seconds before retrying.`
        : 'Rate limit exceeded. Please wait a moment before trying again.'
      toast.error(errMsg, { duration: 5000 })
      return
    }
    errMsg = error.response?.data?.message || error.response?.data?.title || error.message || errMsg
  }

  toast.error(errMsg)
}
