export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'https://pplex.gavillet-cie.com/api/'
      : 'https://pplex.gavillet-cie.com/api/',
  ROOT_URL: 'https://pplex.gavillet-cie.com/',
}
