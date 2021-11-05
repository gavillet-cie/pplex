import { formatRawText } from './text'

export const getLabel = (labelName, labels) => {
  const label = labels?.find((it) => it.name === labelName)
  return label ? formatRawText(label.content) : null
}
