import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// ASSETS
import companyLogo from 'assets/logos/sapn-logo.png'
import personLogo from 'assets/logos/person.jpg'

// COLORS
import { colors } from 'constants/colors'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'
import { AllPagesContext } from 'contexts/AllPagesContext'

// DUMMY
import { Notification } from 'components/AppBar/NotificationDummy'

// STYLES
import useStyles from './appBaruseStyles'

// MUIS
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  Stack,
  Typography,
} from '@mui/material'

// MUI ICONS
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import FightingIcon from '@mui/icons-material/SportsKabaddi'
import MenuIcon from '@mui/icons-material/Menu'
import MosqueIcon from '@mui/icons-material/Mosque'
import NotificationsIcon from '@mui/icons-material/Notifications'
import SettingsIcon from '@mui/icons-material/Settings'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'

// UTILS
import { removeUserProfileFromLocalStorage } from 'utilities/localStorage'

const AppBar = () => {
  const classes = useStyles()

  const { isDrawerExpanded, setIsDrawerExpanded, appTheme } =
    useContext(PrivateLayoutContext)
  const { setAuth, auth } = useContext(AllPagesContext)

  const [notificationmMenuAnchor, setNotificationMenuAnchor] = useState(null)
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null)

  const [notificationList, setNotificationList] = useState(Notification)
  const [notificationNumbers, setNotificationNumbers] = useState(Notification.length)

  const handleLogOutButton = () => {
    setAuth({})
    removeUserProfileFromLocalStorage({})
  }

  const navigate = useNavigate()

  const handleNotificationClick = (inputParams) => {
    // setNotificationDetailToLocalStorage(inputParams)
    // navigate(`/notification/detail/${inputParams.id}`)
    setNotificationMenuAnchor(null)
    navigate('/notification/detail/1')
  }

  return (
    <Stack
      className={classes.root}
      sx={{
        backgroundColor: appTheme.navBarInverse
          ? appTheme?.navbarColor
          : 'unset',
      }}
    >
      {/* COMPANY LOGO */}
      <Stack
        // width={isDrawerExpanded ? '13.3%' : '90px'}
        alignItems={isDrawerExpanded ? 'flex-start' : 'center'}
        justifyContent='center'
        position='relative'
        sx={{
          transition: 'width 0.5s',
          backgroundColor: appTheme?.navbarColor,
          '@media only screen and (max-height: 820px)': {
            width: isDrawerExpanded ? '219px' : '77px',
          },
          '@media only screen and (min-height: 820px)': {
            width: isDrawerExpanded ? '257.5px' : '89.5px',
          },
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          paddingLeft='28px'
          width='100%'
        >
          <Box component='img' src={companyLogo} sx={{ height: '32px' }} />
          {isDrawerExpanded && (
            <Typography marginLeft='6px' sx={{ fontSize: '18px' }}>
              Ditjenpas
            </Typography>
          )}
        </Stack>
      </Stack>

      {/* APP BAR MENU */}
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        padding='0px 15px'
        flex={1}
      >
        {/* EXPAND ICON */}
        <IconButton
          disableRipple
          onClick={() => setIsDrawerExpanded((prev) => !prev)}
        >
          {isDrawerExpanded ? (
            <ArrowBackIcon
              sx={{ color: appTheme.navBarInverse ? 'white' : 'unset' }}
            />
          ) : (
            <MenuIcon
              sx={{ color: appTheme.navBarInverse ? 'white' : 'unset' }}
            />
          )}
        </IconButton>

        {/* NOTIFICATION & PROFILE */}
        <Stack alignItems='center' direction='row' spacing={4}>
          {/* NOTIFICATION LOGO */}
          <IconButton
            onClick={(e) => setNotificationMenuAnchor(e.currentTarget)}
            size='small'
          >
            <Badge badgeContent={notificationNumbers} color='error'>
              <NotificationsIcon
                sx={{
                  color: appTheme.navBarInverse ? 'white' : colors.textPrimary,
                }}
              />
            </Badge>
          </IconButton>

          {/* NOTIFICATION MENU ITEM */}
          <Menu
            anchorEl={notificationmMenuAnchor}
            open={Boolean(notificationmMenuAnchor)}
            onClose={() => setNotificationMenuAnchor(null)}
            className={classes.menuContainer}
          >
            <Stack width='360px'>
              <Stack borderBottom={`solid 1px ${colors.divider}`}>
                <Typography variant='body2' padding='20px 20px'>
                  NOTIFICATIONS
                </Typography>
              </Stack>
              
              <Stack flex={1}>
                {notificationList.map((item, index) => (
                  <Stack
                    key={index}
                    className={classes.notifications}
                    onClick={() => handleNotificationClick(item)}
                  >
                    <Stack
                      direction='row'
                      className={classes.notificationContainer}
                      borderBottom={`solid 1px ${colors.divider}`}>
                      <Stack>
                        {item.type === 'Sholat'?
                          <MosqueIcon className={classes.sholat}/> :
                          <FightingIcon className={classes.perkelahian}/>}
                      </Stack>
                      <Stack paddingLeft={'7px'} margin={'6px 0'}>
                        <Typography>{item.type}</Typography>
                        <Typography>Waktu: {item.waktu}</Typography>
                        <Typography>Camera: {item.camera}</Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                ))}
              </Stack>

              {/* ALL NOTIFICATION */}
              {/*
              <Stack
                padding='15px 20px'
                direction='row'
                justifyContent='space-between'
                alignItems='center'
                sx={{
                  backgroundColor: colors.backgroundGrey,
                  color: colors.textPrimary,
                }}
              >
                <Typography variant='body2'>All notifications</Typography>

                <IconButton disableRipple>
                  <SettingsIcon sx={{ height: '18px' }} />
                </IconButton>
              </Stack>
              */}
            </Stack>
          </Menu>

          {/* ADMINISTRATOR TEXT */}
          <Stack direction='row' alignItems='flex-end'>
            <AccountCircleIcon
              sx={{
                color: appTheme.navBarInverse ? 'white' : colors.textPrimary,
              }}
            />
            <Typography
              marginLeft='6px'
              variant='body2'
              sx={{
                color: appTheme.navBarInverse ? 'white' : colors.textPrimary,
              }}
            >
              {auth?.name} - {auth?.userName}
            </Typography>
          </Stack>

          {/* AVATAR LOGO */}
          <Badge
            overlap='circular'
            variant='dot'
            sx={{ '& .MuiBadge-badge': { backgroundColor: colors.success } }}
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
                cursor: 'pointer',
              }}
              onClick={(e) => {
                setProfileMenuAnchor(e.currentTarget)
              }}
            />
          </Badge>

          {/* PROFILE MENU ITEM */}
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={() => setProfileMenuAnchor(null)}
            className={`no-zoom ${classes.menuContainer}`}
          >
            <Stack width='160px' className='zoom'>
              <Stack padding='8px 20px'>
                <Button
                  sx={{ color: colors.textPrimary, textTransform: 'unset' }}
                  startIcon={<PowerSettingsNewIcon />}
                  onClick={handleLogOutButton}
                >
                  Keluar
                </Button>
              </Stack>
            </Stack>
          </Menu>
        </Stack>
      </Stack>
    </Stack>
  )
}

export default AppBar
