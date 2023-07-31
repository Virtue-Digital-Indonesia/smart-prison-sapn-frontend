import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// CONSTANTS
import { colors } from 'constants/colors'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import { Stack, Typography, Fade } from '@mui/material'

// MUI ICONS
import HomeIcon from '@mui/icons-material/Home'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import SettingsIcon from '@mui/icons-material/Settings'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

const ExpandSideBar = () => {
  const textColor = colors.textPrimary
  const navigate = useNavigate()
  const { isDrawerExpanded, appTheme } = useContext(PrivateLayoutContext)

  const menuItems = [
    {
      title: 'Pengaturan Nilai',
      icon: <DriveFileRenameOutlineOutlinedIcon />,
      path: '/value-setting',
    },
    {
      title: 'Kamera',
      icon: <VideoCameraFrontIcon />,
      path: '/camera',
    },
    {
      title: 'Semua Kamera',
      icon: <CircleOutlinedIcon />,
      path: '/all-camera',
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
            <Stack
              key={index}
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
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <Typography variant='body2'>{item.title}</Typography>
            </Stack>
          ))}
        </Stack>
      </Fade>

      {/* SETTINGS */}
      <Fade in={isDrawerExpanded} timeout={2000}>
        <Stack direction='row'>
          {settingItems.map((item, index) => (
            <Stack
              alignItems='center'
              justifyContent='flex-end'
              sx={{
                ':hover .customTooltip': {
                  display: 'flex',
                },
              }}
            >
              {/* TOOLTIP */}
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
    </Stack>
  )
}

export default ExpandSideBar
