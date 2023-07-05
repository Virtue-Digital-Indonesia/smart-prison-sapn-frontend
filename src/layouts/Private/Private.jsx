// COMPONENT
import AppBar from 'components/AppBar/AppBar'

// MUIS
import { Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

// STYLES
import useStyles from './privateUseStyles'

const Private = ({children}) => {
  const classes = useStyles()

  return (
    <Stack className={`${classes.root} no-zoom`}>
      <CssBaseline/>

      {/* APP BAR */}
      <AppBar/>

      <Stack component='main'>
        {children}
      </Stack>
      
    </Stack>
  )
}

export default Private