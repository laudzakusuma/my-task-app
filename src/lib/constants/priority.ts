export const PRIORITY_VALUES = {
  LOW: 'LOW',
  MEDIUM: 'MEDIUM',
  HIGH: 'HIGH',
  URGENT: 'URGENT',
} as const

export type Priority = typeof PRIORITY_VALUES[keyof typeof PRIORITY_VALUES]

export const PRIORITY_LABELS: Record<Priority, string> = {
  LOW: 'Rendah',
  MEDIUM: 'Sedang',
  HIGH: 'Tinggi',
  URGENT: 'Mendesak',
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  LOW: 'var(--color-success)',
  MEDIUM: 'var(--color-accent)',
  HIGH: '#f97316',
  URGENT: 'var(--color-error)',
}

export const PRIORITY_OPTIONS = Object.values(PRIORITY_VALUES)