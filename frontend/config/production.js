export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'http://cms/api'
      : 'https://192.168.100.22/api',

  ROOT_URL: 'https://192.168.100.22',
}
