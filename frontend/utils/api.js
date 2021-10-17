export const BASE_URL =
  process.env.VUE_ENV === 'server'
    ? 'http://cms/api'
    : process.env.BASE_URL || 'https://api-pplex.gavillet-cie.com'

export const ROOT_URL = process.env.ROOT_URL

const cache = new Map()

export const getUrl = (
  url,
  lang = '',
  absolute = false,
  trailingSlash = true,
  baseUrl = BASE_URL
) => {
  return sanitizeUrl(
    `${absolute ? baseUrl : ''}/${lang ? `/${lang}/${url}` : `/${url}`}`,
    trailingSlash
  )
}

export const getImageUrl = (url) => getUrl(url, '', true, false, ROOT_URL)

export const sanitizeUrl = (url, trailingSlash = true) => {
  const sanitizedUrl = url
    .replace('https://', '***')
    .replace('http://', '**')
    .replace(/(\/)\1+/g, '$1')
    .replace('***', 'https://')
    .replace('**', 'http://')

  return sanitizedUrl[sanitizedUrl.length - 1] === '/' || !trailingSlash
    ? sanitizedUrl
    : `${sanitizedUrl}/`
}

export const get = async (url, lang = '') => {
  const sanitizedUrl = getUrl(url, lang, true)
  const cachedRes = cache.get(sanitizedUrl)
  if (cachedRes) return cachedRes
  const res = await fetch(sanitizedUrl).then((res) => res.json())
  cache.set(sanitizedUrl, res)
  return res
}
