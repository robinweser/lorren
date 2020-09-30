import React, { createContext, useContext, useState, useEffect } from 'react'

import IndexContext from './IndexContext'
import { FILE_END } from './indexTokens'

/**
 * We need to use the special isDone check in order to make sure that the
 * index is fully updated and ready to use
 */
export default function IndexProvider({ onDone, children }) {
  const [isDone, setIsDone] = useState(false)
  const [index, setIndex] = useState([])

  useEffect(() => {
    if (isDone && onDone) {
      onDone(index)
    }
  }, [isDone])

  function addIndex({ type, reference, value }) {
    if (type === FILE_END) {
      setIsDone(true)
      return
    }

    setIndex((prevIndex) => {
      const entry = [type, reference, value]

      return [
        ...prevIndex.filter((e) => !(e[0] === type && e[1] === reference)),
        entry,
      ]
    })
  }

  const api = {
    index,
    addIndex,
  }

  return <IndexContext.Provider value={api}>{children}</IndexContext.Provider>
}
