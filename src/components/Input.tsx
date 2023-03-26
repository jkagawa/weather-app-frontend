import { forwardRef } from 'react'
import { TextField } from '@mui/material' 

interface Props {
    name: string,
    placeholder: string
    type: string
}
const Input = forwardRef((props: Props, ref) => {
  return (
    <TextField
        variant="outlined"
        margin="normal"
        inputRef={ref}
        fullWidth
        {...props}
    />
  )
})

export default Input