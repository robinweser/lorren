import React, { createContext, useContext } from 'react'

import ConfigContext from './ConfigContext'
import defaultConfig from './defaultConfig'

export default function ConfigProvider({ config = {}, children }) {
  return (
    <ConfigContext.Provider value={{ ...defaultConfig, ...config }}>
      {children}
    </ConfigContext.Provider>
  )
}
