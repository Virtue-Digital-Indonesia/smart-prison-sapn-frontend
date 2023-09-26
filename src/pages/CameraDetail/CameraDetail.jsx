import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ASSETS
import IconSholat from 'assets/images/icons/sholat.png'
import IconPerkelahian from 'assets/images/icons/fighting.png'
import IconUnknown from 'assets/images/icons/unknown.png'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// MUIS
import { Box, Button, Divider, Stack, Typography } from '@mui/material/'

// STYLES
import useStyles from './cameraDetailUseStyles'

// UTILS
import { readCameraDetailFromLocalStorage } from 'utilities/localStorage'

const CameraDetail = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const cameraDetail = readCameraDetailFromLocalStorage()

  const handleButtonClick = () => {
    navigate('/')
  }

  return (
    <Stack className={classes.root}>
      {/* CAMERA */}
      <Stack className={classes.container}>
        <Stack className={classes.cameraTitle}>
          <Stack
            direction='row'
            width='100%'
            alignItems='flex-start'
          >
            <Typography className={classes.title}>{cameraDetail.nama}</Typography>
          </Stack>
          <Stack
            direction='row'
            alignItems='flex-end'
            justifyContent='center'
            padding='20px 40px'
          >
            <Button
              variant='contained'
              className={classes.button}
              disableElevation
              onClick={() => handleButtonClick()}
            >
              Kembali
            </Button>
          </Stack>
        </Stack>
        <Divider variant='fullWidth' sx={{ color: '#0000001f' }} />
        <Stack className={classes.cameraContainer}>
          <Stack className={classes.camera}></Stack>
        </Stack>
      </Stack>

      {/* LOG */}
      <Stack className={classes.container}>
        <Typography className={classes.title}>Log {cameraDetail.type}</Typography>
        <Divider variant='fullWidth' sx={{ color: '#0000001f' }} />
        <Stack className={classes.logContainer}>
          {/* ICON */}
          <Box
            component='img'
            src={
              cameraDetail.type === 'Sholat' ? IconSholat :
                cameraDetail.type === 'Perkelahian' ? IconPerkelahian:
                  IconUnknown
            }
            alt=''
            className={classes.icon}
          />
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default CameraDetail