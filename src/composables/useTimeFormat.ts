function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  )
}

function isYesterday(date: Date, now: Date): boolean {
  const yesterday = new Date(now)
  yesterday.setDate(yesterday.getDate() - 1)
  return isSameDay(date, yesterday)
}

export function useTimeFormat() {
  function formatConversationTime(isoString: string): string {
    const date = new Date(isoString)
    const now = new Date()

    if (isSameDay(date, now)) {
      return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    if (isYesterday(date, now)) {
      return 'Ontem'
    }

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  function formatDateDivider(dateKey: string): string {
    const date = new Date(dateKey + 'T12:00:00')
    const now = new Date()
    const shortDate = date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' })

    if (isSameDay(date, now)) {
      return `Hoje, ${shortDate}`
    }

    if (isYesterday(date, now)) {
      return `Ontem, ${shortDate}`
    }

    return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  }

  return { formatConversationTime, formatDateDivider }
}
