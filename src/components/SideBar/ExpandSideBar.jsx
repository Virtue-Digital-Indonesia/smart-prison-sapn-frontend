import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// CONSTANTS
import { colors } from 'constants/colors'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import { Stack, Typography, Fade, Collapse } from '@mui/material'

// MUI ICONS
import HomeIcon from '@mui/icons-material/Home'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import PersonIcon from '@mui/icons-material/Person'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'

// UTILS
import { removeUserProfileFromLocalStorage } from 'utilities/localStorage'

const ExpandSideBar = () => {
  const textColor = colors.textPrimary
  const navigate = useNavigate()
  const { isDrawerExpanded, appTheme } = useContext(PrivateLayoutContext)
  const { auth, setAuth } = useContext(AllPagesContext)

  const [isSubMenuExpanded, setIsSubMenuExpanded] = useState(false)

  const menuItems = [
    {
      title: 'Pengaturan Nilai',
      isShown: auth?.userAccess?.pengaturan_nilai ?? false,
      icon: <DriveFileRenameOutlineOutlinedIcon />,
      path: '/value-setting',
    },
    {
      title: 'Kamera',
      isShown: auth?.userAccess?.camera ?? false,
      icon: <VideoCameraFrontIcon />,
      path: '/camera',
    },
    {
      title: 'Semua Kamera',
      isShown: auth?.userAccess?.all_camera ?? false,
      icon: <CircleOutlinedIcon />,
      path: '/all-camera',
    },
    {
      title: 'Konfigurasi Pengguna',
      isShown: (auth?.userAccess?.group || auth?.userAccess?.user) ?? false,
      icon: <SettingsSuggestIcon />,
      path: '#',
      hasSubmenu: true,
    },
  ]

  const settingItems = [
    {
      title: 'Settings',
      icon: <SettingsIcon />,
    },
    {
      title: 'Lock',
      icon: <VisibilityOffIcon />,
    },
    {
      title: 'Logout',
      icon: <PowerSettingsNewIcon />,
    },
  ]

  const handleSettingButtonClick = (inputItem) => {
    if (inputItem.title === 'Logout') {
      setAuth({})
      removeUserProfileFromLocalStorage({})
    }
  }

  return (
    <Stack width='100%' justifyContent='space-between' height='100%'>
      {/* LIST MENu */}
      <Fade in={isDrawerExpanded} timeout={2000}>
        <Stack paddingTop='20px'>
          {/* UMUM */}
          <Typography
            variant='body1'
            sx={{ color: textColor, paddingLeft: '24px', marginBottom: '8px' }}
          >
            UMUM
          </Typography>

          {/* BERANDA */}
          <Stack
            onClick={() => navigate('/')}
            direction='row'
            padding='0px 30px'
            height='38px'
            alignItems='center'
            sx={{
              color: textColor,
              cursor: 'pointer',
              ':hover': {
                backgroundColor:
                  appTheme.sideBar === 'dark' ? '#2a363c' : '#3583ca0d',
              },
            }}
            spacing={2}
          >
            <HomeIcon />
            <Typography variant='body2'>Beranda</Typography>
          </Stack>

          {/* NAVIGASI */}
          <Typography
            variant='body1'
            sx={{
              color: textColor,
              paddingLeft: '24px',
              margin: '20px 0px 8px 0px',
            }}
          >
            NAVIGASI
          </Typography>

          {/* MENU ITEMS */}
          {menuItems.map((item, index) => (
            <Stack key={index}>
              {item.isShown && (
                <Stack
                  direction='row'
                  paddingLeft='30px'
                  height='38px'
                  alignItems='center'
                  sx={{
                    color: textColor,
                    cursor: 'pointer',
                    ':hover': {
                      backgroundColor:
                        appTheme.sideBar === 'dark' ? '#2a363c' : '#3583ca0d',
                      color:
                        appTheme.sideBar === 'dark' ? 'white' : colors.info,
                    },
                  }}
                  spacing={2}
                  onClick={() => {
                    if (!item.hasSubmenu) navigate(item.path)
                    else setIsSubMenuExpanded((prev) => !prev)
                  }}
                >
                  {item.icon}
                  <Typography variant='body2'>{item.title}</Typography>
                  {item.hasSubmenu && (
                    <KeyboardArrowRightIcon
                      sx={{
                        rotate: isSubMenuExpanded ? '90deg' : '0 deg',
                        transition: 'rotate 0.5s',
                      }}
                    />
                  )}
                </Stack>
              )}
            </Stack>
          ))}

          {/* SUB MENU CONFIGURATION */}
          <Collapse in={isSubMenuExpanded}>
            {/* KEWENANGAN */}
            {auth?.userAccess?.group && (
              <Stack
                direction='row'
                paddingLeft='30px'
                height='38px'
                alignItems='center'
                onClick={(e) => {
                  e.stopPropagation()
                  navigate('/authority')
                }}
                sx={{
                  color: textColor,
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor:
                      appTheme.sideBar === 'dark' ? '#2a363c' : '#3583ca0d',
                    color: appTheme.sideBar === 'dark' ? 'white' : colors.info,
                  },
                }}
                spacing={2}
              >
                <AccountTreeIcon />
                <Typography variant='body2'>Kewenangan</Typography>
              </Stack>
            )}

            {/* PENGGUNA */}
            {auth?.userAccess?.user && (
              <Stack
                direction='row'
                paddingLeft='30px'
                height='38px'
                alignItems='center'
                onClick={(e) => {
                  e.stopPropagation()
                  navigate('/user')
                }}
                sx={{
                  color: textColor,
                  cursor: 'pointer',
                  ':hover': {
                    backgroundColor:
                      appTheme.sideBar === 'dark' ? '#2a363c' : '#3583ca0d',
                    color: appTheme.sideBar === 'dark' ? 'white' : colors.info,
                  },
                }}
                spacing={2}
              >
                <PersonIcon />
                <Typography variant='body2'>Pengguna</Typography>
              </Stack>
            )}
          </Collapse>
        </Stack>
      </Fade>


      {/* SETTINGS */}
      {/*
      <Fade in={isDrawerExpanded} timeout={2000}>
        <Stack direction='row'>
          {settingItems.map((item, index) => (
            <Stack
              key={index}
              alignItems='center'
              justifyContent='flex-end'
              sx={{
                ':hover .customTooltip': {
                  display: 'flex',
                },
              }}
            >
      */}
      
      {/* TOOLTIP */}
      {/*
              <Stack
                display='none'
                width='70px'
                height='25px'
                sx={{
                  backgroundColor:
                    appTheme.sideBar === 'dark' ? 'black' : '#d5dee1',
                  color:
                    appTheme.sideBar === 'dark'
                      ? colors.white
                      : colors.textPrimary,
                }}
                justifyContent='center'
                alignItems='center'
                borderRadius='4px'
                marginBottom='8px'
                className='customTooltip'
              >
                <Typography variant='caption'>{item.title}</Typography>
              </Stack>
              <Stack
                onClick={() => handleSettingButtonClick(item)}
                key={index}
                width={'86px'}
                height='76px'
                alignItems='center'
                justifyContent='center'
                color={colors.textPrimary}
                position='relative'
                sx={{
                  ':hover': {
                    backgroundColor:
                      appTheme.sideBar === 'dark' ? '#1e2427' : '#d5dee1',
                  },
                  cursor: 'pointer',
                  backgroundColor:
                    appTheme.sideBar === 'dark'
                      ? colors.backgroundBrown
                      : '#e4eaec',
                }}
              >
                {item.icon}
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Fade>
  */}
    </Stack>
  )
}

export default ExpandSideBar
