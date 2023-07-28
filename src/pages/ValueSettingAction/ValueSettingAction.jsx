import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// MUIS
import {
  Button, FormControl, OutlinedInput,
  Stack, Typography } from '@mui/material/'

// STYLES
import useStyles from './valueSettingActionUseStyles'

const ValueSettingAction = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const initialFormObject = {
    // BASIC DETAILS
    sholat: '',
    takbir: '',
    sedekap: '',
    duduk: '',
    nilai: '',
  }

  const [formObject, setFormObject] = useState(initialFormObject)

  const handleFormObjectChange = (event) => {
    setFormObject((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSaveButtonClick = () => {
    alert('Save')
  }

  const handleResetButtonClick = () => {
    setFormObject(initialFormObject)
  }

  let pageTitle

  if(location.pathname.includes('add-value')){
    pageTitle = 'Tambah Data Nilai Sholat Baru'
  }
  else{ 
    pageTitle = 'Edit Nilai Sholat'
  }

  return (
    <Stack className={classes.root}>
      {/* HEADER */}
      <Header />

      {/* EDIT NILAI SHOLAT */}
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
            <Typography marginTop='15px' align='right' className={classes.leftSectionText}>Sholat</Typography>
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>Takbir</Typography>
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>Sedekap</Typography>
            <Typography marginTop='43px' align='right' className={classes.leftSectionText}>Duduk</Typography>
            <Typography marginTop='44px' align='right' className={classes.leftSectionText}>Nilai</Typography>
          </Stack>

          {/* RIGHT SECTION */} 
          <Stack className={classes.rightSection}>
            {/* SHOLAT */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='text'
                name='sholat'
                value={formObject.sholat}
                placeholder='Sholat'
                onChange={handleFormObjectChange}
              />
            </FormControl>
              
            {/* TAKBIR */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='number'
                inputProps={{min: 0, max: 10}}
                name='takbir'
                value={formObject.takbir}
                placeholder='Takbir'
                onChange={handleFormObjectChange}
              />
            </FormControl>
              
            {/*SEDEKAP */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='number'
                inputProps={{min: 0, max: 10}}
                name='sedekap'
                value={formObject.sedekap}
                placeholder='Sedekap'
                onChange={handleFormObjectChange}
              />
            </FormControl>
            
            {/* DUDUK */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='number'
                inputProps={{min: 0, max: 10}}
                name='duduk'
                value={formObject.duduk}
                placeholder='Duduk'
                onChange={handleFormObjectChange}
              />
            </FormControl>

            {/* NILAI */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='number'
                inputProps={{min: 0, max: 10}}
                name='nilai'
                value={formObject.nilai}
                placeholder='Nilai'
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

export default ValueSettingAction