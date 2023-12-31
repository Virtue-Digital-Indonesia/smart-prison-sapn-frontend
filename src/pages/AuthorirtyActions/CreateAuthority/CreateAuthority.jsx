import { useState, useContext, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

// COMPONENTS
import Header from './Header/Header'
import Footer from 'components/Footer/Footer'

// CONTEXTS
import { AllPagesContext } from 'contexts/AllPagesContext'

// COLORS
import { colors } from 'constants/colors'

// MUIS
import {
  Button,
  FormControl,
  OutlinedInput,
  Stack,
  Typography,
} from '@mui/material/'

// SERVICE
import { postCreateNewAuthority, putEditAuthority } from 'services/authority'

// STYLES
import useStyles from './createAuthorityUseStyles'

// UTILS
import { readAuthorityFromLocalStorage } from 'utilities/localStorage'
import { getTimeZoneOffset } from 'utilities/valueConverter'

const CreateAuthority = () => {
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()
  const { id } = useParams()
  const { auth, setSnackbarObject, setLoading } = useContext(AllPagesContext)

  const [name, setName] = useState('')
  const [tempName, setTempName] = useState('')

  // HANDLE CREATE OR EDIT AUTHORITY
  const handleSaveButtonClick = async () => {
    setLoading(true)
    const abortController = new AbortController()

    // HANDLE CREATE NEW AUTHORITY
    if (location.pathname === '/authority/add-authority') {
      const bodyParams = {
        name_group: name,
        timezone_offset: getTimeZoneOffset(),
      }

      const resultCreateNewAuthority = await postCreateNewAuthority(
        abortController.signal,
        auth.accessToken,
        bodyParams
      )

      if (resultCreateNewAuthority.status === 201) {
        setLoading(false)
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: 'Satu data kewenangan baru saja dibuat.',
          message: '',
        })
        navigate('/authority')
      } else {
        setLoading(false)
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: 'Gagal membuat data kewenangan baru.',
          message: '',
        })
      }
    }

    // HANDLE EDIT AUTHORITY
    else if (location.pathname.includes('edit-authority')) {
      const bodyParams = {
        id_group: id,
        name_group: name,
        timezone_offset: getTimeZoneOffset(),
      }

      const resultEditAuthority = await putEditAuthority(
        abortController.signal,
        auth.accessToken,
        bodyParams
      )

      if (resultEditAuthority.status === 200) {
        setLoading(false)
        setSnackbarObject({
          open: true,
          severity: 'success',
          title: 'Satu data kewenangan telah di perbarui.',
          message: '',
        })
        navigate('/authority')
      } else {
        setLoading(false)
        setSnackbarObject({
          open: true,
          severity: 'error',
          title: 'Gagal memperbarui data kewenangan.',
          message: '',
        })
      }
    }

    abortController.abort()
  }

  const handleResetButtonClick = () => {
    if (location.pathname.includes('edit')) {
      setName(tempName)
    } else setName('')
  }

  useEffect(() => {
    const authorityData = readAuthorityFromLocalStorage()

    if (
      Object.keys(authorityData).length > 0 &&
      location.pathname.includes('edit-authority')
    ) {
      setTempName(authorityData?.name_group)
      setName(authorityData?.name_group)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Stack className={classes.root}>
      <Stack>
        {/* HEADER */}
        <Header />

        {/* CONTENTS */}
        <Stack className={classes.container}>
          <Typography marginBottom='11px' fontSize={14}>
            {location.pathname.includes('edit')
              ? 'EDIT KEWENANGAN PENGGUNA'
              : 'TAMBAH DATA KEWENANGAN BARU'}
          </Typography>
          <Typography fontSize={14} sx={{ color: colors.textPrimary }}>
            **Isi kolom di bawah dengan benar.
          </Typography>

          {/* FORMS */}
          <Stack direction='row' width='40%' margin='40px 40px 0px 40px'>
            {/* LEFT SECTION */}
            <Stack marginLeft='30px' marginRight='40px'>
              <Typography
                marginTop='15px'
                align='right'
                fontSize={16}
                sx={{ color: colors.textPrimary }}
                fontWeight={300}
              >
                Nama Kewenangan
              </Typography>
            </Stack>
            {/* RIGHT SECTION */}
            <Stack>
              {/* AUTHORITY NAME */}
              <FormControl required variant='outlined' sx={{ width: '330px' }}>
                <OutlinedInput
                  label=''
                  type='text'
                  name='title'
                  value={name}
                  placeholder='Nama Kewenangan'
                  onChange={(e) => setName(e.target.value)}
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
      </Stack>

      {/* FOOTER */}
      <Footer />
    </Stack>
  )
}

export default CreateAuthority
