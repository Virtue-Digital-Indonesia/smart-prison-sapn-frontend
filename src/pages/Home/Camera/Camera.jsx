import {useState} from 'react'

// MUIS
import {
  Box, Divider, Grid, Stack,
  Typography
} from '@mui/material'

// STYLES
import useStyles from './cameraUseStyles'

const Camera = (props) => {
  const classes = useStyles()

  const {cameraFilter} = props

  const initialCameraList = [
    {
      title: 'SP-NG-KMFD-04',
      type: 'Sholat',
    },
    {
      title: 'SP-NG-KMFD-05',
      type: 'Sholat',
    },
    {
      title: 'SP-NG-KMFD-06',
      type: 'Sholat',
    },
    {
      title: 'SP-NG-KAMMAKS-50',
      type: 'Sholat',
    },
    {
      title: 'SP-NG-KMFD-04',
      type: 'Perkelahian',
    },
    {
      title: 'SP-NG-KMFD-05',
      type: 'Perkelahian',
    },
    {
      title: 'SP-NG-KMFD-06',
      type: 'Perkelahian',
    },
    {
      title: 'SP-NG-KAMMAKS-50',
      type: 'Perkelahian',
    },
  ]

  const [cameraList, setCameraList] = useState(initialCameraList)

  return (
    <Box sx={{ flexGrow: 1 }} className={classes.root}>
      <Grid container>
        {cameraList.map((item, index) => (
          <Grid
            item xs={2} sm={10} md={4.5}
            key={index}
            className={classes.container}
          >
            <Stack className={classes.camera}>
              <Typography className={classes.cameraTitle}>
                {item.title}
              </Typography>
              <Typography className={classes.cameraType}>
                {item.type}
              </Typography>
            </Stack>
            <Divider variant='fullWidth'/>
            <Stack className={classes.cameraScreen}>
              Camera
            </Stack>
          </Grid>
        ))}
      </Grid>
      <Stack className={classes.perkelahian}>
        <Stack className={classes.perkelahianTitle}>
          <Typography className={classes.cameraTitle}>
            Perkelahian
          </Typography>
        </Stack>
        <Divider variant='fullWidth'/>
        <Stack className={classes.perkelahianBottom}>
        </Stack>
      </Stack>
    </Box>
  )
}

export default Camera