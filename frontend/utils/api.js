export const baseUrl = 'https://api-pplex.gavillet-cie.com'

const cache = new Map()

export const getUrl = (
  url,
  lang = '',
  absolute = false,
  trailingSlash = true
) => {
  return sanitizeUrl(
    `${absolute ? baseUrl : ''}/${lang ? `/${lang}/${url}` : `/${url}`}`,
    trailingSlash
  )
}

export const getImageUrl = (url) => getUrl(url, '', true, false)

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
