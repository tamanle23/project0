import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Facade Pattern: Decouples the React UI components from the networking,
 * HTTP details, and caching layer (TanStack Query).
 * Any component can just call `useRegisterUserFacade()` without knowing the endpoint or payload structure.
 */
interface RegisterUserPayload {
  userName: string
  email: string
  password?: string
}

export function useRegisterUserFacade() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: RegisterUserPayload) => {
      const response = await fetch('/api/v2/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed to register user')
      }

      // The backend returns a Long (numeric ID)
      const data = await response.text()
      return Number(data)
    },
    onSuccess: () => {
      // Mediator Pattern: TanStack Query acts as the Mediator managing state invalidations
      // automatically rather than forcing the UI component to manage it.
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
