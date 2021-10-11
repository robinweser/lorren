import React, { createElement, useContext, createContext } from 'react'
import { parse } from 'remark'

import { arrayMap } from 'fast-loops'

import Box from './Box'
import Text from './Text'
import Link from './Link'
import Image from './Image'

const ListContext = createContext({ start: 1 })
let lastParagraphEnd

const components = {
  root: ({ children }) => <Box>{children}</Box>,
  paragraph: ({ children }) => <Text intent="body">{children}</Text>,
  heading: ({ depth, children }) => (
    <Text intent={'heading' + depth}>{children}</Text>
  ),
  text: ({ value, position }) => {
    // we determine how many lines lay in between this text and the last paragraph to get the line breaks inbetween
    let breaks = 0
    if (lastParagraphEnd && position.start.line > lastParagraphEnd) {
      breaks = position.start.line - lastParagraphEnd - 1
    }

    lastParagraphEnd = position.end.line

    return '\n'.repeat(breaks) + value
  },
  break: () => '\n',
  emphasis: ({ children }) => <Text fontVariant="italic">{children}</Text>,
  strong: ({ children }) => <Text fontWeight="bold">{children}</Text>,
  listItem: ({ children }) => {
    const context = useContext(ListContext)

    const index = context.start
    if (context.start) {
      context.start += 1
    }

    return (
      <Box direction="row" space={1}>
        <Text>{index ? index + '.' : '-'}</Text>
        <Box>{children}</Box>
      </Box>
    )
  },
  list: ({ ordered, start, children }) => (
    <ListContext.Provider value={{ start: ordered ? start : undefined }}>
      <Box>{children}</Box>
    </ListContext.Provider>
  ),
  link: ({ url }) => <Link src={url} />,
  linkReference: ({ children }) => <Text>{children}</Text>,
  image: ({ alt, url }) => <Image src={url} description={alt} />,
  imageReference: ({ children }) => <Text>{children}</Text>,
}

function renderTree({ type, children = [], ...props }) {
  // extract inline images to be block
  if (type === 'paragraph') {
    const splitted = children
      .reduce(
        (split, child) => {
          if (child.type === 'image') {
            split.push(child)
            split.push([])
            return split
          }

          split[split.length - 1].push(child)
          return split
        },
        [[]]
      )
      .filter((sub) => sub.length > 0 || sub !== undefined)

    return (
      <>
        {splitted.map((split) =>
          split.type === 'image'
            ? renderTree(split)
            : createElement(
                components.paragraph,
                {},
                arrayMap(split, renderTree)
              )
        )}
      </>
    )
  }

  return createElement(components[type], props, arrayMap(children, renderTree))
}

export default function Markdown({ text = '', children = text }) {
  try {
    const nodes = parse(children)
    return renderTree(nodes)
  } catch (e) {
    console.error(`Lorren Rendering: Parsing markdown failed.`)
  }

  return null
}
