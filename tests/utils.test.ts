import { describe, it, expect } from 'vitest'
import { cn } from '@/lib/utils'

describe('cn()', () => {
  it('lets the last conflicting tailwind class win (tailwind-merge)', () => {
    expect(cn('text-red-500', 'text-blue-500')).toBe('text-blue-500')
    expect(cn('p-2', 'p-4')).toBe('p-4')
  })
  it('drops falsy values', () => {
    expect(cn('px-2', false, null, undefined, '', 'py-1')).toBe('px-2 py-1')
  })
  it('supports conditional classes', () => {
    expect(cn('base', true && 'active', false && 'hidden')).toBe('base active')
  })
  it('returns an empty string for no or all-falsy input', () => {
    expect(cn()).toBe('')
    expect(cn(false, null, undefined)).toBe('')
  })
})
