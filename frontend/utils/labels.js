import { decode } from 'html-entities'

export const getLabel = (labelName, labels) => {
  const label = labels?.find((it) => it.name === labelName)
  return label ? decode(label.content) : null
}
