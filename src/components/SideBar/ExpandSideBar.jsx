// CONSTANTS
import { colors } from 'constants/colors'

// MUIS
import { Stack, Typography } from '@mui/material'

// MUI ICONS
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'

const ExpandSideBar = () => {
  const textColor = colors.textPrimary
  return (
    <Stack width='100%' justifyContent='space-between'>
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
      </Stack>
    </Stack>
  )
}

export default ExpandSideBar
