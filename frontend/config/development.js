export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'https://api-pplex.gavillet-cie.com/'
      : 'https://api-pplex.gavillet-cie.com/',
  ROOT_URL: 'https://api-pplex.gavillet-cie.com/',
}
