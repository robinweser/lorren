import React, { createContext, useContext } from 'react'
import { objectMergeDeep } from 'fast-loops'

import ConfigContext from './ConfigContext'
import defaultConfig from './defaultConfig'

export default function ConfigProvider({
  config: customConfig = {},
  children,
}) {
  const config = objectMergeDeep({}, defaultConfig, customConfig)

  return (
    <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
  )
}
