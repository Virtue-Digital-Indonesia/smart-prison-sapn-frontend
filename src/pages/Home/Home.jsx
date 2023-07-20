import { useState } from 'react'

//COMPONENTS
import Camera from './Camera/Camera'
import Options from './Options/Options'

// MUIS
import Box from '@mui/material/Box'

// STYLES
import useStyles from './homeUseStyles'

const Home = () => {
  const classes = useStyles()

  const [cameraFilter, setCameraFilter] = useState('Semua')

  return (
    <Box className={classes.root}>
      {/* OPTIONS */}
      <Options setCameraFilter={setCameraFilter} />

      {/* CAMERAS */}
      <Camera cameraFilter={cameraFilter} />
    </Box>
  )
}

export default Home
