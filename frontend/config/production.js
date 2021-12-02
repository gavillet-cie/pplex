export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'http://cms/api'
      : 'http://192.168.100.22:8080/api',

  ROOT_URL: 'http://192.168.100.22:8080',
}
