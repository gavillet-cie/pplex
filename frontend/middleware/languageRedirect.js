import parser from 'accept-language-parser'
import { getUrl } from '../utils/api'

export default function ({ app, ssrContext, route, params, redirect }) {
  const userLang = app.$cookiz.get('lang')
  if (!userLang) {
    const acceptLanguage = ssrContext?.req?.headers['accept-language']
    const browserLanguage = parser.pick(['fr', 'en'], acceptLanguage)
    app.$cookiz.set('lang', browserLanguage)

    const path = route.fullPath
      .split('/')
      .filter((it) => it !== params.language)
      .join('/')

    const url = getUrl(path, browserLanguage)
    return redirect(url)
  }
}
