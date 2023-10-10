import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// CONSTANTS
import { colors } from 'constants/colors'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import { Stack, IconButton, Typography } from '@mui/material'

// MUI ICONS
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'
import VideoCameraFrontIcon from '@mui/icons-material/VideoCameraFront'
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import PersonIcon from '@mui/icons-material/Person'

const CollapseSideBar = () => {
  const navigate = useNavigate()
  const { appTheme } = useContext(PrivateLayoutContext)
  const { auth } = useContext(AllPagesContext)

  const sideBarItems = [
    {
      title: 'Beranda',
      isShown: true,
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
      isShown: auth?.userAccess?.pengaturan_nilai ?? false,
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
      isShown: auth?.userAccess?.camera ?? false,
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
      isShown: auth?.userAccess?.all_camera ?? false,
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
    {
      title: 'Konfigurasi Pengguna',
      isShown: (auth?.userAccess?.group || auth?.userAccess?.user) ?? false,
      hasSubmenu: true,
      icon: (
        <SettingsSuggestIcon
          className='sideBarIcon'
          sx={{
            color: colors.textSecondary,
          }}
        />
      ),
      path: '#',
    },
  ]

  return (
    <Stack height='100%' justifyContent='space-between'>
      {/* LIST ICON */}
      <Stack>
        {sideBarItems.map((item, index) => (
          <Stack key={index}>
            {item.isShown && (
              <Stack
                onClick={() => {
                  if (!item.hasSubmenu) navigate(item.path)
                  else navigate('#')
                }}
                height='60px'
                alignItems={item.hasSubmenu ? 'flex-start' : 'center'}
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
                    backgroundColor:
                      appTheme.sideBar === 'dark'
                        ? colors.sideBarHover
                        : '#e4eaec',
                  },
                  ':hover .sideBarIcon': {
                    color: appTheme.sideBar === 'dark' ? 'white' : colors.info,
                  },
                }}
              >
                {/* ICON */}
                <Stack
                  height='100%'
                  width='90px'
                  alignItems='center'
                  justifyContent='center'
                  className='sideBarIconContainer'
                >
                  {item.icon}
                </Stack>

                {/* TITLE ON HOVER */}
                <Stack
                  height={item.hasSubmenu ? 'auto' : '60px'}
                  alignItems='center'
                  width='240px'
                  justifyContent={item.hasSubmenu ? 'flex-start' : 'center'}
                  className='sideBarTooltip'
                  sx={{
                    display: 'none',
                    backgroundColor:
                      appTheme.sideBar === 'dark'
                        ? colors.sideBarHover
                        : '#e4eaec',
                    color: appTheme.sideBar === 'dark' ? 'white' : colors.info,
                  }}
                >
                  {item.hasSubmenu ? (
                    <>
                      {/* TITLE */}
                      <Stack>
                        <Stack
                          height='60px'
                          justifyContent='center'
                          marginLeft='35px'
                        >
                          {item.title}
                        </Stack>
                        {/* KEWENANGAN */}
                        {auth?.userAccess?.group && (
                          <Stack
                            height='50px'
                            direction='row'
                            alignItems='center'
                            width='240px'
                            spacing={1}
                            paddingLeft='35px'
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate('/authority')
                            }}
                            sx={{
                              color: '#76838fe6',
                              backgroundColor:
                                appTheme.sideBar === 'dark'
                                  ? colors.backgroundBrown
                                  : '#f1f4f5',
                              ':hover': {
                                color:
                                  appTheme.sideBar === 'dark'
                                    ? 'white'
                                    : colors.info,
                                backgroundColor:
                                  appTheme.sideBar === 'dark'
                                    ? colors.sideBarHover
                                    : '#e4eaec',
                              },
                            }}
                          >
                            <AccountTreeIcon />
                            <Typography>Kewenangan</Typography>
                          </Stack>
                        )}

                        {/* PENGGUNA */}
                        {auth?.userAccess?.user && (
                          <Stack
                            height='50px'
                            direction='row'
                            alignItems='center'
                            width='240px'
                            spacing={1}
                            paddingLeft='35px'
                            onClick={(e) => {
                              e.stopPropagation()
                              navigate('/user')
                            }}
                            sx={{
                              color: '#76838fe6',
                              backgroundColor:
                                appTheme.sideBar === 'dark'
                                  ? colors.backgroundBrown
                                  : '#f1f4f5',
                              ':hover': {
                                color:
                                  appTheme.sideBar === 'dark'
                                    ? 'white'
                                    : colors.info,
                                backgroundColor:
                                  appTheme.sideBar === 'dark'
                                    ? colors.sideBarHover
                                    : '#e4eaec',
                              },
                            }}
                          >
                            <PersonIcon />
                            <Typography>Pengguna</Typography>
                          </Stack>
                        )}
                      </Stack>
                    </>
                  ) : (
                    item.title
                  )}
                </Stack>
              </Stack>
            )}
          </Stack>
        ))}
      </Stack>

      {/* SETTING BUTTON */}

      {/*
      <Stack
        width='90px'
        height='76px'
        alignItems='center'
        justifyContent={'center'}
        sx={{
          backgroundColor:
            appTheme.sideBar === 'dark' ? colors.backgroundBrown : '#e4eaec',
          color: colors.textSecondary,
        }}
      >
        <IconButton disableRipple>
          <SettingsIcon sx={{ color: colors.textSecondary }} />
        </IconButton>
      </Stack>
      */}
    </Stack>
  )
}

export default CollapseSideBar
