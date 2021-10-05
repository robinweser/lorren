import felaThemeValue from "fela-plugin-theme-value"

const themeValueMapping = {
  color: (theme) => theme.colors,
  background: (theme) => theme.colors,
  backgroundColor: (theme) => theme.colors,
  borderColor: (theme) => theme.colors,
  borderTopColor: (theme) => theme.colors,
  borderBottomColor: (theme) => theme.colors,
  borderLeftColor: (theme) => theme.colors,
  borderRightColor: (theme) => theme.colors,
  textDecorationColor: (theme) => theme.colors,
  stroke: (theme) => theme.colors,
  fill: (theme) => theme.colors
}

const plugin = felaThemeValue(themeValueMapping)

export default function themeValuePlugin(style, theme) {
  return plugin(style, undefined, undefined, { theme })
}