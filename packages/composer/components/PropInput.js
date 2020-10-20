import React, { memo, useRef, useEffect } from 'react'
import { Box } from 'kilvin'

function resize(el) {
  el.style.height = 0 + 'px'
  el.style.height = el.scrollHeight + 10 + 'px'
}

function PropInput({
  type,
  options,
  multiline,
  initial,
  prop,
  empty = true,
  hidden = false,
  step = 1,
  value = '',
  setValue,
}) {
  const inputRef = useRef()

  useEffect(() => {
    if (inputRef.current) {
      resize(inputRef.current)
    }
  }, [])

  if (hidden) {
    return null
  }

  let input

  if (type === 'select') {
    input = (
      <Box as="select" value={value} onChange={(e) => setValue(e.target.value)}>
        {!empty ? null : <Box as="option" value="" />}
        {options.map((option) => (
          <Box as="option" value={option}>
            {option}
          </Box>
        ))}
      </Box>
    )
  } else if (type === 'boolean') {
    input = (
      <Box
        type="checkbox"
        as="input"
        checked={value}
        onChange={() => setValue(!value)}
      />
    )
  } else if (type === 'integer' || type === 'float') {
    input = (
      <Box
        type="number"
        as="input"
        step={step}
        value={value}
        onChange={(e) => setValue(parseFloat(e.target.value))}
      />
    )
  } else if (type === 'unit') {
    const stringValue = value.toString()
    const numberPart = parseInt(stringValue)
    const unit = stringValue.replace(/(\d|[.])+/gi, '') || 'pt'
    const isPureNumber = unit.length === 0

    input = (
      <Box direction="row" space={2}>
        <Box
          type="number"
          as="input"
          grow={1}
          value={numberPart}
          onChange={(e) =>
            setValue(
              e.target.value.length > 0
                ? isPureNumber
                  ? parseInt(e.target.value)
                  : e.target.value + unit
                : undefined
            )
          }
        />
        <Box
          as="select"
          value={unit}
          onChange={(e) => setValue(numberPart + e.target.value)}>
          <option value="pt">pt</option>
          <option value="cm">cm</option>
          <option value="mm">mm</option>
          <option value="in">in</option>
          <option value="%">%</option>
          <option value="vw">vw</option>
          <option value="vh">vh</option>
        </Box>
      </Box>
    )
  } else if (multiline) {
    input = (
      <Box
        as="textarea"
        value={value}
        ref={inputRef}
        style={{ minHeight: 100, resize: 'vertical' }}
        onChange={(e) => {
          resize(e.target)
          setValue(e.target.value)
        }}
      />
    )
  } else {
    input = (
      <Box
        as="input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  }

  return (
    <Box direction="row" alignItems="center">
      <Box basis={170} grow={0}>
        {prop}
      </Box>
      <Box grow={1} justifyContent="center">
        {input}
      </Box>
    </Box>
  )
}

export default memo(
  PropInput,
  (prevProps, props) => prevProps.value === props.value
)
