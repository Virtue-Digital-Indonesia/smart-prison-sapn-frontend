// CONSTANTS
import { colors } from 'constants/colors'

// MUIS
import { Stack } from '@mui/material'

// MUI ICONS
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'

// STYLES
import useStyles from './sideBarUseStyles'

const CollapseSideBar = () => {
  const classes = useStyles()

  return (
    <Stack height='100%' justifyContent='space-between'>
      {/* LIST ICON */}
      <Stack
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
          <HomeIcon
            className='sideBarIcon'
            sx={{
              color: colors.textSecondary,
            }}
          />
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
          Beranda
        </Stack>
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
        <SettingsIcon />
      </Stack>
    </Stack>
  )
}

export default CollapseSideBar
