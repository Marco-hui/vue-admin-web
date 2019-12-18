import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Vue Admin Web'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
