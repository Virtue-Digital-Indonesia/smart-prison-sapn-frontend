import { Stack } from '@mui/material'

// STYLES
import useStyles from './authenticationUseStyles'

const Authentication = ({children}) => {
  const classes = useStyles()
  
  return (
    <Stack className={`${classes.root} no-zoom`}>
      {children}
    </Stack>
  )
}

export default Authentication