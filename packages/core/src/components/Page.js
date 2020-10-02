import React, { createContext, useContext } from 'react'
import { Page as BasePage } from '@react-pdf/renderer'

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
