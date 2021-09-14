import React, { createElement, memo } from 'react'
import { useTheme, useConfig } from '@lorren-js/core'
import { Box } from 'kilvin'
import { objectReduce, arrayMap } from 'fast-loops'
import { format as formatDateTime } from 'date-fns'
import { shallowEqualArrays, shallowEqualObjects } from 'shallow-equal'

import resolveLorrenTypes from '../src/resolveLorrenTypes'

function renderTree(
  id = '__root',
  parent,
  nodes,
  components,
  selected,
  onSelect,
  collapsed,
  onCollapse,
  clipboard,
  theme,
  config
) {
  const { type, props, children } = nodes[id]
  const component = components[type]

  return (
    <Box
      extend={{
        color: clipboard.id === id ? 'rgb(16, 146, 201)' : undefined,
        opacity: clipboard.id === id && clipboard.cut ? 0.3 : 1,
      }}>
      <Box as="span" direction="row" paddingBottom={1}>
        <Box
          direction="row"
          alignItems="center"
          extend={{
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            fontWeight: selected === id ? 700 : 400,
          }}
          onClick={(e) => {
            e.stopPropagation()
            onSelect(id, parent)
          }}>
          {children.length === 0 ? (
            <Box width={14} />
          ) : (
            <Box
              paddingRight={1}
              width={14}
              extend={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation()
                onCollapse(id)
              }}>
              {collapsed[id] ? '+' : '-'}
            </Box>
          )}
          <Box
            as="span"
            extend={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}>
            {props.__displayName}
          </Box>

          {component.renderTreeInfo ? (
            <Box
              as="span"
              marginLeft={1.5}
              grow={0}
              shrink={1}
              extend={{
                fontSize: 11,
                fontWeight: 400,
                marginTop: 1,
                color: 'rgb(150, 150, 150)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}>
              {component.renderTreeInfo(props, theme)}
            </Box>
          ) : null}
        </Box>
      </Box>
      {collapsed[id] ? null : (
        <Box marginLeft={4}>
          {arrayMap(children, (child) =>
            renderTree(
              child,
              id,
              nodes,
              components,

              selected,
              onSelect,
              collapsed,
              onCollapse,
              clipboard,
              theme,
              config
            )
          )}
        </Box>
      )}
    </Box>
  )
}

const TreeWithThemeAndConfig = memo(
  ({
    parent,
    selected,
    onSelect,
    collapsed,
    onCollapse,
    clipboard,
    nodes,
    components,
    theme,
    config,
  }) =>
    renderTree(
      '__root',
      parent,
      nodes,
      components,
      selected,
      onSelect,
      collapsed,
      onCollapse,
      clipboard,
      theme,
      config
    ),
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

    const collapsedIsEqual = shallowEqualObjects(
      prevProps.collapsed,
      props.collapsed
    )
    // const themeIsEqual = shallowEqualObjects(prevProps.theme, props.theme)
    // const configIsEqual = shallowEqualObjects(prevProps.config, props.config)

    // right now we do not check for theme and config changes
    const isEqual =
      prevProps.parent === props.parent &&
      prevProps.clipboard.id === props.clipboard.id &&
      prevProps.clipboard.cut === props.clipboard.cut &&
      prevProps.selected === props.selected &&
      nodesCountIsEqual &&
      propsAreEqual &&
      childrenAreEqual &&
      collapsedIsEqual

    return isEqual
  }
)

export default function Tree(props) {
  const theme = useTheme()
  const config = useConfig()

  return <TreeWithThemeAndConfig {...props} theme={theme} config={config} />
}
