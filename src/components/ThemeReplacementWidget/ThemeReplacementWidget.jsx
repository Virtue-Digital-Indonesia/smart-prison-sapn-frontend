import { useState } from 'react'

// COMPONENTS
import SideBarSkins from './SideBarSkins'

// CONSTANTS
import { colors } from 'constants/colors'

//MUIS
import { IconButton, Stack, Tab, Tabs } from '@mui/material'

// MUI ICONS
import SettingsIcon from '@mui/icons-material/Settings'

const ThemeReplacementWidget = () => {
  const [tabValue, setTabValue] = useState(0)
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(false)
  return (
    <Stack
      sx={{
        width: '300px',
        position: 'fixed',
        top: 130,
        right: 0,
        transform: isWidgetExpanded ? 'translateX(0px)' : 'translateX(260px)',
        transition: 'transform 0.5s',
        alignItems: 'flex-end',
      }}
    >
      {/* HEADER */}
      <Stack
        width='100%'
        height='50px'
        sx={{
          backgroundColor: 'white',
          borderTopLeftRadius: '4px',
          borderBottomLeftRadius: '4px',
        }}
        direction='row'
        border='1px solid #00000014'
      >
        {/* ICON */}
        <Stack
          width='50px'
          height='50px'
          alignItems='center'
          justifyContent='center'
        >
          <IconButton
            disableRipple
            onClick={() => setIsWidgetExpanded((prev) => !prev)}
          >
            <SettingsIcon sx={{ color: colors.info }} />
          </IconButton>
        </Stack>
        {/* TABS */}
        <Stack
          width='100%'
          height='50px'
          justifyContent='center'
          alignItems='center'
        >
          <Tabs
            value={tabValue}
            onChange={(event, newValue) => setTabValue(newValue)}
            sx={{ '& .MuiButtonBase-root': { textTransform: 'none' } }}
          >
            <Tab label='Sidebar' />
            <Tab label='Navbar' />
            <Tab label='Primary' />
          </Tabs>
        </Stack>
      </Stack>

      {/* CONTENT */}
      <SideBarSkins />
    </Stack>
  )
}

export default ThemeReplacementWidget
