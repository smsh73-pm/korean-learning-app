import { type ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function formatKoreanDate(date: Date): string {
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function getKoreanLevelText(level: number): string {
  const levels = {
    1: '초급 1 (Beginner 1)',
    2: '초급 2 (Beginner 2)',
    3: '중급 1 (Intermediate 1)',
    4: '중급 2 (Intermediate 2)',
    5: '고급 1 (Advanced 1)',
    6: '고급 2 (Advanced 2)',
  }
  return levels[level as keyof typeof levels] || 'Unknown Level'
}

export function getTOPIKLevel(level: number): string {
  if (level <= 2) return 'TOPIK I'
  return 'TOPIK II'
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
