import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// MUIS
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/system'

// STYLES
import useStyles from './cameraUseStyles'

const Camera = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { cameraFilter } = props

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

  const [cameraList, setCameraList] = useState(initialCameraList)

  const handleCameraNameClick = (inputParams) => {
    navigate(
      `/camera/detail/${inputParams}`
    )
  }

  return (
    <Stack>
      <Stack direction='row' spacing={4} padding='20px 40px'>
        {/* LEFT SECTION */}
        <ThemeProvider
          theme={createTheme({
            breakpoints: {
              values: {
                extraSmall: 0,
                small: 1100,
                medium: 1500,
              },
            },
          })}
        >
          <Stack flex={1}>
            <Grid container spacing={3.5}>
              {cameraList.map((item, index) => (
                <Grid item extraSmall={12} small={6} medium={4}>
                  <Stack
                    width='100%'
                    maxWidth={{
                      small: '550px',
                      extraSmall: '500px',
                      medium: '650px',
                    }}
                    height='510px'
                    className={classes.container}
                  >
                    <Stack
                      onClick={() => handleCameraNameClick(item.id)}
                      padding='20px 30px'
                      sx={{
                        ':hover': {
                          textDecoration: 'underline',
                        },
                      }}
                    >
                      <Typography className={classes.cameraTitle}>
                        {item.title}
                      </Typography>
                      <Typography className={classes.cameraType}>
                        {item.type}
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
        {/* RIGH SECTION */}
        <Stack width='250px'>
          <Stack className={classes.perkelahian}>
            <Stack className={classes.perkelahianTitle}>
              <Typography className={classes.cameraTitle}>
                Perkelahian
              </Typography>
            </Stack>
            <Divider variant='fullWidth' />
            <Stack className={classes.perkelahianBottom}></Stack>
          </Stack>
        </Stack>
      </Stack>
      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default Camera
