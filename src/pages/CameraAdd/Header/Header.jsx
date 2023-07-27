import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// MUIS
import { Box, Breadcrumbs, Button, Stack, Typography } from '@mui/material'

// MUI ICONS
import ArrowBackIcon from '@mui/icons-material/ChevronLeft'
// STYLES
import useStyles from './headerUseStyles'

const Header = (props) => {
  const { breadcrumbList } = props
  const classes = useStyles()

  const location = useLocation()
  const navigate = useNavigate()

  const handleBackButtonClick = () => {
    navigate('/camera')
  }

  return (
    <Stack
      direction='row'
      width='100%'
      justifyContent='space-between'
      alignItems='center'
      padding='0px 40px 24px'
    >
      <Stack>
        {/* PAGE TITLE */}
        <Typography className={classes.pageTitle}>
          Kamera
        </Typography>

        {/* BREADCRUMBS */}
        <Breadcrumbs aria-label='breadcrumb'>
          {breadcrumbList.map((item, index) => (
            <Typography
              key={index}
              underline={index === breadcrumbList.length - 1 ? 'none' : 'hover'}
              onClick={index !== breadcrumbList.length - 1 ? () => navigate(item.path) : null}
              className={
                index === breadcrumbList.length - 1
                  ? `${classes.breadcrumbsText} ${classes.breadcrumbsActive}`
                  : classes.breadcrumbsText
              }
            >
              {item.text}
            </Typography>
          ))}
        </Breadcrumbs>
      </Stack>

      {/* ADD CAMERA BUTTON */}
      <Button
        variant='outlined'
        startIcon={<ArrowBackIcon />}
        size='large'
        className={classes.buttonOutlined}
        onClick={() => handleBackButtonClick()}
      >
        Kembali
      </Button>
    </Stack>
  )
}

export default Header