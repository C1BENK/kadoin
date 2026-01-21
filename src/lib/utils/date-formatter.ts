import dayjs from 'dayjs'
import 'dayjs/locale/id'

dayjs.locale('id')

export function formatDate(date: string | Date, format: string = 'DD MMMM YYYY'): string {
  return dayjs(date).format(format)
}

export function getCountdown(targetDate: string | Date): {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
} {
  const now = dayjs()
  const target = dayjs(targetDate)
  const diff = target.diff(now, 'second')
  
  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true
    }
  }
  
  const days = Math.floor(diff / (3600 * 24))
  const hours = Math.floor((diff % (3600 * 24)) / 3600)
  const minutes = Math.floor((diff % 3600) / 60)
  const seconds = Math.floor(diff % 60)
  
  return {
    days,
    hours,
    minutes,
    seconds,
    isPast: false
  }
}

export function getRelativeTime(date: string | Date): string {
  const now = dayjs()
  const target = dayjs(date)
  const diffInDays = target.diff(now, 'day')
  
  if (diffInDays === 0) return 'Hari ini'
  if (diffInDays === 1) return 'Besok'
  if (diffInDays === -1) return 'Kemarin'
  if (diffInDays > 0 && diffInDays < 7) return `${diffInDays} hari lagi`
  if (diffInDays < 0 && diffInDays > -7) return `${Math.abs(diffInDays)} hari yang lalu`
  
  return formatDate(date, 'DD MMM YYYY')
}
