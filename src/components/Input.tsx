import { forwardRef } from 'react'
import { TextField } from '@mui/material'

interface Props {
    name: string,
    placeholder?: string
    type: string,
    label?: string
    id?: string
    dark?: boolean
}

const darkSx = {
  '& .MuiOutlinedInput-root': {
    color: 'rgba(255,255,255,0.9)',
    '& fieldset': {
      borderColor: 'rgba(255,255,255,0.25)',
    },
    '&:hover fieldset': {
      borderColor: 'rgba(255,255,255,0.55)',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#38BDF8',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'rgba(255,255,255,0.45)',
  },
  '& .MuiInputLabel-root.Mui-focused': {
    color: '#38BDF8',
  },
  '& input:-webkit-autofill': {
    WebkitBoxShadow: '0 0 0 100px rgba(15,18,30,0.9) inset',
    WebkitTextFillColor: 'rgba(255,255,255,0.9)',
  },
}

const Input = forwardRef((props: Props, ref) => {
  const { dark, ...rest } = props
  return (
    <TextField
        inputRef={ref}
        fullWidth
        sx={dark ? darkSx : undefined}
        {...rest}
    />
  )
})

export default Input
