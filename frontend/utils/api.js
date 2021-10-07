export const baseUrl = 'https://api-pplex.gavillet-cie.com'

export const getUrl = (url, lang = '', absolute = false) => {
  return sanitizeUrl(
    `${absolute ? baseUrl : ''}/${lang ? `/${lang}/${url}` : `/${url}`}`
  )
}

export const sanitizeUrl = (url) => {
  const sanitizedUrl = url
    .replace('https://', '***')
    .replace('http://', '**')
    .replace(/(\/)\1+/g, '$1')
    .replace('***', 'https://')
    .replace('**', 'http://')

  return sanitizedUrl[sanitizedUrl.length - 1] === '/'
    ? sanitizedUrl
    : `${sanitizedUrl}/`
}

export const get = (url, lang = '') => {
  return fetch(getUrl(url, lang, true)).then((res) => res.json())
}
