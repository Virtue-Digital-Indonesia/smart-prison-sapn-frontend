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
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './signInUseStyles'

// UTILS
import { setUserProfileToLocalStorage } from 'utilities/localStorage'

const SignIn = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const dynamicYear = new Date().getFullYear()

  const { setAuth } = useContext(AllPagesContext)

  const initialFormObject = {
    userName: '',
    password: '',
  }

  const initialFormHelperObject = {
    userName: null,
    password: null,
  }

  const initialAlertObject = {
    severity: null,
    message: null,
  }

  const [isLoading, setIsLoading] = useState(false)
  const [formObject, setFormObject] = useState(initialFormObject)
  const [formHelperObject, setFormHelperObject] = useState(
    initialFormHelperObject
  )
  const [showPassword, setShowPassword] = useState(false)
  const [alertObject, setAlertObject] = useState(initialAlertObject)
  const [isSignInBtnDisabled, setIsSignInBtnDisabled] = useState(false)

  let alertStyle
  if (alertObject.severity === 'error') alertStyle = classes.alertError
  else if (alertObject.severity === 'success') alertStyle = classes.alertSuccess

  const handleFormObjectChange = (event) => {
    setFormObject((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  useEffect(() => {
    if (formObject.userName !== '' && formObject.password !== '')
      setIsSignInBtnDisabled(false)
    else setIsSignInBtnDisabled(true)
  }, [formObject])

  const handleLogin = async () => {
    const dummyToken = { dummyToken: 'Hello World' }
    setAuth(dummyToken)
    setUserProfileToLocalStorage(dummyToken)
    navigate('/')
  }

  return (
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

        {/* ERROR MESSAGE */}
        {alertObject.message && (
          <Alert severity={alertObject.severity} className={alertStyle}>
            {alertObject.message}
          </Alert>
        )}

        {/* USERNAME INPUT */}
        <FormControl
          required
          variant='outlined'
          error={Boolean(formHelperObject.userName)}
          className={classes.textInput}
        >
          <InputLabel>Username</InputLabel>
          <OutlinedInput
            label='Username'
            name='userName'
            value={formObject.userName}
            onChange={handleFormObjectChange}
          />

          <FormHelperText>{formHelperObject.userName}</FormHelperText>
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
  )
}

export default SignIn
