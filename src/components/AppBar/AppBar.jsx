import { useState } from 'react'

// ASSETS
import companyLogo from 'assets/logos/sapn-logo.png'
import personLogo from 'assets/logos/person.jpg'

// STYLES
import useStyles from './appBaruseStyles'

// MUIS
import { 
  Avatar ,
  Badge,
  Box, 
  IconButton,
  Menu,
  Stack, 
  Typography
} from '@mui/material'

// MUI ICONS
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import MenuIcon from '@mui/icons-material/Menu'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'

const AppBar = () => {
  const classes = useStyles()

  const [notificationmMenuAnchor, setNotificationMenuAnchor] = useState(null)

  return (
    <Stack className={`zoom ${classes.root}`}>
      {/* COMPANY LOGO */}
      <Stack
        width='90px'
        alignItems='center'
        justifyContent='center'
        position='relative'
      >
        <Box
          component='img'
          src={companyLogo}
          sx={{height: '32px'}}
        />

      </Stack>

      {/* APP BAR MENU */}
      <Stack 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center' 
        padding='0px 15px'
        width='100%'
      >
        {/* EXPAND ICON */}
        <IconButton disableRipple>
          <MenuIcon/>
        </IconButton>

        {/* NOTIFICATION & PROFILE */}
        <Stack
          alignItems='center'
          direction='row'
          spacing={4}
        >
          {/* NOTIFICATION LOGO */}
          <IconButton 
            onClick={(e) => setNotificationMenuAnchor(e.currentTarget)}
            size='small'
          >
            <Badge badgeContent={5} color='error'>
              <NotificationsIcon sx={{color: '#76838f'}}/>
            </Badge>
          </IconButton>

          {/* NOTIFICATION MENU ITEM */}
          <Menu
            anchorEl={notificationmMenuAnchor}
            open={Boolean(notificationmMenuAnchor)}
            onClose={() => setNotificationMenuAnchor(null)}
            className={classes.menuContainer}
          >
            <Stack
              width='360px'
            >
              <Stack borderBottom='solid 1px #e4eaec'>
                <Typography 
                  variant='body2'
                  padding='20px 20px'
                >
                  NOTIFICATIONS
                </Typography>
              </Stack>
              
              <Stack 
                padding='15px 20px'
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{backgroundColor: '#f3f7f9', color: '#76838f'}}
              >
                <Typography variant='body2'>
                  All notifications
                </Typography>

                <IconButton disableRipple>
                  <SettingsIcon sx={{height: '18px'}}/>
                </IconButton>
              </Stack>
            </Stack>
          </Menu>

          {/* ADMINISTRATOR TEXT */}
          <Stack 
            direction='row'
            alignItems='flex-end'
          >
            <AccountCircleIcon sx={{color:'#76838f'}}/>
            <Typography 
              marginLeft='6px'
              variant='body2'
              sx={{color:'#76838f'}}  
            >
              Administrator - admin
            </Typography>

          </Stack>

          {/* AVATAR LOGO */}
          <Badge 
            overlap='circular'
            variant='dot' 
            sx={{'& .MuiBadge-badge' : {backgroundColor: '#46be8a'}}}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
          >
            <Avatar 
              src={personLogo}
              sx={{
                width: '30px', 
                height: '30px',
                cursor: 'pointer'
              }}
            />
          </Badge>

        </Stack>
      </Stack>
    </Stack>
  )
}

export default AppBar