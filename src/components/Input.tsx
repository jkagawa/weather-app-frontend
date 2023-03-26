import { forwardRef } from 'react'
import { TextField } from '@mui/material' 

interface Props {
    name: string,
    placeholder?: string
    type: string,
    label?: string
    id?: string
}
const Input = forwardRef((props: Props, ref) => {
  return (
    <TextField
        inputRef={ref}
        fullWidth
        {...props}
    />
  )
})

export default Input