import { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'

// ASSETS
import companyLogo from 'assets/logos/sapn-logo.png'
import personLogo from 'assets/logos/person.jpg'

// COLORS
import { colors } from 'constants/colors'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'
import { AllPagesContext } from 'contexts/AllPagesContext'

// STYLES
import useStyles from './appBaruseStyles'

// MUIS
import {
  Avatar,
  Badge,
  Box,
  Button,
  Collapse,
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
// import SettingsIcon from '@mui/icons-material/Settings'
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'

// SERVICES
import {
  getPrayingNotifications,
  getFightingNotifications,
} from 'services/notifications'

// UTILS
import { removeUserProfileFromLocalStorage } from 'utilities/localStorage'

const AppBar = () => {
  const classes = useStyles()

  const {
    isDrawerExpanded,
    setIsDrawerExpanded,
    appTheme,
    prayingListNotificationCounts,
    fightingListNotificationCounts,
  } = useContext(PrivateLayoutContext)
  const { setAuth, auth } = useContext(AllPagesContext)

  const [notificationmMenuAnchor, setNotificationMenuAnchor] = useState(null)
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null)
  const [isPrayingNotificationExpanded, setIsPrayingNotificationExpanded] =
    useState(true)
  const [isFightingNotificationExpanded, setIsFightingNotificationExpanded] =
    useState(true)

  const [prayingListNotification, setPrayingListNotification] = useState([])
  const [isFetchingPrayingDataFailed, setIsFetchingPrayingDataFailed] =
    useState(false)
  const [fightingListNotification, setFightingListNotification] = useState([])
  const [isFetchingFightingDataFailed, setIsFetchingFightingDataFailed] =
    useState(false)

  // HANDE LOG OUT BUTTON
  const handleLogOutButton = () => {
    setAuth({})
    removeUserProfileFromLocalStorage({})
  }

  const navigate = useNavigate()

  // HANDLE NOTIFICATION CLICK
  const handleNotificationClick = (inputParams, inputActivity) => {
    navigate(`/notification/detail/${inputActivity}-${inputParams.id}`)
    setNotificationMenuAnchor(null)
  }

  // LIST NOTIFICATION TOTAL
  let totalNotifications = 0
  if (prayingListNotificationCounts && fightingListNotificationCounts) {
    totalNotifications =
      prayingListNotificationCounts + fightingListNotificationCounts
  }

  // FETCH PRAYING NOTIFICATION LIST DATA
  const getPrayingNotificationListData = async (inputSignal, inputToken) => {
    const resultData = await getPrayingNotifications(inputSignal, inputToken)

    if (resultData.status === 200) {
      setIsFetchingPrayingDataFailed(false)
      setPrayingListNotification(resultData?.data?.data)
    } else {
      setIsFetchingPrayingDataFailed(true)
    }
  }

  // FETCH FIGHTING NOTIFICATION LIST DATA
  const getFightingNotificationListData = async (inputSignal, inputToken) => {
    const resultData = await getFightingNotifications(inputSignal, inputToken)

    if (resultData.status === 200) {
      setIsFetchingFightingDataFailed(false)
      setFightingListNotification(resultData?.data?.data)
    } else {
      setIsFetchingFightingDataFailed(true)
    }
  }

  useEffect(() => {
    const checkIsNotificationShown = Boolean(notificationmMenuAnchor)
    const abortController = new AbortController()

    if (checkIsNotificationShown) {
      getPrayingNotificationListData(abortController.signal, auth.accessToken)
      getFightingNotificationListData(abortController.signal, auth.accessToken)
    } else {
      setPrayingListNotification([])
      setFightingListNotification([])
      setIsPrayingNotificationExpanded(true)
      setIsFightingNotificationExpanded(true)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notificationmMenuAnchor])

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
            <Badge badgeContent={totalNotifications} color='error'>
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
            <Stack width='360px' maxHeight='650px'>
              <Stack borderBottom={`solid 1px ${colors.divider}`}>
                <Typography variant='body2' padding='20px 20px'>
                  NOTIFICATIONS
                </Typography>
              </Stack>

              {/* PRAYING */}
              <Stack>
                <Stack
                  padding='5px 20px'
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  width='100%'
                  sx={{ color: colors.textPrimary, cursor: 'pointer' }}
                  onClick={() =>
                    setIsPrayingNotificationExpanded((prev) => !prev)
                  }
                  borderBottom={`1px solid ${colors.divider}`}
                >
                  <Typography fontWeight={500} fontSize={20}>
                    Shalat
                  </Typography>
                  <KeyboardArrowDownIcon
                    sx={{
                      rotate: isPrayingNotificationExpanded ? '0deg' : '180deg',
                      transition: 'rotate 0.5s',
                    }}
                  />
                </Stack>

                {/* PRAYING LIST NOTIFICATION */}
                {prayingListNotification.length > 0 && (
                  <Collapse in={isPrayingNotificationExpanded}>
                    {prayingListNotification.map((item, index) => (
                      <Stack
                        key={index}
                        className={classes.notifications}
                        onClick={() => handleNotificationClick(item, 'praying')}
                      >
                        <Stack
                          direction='row'
                          className={classes.notificationContainer}
                          borderBottom={`solid 1px ${colors.divider}`}
                        >
                          <MosqueIcon className={classes.sholat} />
                          <Stack paddingLeft={'7px'} margin={'6px 0'}>
                            <Typography>Shalat</Typography>
                            {item.tgl_log ? (
                              <Typography>
                                Waktu:{' '}
                                {moment(item.tgl_log).format(
                                  'YYYY-MM-DD HH:mm:ss'
                                )}{' '}
                                {`(${item.sholat})`}
                              </Typography>
                            ) : (
                              <Typography>Waktu: -</Typography>
                            )}
                            <Typography>Nama: {item.nama}</Typography>
                            <Typography>Camera: {item.camera}</Typography>
                          </Stack>
                        </Stack>
                      </Stack>
                    ))}
                  </Collapse>
                )}
                {isFetchingPrayingDataFailed && (
                  <Stack
                    width='100%'
                    height='80px'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Typography>
                      An error occurred during the API request.
                    </Typography>
                  </Stack>
                )}
              </Stack>

              {/* FIGHTING */}
              <Stack>
                <Stack
                  padding='5px 20px'
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  width='100%'
                  sx={{ color: colors.textPrimary, cursor: 'pointer' }}
                  onClick={() =>
                    setIsFightingNotificationExpanded((prev) => !prev)
                  }
                  borderBottom={`1px solid ${colors.divider}`}
                >
                  <Typography fontWeight={500} fontSize={20}>
                    Perkelahian
                  </Typography>
                  <KeyboardArrowDownIcon
                    sx={{
                      rotate: isFightingNotificationExpanded
                        ? '0deg'
                        : '180deg',
                      transition: 'rotate 0.5s',
                    }}
                  />
                </Stack>

                {/* PRAYING LIST NOTIFICATION */}
                {fightingListNotification.length > 0 && (
                  <Collapse in={isFightingNotificationExpanded}>
                    <Stack>
                      {fightingListNotification.map((item, index) => (
                        <Stack
                          key={index}
                          className={classes.notifications}
                          onClick={() =>
                            handleNotificationClick(item, 'fighting')
                          }
                        >
                          <Stack
                            direction='row'
                            className={classes.notificationContainer}
                            borderBottom={`solid 1px ${colors.divider}`}
                          >
                            <Stack>
                              {item.type === 'Sholat' ? (
                                <MosqueIcon className={classes.sholat} />
                              ) : (
                                <FightingIcon className={classes.perkelahian} />
                              )}
                            </Stack>
                            <Stack paddingLeft={'7px'} margin={'6px 0'}>
                              <Typography>Perkelahian</Typography>
                              <Typography>
                                Waktu:{' '}
                                {moment(item.tgl_log).format(
                                  'YYYY-MM-DD HH:mm:ss'
                                )}
                              </Typography>
                              <Typography>Camera: {item.camera}</Typography>
                            </Stack>
                          </Stack>
                        </Stack>
                      ))}
                    </Stack>
                  </Collapse>
                )}
                {isFetchingFightingDataFailed && (
                  <Stack
                    width='100%'
                    height='80px'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Typography>
                      An error occurred during the API request.
                    </Typography>
                  </Stack>
                )}
              </Stack>
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
