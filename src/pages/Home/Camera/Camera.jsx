import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// DATA DUMMY
import { cameraData } from 'pages/DataDummy'

// MUIS
import {
  Divider,
  Grid,
  Stack,
  Typography,
  Backdrop,
  IconButton,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/system'

// MUI ICONS
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// STYLES
import useStyles from './cameraUseStyles'

const Camera = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { cameraFilter } = props

  const [cameraList, setCameraList] = useState(cameraData)
  const [isMediaPlayerActive, setIsMediaPlayerActive] = useState(false)

  const handleCameraNameClick = (inputParams) => {
    navigate(`/camera/detail/${inputParams}`)
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
                <Grid key={index} item extraSmall={12} small={6} medium={4}>
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
                    <Stack
                      onClick={() => setIsMediaPlayerActive(true)}
                      className={classes.cameraScreen}
                    >
                      Camera
                    </Stack>
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

      {/* MEDIA PLAYER */}
      <Backdrop
        className={classes.mediaPlayerContainer}
        open={isMediaPlayerActive}
        onClick={(e) => {
          e.stopPropagation()
          setIsMediaPlayerActive(false)
        }}
      >
        <Stack direction='row' width='100%'>
          {/* PREVIOUS BUTTON */}
          <IconButton
            size='large'
            sx={{ marginLeft: '16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <PlayArrowIcon
              fontSize='large'
              sx={{ color: 'white', rotate: '180deg' }}
            />
          </IconButton>

          {/* CONTENT */}
          <Stack flex={1} justifyContent='center' alignItems='center'>
            The image could not be loaded.
          </Stack>

          {/* NEXT BUTTON */}
          <IconButton
            size='large'
            sx={{ marginRight: '16px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <PlayArrowIcon fontSize='large' sx={{ color: 'white' }} />
          </IconButton>
        </Stack>
      </Backdrop>
    </Stack>
  )
}

export default Camera
