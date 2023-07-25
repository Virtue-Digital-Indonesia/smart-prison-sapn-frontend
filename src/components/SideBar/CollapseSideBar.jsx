import { useNavigate } from 'react-router-dom'

// CONSTANTS
import { colors } from 'constants/colors'

// MUIS
import { Stack, IconButton } from '@mui/material'

// MUI ICONS
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'

const CollapseSideBar = () => {
  const navigate = useNavigate()

  const sideBarItems = [
    {
      title: 'Beranda',
      icon: (
        <HomeIcon
          className='sideBarIcon'
          sx={{
            color: colors.textSecondary,
          }}
        />
      ),
      path: '/',
    },
    {
      title: 'Pengaturan Nilai',
      icon: (
        <DriveFileRenameOutlineOutlinedIcon
          className='sideBarIcon'
          sx={{
            color: colors.textSecondary,
          }}
        />
      ),
      path: '/value-setting',
    },
    {
      title: 'Kamera',
      icon: (
        <VideoCameraFrontIcon
          className='sideBarIcon'
          sx={{
            color: colors.textSecondary,
          }}
        />
      ),
      path: '/camera',
    },
    {
      title: 'Semua Kamera',
      icon: (
        <CircleOutlinedIcon
          className='sideBarIcon'
          sx={{
            color: colors.textSecondary,
          }}
        />
      ),
      path: '/all-camera',
    },
  ]

  return (
    <Stack height='100%' justifyContent='space-between'>
      {/* LIST ICON */}
      <Stack>
        {sideBarItems.map((item, index) => (
          <Stack
            key={index}
            onClick={() => navigate(item.path)}
            height='60px'
            alignItems='center'
            justifyContent='space-between'
            direction='row'
            width='90px'
            zIndex={1}
            sx={{
              cursor: 'pointer',
              ':hover': {
                width: '330px',
              },
              ':hover .sideBarTooltip': {
                display: 'flex',
              },
              ':hover .sideBarIconContainer': {
                backgroundColor: colors.sideBarHover,
              },
              ':hover .sideBarIcon': {
                color: 'white',
              },
            }}
          >
            <Stack
              height='100%'
              width='90px'
              alignItems='center'
              justifyContent='center'
              className='sideBarIconContainer'
            >
              {item.icon}
            </Stack>
            <Stack
              height='100%'
              alignItems='center'
              width='240px'
              justifyContent='center'
              className='sideBarTooltip'
              sx={{
                display: 'none',
                backgroundColor: colors.sideBarHover,
                color: 'white',
              }}
            >
              {item.title}
            </Stack>
          </Stack>
        ))}
      </Stack>

      {/* SETTING BUTTON */}

      <Stack
        width='90px'
        height='76px'
        alignItems='center'
        justifyContent={'center'}
        sx={{
          backgroundColor: colors.backgroundBrown,
          color: colors.textSecondary,
        }}
      >
        <IconButton disableRipple>
          <SettingsIcon sx={{ color: colors.textSecondary }} />
        </IconButton>
      </Stack>
    </Stack>
  )
}

export default CollapseSideBar
