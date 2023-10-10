import { useState } from 'react'

// COMPONENTS
import SideBarSkins from './SideBarSkins'
import NavbarSkins from './NavbarSkins'
import PrimarySkins from './PrimarySkins'

// CONSTANTS
import { colors } from 'constants/colors'

//MUIS
import { IconButton, Stack, Tab, Tabs } from '@mui/material'
import ClickAwayListener from '@mui/base/ClickAwayListener/ClickAwayListener'

// MUI ICONS
import SettingsIcon from '@mui/icons-material/Settings'

const ThemeReplacementWidget = () => {
  const [tabValue, setTabValue] = useState(0)
  const [isWidgetExpanded, setIsWidgetExpanded] = useState(false)

  const getTabContent = () => {
    if (tabValue === 0) return <SideBarSkins />
    else if (tabValue === 1) return <NavbarSkins />
    else if (tabValue === 2) return <PrimarySkins />
  }

  return (
    <ClickAwayListener onClickAway={() => setIsWidgetExpanded(false)}>
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
            alignItems='left'
          >
            <Tabs
              value={tabValue}
              onChange={(event, newValue) => setTabValue(newValue)}
              sx={{ '& .MuiButtonBase-root': { textTransform: 'none' } }}
              variant='fullWidth'
            >
              <Tab label='Sidebar' />
              <Tab label='Navbar' />
              {/* <Tab label='Primary' /> */}
            </Tabs>
          </Stack>
        </Stack>

        {/* CONTENT */}
        {getTabContent()}
      </Stack>
    </ClickAwayListener>
  )
}

export default ThemeReplacementWidget
