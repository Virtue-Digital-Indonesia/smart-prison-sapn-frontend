import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// ASSETS
import IconSholat from 'assets/images/icons/sholat.png'
import IconPerkelahian from 'assets/images/icons/fighting.png'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// MUIS
import {
  Autocomplete, Button, FormControl, ListItem, ListItemText,
  OutlinedInput, Stack, TextField, Typography } from '@mui/material/'

// STYLES
import useStyles from './cameraAddUseStyles'

// DATA DUMMY
import { cameraData } from 'pages/DataDummy'

// ROUTES
import { cameraRoutes } from 'pages/Camera/cameraRoutes'

const CameraAdd = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const initialFormObject = {
    // BASIC DETAILS
    title: '',
    ip: '',
    port: '',
    type: '',
    treshold: '',
    creation_date: '',
  }

  const cameraOptions = [
    {
      inputValue: 'Perkelahian',
      name: 'Perkelahian',
    }, 
    {
      inputValue: 'Sholat',
      name: 'Sholat',
    }
  ]
  const [formObject, setFormObject] = useState(initialFormObject)
  const [type, setType] = useState([])

  const handleFormObjectChange = (event) => {
    setFormObject((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleAutocompleteChangeType = (e, newVal) => {
    let newValue
    if(newVal !== null) {
      newValue = newVal.name
    }
    else{
      newValue = newVal
    }

    setFormObject((current) => ({
      ...current,
      type: newValue,
    }))

    if(newValue !== 'Perkelahian'){
      setFormObject((current) => ({
        ...current,
        treshold: '',
      }))
    }

    setType(newValue)
    console.log(formObject)
  }

  const handleSaveButtonClick = () => {
    alert('Save')
  }

  const handleResetButtonClick = () => {
    setFormObject(initialFormObject)
    setType(null)
  }

  let breadcrumbList, pageTitle

  if(location.pathname.includes('add-camera')){
    breadcrumbList = [cameraRoutes[0], cameraRoutes[1], cameraRoutes[3]]
    pageTitle = 'Tambah Data Kamera Baru'
  }
  else{ 
    breadcrumbList = [cameraRoutes[0], cameraRoutes[1], cameraRoutes[2]]
    pageTitle = 'Edit Kamera'
  }

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Header breadcrumbList={breadcrumbList} />

      {/* EDIT CAMERA */}
      <Stack className={classes.container}>
        <Stack className={classes.pageTitle}>
          <Stack
            width='100%'
            alignItems='flex-start'
          >
            <Typography className={classes.title}>{pageTitle}</Typography>
            <Typography className={classes.subtitle}>** Isi kolom di bawah dengan benar</Typography>
          </Stack>
        </Stack>
        <Stack className={classes.cameraContainer}>

          {/* LEFT SECTION */} 
          <Stack className={classes.leftSection}>
            <Typography marginTop='15px' align='right' className={classes.leftSectionText}>Nama Kamera</Typography>
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>IP</Typography>
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>Port</Typography>
            <Typography marginTop='43px' align='right' className={classes.leftSectionText}>Status</Typography>
            {(type === 'Perkelahian') &&
            <Typography marginTop='44px' align='right' className={classes.leftSectionText}>Treshold Perkelahian</Typography>
            }
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
                inputProps={{min: 0}}
                name='port'
                value={formObject.port}
                placeholder='Port'
                className={classes.portForm}
                onChange={handleFormObjectChange}
              />
            </FormControl>
            
            {/* CAMERA TYPE */}
            <Autocomplete
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
                <TextField
                  {...params}
                  placeholder='Pilih'
                  required
                />
              )}
            />

            {/* CAMERA TRESHOLD */}
            {(type === 'Perkelahian') &&
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='number'
                inputProps={{min: 0, max: 1, step: 0.01}}
                name='treshold'
                value={formObject.treshold}
                placeholder='Treshold Perkelahian'
                onChange={handleFormObjectChange}
              />
            </FormControl>
            }

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