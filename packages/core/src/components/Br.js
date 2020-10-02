import React from 'react'

export default function Br({ children = 1 }) {
  return `\n`.repeat(children)
}
