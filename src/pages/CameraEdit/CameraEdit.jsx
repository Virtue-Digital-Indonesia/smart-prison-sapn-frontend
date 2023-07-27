import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ASSETS
import IconSholat from 'assets/images/icons/sholat.png'
import IconPerkelahian from 'assets/images/icons/fighting.png'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// MUIS
import { Box, Button, Stack, Typography } from '@mui/material/'

// STYLES
import useStyles from './cameraEditUseStyles'

// DATA DUMMY
import { cameraData } from 'pages/DataDummy'

// ROUTES
import { cameraRoutes } from 'pages/Camera/cameraRoutes'

const CameraEdit = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Header breadcrumbList={[cameraRoutes[0], cameraRoutes[1], cameraRoutes[2]]} />

      {/* EDIT CAMERA */}
      <Stack className={classes.container}>
        <Stack className={classes.pageTitle}>
          <Stack
            width='100%'
            alignItems='flex-start'
          >
            <Typography className={classes.title}>Edit Data Kamera</Typography>
            <Typography className={classes.subtitle}>** Isi kolom di bawah dengan benar</Typography>
          </Stack>
        </Stack>
        <Stack className={classes.cameraContainer}>
          {/* LEFT SECTION */} 
          <Stack className={classes.leftSection}>
            <Typography className={classes.leftSectionText}>Nama Kamera</Typography>
            <Typography className={classes.leftSectionText}>IP</Typography>
            <Typography className={classes.leftSectionText}>Port</Typography>
            <Typography className={classes.leftSectionText}>Status</Typography>
            <Typography className={classes.leftSectionText}>Treshold Perkelahian</Typography>
          </Stack>

          {/* RIGHT SECTION */} 
          <Stack>
            
          </Stack>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default CameraEdit