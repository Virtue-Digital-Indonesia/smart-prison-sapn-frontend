import { useState, useContext, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import {
  Autocomplete,
  Button,
  FormControl,
  ListItem,
  ListItemText,
  OutlinedInput,
  Stack,
  TextField,
  Typography,
} from '@mui/material/'

// SERVICE
import { postAddNewCamera, putEditCamera } from 'services/camera'

// STYLES
import useStyles from './cameraAddUseStyles'

// ROUTES
import { cameraRoutes } from 'pages/Camera/cameraRoutes'

// UTILS
import { getTimeZoneOffset } from 'utilities/valueConverter'
import { readCameraDetailFromLocalStorage } from 'utilities/localStorage'

const CameraAdd = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()
  const { auth, setSnackbarObject } = useContext(AllPagesContext)

  const initialFormObject = {
    // BASIC DETAILS
    title: '',
    ip: '',
    port: '',
    type: '',
    treshold: 0,
  }

  const cameraOptions = [
    {
      inputValue: 'Perkelahian',
      name: 'Perkelahian',
    },
    {
      inputValue: 'Sholat',
      name: 'Sholat',
    },
  ]

  const [formObject, setFormObject] = useState(initialFormObject)
  const [tempFormObject, setTempFormObject] = useState(null)
  const [type, setType] = useState([])

  // HANDLE FORM OBJECT CHANGE
  const handleFormObjectChange = (event) => {
    setFormObject((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  // HANDLE AUTOCOMPLETE CHANGE
  const handleAutocompleteChangeType = (e, newVal) => {
    let newValue
    if (newVal !== null) {
      newValue = newVal.name
    } else {
      newValue = newVal
    }

    setFormObject((current) => ({
      ...current,
      type: newValue,
    }))

    if (newValue !== 'Perkelahian') {
      setFormObject((current) => ({
        ...current,
        treshold: 0,
      }))
    }

    setType(newValue)
  }

  // HANDLE SAVE BUTTON
  const handleSaveButtonClick = async () => {
    const abortController = new AbortController()
    const { ip, port, treshold, type, title } = formObject

    // HANDLE ADD CAMERA
    if (!location.pathname.includes('edit')) {
      const bodyParams = {
        camera: title,
        ip: ip,
        port: +port,
        status_fight_sholat: type === 'Sholat' ? 2 : 1,
        fight_threshold: +treshold,
        timezone_offset: getTimeZoneOffset(),
      }

      const resultAddCamera = await postAddNewCamera(
        abortController.signal,
        auth.accessToken,
        bodyParams
      )

      if (resultAddCamera.status === 201) {
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: 'Satu data kamera baru saja dibuat.',
          message: '',
        })
        navigate('/camera')
      } else {
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: 'Gagal membuat data kamera baru.',
          message: '',
        })
      }
    }
    // HANDLE EDIT CAMAERA
    else {
      const bodyParams = {
        id: formObject.id,
        camera: title,
        ip: ip,
        port: +port,
        status_fight_sholat: type === 'Sholat' ? 2 : 1,
        fight_threshold: +treshold,
        timezone_offset: getTimeZoneOffset(),
        nama: title,
      }

      const resultEditCamera = await putEditCamera(
        abortController.signal,
        auth.accessToken,
        bodyParams
      )

      if (resultEditCamera.status === 200) {
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: 'Satu data kamera baru saja diperbarui.',
          message: '',
        })
        navigate('/camera')
      } else {
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: 'Gagal memperbarui data kamera.',
          message: '',
        })
      }
    }

    abortController.abort()
  }

  // HANDLE RESET BUTTON
  const handleResetButtonClick = () => {
    if (location.pathname.includes('edit')) setFormObject(tempFormObject)
    else {
      setFormObject(initialFormObject)
      setType(null)
    }
  }

  let breadcrumbList, pageTitle

  if (location.pathname.includes('add-camera')) {
    breadcrumbList = [cameraRoutes[0], cameraRoutes[1], cameraRoutes[3]]
    pageTitle = 'Tambah Data Kamera Baru'
  } else {
    breadcrumbList = [cameraRoutes[0], cameraRoutes[1], cameraRoutes[2]]
    pageTitle = 'Edit Kamera'
  }

  // HANDLE AUTO FILL WHILE EDIT THE CAMERA
  useEffect(() => {
    const cameraData = readCameraDetailFromLocalStorage()

    if (
      Object.keys(cameraData).length > 0 &&
      location.pathname.includes('edit')
    ) {
      const newFormObject = {
        title: cameraData.nama,
        ip: cameraData.IP,
        port: cameraData.port,
        type:
          cameraData.status_fight_sholat === 1
            ? cameraOptions[0].name
            : cameraOptions[1].name,
        treshold: cameraData.fight_threshold,
        id: cameraData.id,
      }

      setFormObject(newFormObject)
      setTempFormObject(newFormObject)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Header breadcrumbList={breadcrumbList} />

      {/* EDIT CAMERA */}
      <Stack className={classes.container}>
        <Stack className={classes.pageTitle}>
          <Stack width='100%' alignItems='flex-start'>
            <Typography className={classes.title}>{pageTitle}</Typography>
            <Typography className={classes.subtitle}>
              ** Isi kolom di bawah dengan benar
            </Typography>
          </Stack>
        </Stack>
        <Stack className={classes.cameraContainer}>
          {/* LEFT SECTION */}
          <Stack className={classes.leftSection}>
            <Typography
              marginTop='15px'
              align='right'
              className={classes.leftSectionText}
            >
              Nama Kamera
            </Typography>
            <Typography
              marginTop='46.5px'
              align='right'
              className={classes.leftSectionText}
            >
              IP
            </Typography>
            <Typography
              marginTop='46.5px'
              align='right'
              className={classes.leftSectionText}
            >
              Port
            </Typography>
            <Typography
              marginTop='43px'
              align='right'
              className={classes.leftSectionText}
            >
              Status
            </Typography>
            {type === 'Perkelahian' && (
              <Typography
                marginTop='44px'
                align='right'
                className={classes.leftSectionText}
              >
                Treshold Perkelahian
              </Typography>
            )}
          </Stack>

          {/* RIGHT SECTION */}
          <Stack className={classes.rightSection}>
            {/* CAMERA NAME */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='text'
                name='title'
                value={formObject.title}
                placeholder='Nama Kamera'
                onChange={handleFormObjectChange}
              />
            </FormControl>

            {/* CAMERA IP */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='text'
                name='ip'
                value={formObject.ip}
                placeholder='IP'
                onChange={handleFormObjectChange}
              />
            </FormControl>

            {/* CAMERA PORT */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='number'
                inputProps={{ min: 0 }}
                name='port'
                value={formObject.port}
                placeholder='Port'
                className={classes.portForm}
                onChange={handleFormObjectChange}
              />
            </FormControl>

            {/* CAMERA TYPE */}
            <Autocomplete
              disableClearable
              value={formObject.type || null}
              onChange={(event, newValue) =>
                handleAutocompleteChangeType(event, newValue)
              }
              className={classes.formItemInput}
              options={cameraOptions}
              getOptionLabel={(option) => {
                if (typeof option === 'string') {
                  return option
                }
                if (option.inputValue) {
                  return option.inputValue
                }
                return option.name
              }}
              isOptionEqualToValue={(option, value) => option.name === value}
              renderOption={(props, option) => (
                <ListItem {...props}>
                  <ListItemText primary={option.name} />
                </ListItem>
              )}
              renderInput={(params) => (
                <TextField {...params} placeholder='Pilih' required />
              )}
            />

            {/* CAMERA TRESHOLD */}
            {type === 'Perkelahian' && (
              <FormControl
                required
                variant='outlined'
                className={classes.formItemInput}
              >
                <OutlinedInput
                  label=''
                  type='number'
                  inputProps={{ min: 0, max: 1, step: 0.01 }}
                  name='treshold'
                  value={formObject.treshold}
                  placeholder='Treshold Perkelahian'
                  onChange={handleFormObjectChange}
                />
              </FormControl>
            )}

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

export default CameraAdd
