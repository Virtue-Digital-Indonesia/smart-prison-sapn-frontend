import React from 'react'

// ASSETS
import LogoLapas from 'assets/images/logos/LogoDashboard.svg'

// MUIS
import CircularProgress from '@mui/material/CircularProgress'
import Fade from '@mui/material/Fade'
import Modal from '@mui/material/Modal'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

// STYLES
import useStyles from './loadingSpinnerUseStyles'

const LoadingSpinner = (props) => {
  const { loading } = props
  const classes = useStyles()

  return (
    <Modal disableAutoFocus open={loading}>
      <Fade
        in={loading}
        timeout={{enter: 0, exit: 1500}}
      >
        <Stack className={classes.root}>
          {/* LOGO */}
          {/* <Box component='img' src={LogoLapas} alt='' className={classes.logo} /> */}

          {/* SPINNER */}
          {loading && (
            <Box>
              <CircularProgress disableShrink size='5rem' />
            </Box>
          )}
        </Stack>
      </Fade>
    </Modal>
  )
}

export default LoadingSpinner