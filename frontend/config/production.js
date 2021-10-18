export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'http://cms/api'
      : 'http://pplex.gavillet-cie.com/api',

  ROOT_URL: 'http://pplex.gavillet-cie.com',
}
