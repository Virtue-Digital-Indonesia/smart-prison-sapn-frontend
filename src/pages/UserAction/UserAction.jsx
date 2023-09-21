import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUI ICONS
import IconVisibility from '@mui/icons-material/Visibility'
import IconVisibilityOff from '@mui/icons-material/VisibilityOff'

// MUIS
import {
  Autocomplete, Button, FormControl,
  IconButton, InputAdornment, ListItem,
  ListItemText, OutlinedInput, Stack,
  TextField, Typography } from '@mui/material/'

// SERVICES
import { postCreateNewUser, putEditUser, getGroupRoleData } from 'services/user'

// STYLES
import useStyles from './userActionUseStyles'

// UTILS
import { readUserSettingFromLocalStorage } from 'utilities/localStorage'
import { getTimeZoneOffset } from 'utilities/valueConverter'

const UserAction = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const { auth, setLoading, setSnackbarObject  } = useContext(AllPagesContext)
  const { id } = useParams()

  const initialFormObject = {
    // BASIC DETAILS
    id_group: '',
    name_group: '',
    name_user: '',
    username: '',
    password: '',
  }

  const [formObject, setFormObject] = useState(initialFormObject)
  const [authorityOptions, setAuthorityOptions] = useState([])
  const [showPassword, setShowPassword] = useState(false)
  const [selectedData, setSelectedData] = useState(initialFormObject)
  const [selectedGroupIdEdit, setSelectedGroupIdEdit] = useState()

  const handleFormObjectChange = (event) => {
    setFormObject((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleAutocompleteChangeType = (e, newVal) => {
    let newGroup, newIdGroup

    if(newVal !== null) {
      newGroup = newVal.name_group
      newIdGroup = newVal.id_group
    }
    else{
      newGroup = newVal
      newIdGroup = ''
    }

    setFormObject((current) => ({
      ...current,
      name_group: newGroup,
      id_group: newIdGroup,
    }))
  }

  const getAuthorityOptions = async () => {
    setLoading(true)
    const abortController = new AbortController()

    const resultData = await getGroupRoleData(
      abortController.signal,
      auth.accessToken,
      {
        page: 0,
        size: 1000,
      },
      {}
    )
    if (resultData.status === 200) {
      const newData = resultData?.data?.rows?.map((item) => {
        return {
          ...item,
        }
      })
      setAuthorityOptions(newData)
      setLoading(false)
    } else {
      setLoading(false)
    }

    abortController.abort()
  }

  const handleSaveButtonClick = async () => {
    const abortController = new AbortController()

    const bodyParams = {
      ...formObject,
      timezone_offset: getTimeZoneOffset(),
    }

    // HANDLE CREATE NEW USER
    if(location.pathname.includes('add-user')){

      const resultCreateNewUser = await postCreateNewUser(
        abortController.signal,
        auth?.accessToken,
        bodyParams
      )

      if (resultCreateNewUser.status === 201) {
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: 'User baru berhasil dibuat.',
          message: '',
        })
        navigate('/user')
      } else {
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: 'User baru gagal dibuat.',
          message: '',
        })
      }
    }

    // HANDLE EDIT USER
    else if (location.pathname.includes('edit')) {
      const resultEditUser = await putEditUser(
        abortController.signal,
        auth.accessToken,
        bodyParams
      )

      if (resultEditUser.status === 201) {
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: 'User berhasil diedit.',
          message: '',
        })
        navigate('/user')
      } else {
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: 'User gagal diedit.',
          message: '',
        })
      }
    }

    abortController.abort()
  }

  const handleResetButtonClick = () => {
    if(location.pathname.includes('add-user')){
      setFormObject(initialFormObject)
    }
    else{
      setFormObject(selectedData)
    }
  }

  const getGroupRoleID = (item) => {
    console.log('1st step')
    console.log(authorityOptions)
    console.log(item)
    let newFormObject

    for(let i; i < authorityOptions.length; ++i){
      console.log('2nd step')
      if(authorityOptions.name_group === item.name_group){
        console.log('3rd step')
        newFormObject = {
          ...item,
          id_group: authorityOptions.id_group
        }
      }
    }

    setFormObject(newFormObject)
    setSelectedData(newFormObject)
  }

  useEffect(() => {
    const userSettingData = readUserSettingFromLocalStorage()

    getAuthorityOptions()

    if (
      Object.keys(userSettingData).length > 0 &&
      location.pathname.includes('edit')
    ){
      //getGroupRoleID(userSettingData)
      setFormObject(userSettingData)
      setSelectedData(userSettingData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  let pageTitle

  if(location.pathname.includes('add-user')){
    pageTitle = 'Tambah Data Pengguna'
  }
  else{ 
    pageTitle = 'Edit Data Pengguna'
  }

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Header />

      {/* EDIT PENGGUNA */}
      <Stack className={classes.container}>
        <Stack className={classes.pageTitle}>
          <Stack
            width='100%'
            alignItems='flex-start'
          >
            <Typography className={classes.title}>{pageTitle}</Typography>
          </Stack>
        </Stack>
        <Stack className={classes.cameraContainer}>

          {/* LEFT SECTION */} 
          <Stack className={classes.leftSection}>
            <Typography marginTop='15px' align='right' className={classes.leftSectionText}>Kewenangan</Typography>
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>Nama</Typography>
            <Typography marginTop='41.5px' align='right' className={classes.leftSectionText}>Username</Typography>
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>Password</Typography>
          </Stack>

          {/* RIGHT SECTION */} 
          <Stack className={classes.rightSection}>
            {/* KEWENANGAN */}
            <Autocomplete
              value={formObject.name_group || null}
              onChange={(event, newValue) =>
                handleAutocompleteChangeType(event, newValue)
              }
              className={classes.formItemInput}
              options={authorityOptions}
              getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option
                }
                if (option.inputValue) {
                  return option.inputValue
                }
                return option.name_group
              }}
              isOptionEqualToValue={(option, value) => option.name_group === value}
              renderOption={(props, option) => (
                <ListItem {...props}>
                  <ListItemText primary={option.name_group} />
                </ListItem>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder='Pilih'
                  required
                />
              )}
            />
              
            {/* NAMA */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='text'
                name='name_user'
                value={formObject.name_user}
                placeholder='Nama'
                onChange={handleFormObjectChange}
              />
            </FormControl>

            {/* USERNAME */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='text'
                name='username'
                value={formObject.username}
                placeholder='Username'
                onChange={handleFormObjectChange}
              />
            </FormControl>

            {/* PASSWORD */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type={showPassword ? 'text' : 'password'}
                name='password'
                value={formObject.password}
                placeholder='Password'
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

            <Stack direction='row' marginTop='20px'>
              {/* SAVE BUTTON */}
              <Button
                variant='outlined'
                size='large'
                className={classes.saveButton}
                onClick={() => handleSaveButtonClick()}
              >
                Simpan
              </Button>

              {/* RESET BUTTON */}
              <Button
                variant='outlined'
                size='large'
                className={classes.resetButton}
                onClick={() => handleResetButtonClick()}
              >
                Setel Ulang
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default UserAction