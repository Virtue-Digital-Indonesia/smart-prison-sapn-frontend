import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// MUIS
import {
  Autocomplete, Button, FormControl,
  ListItem, ListItemText, OutlinedInput,
  Stack, TextField, Typography } from '@mui/material/'

// STYLES
import useStyles from './userActionUseStyles'

const UserAction = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const initialFormObject = {
    // BASIC DETAILS
    kewenangan: '',
    nama: '',
    username: '',
  }

  const [formObject, setFormObject] = useState(initialFormObject)

  const authorityOptions = [
    {
      inputValue: 'Administrator',
      name: 'Administrator',
    }, 
    {
      inputValue: 'Superadmin',
      name: 'Superadmin',
    }
  ]

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
  }

  const handleSaveButtonClick = () => {
    alert('Save')
  }

  const handleResetButtonClick = () => {
    setFormObject(initialFormObject)
  }

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
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>Username</Typography>
          </Stack>

          {/* RIGHT SECTION */} 
          <Stack className={classes.rightSection}>
            {/* KEWENANGAN */}
            <Autocomplete
              value={formObject.type || null}
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
              
            {/* NAMA */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='text'
                name='name'
                value={formObject.name}
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