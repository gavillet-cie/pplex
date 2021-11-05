import { decode } from 'html-entities'

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
