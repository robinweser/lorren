import React, { useEffect, useState, useRef, createElement } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import {
  PDFViewer,
  PDFDownloadLink,
  ThemeProvider,
  ConfigProvider,
} from '@lorren-js/core'
import { Box, Spacer } from 'kilvin'
import { arrayMap, objectMap, objectReduce } from 'fast-loops'
import { format as formatDateTime } from 'date-fns'

import {
  createNode,
  addNode,
  removeNode,
  copyNode,
  moveNode,
  updateNodeProp,
  moveNodeInChildren,
  updateNodeDataProp,
  removeNodeDataProp,
} from '../src/actions'
import resolveLorrenTypes from '../src/resolveLorrenTypes'
import getCleanData from '../src/getCleanData'
import getDefaultData from '../src/getDefaultData'
import getDataValues from '../src/getDataValues'
import useDebounce from '../src/useDebounce'

import PropInput from './PropInput'
import Button from './Button'
import Preview from './Preview'
import Tree from './Tree'

export default function Editor({ components, theme = {}, config = {} }) {
  const defaultNodes = {
    __root: createNode(
      'Document',
      resolveLorrenTypes(components.Document.lorrenTypes, theme),
      {},
      {},
      [0]
    ),
    0: createNode(
      'Page',
      resolveLorrenTypes(components.Page.lorrenTypes, theme),
      { __displayName: 'Section' },
      {},
      []
    ),
  }

  const [didMount, setMount] = useState(false)
  const [previewVisible, setPreviewVisible] = useState(true)
  const [timestamp, setTimestamp] = useState(Date.now())
  const [nodes, setNodes] = useState(defaultNodes)
  const [selected, setSelected] = useState(0)
  const [parent, setParent] = useState('__root')
  const [collapsed, setCollapsed] = useState({})
  const [id, setId] = useState(2)
  const [tab, setTab] = useState('preview')
  const [data, setData] = useState({})
  const fileInputRef = useRef()
  const [
    [clipboardNode, clipboardParent, clipboardCut],
    setClipboard,
  ] = useState([undefined, undefined, false])
  const [addData, setAddData] = useState({
    name: '',
    type: 'string',
  })

  useEffect(() => setMount(true), [])

  function addNodeByType(type) {
    const newId = id + 1

    unstable_batchedUpdates(() => {
      setNodes(
        addNode(
          nodes,
          createNode(
            type,
            resolveLorrenTypes(components[type].lorrenTypes, theme),
            { __displayName: components[type].displayName || type }
          ),
          newId,
          selected
        )
      )
      // setParent(selected)
      // setSelected(newId)
      setId(newId)
    })
  }

  const dataValues = getDataValues(data, timestamp)

  const selectedNode = nodes[selected]
  const selectedType = selectedNode.type

  const lorrenTypes = resolveLorrenTypes(
    components[selectedType].lorrenTypes,
    theme
  )

  const usedNodes = useDebounce(nodes, 800)

  return (
    <Box direction="row">
      <Box style={{ height: '100vh', width: '40vw' }}>
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

                  setId(
                    Object.keys(nodes)
                      .filter((id) => id !== '__root')
                      .map((id) => parseInt(id))
                      .sort((a, b) => a < b)[0] + 1
                  )

                  setTimeout(
                    () => {
                      unstable_batchedUpdates(() => {
                        setData(getDefaultData(data))
                        setNodes(nodes)
                      })
                    },

                    0
                  )

                  // setForceUpdate(Math.random());
                } catch (e) {
                  console.log('ERROR LOADING')
                }
              }

              reader.onerror = () => console.log('ERROR READING')
            }
          }}
        />
        <Box
          padding={2}
          space={2}
          direction="row"
          justifyContent="space-between">
          <Box direction="row" space={2}>
            <Button onClick={() => fileInputRef.current.click()}>Open</Button>
            <Button disabled>Restore Last Session</Button>
          </Box>
          <Box direction="row" space={2}>
            <Button
              onClick={() => {
                var element = document.createElement('a')

                element.setAttribute(
                  'href',
                  'data:text/plain;charset=utf-8,' +
                    encodeURIComponent(
                      JSON.stringify({ nodes, data: getCleanData(data) })
                    )
                )

                const d = new Date(timestamp)
                const fileName = [
                  d.getFullYear(),
                  d.getMonth() + 1,
                  d.getDate(),
                  d.getHours(),
                  d.getMinutes(),
                  d.getSeconds(),
                ].join('-')

                element.setAttribute('download', fileName + '.lorren')
                element.style.display = 'none'
                document.body.appendChild(element)
                element.click()
                document.body.removeChild(element)
              }}>
              Download Template
            </Button>
          </Box>
        </Box>
        <Box
          direction="row"
          extend={{
            borderBottom: '1px solid rgb(200, 200, 200)',
          }}>
          <Box
            padding={2}
            paddingTop={2.2}
            grow={1}
            alignItems="center"
            onClick={() => setTab('preview')}
            extend={{
              cursor: 'pointer',
              borderBottom: 'rgb(16, 146, 201)',
              borderBottomWidth: 3,
              borderBottomStyle: tab === 'preview' ? 'solid' : 'none',
              color: tab === 'preview' ? 'rgb(16, 146, 201)' : 'black',
            }}>
            Preview
          </Box>
          <Box
            padding={2}
            paddingTop={2.2}
            grow={1}
            alignItems="center"
            onClick={() => setTab('data')}
            extend={{
              cursor: 'pointer',
              borderBottom: 'rgb(16, 146, 201)',
              borderBottomWidth: 3,
              borderBottomStyle: tab === 'data' ? 'solid' : 'none',
              color: tab === 'data' ? 'rgb(16, 146, 201)' : 'black',
            }}>
            Data
          </Box>
        </Box>
        {tab !== 'preview' ? null : (
          <Box
            padding={2}
            direction="row"
            alignItems="center"
            space={2}
            extend={{
              position: 'fixed',
              bottom: 10,
              left: 10,
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
              zIndex: 1,
            }}>
            <Box
              as="input"
              type="checkbox"
              name="preview-visible"
              id="preview-visible"
              checked={previewVisible}
              onChange={(e) => setPreviewVisible(!previewVisible)}
            />
            <label htmlFor="preview-visible">Show Preview</label>
          </Box>
        )}
        {tab === 'preview' && !previewVisible ? (
          <Box grow={1} extend={{ backgroundColor: 'rgb(220, 220, 220)' }} />
        ) : null}
        {tab !== 'preview' || !didMount || !previewVisible ? null : (
          <PDFViewer
            key={timestamp}
            style={{ height: '100%', width: '100%', border: 0 }}>
            <ThemeProvider theme={theme}>
              <ConfigProvider config={config}>
                <Preview
                  nodes={usedNodes}
                  components={components}
                  data={dataValues}
                />
              </ConfigProvider>
            </ThemeProvider>
          </PDFViewer>
        )}
        {tab !== 'data' ? null : (
          <Box grow={1} extend={{ backgroundColor: 'rgb(240, 240, 240)' }}>
            <Box
              as="form"
              space={2}
              padding={2}
              action="javascript:void(0)"
              onSubmit={(e) => {
                e.preventDefault()

                const { name, default: defaultValue, ...rest } = addData

                if (addData.type === 'select') {
                  setData((data) => ({
                    ...data,

                    [name]: {
                      ...rest,
                      options: defaultValue.split(';'),
                    },
                  }))
                } else {
                  setData((data) => ({
                    ...data,

                    [name]: {
                      ...rest,
                      default: defaultValue,
                      value: defaultValue,
                    },
                  }))
                }
              }}>
              <Box
                as="input"
                placeholder="Name"
                value={addData.name}
                onChange={(e) => {
                  const name = e.target.value

                  if (name.match(/^(\w|-|_)+$/gi)) {
                    setAddData((addData) => ({
                      ...addData,
                      name,
                    }))
                  }
                }}
              />
              <select
                value={addData.type}
                onChange={(e) =>
                  setAddData({
                    ...addData,
                    type: e.target.value,
                    default: '',
                  })
                }>
                <option value="string">String</option>
                <option value="integer">Integer</option>
                <option value="float">Float</option>
                <option value="boolean">Boolean</option>
                <option value="select">Select</option>
                <option value="color">Color</option>
                <option value="date">Date</option>
                <option value="unit">Unit</option>
                <option value="url">URL</option>
                <option value="calculated">Calculated</option>
              </select>

              {addData.type === 'select' ? (
                <PropInput
                  value={addData.default}
                  prop="Options"
                  type="string"
                  setValue={(value) =>
                    setAddData((addData) => ({
                      ...addData,
                      default: value,
                    }))
                  }
                />
              ) : (
                <PropInput
                  value={addData.default}
                  prop="Default"
                  type={addData.type}
                  setValue={(value) =>
                    setAddData((addData) => ({
                      ...addData,
                      default: value,
                    }))
                  }
                />
              )}
              <Button
                submit
                disabled={
                  !addData.name ||
                  addData.name === 'timestamp' ||
                  addData.name === 'pageNumber' ||
                  addData.name === 'totalPages' ||
                  (addData.type === 'select' && addData.default === '')
                }>
                Add
              </Button>
            </Box>
            <Box
              grow={1}
              space={2}
              padding={4}
              extend={{
                backgroundColor: 'white',
                borderTop: '1px solid rgb(200, 200, 200)',
              }}>
              {arrayMap(Object.keys(data), (name) => (
                <Box
                  key={name + data[name].type}
                  direction="row"
                  width="100%"
                  space={3}
                  alignItems="center">
                  <Box grow={1}>
                    <PropInput
                      prop={
                        <Box direction="row" space={1}>
                          <Box as="span">{name}</Box>
                          <Box
                            as="span"
                            extend={{ color: 'rgb(180, 180, 180)' }}>
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
                  </Box>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      setData((data) =>
                        objectReduce(
                          data,
                          (newData, value, key) => {
                            if (key !== name) {
                              newData[key] = data[key]
                            }
                            return newData
                          },
                          {}
                        )
                      )
                    }>
                    Remove
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </Box>
      <Box
        style={{
          height: '100vh',
          width: '60vw',
          borderLeft: '1px solid rgb(200, 200, 200)',
        }}>
        <Box direction="row" padding={2} space={1.5} minHeight={43}>
          {arrayMap(
            Object.keys(components).filter((type) => type !== 'Document'),
            (type) =>
              selectedType &&
              components[type].childOf &&
              components[type].childOf.indexOf(selectedType) === -1 ? null : (
                <Button onClick={() => addNodeByType(type)}>
                  {components[type].displayName || type}
                </Button>
              )
          )}
        </Box>
        <Box
          grow={1}
          shrink={1}
          basis={0}
          paddingLeft={2}
          paddingTop={1}
          paddingBottom={1}
          paddingRight={1}
          extend={{ overflow: 'auto' }}>
          <ThemeProvider theme={theme}>
            <ConfigProvider config={config}>
              <Tree
                nodes={usedNodes}
                components={components}
                parent={parent}
                clipboard={{ id: clipboardNode, cut: clipboardCut }}
                selected={selected}
                onSelect={(id, parent) =>
                  unstable_batchedUpdates(() => {
                    setParent(parent)
                    setSelected(id)
                  })
                }
                collapsed={collapsed}
                onCollapse={(id) =>
                  setCollapsed({
                    ...collapsed,
                    [id]: !collapsed[id],
                  })
                }
              />
            </ConfigProvider>
          </ThemeProvider>
        </Box>
        <Box direction="row" padding={2} space={1.5}>
          <Button
            disabled={
              selected === undefined ||
              selected === '__root' ||
              (parent !== undefined &&
                nodes[parent].children.indexOf(selected) === 0)
            }
            onClick={() =>
              setNodes(
                moveNodeInChildren(
                  nodes,
                  selected,
                  parent,
                  Math.max(0, nodes[parent].children.indexOf(selected) - 1)
                )
              )
            }>
            Up
          </Button>
          <Button
            disabled={
              selected === undefined ||
              selected === '__root' ||
              (parent !== undefined &&
                nodes[parent].children.indexOf(selected) ===
                  nodes[parent].children.length - 1)
            }
            onClick={() =>
              setNodes(
                moveNodeInChildren(
                  nodes,
                  selected,
                  parent,
                  Math.min(
                    nodes[parent].children.length - 1,
                    nodes[parent].children.indexOf(selected) + 1
                  )
                )
              )
            }>
            Down
          </Button>
          <Button
            as="button"
            disabled={selected === undefined || selected === '__root'}
            onClick={() => setClipboard([selected, parent, false])}>
            Copy
          </Button>
          <Button
            disabled={selected === undefined || selected === '__root'}
            onClick={() => setClipboard([selected, parent, true])}>
            Cut
          </Button>
          <Button
            disabled={
              clipboardNode === undefined ||
              (selectedType && components[nodes[clipboardNode].type].childOf
                ? components[nodes[clipboardNode].type].childOf.indexOf(
                    selectedType
                  ) === -1
                : false)
            }
            onClick={() => {
              if (clipboardCut) {
                unstable_batchedUpdates(() => {
                  setNodes(
                    moveNode(nodes, clipboardNode, clipboardParent, selected)
                  )
                  setClipboard([undefined, undefined, false])
                })
              } else {
                setNodes(
                  copyNode(nodes, nodes[clipboardNode], id, selected, setId)
                )
              }
            }}>
            Paste
          </Button>
          <Button
            variant="destructive"
            disabled={selected === undefined || selected === '__root'}
            onClick={() => {
              if (selected === clipboardNode) {
                setClipboard([undefined, undefined, false])
              }

              unstable_batchedUpdates(() => {
                setNodes(removeNode(nodes, selected))
                setSelected(parent)
                setParent(
                  Object.keys(nodes).find(
                    (id) => nodes[id].children.indexOf(parent) !== -1
                  )
                )
              })
            }}>
            Remove
          </Button>
          <Box grow={1} alignItems="flex-end">
            <Button onClick={() => setTimestamp(Date.now())}>Refresh</Button>
          </Box>
        </Box>
        <Box
          grow={1}
          shrink={1}
          basis={0}
          space={2.5}
          padding={2}
          paddingTop={2.5}
          extend={{
            overflow: 'auto',
            borderTop: '1px solid rgb(200, 200, 200)',
            backgroundColor: 'rgb(240, 240, 240)',
          }}>
          <PropInput
            prop="name"
            value={selectedNode.props.__displayName}
            setValue={(newValue) =>
              setNodes((nodes) =>
                updateNodeProp(nodes, selected, '__displayName', newValue)
              )
            }
          />
          {lorrenTypes.hasOwnProperty('debug') && (
            <PropInput
              prop="debug"
              key={'debug' + selected}
              type="boolean"
              value={selectedNode.props.debug || false}
              setValue={(newValue) =>
                setNodes((nodes) =>
                  updateNodeProp(nodes, selected, 'debug', newValue)
                )
              }
            />
          )}

          <Spacer size={3} />
          {arrayMap(
            Object.keys(lorrenTypes).filter((type) => type !== 'debug'),
            (prop) =>
              lorrenTypes[prop].hidden ? null : (
                <PropInput
                  key={prop + selected}
                  {...lorrenTypes[prop]}
                  prop={prop}
                  value={selectedNode.props[prop]}
                  setValue={(newValue) =>
                    setNodes((nodes) =>
                      updateNodeProp(nodes, selected, prop, newValue)
                    )
                  }
                />
              )
          )}
        </Box>
      </Box>
    </Box>
  )
}
