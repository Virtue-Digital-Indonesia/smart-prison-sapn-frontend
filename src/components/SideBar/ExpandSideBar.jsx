import { useNavigate } from 'react-router-dom'

// CONSTANTS
import { colors } from 'constants/colors'

// MUIS
import { Stack, Typography } from '@mui/material'

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

  const menuItems = [
    {
      title: 'Pengaturan Nilai',
      icon: <DriveFileRenameOutlineOutlinedIcon />,
      path: '/pengaturan-nilai',
    },
    {
      title: 'Kamera',
      icon: <VideoCameraFrontIcon />,
      path: '/kamera',
    },
    {
      title: 'All Camera',
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
          direction='row'
          padding='0px 30px'
          height='38px'
          alignItems='center'
          sx={{
            color: textColor,
            cursor: 'pointer',
            ':hover': {
              backgroundColor: '#2a363c',
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
                backgroundColor: '#2a363c',
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

      {/* SETTINGS */}
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
                backgroundColor: 'black',
                color: colors.white,
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
              width='86px'
              height='76px'
              alignItems='center'
              justifyContent='center'
              color={colors.textPrimary}
              position='relative'
              sx={{
                ':hover': { backgroundColor: '#1e2427' },
                cursor: 'pointer',
                backgroundColor: colors.backgroundBrown,
              }}
            >
              {item.icon}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </Stack>
  )
}

export default ExpandSideBar
