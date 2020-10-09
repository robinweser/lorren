import React, { useEffect, useState, useRef, createElement } from 'react'
import { unstable_batchedUpdates } from 'react-dom'
import { PDFViewer, PDFDownloadLink, ThemeProvider } from '@lorren/core'
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

import PropInput from './PropInput'
import Button from './Button'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay)

    return () => clearTimeout(handler)
  }, [value])

  return debouncedValue
}

function resolveLorrenTypes(lorrenTypes = {}, theme) {
  if (typeof lorrenTypes === 'function') {
    return lorrenTypes(theme)
  }

  return lorrenTypes
}

function injectData(nodeData, data, props) {
  for (let prop in nodeData) {
    if (data.hasOwnProperty(nodeData[prop])) {
      props[prop] = data[nodeData[prop]]
    }
  }

  return props
}

function getCleanData(data) {
  return objectReduce(
    data,
    (cleanData, { value, ...rest }, name) => {
      cleanData[name] = rest
      return cleanData
    },
    {}
  )
}

const supplementDataTypes = {
  url: ['string'],
  integer: ['string', 'float'],
  float: ['string', 'float'],
  date: ['string'],
  color: ['string'],
  unit: ['string'],
}

export default function Editor({ components, theme = {} }) {
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
  const [
    [clipboardNode, clipboardParent, clipboardCut],
    setClipboard,
  ] = useState([undefined, undefined, false])
  const [collapsed, setCollapsed] = useState({})
  const [id, setId] = useState(2)
  const [tab, setTab] = useState('preview')
  const [data, setData] = useState({})
  const [dataProp, setDataProp] = useState('_')
  const [dataBinding, setDataBinding] = useState(undefined)
  const [addData, setAddData] = useState({
    name: '',
    type: 'string',
  })
  const fileInputRef = useRef()

  useEffect(() => setMount(true), [])
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      const dataProp = Object.keys(data)[0]

      setDataProp(dataProp)
      setDataBinding(
        Object.keys(lorrenTypes).filter(
          (prop) =>
            [
              dataTypes[dataProp],
              ...(supplementDataTypes[dataTypes[dataProp]] || []),
            ].indexOf(lorrenTypes[prop].type) !== -1
        )[0]
      )
    }
  }, [data])

  useEffect(() => {
    setDataProp('_')
  }, [selected])

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

  function renderPDF(id = '__root') {
    const { type, props: baseProps, children, data: nodeData } = nodes[id]

    const lorrenTypes = resolveLorrenTypes(components[type].lorrenTypes, theme)

    const props = objectReduce(
      baseProps,
      (props, value, prop) => {
        if (
          lorrenTypes[prop] &&
          lorrenTypes[prop].variable &&
          lorrenTypes[prop].type === 'string'
        ) {
          const resolvedValue = (value || '')
            .toString()
            .replace(/(\{\{([^\}]*)\}\})/gi, (match, _, name) => {
              if (name.indexOf('date') === 0) {
                const [variable, format] = name.substr(5).split(';')

                try {
                  return formatDateTime(
                    new Date(dataValues[variable.trim()] || variable.trim()),
                    format
                  )
                } catch (e) {}
              }

              if (name.indexOf('currency') === 0) {
                const [
                  variable,
                  currency = 'EUR',
                  locale = 'de-DE',
                  thousandSeparator = true,
                ] = name.substr(9).split(';')

                try {
                  const formatter = Intl.NumberFormat(locale, {
                    style: 'currency',
                    useGrouping: thousandSeparator !== 'false',
                    currency: currency,
                  })

                  const value =
                    dataValues[variable.trim()] || parseFloat(variable.trim())

                  return formatter.format(value)
                } catch (e) {}
              }

              return dataValues[name.trim()] || match
            })

          props[prop] = resolvedValue
        } else {
          props[prop] = value
        }

        return props
      },
      {}
    )

    if (
      type === 'Text' &&
      props.fixed &&
      props.text &&
      (props.text.indexOf('pageNumber') !== -1 ||
        text.indexOf('totalPages') !== -1)
    ) {
      props.render = ({ pageNumber, totalPages }) => {
        const dynamicData = {
          pageNumber: pageNumber.toString(),
          totalPages: totalPages ? totalPages.toString() : '',
        }

        return props.text.replace(
          /(\{\{([^\}]*)\}\})/gi,
          (match, _, name) => dynamicData[name.trim()] || match
        )
      }
    }

    return createElement(
      components[type],
      injectData(nodeData, dataValues, props),
      children.length > 0 ? arrayMap(children, renderPDF) : props.children
    )
  }

  function renderTree(id = '__root', parent) {
    const { type, props, children } = nodes[id]
    const component = components[type]

    return (
      <Box
        extend={{
          color: clipboardNode === id ? 'rgb(16, 146, 201)' : undefined,
          opacity: clipboardNode === id && clipboardCut ? 0.3 : 1,
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
              unstable_batchedUpdates(() => {
                setParent(parent)
                setSelected(id)
              })
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
                  setCollapsed({
                    ...collapsed,
                    [id]: !collapsed[id],
                  })
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
            {arrayMap(children, (child) => renderTree(child, id))}
          </Box>
        )}
      </Box>
    )
  }

  const selectedNode = nodes[selected]
  const selectedType = selectedNode.type

  console.log(selectedType)

  const lorrenTypes = resolveLorrenTypes(
    components[selectedType].lorrenTypes,
    theme
  )

  const dataTypes = objectReduce(
    data,
    (types, { type }, prop) => {
      types[prop] = type === 'calculated' ? 'float' : type
      return types
    },
    {}
  )

  dataTypes.timestamp = 'date'

  const dataValues = objectReduce(
    data,
    (values, { type, value }, prop) => {
      if (type === 'calculated') {
        const replacedValue = objectReduce(
          data,
          (replaced, { value }, name) =>
            replaced.replace(new RegExp(name, 'gi'), value),
          value || ''
        )

        try {
          values[prop] = eval(replacedValue)
        } catch (e) {}
      } else {
        values[prop] = value
      }

      return values
    },
    {}
  )

  dataValues.timestamp = timestamp

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
                      setData(
                        Object.keys(data).reduce((newData, name) => {
                          newData[name] = data[name]
                          if (data[name].default) {
                            newData[name].value = data[name].default
                          }

                          return newData
                        }, {})
                      )
                      setNodes(nodes)
                      // setTimeout(() => setForceUpdate(Math.random()), 0);
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

                const d = new Date(Date.now())
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
            {/* { didMount ? (
              <PDFDownloadLink
                key={timestamp}
                style={{ color: 'white', textDecoration: 'none' }}
                document={
                  <ThemeProvider theme={theme}>{renderPDF()}</ThemeProvider>
                }>
                <Button>Download PDF</Button>
              </PDFDownloadLink>
            ) : null} */}
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
        {tab !== 'preview' || !didMount || !previewVisible ? null : (
          <PDFViewer
            key={timestamp}
            style={{ height: '100%', width: '100%', border: 0 }}>
            <ThemeProvider theme={theme}>{renderPDF()}</ThemeProvider>
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

                setData({
                  ...data,

                  [name]: {
                    ...rest,
                    default: defaultValue,
                    value: defaultValue,
                  },
                })
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
                <option value="color">Color</option>
                <option value="date">Date</option>
                <option value="unit">Unit</option>
                <option value="url">URL</option>
                <option value="calculated">Calculated</option>
              </select>

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
              <Button
                submit
                disabled={
                  !addData.name ||
                  addData.name === 'timestamp' ||
                  addData.name === 'pageNumber' ||
                  addData.name === 'totalPages'
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
                  key={name}
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
                      type={data[name].type}
                      value={data[name].value}
                      setValue={(value) =>
                        setData({
                          ...data,
                          [name]: {
                            ...data[name],
                            value,
                          },
                        })
                      }
                    />
                  </Box>
                  <Button
                    variant="destructive"
                    onClick={() =>
                      setData(
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
        <Box direction="row" padding={2} space={1.5}>
          {arrayMap(
            Object.keys(components).filter((type) => type !== 'Document'),
            (type) => (
              <Button
                disabled={
                  selectedType &&
                  components[type].childOf &&
                  components[type].childOf.indexOf(selectedType) === -1
                }
                onClick={() => addNodeByType(type)}>
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
          {renderTree()}
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
          <PropInput
            prop="debug"
            type="boolean"
            value={selectedNode.props.debug}
            setValue={(newValue) =>
              setNodes((nodes) =>
                updateNodeProp(nodes, selected, 'debug', newValue)
              )
            }
          />
          <PropInput
            prop="break"
            type="boolean"
            value={selectedNode.props.break}
            setValue={(newValue) =>
              setNodes((nodes) =>
                updateNodeProp(nodes, selected, 'break', newValue)
              )
            }
          />
          <PropInput
            prop="fixed"
            type="boolean"
            value={selectedNode.props.fixed}
            setValue={(newValue) =>
              setNodes((nodes) =>
                updateNodeProp(nodes, selected, 'fixed', newValue)
              )
            }
          />
          <Spacer size={3} />
          {arrayMap(Object.keys(lorrenTypes), (prop) =>
            lorrenTypes[prop].hidden ? null : (
              <PropInput
                key={prop + selected}
                {...lorrenTypes[prop]}
                disabled={selectedNode.data.hasOwnProperty(prop)}
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
