const baseUrl = 'https://api-pplex.gavillet-cie.com'
export const getImageUrl = (image) => {
  return `${baseUrl}${image.url}`
}
