export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'http://cms/api'
      : 'https://pplex.gavillet-cie.com/api',

  ROOT_URL: 'https://pplex.gavillet-cie.com',
}
