import React from 'react'
import { Box } from 'kilvin'

export default function Button({
  children,
  variant = 'primary',
  disabled,
  submit = false,
  onClick,
}) {
  return (
    <Box
      as={submit ? 'input' : 'button'}
      type={submit ? 'submit' : undefined}
      value={submit ? children : undefined}
      onClick={onClick}
      paddingLeft={2}
      paddingRight={2}
      paddingTop={1.5}
      paddingBottom={1.7}
      disabled={disabled}
      extend={{
        cursor: 'pointer',
        appearance: 'none',
        fontSize: 14,
        border: 'none',
        borderRadius: 5,
        color: 'white',
        lineHeight: 1,
        ':disabled': {
          backgroundColor: 'rgb(180, 180, 180)',
          cursor: 'not-allowed',
        },
        extend: [
          {
            condition: variant === 'primary' && !disabled,
            style: {
              backgroundColor: 'rgb(16, 146, 201)',
              ':hover': {
                backgroundColor: 'rgb(6, 136, 191)',
              },
              ':active': {
                backgroundColor: 'rgb(0, 126, 181)',
              },
            },
          },
          {
            condition: variant === 'destructive' && !disabled,
            style: {
              backgroundColor: 'rgb(199, 62, 69)',
              ':hover': {
                backgroundColor: 'rgb(189, 52, 59)',
              },
              ':active': {
                backgroundColor: 'rgb(179, 42, 49)',
              },
            },
          },
        ],
      }}>
      {!submit ? children : undefined}
    </Box>
  )
}
