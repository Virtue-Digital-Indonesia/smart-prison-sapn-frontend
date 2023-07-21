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

      <Stack direction='row' flex={1} width='100%'>
        {/* SIDE BAR */}
        <Sidebar />
        <Stack
          position='relative'
          component='main'
          className='zoom'
          width='100%'
          sx={{
            overflowY: 'scroll',

            '@media only screen and (max-height: 820px)': {
              height: '109vh',
            },
            '@media only screen and (min-height: 820px)': {
              height: '93vh',
            },
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Stack>
  )
}

export default Private
