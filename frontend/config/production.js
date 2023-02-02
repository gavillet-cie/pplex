export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'http://cms/api'
      : 'https://www.pplex.ch/api',

  ROOT_URL: 'https://www.pplex.ch',
}
