// import parser from 'accept-language-parser'
// import { getUrl } from '../utils/api'

const isGoogle = (headers) => {
  return (
    (headers || {}).from?.toLowerCase().includes('google') ||
    (headers || {})['user-agent'].toLowerCase().includes('google')
  )
}

export default function ({ app, ssrContext, route, params, redirect }) {
  // const userLang = app.$cookiz.get('lang')
  if (isGoogle(ssrContext?.req?.headers)) {
    console.log('Google detected')
  } else {
    console.log('normal visitor')
  }
  // if (!userLang) {
  //   const acceptLanguage = ssrContext?.req?.headers['accept-language']
  //   const languages = parser.parse(acceptLanguage)

  //   const { code: browserLanguage } = languages.reduce((acc, it) => {
  //     if (!acc || acc.quality <= it.quality) {
  //       acc = it
  //     }

  //     return it
  //   }, null)

  //   if (browserLanguage) {
  //     app.$cookiz.set('lang', browserLanguage)

  //     const path = route.fullPath
  //       .split('/')
  //       .filter((it) => it !== params.language)
  //       .join('/')

  //     const url = getUrl(path, browserLanguage)
  //     return redirect(url)
  //   }
  // }
}
