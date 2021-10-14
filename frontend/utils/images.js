export const getImageCssStyle = (image) => {
  const x = image?.focus.left || 50
  const y = image?.focus.top || 50
  return {
    objectPosition: `${x}% ${y}%`,
  }
}
