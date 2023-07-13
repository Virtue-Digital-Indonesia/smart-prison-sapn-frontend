// COMPONENT
import AppBar from 'components/AppBar/AppBar'
import Sidebar from 'components/SideBar/Sidebar'

// MUIS
import { Stack } from '@mui/material'
import CssBaseline from '@mui/material/CssBaseline'

// STYLES
import useStyles from './privateUseStyles'

const Private = ({ children }) => {
  const classes = useStyles()

  return (
    <Stack className={`${classes.root} no-zoom`}>
      <CssBaseline />

      {/* APP BAR */}
      <AppBar />

      <Stack direction='row' height='100%' width='100%'>
        {/* SIDE BAR */}
        <Sidebar />
        <Stack component='main' className='zoom'>
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Private
