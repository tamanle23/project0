import { create } from 'zustand'

/**
 * State Decoupling Pattern: Extracts pure UI state (like modal visibility, sidebar toggles)
 * out of the React Component tree, storing it centrally.
 * This enables cross-component communication (Mediator) without prop-drilling or context providers.
 */
interface UiState {
  isRegistrationModalOpen: boolean
  openRegistrationModal: () => void
  closeRegistrationModal: () => void
  toggleRegistrationModal: () => void
}

export const useUiStore = create<UiState>((set) => ({
  isRegistrationModalOpen: false,
  openRegistrationModal: () => set({ isRegistrationModalOpen: true }),
  closeRegistrationModal: () => set({ isRegistrationModalOpen: false }),
  toggleRegistrationModal: () => set((state) => ({ isRegistrationModalOpen: !state.isRegistrationModalOpen })),
}))
