import React from 'react'

export default function Br({ lines = 1 }) {
  return `\n`.repeat(lines)
}
