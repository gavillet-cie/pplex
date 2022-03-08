export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'http://cms/api'
      : 'https://pplex.ch/api',

  ROOT_URL: 'https://pplex.ch',
}
