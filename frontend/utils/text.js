import { decode } from 'html-entities'
import { convert } from 'html-to-text'

export const decodeText = (text) => {
  return text ? convert(decode(text)) : ''
}

export const formatRawText = (text) => {
  const find = "'"
  const regex = new RegExp(find, 'g')
  return decode(text || '')
    .replace(regex, '’')
    .split('\n')
    .join('<br>')
}

export const formatHtmlText = (text) => {
  const find = "'"
  const regex = new RegExp(find, 'g')
  return decode(text || '').replace(regex, '’')
}
