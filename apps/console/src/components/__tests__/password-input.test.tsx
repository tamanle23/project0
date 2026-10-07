import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { PasswordInput } from '../password-input'

describe('PasswordInput', () => {
  it('renders password input in hidden state by default', () => {
    render(<PasswordInput placeholder="Enter password" />)

    const input = screen.getByPlaceholderText('Enter password') as HTMLInputElement
    expect(input.type).toBe('password')

    const toggleButton = screen.getByRole('button', { name: 'Show password' })
    expect(toggleButton.getAttribute('aria-pressed')).toBe('false')
  })

  it('toggles password visibility and updates ARIA attributes when clicked', () => {
    render(<PasswordInput placeholder="Enter password" />)

    const input = screen.getByPlaceholderText('Enter password') as HTMLInputElement
    const toggleButton = screen.getByRole('button', { name: 'Show password' })

    fireEvent.click(toggleButton)

    expect(input.type).toBe('text')
    const activeToggleButton = screen.getByRole('button', { name: 'Hide password' })
    expect(activeToggleButton.getAttribute('aria-pressed')).toBe('true')

    fireEvent.click(activeToggleButton)

    expect(input.type).toBe('password')
    expect(screen.getByRole('button', { name: 'Show password' }).getAttribute('aria-pressed')).toBe('false')
  })

  it('disables toggle button when disabled prop is true', () => {
    render(<PasswordInput disabled placeholder="Enter password" />)

    const toggleButton = screen.getByRole('button', { name: 'Show password' }) as HTMLButtonElement
    expect(toggleButton.disabled).toBe(true)
  })
})
