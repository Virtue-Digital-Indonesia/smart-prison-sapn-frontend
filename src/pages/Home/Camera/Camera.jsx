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

// COMPONENTS
import VideoPlayer from 'components/VideoPlayer/VideoPlayer'
import BackdropVideoPlayer from 'components/BackdropVideoPlayer/BackdropVideoPlayer'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUI ICONS
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// SERVICES
import { getLastNotificationImages } from 'services/notifications'

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
  const [tempLiveStreamingUrl, setTempLiveStreamingUrl] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [
    isFetchingListNotificationFailed,
    setIsFetchingListNotificationFailed,
  ] = useState(false)

  const handleCameraNameClick = (inputParams) => {
    setCameraDetailToLocalStorage(inputParams)
    navigate(`/camera/detail/${inputParams.id}`)
  }

  // FETCH LAST FIGHTING LIST DATA
  const getFightingNotificationListData = async (inputSignal, inputToken) => {
    setIsLoading(true)
    const resultData = await getLastNotificationImages(inputSignal, inputToken)

    if (resultData.status === 200) {
      setFightingListNotification(resultData?.data?.data)
      setIsLoading(false)
    } else {
      setIsFetchingListNotificationFailed(true)
      setIsLoading(false)
    }
  }

  // HANDLE NEXT BUTTON
  const handleNextButton = () => {
    const findIndex = cameraList.findIndex(
      (item) => item.id === tempLiveStreamingUrl.id
    )

    if (findIndex !== cameraList.length - 1) {
      setTempLiveStreamingUrl(cameraList[findIndex + 1])
    }
  }

  // HANDLE PREVIOUS BUTTON
  const handlePreviousButton = () => {
    const findIndex = cameraList.findIndex(
      (item) => item.id === tempLiveStreamingUrl.id
    )

    if (findIndex !== 0) {
      setTempLiveStreamingUrl(cameraList[findIndex - 1])
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    removeCameraDetailFromLocalStorage()
    getFightingNotificationListData(abortController.signal, auth.accessToken)

    return () => {
      abortController.abort()
      setIsFetchingListNotificationFailed(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                    {/* HIDE THE VIDEO PLAYER WHEN BACKDROP IS OPENED */}
                    {tempLiveStreamingUrl === null && (
                      <Stack className={classes.cameraScreen}>
                        {item.href_link.length > 1 && (
                          <Box
                            position='relative'
                            height='100%'
                            width='100%'
                            overflow='hidden'
                            display='flex'
                          >
                            <VideoPlayer
                              src={item.href_link}
                              styles={{ width: '100%' }}
                            />

                            {/* VIDEO INSIDE ACTION CLICK */}
                            <Stack
                              position='absolute'
                              top={0}
                              left={0}
                              padding='6px 0px'
                              sx={{ backgroundColor: 'transparent' }}
                              width='100%'
                              height='100%'
                              onClick={(e) => {
                                e.stopPropagation()
                                setTempLiveStreamingUrl(item)
                                setIsMediaPlayerActive(true)
                              }}
                            />
                          </Box>
                        )}

                        {item.href_link.length < 1 && (
                          <Typography>Media not found</Typography>
                        )}
                      </Stack>
                    )}
                  </Stack>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </ThemeProvider>

        {/* RIGH SECTION */}
        <Stack
          width='250px'
          height='493px'
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
              {fightingListNotification.map((item, index) => (
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
              ))}

              {isLoading && (
                <Stack
                  width='250px'
                  height='380px'
                  justifyContent='center'
                  alignItems='center'
                >
                  <CircularProgress />
                </Stack>
              )}

              {isFetchingListNotificationFailed && (
                <Stack
                  width='250px'
                  height='380px'
                  justifyContent='center'
                  alignItems='center'
                  paddingLeft='12px'
                >
                  <Typography>
                    An error occurred during the API request.
                  </Typography>
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
          setTempLiveStreamingUrl(null)
        }}
      >
        <Stack direction='row' width='80%' height='80%' alignItems='center'>
          {/* PREVIOUS BUTTON */}
          {/* <IconButton
            size='large'
            sx={{ margin: '0px 16px', height: '60px' }}
            onClick={(e) => {
              e.stopPropagation()
              handlePreviousButton()
            }}
          >
            <PlayArrowIcon
              fontSize='large'
              sx={{ color: 'white', rotate: '180deg' }}
            />
          </IconButton> */}

          {/* CONTENT */}
          <Stack
            flex={1}
            justifyContent='center'
            alignItems='center'
            height='100%'
            sx={{ backgroundColor: 'white' }}
            overflow='hidden'
            width='80%'
          >
            {tempLiveStreamingUrl?.href_link.length > 0 && (
              <BackdropVideoPlayer src={tempLiveStreamingUrl?.href_link} />
            )}
          </Stack>

          {/* NEXT BUTTON */}
          {/* <IconButton
            size='large'
            sx={{ margin: '0px 16px', height: '60px' }}
            onClick={(e) => {
              e.stopPropagation()
              handleNextButton()
            }}
          >
            <PlayArrowIcon fontSize='large' sx={{ color: 'white' }} />
          </IconButton> */}
        </Stack>
      </Backdrop>
    </Stack>
  )
}

export default Camera
