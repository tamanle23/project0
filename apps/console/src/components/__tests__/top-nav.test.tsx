import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { TopNav } from '../layout/top-nav'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, ...props }: any) => <a {...props}>{children}</a>,
}))

describe('TopNav', () => {
  it('renders mobile menu button with proper aria-label', () => {
    const links = [
      { title: 'Overview', href: '/overview', isActive: true },
      { title: 'Customers', href: '/customers', isActive: false },
    ]

    render(<TopNav links={links} />)

    const toggleButton = screen.getByRole('button', {
      name: 'Toggle navigation menu',
    })
    expect(toggleButton).toBeDefined()
    expect(toggleButton.getAttribute('aria-label')).toBe(
      'Toggle navigation menu'
    )
  })
})
