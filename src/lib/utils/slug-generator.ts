export function generateSlug(name: string, date?: string): string {
  const normalized = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
  
  const random = Math.random().toString(36).substring(2, 8)
  const dateStr = date ? `-${new Date(date).getTime().toString(36)}` : ''
  
  return `${normalized}${dateStr}-${random}`
}

export function validateSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}
