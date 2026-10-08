import { render, screen, fireEvent } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { ConfirmDialog } from '../confirm-dialog'

describe('ConfirmDialog', () => {
  it('renders title, description, and action buttons', () => {
    const handleConfirm = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <ConfirmDialog
        open={true}
        onOpenChange={onOpenChange}
        title="Confirm Deletion"
        desc="Are you sure you want to delete this item?"
        confirmText="Delete"
        cancelBtnText="Cancel"
        handleConfirm={handleConfirm}
      />
    )

    expect(screen.getByText('Confirm Deletion')).toBeDefined()
    expect(
      screen.getByText('Are you sure you want to delete this item?')
    ).toBeDefined()

    const confirmBtn = screen.getByRole('button', { name: 'Delete' })
    expect(confirmBtn).toBeDefined()

    fireEvent.click(confirmBtn)
    expect(handleConfirm).toHaveBeenCalledTimes(1)
  })

  it('renders loading spinner and sets aria-busy="true" when isLoading is true', () => {
    const handleConfirm = vi.fn()
    const onOpenChange = vi.fn()

    render(
      <ConfirmDialog
        open={true}
        onOpenChange={onOpenChange}
        title="Confirm Action"
        desc="Action in progress."
        confirmText="Confirm"
        isLoading={true}
        handleConfirm={handleConfirm}
      />
    )

    const confirmBtn = screen.getByRole('button', {
      name: 'Confirm',
    }) as HTMLButtonElement
    expect(confirmBtn.getAttribute('aria-busy')).toBe('true')
    expect(confirmBtn.disabled).toBe(true)

    const cancelBtn = screen.getByRole('button', {
      name: 'Cancel',
    }) as HTMLButtonElement
    expect(cancelBtn.disabled).toBe(true)
  })
})
