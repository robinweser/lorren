import React, { createContext, useContext } from 'react'
import { Page as BasePage } from '@lorren/react-pdf-renderer'
import { objectFilter } from 'fast-loops'

import Box from './Box'

export const PageContext = createContext()
export function usePage() {
  return useContext(PageContext)
}

export default function Page(props) {
  return (
    <PageContext.Provider value={props}>
      <Box as={BasePage} {...props} />
    </PageContext.Provider>
  )
}

Page.childOf = ['Document']
Page.displayName = 'Section'
Page.renderTreeInfo = (props, theme, config) =>
  props.size + ' (' + props.orientation + ')'

const blackListProps = [
  'order',
  'position',
  'grow',
  'shrink',
  'basis',
  'height',
  'minHeight',
  'maxHeight',
  'width',
  'minWidth',
  'maxWidth',
  'top',
  'right',
  'left',
  'bottom',
  'break',
  'fixed',
]

const usedBoxTypes = objectFilter(
  Box.lorrenTypes,
  (_, key) => blackListProps.indexOf(key) === -1
)

Page.lorrenTypes = {
  size: {
    type: 'select',
    initial: 'A4',
    options: [
      '4A0',
      '2A0',
      'A0',
      'A1',
      'A2',
      'A3',
      'A4',
      'A5',
      'A6',
      'A7',
      'A8',
      'A9',
      'A10',
      'B0',
      'B1',
      'B2',
      'B3',
      'B4',
      'B5',
      'B6',
      'B7',
      'B8',
      'B9',
      'B10',
      'C0',
      'C1',
      'C2',
      'C3',
      'C4',
      'C5',
      'C6',
      'C7',
      'C8',
      'C9',
      'C10',
      'RA0',
      'RA1',
      'RA2',
      'RA3',
      'RA4',
      'SRA0',
      'SRA1',
      'SRA2',
      'SRA3',
      'SRA4',
      'EXECUTIVE',
      'FOLIO',
      'LEGAL',
      'LETTER',
      'TABLOID',
    ],
  },
  orientation: {
    type: 'select',
    initial: 'portrait',
    options: ['portrait', 'landscape'],
  },
  ruler: {
    type: 'boolean',
    initial: false,
  },
  rulerSteps: {
    type: 'integer',
    initial: 50,
  },
  verticalRulerSteps: {
    type: 'integer',
    initial: 50,
  },
  horizontalRulerSteps: {
    type: 'integer',
    initial: 50,
  },
  verticalRuler: {
    type: 'boolean',
    initial: false,
  },
  horizontalRuler: {
    type: 'boolean',
    initial: false,
  },
  wrap: {
    type: 'boolean',
    initial: true,
  },
  ...usedBoxTypes,
}
