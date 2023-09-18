import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import {
  Button, FormControl, OutlinedInput,
  Stack, Typography } from '@mui/material/'

// SERVICES
import { getValueSettingData, postCreateNewValue, putEditValue } from 'services/valueSetting'

// STYLES
import useStyles from './valueSettingActionUseStyles'

const ValueSettingAction = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const { auth, setLoading, setSnackbarObject  } = useContext(AllPagesContext)
  const { id } = useParams()

  const initialFormObject = {
    // BASIC DETAILS
    item: '',
    takbir: '',
    berdiri: '',
    sedekap: '',
    rukuk: '',
    duduk: '',
    score: '',
  }

  const [formObject, setFormObject] = useState(initialFormObject)
  const [selectedData, setSelectedData] = useState(initialFormObject)

  const handleFormObjectChange = (event) => {
    setFormObject((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))
  }

  const handleSaveButtonClick = async () => {
    setLoading(true)
    const abortController = new AbortController()
    let selectedSnackbarObject

    const bodyParams = {
      ...formObject,
      id: id,
    }
    
    if(location.pathname.includes('add-value')){
      const resultCreateNewValue = await postCreateNewValue(
        abortController.signal,
        auth.accessToken,
        bodyParams
      )
  
      if (resultCreateNewValue.status === 200) {
        setLoading(false)
        setFormObject(initialFormObject)
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: `${resultCreateNewValue?.message}.`,
          message: '',
        })
        navigate('/value-setting')
      } else {
        setLoading(false)
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: `${resultCreateNewValue?.message}.`,
          message: '',
        })
      } 
    }
    else{ 
      const resultEditValue = await putEditValue(
        abortController.signal,
        auth.accessToken,
        bodyParams
      )
  
      if (resultEditValue.status === 200) {
        setLoading(false)
        setFormObject(initialFormObject)
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: `${resultEditValue?.message}.`,
          message: '',
        })
        navigate('/value-setting')
      } else {
        setLoading(false)
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: `${resultEditValue?.message}.`,
          message: '',
        })
      }
    }

    abortController.abort()
  }

  const handleResetButtonClick = () => { 
    if(location.pathname.includes('add-value')){
      setFormObject(initialFormObject)
    }
    else{
      setFormObject(selectedData)
    }
  }

  let pageTitle

  if(location.pathname.includes('add-value')){
    pageTitle = 'Tambah Data Nilai Sholat Baru'
  }
  else{ 
    pageTitle = 'Edit Nilai Sholat'
  }

  // GET VALUE SETTING
  const getValueSetting = async (inputSignal) => {
    setLoading(true)

    const queryParams = {
      page: 0,
      size: 100,
    }

    const resultData = await getValueSettingData(
      inputSignal,
      auth?.accessToken,
      queryParams
    )

    if (resultData.status === 200) {
      const newData = resultData?.data?.rows?.map((item) => {

        if(item.id.toString() === id){
          return{
            item: item.item,
            takbir: item.takbir,
            berdiri: item.berdiri,
            sedekap: item.sedekap,
            rukuk: item.rukuk,
            duduk: item.duduk,
            score: item.score,
          }
        }
        else{
          return {}
        }
      })

      for (let i = 0; i < newData.length; i++) {
        if(Object.keys(newData[i]).length > 0){
          setSelectedData(newData[i])
          setFormObject(newData[i])
        }
      }

      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()

    getValueSetting(abortController.signal)

    return () => {
      abortController.abort()
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
            <Typography marginTop='43.5px' align='right' className={classes.leftSectionText}>Berdiri</Typography>
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>Sedekap</Typography>
            <Typography marginTop='46.5px' align='right' className={classes.leftSectionText}>Rukuk</Typography>
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
                name='item'
                value={formObject.item}
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
              
            {/* BERDIRI */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='number'
                inputProps={{min: 0, max: 10}}
                name='berdiri'
                value={formObject.berdiri}
                placeholder='Berdiri'
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
              
            {/* RUKUK */}
            <FormControl
              required
              variant='outlined'
              className={classes.formItemInput}
            >
              <OutlinedInput
                label=''
                type='number'
                inputProps={{min: 0, max: 10}}
                name='rukuk'
                value={formObject.rukuk}
                placeholder='Rukuk'
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
                name='score'
                value={formObject.score}
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