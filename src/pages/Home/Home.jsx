import { useState, useEffect, useContext } from 'react'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

//COMPONENTS
import Camera from './Camera/Camera'
import Options from './Options/Options'
import Footer from 'components/Footer/Footer'

// MUIS
import Box from '@mui/material/Box'

// SERVICES
import { getCameraList } from 'services/camera'

// STYLES
import useStyles from './homeUseStyles'

const Home = () => {
  const classes = useStyles()

  const [cameraFilter, setCameraFilter] = useState('Semua')
  const [cameraList, setCameraList] = useState([])
  const [tempCameraList, setTempCameraList] = useState([])

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
      const newCameraData = resultData?.data?.rows?.map((item) => {
        return {
          ...item,
          title: item.nama,
          type: item.status_fight_sholat === 1 ? 'Perkelahian' : 'Sholat',
        }
      })
      setCameraList(newCameraData)
      setTempCameraList(newCameraData)
      setLoading(false)
    } else {
      setLoading(false)
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
    <Box className={classes.root}>
      <Box>
        {/* OPTIONS */}
        <Options
          cameraFilter={cameraFilter}
          setCameraFilter={setCameraFilter}
          setCameraList={setCameraList}
          tempCameraList={tempCameraList}
        />

        {/* CAMERAS */}
        <Camera cameraList={cameraList} />
      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  )
}

export default Home
