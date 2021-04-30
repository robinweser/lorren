import { arrayReduce } from 'fast-loops'

import getDefaultProps from './getDefaultProps'

export function createNode(
  type,
  lorrenTypes = {},
  props = {},
  data = {},
  children = []
) {
  const defaultProps = getDefaultProps(lorrenTypes)

  return {
    type,
    data,
    props: {
      __displayName: type || props.__displayName,
      ...defaultProps,
      ...props,
    },
    children,
  }
}

export function addNode(nodes, node, index, parent = '__root') {
  return {
    ...nodes,
    [index]: node,
    [parent]: {
      ...nodes[parent],
      children: [...nodes[parent].children, index],
    },
  }
}

function recursiveAddNode(nodes, node, index, parent) {
  const children = node.children.reduce((children, childId) => {
    const newIndex = index + 1
    index = recursiveAddNode(nodes, nodes[id], newIndex, node.id)

    return [...children, newIndex]
  }, [])

  nodes = addNode(nodes, { ...node, children }, index, parent)
  return index
}

function recurAdd(nodes, node, index, parent) {
  const parentIndex = index
  const children = node.children

  return children.reduce(
    ([newNodes, newIndex], childId) => {
      return recurAdd(
        newNodes,
        { ...newNodes[childId] },
        newIndex + 1,
        parentIndex
      )
    },
    [addNode(nodes, { ...node, children: [] }, index, parent), index]
  )
}

export function copyNode(nodes, node, index, parent = '__root', setId) {
  const [newNodes, newIndex] = recurAdd(nodes, node, index + 1, parent)

  setId(newIndex)
  return newNodes
}

function recursiveRemoveNodes(nodes, nodeId) {
  const cleanedNodes = nodes[nodeId].children.reduce(
    (newNodes, id) => recursiveRemoveNodes(newNodes, id),
    nodes
  )

  return Object.keys(cleanedNodes)
    .filter((id) => id !== nodeId)
    .reduce((newNodes, id) => {
      newNodes[id] = {
        ...cleanedNodes[id],
        children: cleanedNodes[id].children.filter(
          (childId) => childId !== nodeId
        ),
      }
      return newNodes
    }, {})
}

export function removeNode(nodes, nodeId) {
  return recursiveRemoveNodes(nodes, nodeId)
}

export function moveNode(nodes, nodeIndex, oldParent, newParent) {
  if (oldParent === newParent || nodeIndex === '__root') {
    return
  }

  return {
    ...nodes,
    [oldParent]: {
      ...nodes[oldParent],
      children: nodes[oldParent].children.filter(
        (child) => child !== nodeIndex
      ),
    },
    [newParent]: {
      ...nodes[newParent],
      children: [...nodes[newParent].children, nodeIndex],
    },
  }
}

function insertAtIndex(array, element, index) {
  return [
    ...array.slice(0, index),
    element,
    ...array.slice(index, array.length),
  ]
}

export function moveNodeInChildren(nodes, nodeId, parent, index) {
  if (nodes[parent].children.indexOf(nodeId) === -1) {
    return
  }

  return {
    ...nodes,
    [parent]: {
      ...nodes[parent],
      children: insertAtIndex(
        nodes[parent].children.filter((childId) => childId !== nodeId),
        nodeId,
        index
      ),
    },
  }
}

export function updateNodeDataProp(nodes, nodeId, name, prop) {
  return {
    ...nodes,
    [nodeId]: {
      ...nodes[nodeId],
      data: {
        ...nodes[nodeId].data,
        [prop]: name,
      },
    },
  }
}

export function removeNodeDataProp(nodes, nodeId, prop) {
  return {
    ...nodes,
    [nodeId]: {
      ...nodes[nodeId],
      data: Object.keys(nodes[nodeId].data).reduce((newData, dataProp) => {
        if (prop !== dataProp) {
          newData[dataProp] = nodes[nodeId].data[dataProp]
        }
        return newData
      }, {}),
    },
  }
}

export function updateNodeProp(nodes, nodeId, prop, value) {
  console.log(nodeId, prop, value)

  return {
    ...nodes,
    [nodeId]: {
      ...nodes[nodeId],
      props: {
        ...nodes[nodeId].props,
        [prop]: value,
      },
    },
  }
}
