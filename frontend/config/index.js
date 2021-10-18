import production from './production'
import development from './development'

export default {
  production,
  development,
}[process.env.NODE_ENV || 'production']
