import React from 'react'

// MUIS
import Stack from '@mui/material/Stack'

// STYLES
import useStyles from './footerUseStyles'

const Footer = () => {
  const classes = useStyles()
  const dynamicYear = new Date().getFullYear()

  return (
    <Stack
      alignItems='center'
      justifyContent='space-between'
      marginTop='10vh'
      position='absolute'
      bottom={0}
      left='45%'
    >
      {/* COPYRIGHT */}
      <Stack className={classes.copyright}>
        © {dynamicYear}. All rights reserved
      </Stack>
    </Stack>
  )
}

export default Footer
