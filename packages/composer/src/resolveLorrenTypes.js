export default function resolveLorrenTypes(lorrenTypes = {}, theme) {
  if (typeof lorrenTypes === 'function') {
    return lorrenTypes(theme)
  }

  return lorrenTypes
}
