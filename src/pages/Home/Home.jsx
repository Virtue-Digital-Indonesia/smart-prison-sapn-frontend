import {useState} from 'react'

//COMPONENTS
import Camera from './Camera/Camera'
import Options from './Options/Options'
import Footer from 'components/Footer/Footer'

// MUIS
import Box from '@mui/material/Box'

// STYLES
import useStyles from './homeUseStyles'

const Home = () => {
  const classes = useStyles()

  const [cameraFilter, setCameraFilter] = useState('Semua')
  console.log(cameraFilter)

  return (
    <Box className={classes.root}>
      {/* OPTIONS */}
      <Options setCameraFilter={setCameraFilter}/>

      {/* CAMERAS */}
      <Camera cameraFilter={cameraFilter}/>

      {/* FOOTER */}
      {/*<Footer/> */}
    </Box>
  )
}

export default Home