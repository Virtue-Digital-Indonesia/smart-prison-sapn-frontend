/* eslint-disable indent */
import { useState, useEffect, useContext } from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

//COMPONENTS
import Footer from 'components/Footer/Footer'
import Header from './Header/Header'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// MUIS
import {
  Button,
  FormControl,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material/'

// SERVICES
import { postCreateNewValue, putEditValue } from 'services/valueSetting'

// STYLES
import useStyles from './valueSettingActionUseStyles'

// UTILS
import { readValueSettingFromLocalStorage } from 'utilities/localStorage'

const ValueSettingAction = () => {
  const classes = useStyles()
  const navigate = useNavigate()
  const location = useLocation()

  const { auth, setLoading, setSnackbarObject } = useContext(AllPagesContext)
  const { id } = useParams()

  const initialFormObject = {
    // BASIC DETAILS
    item: '',
    takbir: '',
    berdiri: '',
    sedekap: '',
    rukuk: '',
    sujud: '',
    duduk: '',
    score: '',
  }

  const initialErrorValue = {
    item: false,
    takbir: false,
    berdiri: false,
    sedekap: false,
    rukuk: false,
    sujud: false,
    duduk: false,
    score: false,
  }

  const [formObject, setFormObject] = useState(initialFormObject)
  const [selectedData, setSelectedData] = useState(initialFormObject)
  const [errorValue, setErrorValue] = useState(initialErrorValue)

  const handleFormObjectChange = (event) => {
    setFormObject((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }))

    if (
      event.target.name === 'item' ||
      (event.target.value <= 10 && event.target.value >= 0)
    ) {
      setErrorValue((current) => ({
        ...current,
        [event.target.name]: false,
      }))
    }
    // HANDLE NUMBER LESS THAN 0 AND MORE THAN 10
    else {
      setErrorValue((current) => ({
        ...current,
        [event.target.name]: true,
      }))
    }
  }

  const handleErrorValueCheck = () => {
    errorValue.item ||
    errorValue.takbir ||
    errorValue.berdiri ||
    errorValue.sedekap ||
    errorValue.rukuk ||
    errorValue.sujud ||
    errorValue.duduk ||
    errorValue.salam ||
    errorValue.score
      ? setSnackbarObject({
          open: true,
          severity: 'error',
          title: 'Ada data yang salah',
          message: '',
        })
      : handleSaveButtonClick()
  }

  const handleSaveButtonClick = async () => {
    setLoading(true)
    const abortController = new AbortController()

    const bodyParams = {
      ...formObject,
      id: id,
    }

    if (location.pathname.includes('add-value')) {
      const resultCreateNewValue = await postCreateNewValue(
        abortController.signal,
        auth.accessToken,
        bodyParams
      )

      if (resultCreateNewValue.status === 201) {
        setLoading(false)
        setFormObject(initialFormObject)
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: `${resultCreateNewValue?.data?.message}`,
          message: '',
        })
        navigate('/value-setting')
      } else {
        setLoading(false)
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: `Error ${resultCreateNewValue?.data?.status_code}`,
          message: '',
        })
      }
    } else {
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
          title: `${resultEditValue?.data?.message}`,
          message: '',
        })
        navigate('/value-setting')
      } else {
        setLoading(false)
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: `Error ${resultEditValue?.data?.status_code}`,
          message: '',
        })
      }
    }

    abortController.abort()
  }

  const handleResetButtonClick = () => {
    if (location.pathname.includes('add-value')) {
      setFormObject(initialFormObject)
    } else {
      setFormObject(selectedData)
    }
    setErrorValue(initialErrorValue)
  }

  let pageTitle

  if (location.pathname.includes('add-value')) {
    pageTitle = 'Tambah Data Nilai Sholat Baru'
  } else {
    pageTitle = 'Edit Nilai Sholat'
  }

  useEffect(() => {
    const valueSettingData = readValueSettingFromLocalStorage()

    if (
      Object.keys(valueSettingData).length > 0 &&
      location.pathname.includes('edit')
    ) {
      setFormObject(valueSettingData)
      setSelectedData(valueSettingData)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack className={classes.root}>
      <Stack>
        {/* HEADER */}
        <Header />

        {/* EDIT NILAI SHOLAT */}
        <Stack className={classes.container}>
          <Stack className={classes.pageTitle}>
            <Stack width='100%' alignItems='flex-start'>
              <Typography className={classes.title}>{pageTitle}</Typography>
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
                Sholat
              </Typography>
              <Typography
                marginTop='46.5px'
                align='right'
                className={classes.leftSectionText}
              >
                Takbir
              </Typography>
              <Typography
                marginTop='43.5px'
                align='right'
                className={classes.leftSectionText}
              >
                Berdiri
              </Typography>
              <Typography
                marginTop='46.5px'
                align='right'
                className={classes.leftSectionText}
              >
                Sedekap
              </Typography>
              <Typography
                marginTop='46.5px'
                align='right'
                className={classes.leftSectionText}
              >
                Rukuk
              </Typography>
              <Typography
                marginTop='46.5px'
                align='right'
                className={classes.leftSectionText}
              >
                Sujud
              </Typography>
              <Typography
                marginTop='43px'
                align='right'
                className={classes.leftSectionText}
              >
                Duduk
              </Typography>
              <Typography
                marginTop='43px'
                align='right'
                className={classes.leftSectionText}
              >
                Salam
              </Typography>
              <Typography
                marginTop='44px'
                align='right'
                className={classes.leftSectionText}
              >
                Nilai
              </Typography>
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
              <Stack direction='row'>
                <FormControl
                  required
                  variant='outlined'
                  className={classes.formItemInput}
                >
                  <OutlinedInput
                    error={errorValue.takbir}
                    id={errorValue.takbir ? null : 'outlined-error'}
                    label=''
                    type='number'
                    inputProps={{ min: 0, max: 10 }}
                    name='takbir'
                    value={formObject.takbir}
                    placeholder='Takbir'
                    onChange={handleFormObjectChange}
                  />
                </FormControl>

                {errorValue.takbir && (
                  <Typography align='right' className={classes.cautionText}>
                    Harus nilai 0-10
                  </Typography>
                )}
              </Stack>

              {/* BERDIRI */}
              <Stack direction='row'>
                <FormControl
                  required
                  variant='outlined'
                  className={classes.formItemInput}
                >
                  <OutlinedInput
                    error={errorValue.berdiri}
                    id={errorValue.berdiri ? null : 'outlined-error'}
                    label=''
                    type='number'
                    inputProps={{ min: 0, max: 10 }}
                    name='berdiri'
                    value={formObject.berdiri}
                    placeholder='Berdiri'
                    onChange={handleFormObjectChange}
                  />
                </FormControl>

                {errorValue.berdiri && (
                  <Typography align='right' className={classes.cautionText}>
                    Harus nilai 0-10
                  </Typography>
                )}
              </Stack>

              {/*SEDEKAP */}
              <Stack direction='row'>
                <FormControl
                  required
                  variant='outlined'
                  className={classes.formItemInput}
                >
                  <OutlinedInput
                    error={errorValue.sedekap}
                    id={errorValue.sedekap ? null : 'outlined-error'}
                    label=''
                    type='number'
                    inputProps={{ min: 0, max: 10 }}
                    name='sedekap'
                    value={formObject.sedekap}
                    placeholder='Sedekap'
                    onChange={handleFormObjectChange}
                  />
                </FormControl>

                {errorValue.sedekap && (
                  <Typography align='right' className={classes.cautionText}>
                    Harus nilai 0-10
                  </Typography>
                )}
              </Stack>

              {/* RUKUK */}
              <Stack direction='row'>
                <FormControl
                  required
                  variant='outlined'
                  className={classes.formItemInput}
                >
                  <OutlinedInput
                    error={errorValue.rukuk}
                    id={errorValue.rukuk ? null : 'outlined-error'}
                    label=''
                    type='number'
                    inputProps={{ min: 0, max: 10 }}
                    name='rukuk'
                    value={formObject.rukuk}
                    placeholder='Rukuk'
                    onChange={handleFormObjectChange}
                  />
                </FormControl>

                {errorValue.rukuk && (
                  <Typography align='right' className={classes.cautionText}>
                    Harus nilai 0-10
                  </Typography>
                )}
              </Stack>

              {/* SUJUD */}
              <Stack direction='row'>
                <FormControl
                  required
                  variant='outlined'
                  className={classes.formItemInput}
                >
                  <OutlinedInput
                    error={errorValue.sujud}
                    id={errorValue.sujud ? null : 'outlined-error'}
                    label=''
                    type='number'
                    inputProps={{ min: 0, max: 10 }}
                    name='sujud'
                    value={formObject.sujud}
                    placeholder='Sujud'
                    onChange={handleFormObjectChange}
                  />
                </FormControl>

                {errorValue.sujud && (
                  <Typography align='right' className={classes.cautionText}>
                    Harus nilai 0-10
                  </Typography>
                )}
              </Stack>

              {/* DUDUK */}
              <Stack direction='row'>
                <FormControl
                  required
                  variant='outlined'
                  className={classes.formItemInput}
                >
                  <OutlinedInput
                    error={errorValue.duduk}
                    id={errorValue.duduk ? null : 'outlined-error'}
                    label=''
                    type='number'
                    inputProps={{ min: 0, max: 10 }}
                    name='duduk'
                    value={formObject.duduk}
                    placeholder='Duduk'
                    onChange={handleFormObjectChange}
                  />
                </FormControl>

                {errorValue.duduk && (
                  <Typography align='right' className={classes.cautionText}>
                    Harus nilai 0-10
                  </Typography>
                )}
              </Stack>

              {/* SALAM */}
              <Stack direction='row'>
                <FormControl
                  required
                  variant='outlined'
                  className={classes.formItemInput}
                >
                  <OutlinedInput
                    error={errorValue.salam}
                    id={errorValue.salam ? null : 'outlined-error'}
                    label=''
                    type='number'
                    inputProps={{ min: 0, max: 10 }}
                    name='salam'
                    value={formObject.salam}
                    placeholder='Salam'
                    onChange={handleFormObjectChange}
                  />
                </FormControl>

                {errorValue.salam && (
                  <Typography align='right' className={classes.cautionText}>
                    Harus nilai 0-10
                  </Typography>
                )}
              </Stack>

              {/* NILAI */}
              <Stack direction='row'>
                <FormControl
                  required
                  variant='outlined'
                  className={classes.formItemInput}
                >
                  <OutlinedInput
                    error={errorValue.score}
                    id={errorValue.score ? null : 'outlined-error'}
                    label=''
                    type='number'
                    inputProps={{ min: 0, max: 10 }}
                    name='score'
                    value={formObject.score}
                    placeholder='Nilai'
                    onChange={handleFormObjectChange}
                  />
                </FormControl>

                {errorValue.score && (
                  <Typography align='right' className={classes.cautionText}>
                    Harus nilai 0-10
                  </Typography>
                )}
              </Stack>

              <Stack direction='row' marginTop='20px'>
                {/* SAVE BUTTON */}
                <Button
                  variant='outlined'
                  size='large'
                  className={classes.saveButton}
                  onClick={() => handleErrorValueCheck()}
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
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default ValueSettingAction
