//MUIS
import { IconButton, Stack } from '@mui/material'

// MUI ICONS
import SettingsIcon from '@mui/icons-material/Settings'

const ThemeReplacementWidget = () => {
  return (
    <Stack
      width='300px'
      sx={{
        top: 130,
        right: 0,
      }}
      position='fixed'
    >
      {/* HEADER */}
      <Stack
        width='100%'
        height='50px'
        sx={{ backgroundColor: 'green' }}
        direction='row'
        borderRadius='4px'
      >
        {/* ICON */}
        <Stack
          width='35px'
          height='50px'
          alignItems='center'
          justifyContent='center'
        >
          <IconButton disableRipple>
            <SettingsIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default ThemeReplacementWidget
