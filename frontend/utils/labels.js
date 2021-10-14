export const getLabel = (labelName, labels) => {
  const label = labels?.find((it) => it.name === labelName)
  return label ? label.content : null
}
