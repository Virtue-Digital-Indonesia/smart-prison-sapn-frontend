import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// DUMMY ASSETS
import Foto from 'assets/images/dummy/notif-01.jpg'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// MUIS
import { Box, Button, Divider, Stack, Typography } from '@mui/material/'

// STYLES
import useStyles from './notificationDetailUseStyles'

const NotificationDetail = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const handleButtonClick = () => {
    navigate('/')
  }

  return (
    <Stack className={classes.root}>
      {/* CAMERA */}
      <Stack className={classes.container}>
        <Stack className={classes.notificationTitle}>
          <Stack
            direction='row'
            width='100%'
            alignItems='flex-start'
          >
            <Typography className={classes.title}>Informasi</Typography>
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
        <Stack className={classes.detailContainer}>
          {/* ICON */}
          <Box
            component='img'
            src={Foto}
            alt=''
            className={classes.foto}
          />
          <Stack marginTop={'30px'} direction={'row'}>
            <Stack>
              <Typography
                marginBottom={'20px'}
                fontWeight={'bold'}
              >
                Waktu:
              </Typography>
              <Typography fontWeight={'bold'}>Camera:</Typography>
            </Stack>
            <Stack marginLeft={'200px'}>
              <Typography marginBottom={'20px'}>26-09-2023 16:42:55</Typography>
              <Typography>-</Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default NotificationDetail