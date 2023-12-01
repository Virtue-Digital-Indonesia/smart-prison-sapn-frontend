import { useState, useEffect, useContext } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import VideoPlayer from 'components/VideoPlayer/VideoPlayer'

// MUIS
import {
  Box,
  Backdrop,
  Divider,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/system'

// MUI ICONS
import PlayArrowIcon from '@mui/icons-material/PlayArrow'

// SERVICES
import { getCameraList } from 'services/camera'

// STYLES
import useStyles from './allCameraUseStyles'

const AllCamera = () => {
  const classes = useStyles()

  const [allCameraList, setAllCameraList] = useState([])
  const [isMediaPlayerActive, setIsMediaPlayerActive] = useState(false)
  const [tempLiveStreamingUrl, setTempLiveStreamingUrl] = useState(null)

  const { auth, setLoading } = useContext(AllPagesContext)

  // GET ALL CAMERA
  const getAllCamera = async (inputSignal) => {
    setLoading(true)

    const queryParams = {
      page: 0,
      size: 100,
    }

    const resultData = await getCameraList(
      inputSignal,
      auth?.accessToken,
      '',
      queryParams
    )

    if (resultData.status === 200) {
      const newCameraList = resultData?.data?.rows?.map((item) => {
        return {
          ...item,
          title: item.nama,
          type: item.status_fight_sholat === 1 ? 'Perkelahian' : 'Sholat',
        }
      })
      setAllCameraList(newCameraList)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  // HANDLE NEXT BUTTON
  const handleNextButton = () => {
    const findIndex = allCameraList.findIndex(
      (item) => item.id === tempLiveStreamingUrl.id
    )

    if (findIndex !== allCameraList.length - 1) {
      setTempLiveStreamingUrl(allCameraList[findIndex + 1])
    }
  }

  // HANDLE PREVIOUS BUTTON
  const handlePreviousButton = () => {
    const findIndex = allCameraList.findIndex(
      (item) => item.id === tempLiveStreamingUrl.id
    )

    if (findIndex !== 0) {
      setTempLiveStreamingUrl(allCameraList[findIndex - 1])
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getAllCamera(abortController.signal)

    return () => {
      abortController.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack className={classes.root}>
      <Stack>
        {/* PAGE TITLE */}
        <Stack>
          <Typography className={classes.pageTitle}>Semua Kamera</Typography>
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
                      <Divider
                        variant='fullWidth'
                        sx={{ color: '#0000001f' }}
                      />
                      {tempLiveStreamingUrl === null && (
                        <Stack className={classes.cameraScreen}>
                          {item.href_link.length > 1 && (
                            <Box
                              position='relative'
                              height='100%'
                              width='100%'
                              display='flex'
                            >
                              <VideoPlayer
                                src={item.href_link}
                                styles={{ width: '100%' }}
                              />

                              {/* IFRAME INSIDE ACTION CLICK */}
                              <Stack
                                position='absolute'
                                top={0}
                                left={0}
                                padding='6px 0px'
                                sx={{ backgroundColor: 'transparent' }}
                                width='100%'
                                height='80%'
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
              <VideoPlayer
                src={tempLiveStreamingUrl?.href_link}
                styles={{ height: '100%' }}
              />
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

export default AllCamera
