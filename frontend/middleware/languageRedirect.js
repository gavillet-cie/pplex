// import parser from 'accept-language-parser'
// import { getUrl } from '../utils/api'

export default function ({ app, ssrContext, route, params, redirect }) {
  // const userLang = app.$cookiz.get('lang')
  console.log(ssrContext?.req)
  console.log(ssrContext?.req?.headers)
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
