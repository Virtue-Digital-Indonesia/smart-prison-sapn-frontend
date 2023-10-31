/* eslint-disable indent */
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// ASSETS
import IconSholat from 'assets/images/icons/sholat.png'
import IconPerkelahian from 'assets/images/icons/fighting.png'
import IconUnknown from 'assets/images/icons/unknown.png'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import { Box, Button, Divider, Stack, Typography } from '@mui/material/'

// SERVICE
import { getLogSholatByID, getLogPerkelahianByID } from 'services/log'

// STYLES
import useStyles from './cameraDetailUseStyles'

// UTILS
import { readCameraDetailFromLocalStorage } from 'utilities/localStorage'

const CameraDetail = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { auth, setLoading } = useContext(AllPagesContext)

  const cameraDetail = readCameraDetailFromLocalStorage()

  const [logList, setLogList] = useState([])

  const handleButtonClick = () => {
    navigate('/')
  }

  const handleLogListClick = (inputItem) => {
    let tempLogType
    if (cameraDetail.type === 'Sholat') tempLogType = 'praying'
    else tempLogType = 'fighting'

    navigate(`/log/detail/${tempLogType}-${inputItem.id}`)
  }

  const getLog = async (inputSignal) => {
    setLoading(true)

    let resultData

    if (cameraDetail.type === 'Sholat'){
      resultData = await getLogSholatByID(
        inputSignal,
        auth?.accessToken,
        cameraDetail.id
      )
    }
    else {
      resultData = await getLogPerkelahianByID(
        inputSignal,
        auth?.accessToken,
        cameraDetail.id
      )
    }

    if (resultData.status === 200 &&
      resultData?.data?.data.length !== 0
    ) {
      const newLogList = resultData?.data?.data?.map((item) => {
        return {
          ...item,
          date: `${moment(item.waktu).format('YYYY-MM-DD HH:mm:ss')} (${item.sholat})`,
          id_event: item.id_profil,
          id_camera: item.camera,
        }
      })
      setLogList(newLogList)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    if (cameraDetail.type === 'Sholat' ||
    cameraDetail.type === 'Perkelahian'
    ){
      getLog(abortController.signal)
    }

    return () => {
      abortController.abort()
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack className={classes.root}>
      {/* CAMERA */}
      <Stack className={classes.container}>
        <Stack className={classes.cameraTitle}>
          <Stack direction='row' width='100%' alignItems='flex-start'>
            <Typography className={classes.title}>
              {cameraDetail.nama}
            </Typography>
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
        <Typography className={classes.title}>
          Log {cameraDetail.type}
        </Typography>
        <Divider variant='fullWidth' sx={{ color: '#0000001f' }} />
        <Stack direction='row' className={classes.logContainer}>
          {/* ICON */}
          <Box
            component='img'
            src={
              cameraDetail.type === 'Sholat'
                ? IconSholat
                : cameraDetail.type === 'Perkelahian'
                ? IconPerkelahian
                : IconUnknown
            }
            alt=''
            className={classes.icon}
          />
          {/* LIST OF LOG */}
          <Stack
            className={classes.logListContainer}
            sx={{
              overflow: logList.length < 6 ? 'auto' : 'hidden'
            }}
          >
            <Stack direction='row' className={classes.sliderPause}>
              <Stack
                direction='row'
                className={
                  logList.length < 6 ? null :
                  classes.logListSlider
                }
              >
                {logList.map((item, index) => (
                  <Stack
                    key={index}
                    className={classes.logList}
                    onClick={() => handleLogListClick(item)}
                  >
                    <Box
                      component='img'
                      src={`data:image/jpeg;base64,${item.foto}`}
                      alt={cameraDetail.type === 'Sholat' ? 'Sholat' : 'Perkelahian'}
                      className={classes.foto}
                    />
                    <Typography marginTop='10px' fontWeight='bold'>
                      {item.nama}
                    </Typography>
                    <Typography marginTop='10px'>{item.date}</Typography>
                    <Typography marginTop='10px'>{item.id_event}</Typography>
                    <Typography marginTop='10px'>{item.id_camera}</Typography>
                  </Stack>
                ))}
              </Stack>
              {logList.length < 6 ? null :
              <Stack direction='row' className={classes.logListSlider}>
                {logList.map((item, index) => (
                  <Stack
                    key={index}
                    className={classes.logList}
                    onClick={() => handleLogListClick(item)}
                  >
                    <Box
                      component='img'
                      src={`data:image/jpeg;base64,${item.foto}`}
                      alt={cameraDetail.type === 'Sholat' ? 'Sholat' : 'Perkelahian'}
                      className={classes.foto}
                    />
                    <Typography marginTop='10px' fontWeight='bold'>
                      {item.nama}
                    </Typography>
                    <Typography marginTop='10px'>{item.date}</Typography>
                    <Typography marginTop='10px'>{item.id_event}</Typography>
                    <Typography marginTop='10px'>{item.id_camera}</Typography>
                  </Stack>
                ))}
              </Stack>
            }
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default CameraDetail
