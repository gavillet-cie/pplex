export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'https://www.pplex.ch/api/'
      : 'https://www.pplex.ch/api/',
  ROOT_URL: 'https://www.pplex.ch',
  // BASE_URL:
  //   process.env.VUE_ENV === 'server'
  //     ? 'https://pplex-beta.gavillet-cie.com/api'
  //     : 'https://pplex-beta.gavillet-cie.com/api',

  // ROOT_URL: 'https://pplex-beta.gavillet-cie.com',
}
