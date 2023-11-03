import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// DUMMY ASSETS
import Foto from 'assets/images/dummy/notif-01.jpg'

//COMPONENTS
import Footer from 'components/Footer/Footer'

// MUIS
import { Box, Button, Divider, Stack, Typography } from '@mui/material/'

// SERVICE
import {
  getDetailFightingNotifications,
  getDetailPrayingNotifications,
} from 'services/notifications'

// STYLES
import useStyles from './notificationDetailUseStyles'

const NotificationDetail = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const { id } = useParams()
  const { auth } = useContext(AllPagesContext)

  const [detailNotifications, setDetailNotifications] = useState(null)

  const handleButtonClick = () => {
    navigate('/')
  }

  // GET DETAILS PRAYING NOTIFICATION
  const getDetailPrayingNotificationData = async (
    inputSignal,
    inputToken,
    inputID
  ) => {
    const resultData = await getDetailPrayingNotifications(
      inputSignal,
      inputToken,
      inputID
    )

    if (resultData.status === 200)
      setDetailNotifications(resultData?.data?.data)
  }

  // GET DETAILS FIGHTING NOTIFICATION
  const getDetailFightingNotificationData = async (
    inputSignal,
    inputToken,
    inputID
  ) => {
    const resultData = await getDetailFightingNotifications(
      inputSignal,
      inputToken,
      inputID
    )

    if (resultData.status === 200)
      setDetailNotifications(resultData?.data?.data)
  }

  useEffect(() => {
    const abortController = new AbortController()
    const detailParams = id.split('-')

    if (detailParams && detailParams[0] === 'praying')
      getDetailPrayingNotificationData(
        abortController.signal,
        auth.accessToken,
        detailParams[1]
      )
    else
      getDetailFightingNotificationData(
        abortController.signal,
        auth.accessToken,
        detailParams[1]
      )

    return () => {
      abortController.abort()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  return (
    <Stack className={classes.root}>
      {/* CAMERA */}
      <Stack className={classes.container}>
        <Stack className={classes.notificationTitle}>
          <Stack direction='row' width='100%' alignItems='flex-start'>
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
          {/* PHOTO */}
          <Stack width='100%'>
            <Box
              component='img'
              src={`data:image/jpeg;base64,${detailNotifications?.foto}`}
              alt={id.includes('praying') ? 'shalat' : 'perkelahian'}
              className={classes.foto}
            />
          </Stack>
          <Stack marginTop={'30px'} direction={'row'}>
            <Stack>
              <Typography marginBottom={'20px'} fontWeight={'bold'}>
                Waktu
              </Typography>
              <Typography fontWeight={'bold'}>Camera</Typography>
            </Stack>
            <Stack marginLeft={'200px'}>
              <Typography marginBottom={'20px'}>
                :{' '}
                {moment(detailNotifications?.waktu).format(
                  'YYYY-MM-DD HH:mm:ss'
                )}
              </Typography>
              <Typography>: {detailNotifications?.nama}</Typography>
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
