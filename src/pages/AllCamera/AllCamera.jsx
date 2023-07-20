import { useState } from 'react'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// DATA DUMMY
import { cameraData } from 'pages/DataDummy'

// MUIS
import { Divider, Grid, Stack, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/system'

// STYLES
import useStyles from './allCameraUseStyles'

const AllCamera = () => {
  const classes = useStyles()

  const [allCameraList, setAllCameraList] = useState(cameraData)

  return (
    <Stack className={classes.root}>
      {/* PAGE TITLE */}
      <Stack>
        <Typography className={classes.pageTitle}>
          Semua Kamera
        </Typography>
      </Stack>
      
      {/* ALL CAMERA */}
      <Stack direction='row' spacing={4} padding='20px 40px'>
        <ThemeProvider
          theme={createTheme({
            breakpoints: {
              values: {
                extraSmall: 0,
                small: 900,
                medium: 1300,
              },
            },
          })}
        >
          <Stack flex={1}>
            <Grid container spacing={3.5}>
              {allCameraList.map((item, index) => (
                <Grid key={index} item extraSmall={12} small={6} medium={4}>
                  <Stack
                    width='100%'
                    maxWidth={{
                      small: '950px',
                      extraSmall: '850px',
                      medium: '750px',
                    }}
                    height='510px'
                    className={classes.container}
                  >
                    <Stack padding='20px 30px'>
                      <Typography className={classes.cameraTitle}>
                        {item.title}
                      </Typography>
                    </Stack>
                    <Divider variant='fullWidth' sx={{ color: '#0000001f' }} />
                    <Stack className={classes.cameraScreen}>Camera</Stack>
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </ThemeProvider>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default AllCamera