export default {
  BASE_URL:
    process.env.VUE_ENV === 'server'
      ? 'http://cms/api/'
      : 'http://localhost:8080/api/',
  ROOT_URL: 'http://localhost:8080',
}
