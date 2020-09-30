import { useContext } from 'react'

import IndexContext from './IndexContext'

export default function useIndex() {
  return useContext(IndexContext)
}
