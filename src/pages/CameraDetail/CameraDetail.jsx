import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ASSETS
import IconSholat from 'assets/images/icons/sholat.png'
import IconPerkelahian from 'assets/images/icons/fighting.png'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// MUIS
import { Box, Button, Divider, Stack, Typography } from '@mui/material/'

// STYLES
import useStyles from './cameraDetailUseStyles'

const CameraDetail = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const initialCameraList = [
    {
      title: 'SP-NG-KMFD-04',
      type: 'Sholat',
      id: 1,
    },
    {
      title: 'SP-NG-KMFD-05',
      type: 'Sholat',
      id: 2,
    },
    {
      title: 'SP-NG-KMFD-06',
      type: 'Sholat',
      id: 3,
    },
    {
      title: 'SP-NG-KAMMAKS-50',
      type: 'Sholat',
      id: 4,
    },
    {
      title: 'SP-NG-KMFD-04',
      type: 'Perkelahian',
      id: 5,
    },
    {
      title: 'SP-NG-KMFD-05',
      type: 'Perkelahian',
      id: 6,
    },
    {
      title: 'SP-NG-KMFD-06',
      type: 'Perkelahian',
      id: 7,
    },
    {
      title: 'SP-NG-KAMMAKS-50',
      type: 'Perkelahian',
      id: 8,
    },
  ]

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
            <Typography className={classes.title}>{initialCameraList[0].title}</Typography>
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
        <Typography className={classes.title}>Log {initialCameraList[0].type}</Typography>
        <Divider variant='fullWidth' sx={{ color: '#0000001f' }} />
        <Stack className={classes.logContainer}>
          {/* ICON */}
          <Box
            component='img'
            src={initialCameraList[0].type === 'Sholat' ? IconSholat : IconPerkelahian}
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