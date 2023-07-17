import {useState} from 'react'

// MUIS
import { Box, Stack, Typography } from '@mui/material'

// STYLES
import useStyles from './optionsUseStyles'

const Options = (props) => {
  const classes = useStyles()

  const {setCameraFilter} = props

  const optionsList = [
    {
      title: 'Semua',
      isActive: true,
    },
    {
      title: 'Sholat',
      isActive: false,
    },
    {
      title: 'Perkelahian',
      isActive: false,
    },
  ]

  const [cameraOptionsListButton, setCameraOptionsListButton] = useState(optionsList)

  const handleCameraOptionButtonClick = (inputItem) => {
    const newList = [...cameraOptionsListButton].map((item) => {
      if(item.title === inputItem.title) item.isActive = true
      else item.isActive = false
  
      return item
    })
    setCameraOptionsListButton(newList)
    setCameraFilter(inputItem.title)
  }

  return (
    <Box>
      <Stack direction='row' className={classes.root}>
        {cameraOptionsListButton.map((item, index) => (
          <Stack
            key={index}
            className={classes.optionsList}
            color= {item.isActive ? 'white' : '#76838f'}
            backgroundColor= {item.isActive ? '#62a8ea' : 'white'}
            onClick={() => handleCameraOptionButtonClick(item)}
          >
            <Typography className={classes.title}>
              {item.title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  )
}

export default Options