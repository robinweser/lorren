import React, { createElement, memo } from 'react'
import { useTheme, useConfig } from '@lorren-js/core'
import { objectReduce, arrayMap } from 'fast-loops'
import { format as formatDateTime } from 'date-fns'
import { shallowEqualArrays, shallowEqualObjects } from 'shallow-equal'

import resolveLorrenTypes from '../src/resolveLorrenTypes'

function renderPDF(id = '__root', nodes, components, data, theme, config) {
  const { type, props: baseProps, children } = nodes[id]

  const lorrenTypes = resolveLorrenTypes(components[type].lorrenTypes, theme)

  const props = objectReduce(
    baseProps,
    (props, value, prop) => {
      if (
        lorrenTypes[prop] &&
        lorrenTypes[prop].variable &&
        lorrenTypes[prop].type === 'string'
      ) {
        const resolvedValue = (value || '')
          .toString()
          .replace(/(\{\{([^\}]*)\}\})/gi, (match, _, name) => {
            if (name.indexOf('date') === 0) {
              const [variable, format] = name.substr(5).split(';')

              try {
                const trimmed = variable.trim()

                return formatDateTime(
                  new Date(data[trimmed] || trimmed),
                  format
                )
              } catch (e) {}
            }

            if (name.indexOf('currency') === 0) {
              const [
                variable,
                currency = 'EUR',
                locale = 'de-DE',
                thousandSeparator = true,
              ] = name.substr(9).split(';')

              try {
                const formatter = Intl.NumberFormat(locale, {
                  style: 'currency',
                  useGrouping: thousandSeparator !== 'false',
                  currency: currency,
                })
                const trimmed = variable.trim()
                const value = data[trimmed] || parseFloat(trimmed)

                return formatter.format(value)
              } catch (e) {}
            }

            return data[name.trim()] || match
          })

        props[prop] = resolvedValue
      } else {
        props[prop] = value
      }

      return props
    },
    {}
  )

  if (
    type === 'Text' &&
    props.fixed &&
    props.text &&
    (props.text.indexOf('pageNumber') !== -1 ||
      props.text.indexOf('totalPages') !== -1)
  ) {
    props.render = ({ pageNumber, totalPages }) => {
      const dynamicData = {
        pageNumber: pageNumber.toString(),
        totalPages: totalPages ? totalPages.toString() : '',
      }

      return props.text.replace(
        /(\{\{([^\}]*)\}\})/gi,
        (match, _, name) => dynamicData[name.trim()] || match
      )
    }
  }

  return createElement(
    components[type],
    props,
    children.length > 0
      ? arrayMap(children, (child) =>
          renderPDF(child, nodes, components, data, theme, config)
        )
      : props.children
  )
}

const PreviewWithThemeAndConfig = memo(
  ({ nodes, components, data, theme, config }) =>
    renderPDF('__root', nodes, components, data, theme, config),
  (prevProps, props) => {
    const nodesCountIsEqual =
      Object.keys(prevProps.nodes).length === Object.keys(props.nodes).length

    const propsAreEqual = objectReduce(
      prevProps.nodes,
      (isEqual, node, key) =>
        isEqual && shallowEqualObjects(node.props, props.nodes[key].props),
      true
    )

    const childrenAreEqual = objectReduce(
      prevProps.nodes,
      (isEqual, node, key) =>
        isEqual && shallowEqualArrays(node.children, props.nodes[key].children),
      true
    )

    const dataIsEqual = shallowEqualObjects(prevProps.data, props.data)
    // const themeIsEqual = shallowEqualObjects(prevProps.theme, props.theme)
    // const configIsEqual = shallowEqualObjects(prevProps.config, props.config)

    // right now we do not check for theme and config changes
    const isEqual =
      nodesCountIsEqual && propsAreEqual && childrenAreEqual && dataIsEqual

    return isEqual
  }
)

export default function Preview(props) {
  const theme = useTheme()
  const config = useConfig()

  return <PreviewWithThemeAndConfig {...props} theme={theme} config={config} />
}
