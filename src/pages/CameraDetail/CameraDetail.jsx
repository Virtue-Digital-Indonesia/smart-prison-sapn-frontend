import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ASSETS
import IconSholat from 'assets/images/icons/sholat.png'
import IconPerkelahian from 'assets/images/icons/fighting.png'
import IconUnknown from 'assets/images/icons/unknown.png'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// DUMMY ASSETS
import Foto from 'assets/images/dummy/notif-01.jpg'

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

  const logList = [
    {
      id: 1,
      foto: Foto,
      nama: 'Test Test Satu Dua Tiga',
      date: '17-03-2023 14:00.45 (Zuhur)',
      id_event: '480989999',
      id_camera:  'SP-NGKAMFD-04',
    },
    {
      id: 2,
      foto: Foto,
      nama: 'Test Test Satu Dua Tiga',
      date: '17-03-2023 14:00.45 (Zuhur)',
      id_event: '480989999',
      id_camera:  'SP-NGKAMFD-04',
    },
    {
      id: 3,
      foto: Foto,
      nama: 'Test Test Satu Dua Tiga',
      date: '17-03-2023 14:00.45 (Zuhur)',
      id_event: '480989999',
      id_camera:  'SP-NGKAMFD-04',
    },
    {
      id: 4,
      foto: Foto,
      nama: 'Test Test Satu Dua Tiga',
      date: '17-03-2023 14:00.45 (Zuhur)',
      id_event: '480989999',
      id_camera:  'SP-NGKAMFD-04',
    },
    {
      id: 5,
      foto: Foto,
      nama: 'Test Test Satu Dua Tiga',
      date: '17-03-2023 14:00.45 (Zuhur)',
      id_event: '480989999',
      id_camera:  'SP-NGKAMFD-04',
    },
    {
      id: 6,
      foto: Foto,
      nama: 'Test Test Satu Dua Tiga',
      date: '17-03-2023 14:00.45 (Zuhur)',
      id_event: '480989999',
      id_camera:  'SP-NGKAMFD-04',
    },
    {
      id: 7,
      foto: Foto,
      nama: 'Test Test Satu Dua Tiga',
      date: '17-03-2023 14:00.45 (Zuhur)',
      id_event: '480989999',
      id_camera:  'SP-NGKAMFD-04',
    },
    {
      id: 8,
      foto: Foto,
      nama: 'Test Test Satu Dua Tiga',
      date: '17-03-2023 14:00.45 (Zuhur)',
      id_event: '480989999',
      id_camera:  'SP-NGKAMFD-04',
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
        <Stack direction='row' className={classes.logContainer}>
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
          {/* LIST OF LOG */}
          <Stack direction='row' className={classes.logListContainer}>
            {logList.map((item, index) => (
              <Stack key={index} className={classes.logList}>
                <Box
                  component='img'
                  src={item.foto}
                  alt='foto'
                  className={classes.foto}
                />
                <Typography
                  marginTop='10px'
                  fontWeight='bold'
                >
                  {item.nama}
                </Typography>
                <Typography marginTop='10px'>{item.date}</Typography>
                <Typography marginTop='10px'>{item.id_event}</Typography>
                <Typography marginTop='10px'>{item.id_camera}</Typography>
              </Stack>
            ))}
          </Stack>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default CameraDetail