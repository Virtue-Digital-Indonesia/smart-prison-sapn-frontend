import { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ASSETS
import LogoLapas from 'assets/images/logos/LogoDashboard.svg'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUI ICONS
import IconVisibility from '@mui/icons-material/Visibility'
import IconVisibilityOff from '@mui/icons-material/VisibilityOff'

// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Fade from '@mui/material/Fade'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

// SERVICE
import { postSignInUser, getUserInformation } from 'services/auth'

// STYLES
import useStyles from './signInUseStyles'

// UTILS
import { setUserProfileToLocalStorage } from 'utilities/localStorage'

const SignIn = () => {
  const classes = useStyles()
  const navigate = useNavigate()

  const { setAuth, setSnackbarObject } = useContext(AllPagesContext)

  const initialFormObject = {
    username: '',
    password: '',
  }

  const [formObject, setFormObject] = useState(initialFormObject)

  const [showPassword, setShowPassword] = useState(false)
  const [isSignInBtnDisabled, setIsSignInBtnDisabled] = useState(false)

  const handleFormObjectChange = (event) => {
    setFormObject((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  useEffect(() => {
    if (formObject.username !== '' && formObject.password !== '')
      setIsSignInBtnDisabled(false)
    else setIsSignInBtnDisabled(true)
  }, [formObject])

  const handleLogin = async () => {
    const abortController = new AbortController()
    const resultSignIn = await postSignInUser(
      abortController.signal,
      formObject
    )

    if (resultSignIn.status === 200) {
      try {
        const getUserInformationData = await getUserInformation(
          abortController.signal,
          resultSignIn?.data?.data?.accessToken
        )

        if (getUserInformationData.status === 200) {
          const tempUserData = {
            accessToken: resultSignIn?.data?.data?.accessToken,
            name: getUserInformationData?.data?.data?.nameUser,
            userName: getUserInformationData?.data?.data?.username,
            userAccess: {},
          }
          setAuth(tempUserData)
          setUserProfileToLocalStorage(tempUserData)
          setSnackbarObject({
            open: true,
            severity: 'success',
            title: `Successfully logged in as ${getUserInformationData?.data?.data?.nameUser}.`,
            message: '',
          })
          navigate('/')
        } else {
          setSnackbarObject({
            open: true,
            severity: 'error',
            title: 'Login failed, username and password are incorrect',
            message: '',
          })
        }
      } catch (error) {
        console.log(error)
      }
    } else {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: 'Login failed, username and password are incorrect.',
        message: '',
      })
    }

    abortController.abort()
  }

  return (
    <Fade in={true} timeout={{ enter: 2345 }}>
      <Box className={classes.root}>
        {/* LEFT SECTION */}
        <Box className={classes.leftSection}>
          {/* LOGO */}
          <Box component='img' src={LogoLapas} alt='' className={classes.logo} />
          {/* TITLE */}
          <Typography variant='h3' className={classes.title}>
            Sistem Analisa Perilaku Narapidana (SAPN)
          </Typography>
        </Box>

        <Box className={classes.rightSection}>
          {/* SIGN IN */}
          <Typography variant='h4' className={classes.signInCaption}>
            Sign In
          </Typography>

          {/* CAPTION */}
          <Typography variant='subtitle2' className={classes.caption}>
            Please enter your username and password
          </Typography>

          {/* USERNAME INPUT */}
          <FormControl required variant='outlined' className={classes.textInput}>
            <InputLabel>Username</InputLabel>
            <OutlinedInput
              label='Username'
              name='username'
              value={formObject.username}
              onChange={handleFormObjectChange}
            />
          </FormControl>

          {/* PASSWORD INPUT */}
          <FormControl required variant='outlined' className={classes.textInput}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              label='Password'
              type={showPassword ? 'text' : 'password'}
              name='password'
              value={formObject.password}
              onChange={handleFormObjectChange}
              endAdornment={
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword((current) => !current)}
                    edge='end'
                  >
                    {showPassword ? <IconVisibilityOff /> : <IconVisibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          {/* SIGN IN BUTTON */}
          <Button
            variant='contained'
            className={classes.buttonSignIn}
            onClick={handleLogin}
            disabled={isSignInBtnDisabled}
          >
            Sign In
          </Button>

          {/* <Box
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography
            variant='subtitle1'
            className={classes.copyright}
          >
            © Transporta. {dynamicYear}. All rights reserved.
          </Typography>
        </Box> */}
        </Box>
      </Box>
    </Fade>
  )
}

export default SignIn
