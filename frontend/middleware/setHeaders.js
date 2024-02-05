export default function ({ res }) {
  res?.setHeader(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  )
  res?.setHeader('X-Frame-Options', 'SAMEORIGIN')
  res?.setHeader('X-Content-Type-Options', 'nosniff')
  res?.setHeader('Cache-Control', 'max-age=600, public')
  return res
}
