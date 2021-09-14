import React, { useState, useEffect, useRef } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { Box } from 'kilvin'
import { arrayMap } from 'fast-loops'
import { ThemeProvider, ConfigProvider, PDFViewer } from '@lorren-js/core'

import Button from './Button'
import PropInput from './PropInput'
import Preview from './Preview'

import getDefaultData from '../src/getDefaultData'
import getDataValues from '../src/getDataValues'

export default function Forms({ components, theme = {}, config = {} }) {
  const [step, setStep] = useState(0)
  const [nodes, setNodes] = useState({})
  const [data, setData] = useState()
  const fileInputRef = useRef()

  const dataValues = getDataValues(data)

  return (
    <Box>
      {step === 0 && (
        <Box space={3}>
          <input
            type="file"
            accept=".lorren"
            ref={fileInputRef}
            style={{
              display: 'none',
            }}
            onChange={(e) => {
              var file = e.target.files[0]

              if (file) {
                var reader = new FileReader()
                reader.readAsText(file, 'UTF-8')
                reader.onload = function (e) {
                  try {
                    const { nodes, data } = JSON.parse(e.target.result)

                    setTimeout(
                      () => {
                        unstable_batchedUpdates(() => {
                          setData(getDefaultData(data))
                          setNodes(nodes)
                          setStep(1)
                        })
                      },

                      0
                    )
                  } catch (e) {
                    console.log('ERROR LOADING')
                  }
                }

                reader.onerror = () => console.log('ERROR READING')
              }
            }}
          />
          <Button onClick={() => fileInputRef.current.click()}>Open</Button>
        </Box>
      )}
      {step === 1 && (
        <Box space={4}>
          <Box grow={1} space={2}>
            {arrayMap(Object.keys(data), (name) => (
              <PropInput
                prop={
                  <Box direction="row" space={1}>
                    <Box as="span">{name}</Box>
                    <Box as="span" extend={{ color: 'rgb(180, 180, 180)' }}>
                      ({data[name].type})
                    </Box>
                  </Box>
                }
                {...data[name]}
                type={data[name].type}
                value={data[name].value}
                setValue={(value) =>
                  setData((data) => ({
                    ...data,
                    [name]: {
                      ...data[name],
                      value,
                    },
                  }))
                }
              />
            ))}
          </Box>
          <Button onClick={() => setStep(2)}>Next</Button>
        </Box>
      )}
      {step === 2 && (
        <Box
          style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0 }}>
          <PDFViewer style={{ height: '100%', width: '100%', border: 0 }}>
            <ThemeProvider theme={theme}>
              <ConfigProvider config={config}>
                <Preview
                  components={components}
                  nodes={nodes}
                  data={dataValues}
                />
              </ConfigProvider>
            </ThemeProvider>
          </PDFViewer>
        </Box>
      )}
    </Box>
  )
}
