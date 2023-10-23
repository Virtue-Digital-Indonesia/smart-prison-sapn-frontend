import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// MUIS
import {
  Divider,
  Grid,
  Stack,
  Typography,
  Backdrop,
  IconButton,
  Box,
  CircularProgress,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/system'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUI ICONS
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// SERVICES
import { getFightingNotifications } from 'services/notifications'

// STYLES
import useStyles from './cameraUseStyles'

// UTILS
import {
  setCameraDetailToLocalStorage,
  removeCameraDetailFromLocalStorage,
} from 'utilities/localStorage'

const Camera = (props) => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { auth } = useContext(AllPagesContext)

  const { cameraList } = props

  const [isMediaPlayerActive, setIsMediaPlayerActive] = useState(false)
  const [fightingListNotification, setFightingListNotification] = useState([])

  const handleCameraNameClick = (inputParams) => {
    setCameraDetailToLocalStorage(inputParams)
    navigate(`/camera/detail/${inputParams.id}`)
  }

  // FETCH PRAYING NOTIFICATION LIST DATA
  const getFightingNotificationListData = async (inputSignal, inputToken) => {
    const resultData = await getFightingNotifications(inputSignal, inputToken)

    if (resultData.status === 200) {
      setFightingListNotification(resultData?.data?.data)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    removeCameraDetailFromLocalStorage()
    getFightingNotificationListData(abortController.signal, auth.accessToken)

    return () => {
      abortController.abort()
    }
  }, [])

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
                      onClick={() => handleCameraNameClick(item)}
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
        <Stack
          width='250px'
          height='470px'
          sx={{ backgroundColor: 'white' }}
          position='relative'
        >
          {/* TITLE */}
          <Stack>
            <Stack paddingLeft='20px' height='70px' justifyContent='center'>
              <Typography className={classes.cameraTitle}>
                Perkelahian
              </Typography>
            </Stack>
            <Divider />
          </Stack>

          {/* CONTENT */}
          <Stack sx={{ overflowY: 'auto' }}>
            <Stack paddingBottom='8px'>
              {fightingListNotification.length > 0 ? (
                fightingListNotification.map((item, index) => (
                  <Stack
                    key={index}
                    height='130px'
                    margin='8px'
                    marginBottom={0}
                    sx={{ backgroundColor: 'GrayText', cursor: 'pointer' }}
                    onClick={() =>
                      navigate(`/notification/detail/fighting-${item.id}`)
                    }
                  >
                    <Box
                      component='img'
                      src={`data:image/jpeg;base64,${item.foto}`}
                      height='130px'
                      alt='perkelahian'
                    />
                  </Stack>
                ))
              ) : (
                <Stack
                  width='250px'
                  height='380px'
                  justifyContent='center'
                  alignItems='center'
                >
                  <CircularProgress />
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Stack>

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
