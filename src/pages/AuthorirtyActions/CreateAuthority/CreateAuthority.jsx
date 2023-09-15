import { useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

// COMPONENTS
import Header from './Header/Header'

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
import { postCreateNewAuthority } from 'services/authority'

// STYLES
import useStyles from './createAuthorityUseStyles'

const CreateAuthority = () => {
  const classes = useStyles()
  const location = useLocation()
  const navigate = useNavigate()
  const { auth, setSnackbarObject } = useContext(AllPagesContext)

  const [name, setName] = useState('')

  // HANDLE CREATE NEW AUTHORITY
  const handleSaveButtonClick = async () => {
    const abortController = new AbortController()

    const bodyParams = {
      name_group: name,
    }

    const resultCreateNewAuthority = await postCreateNewAuthority(
      abortController.signal,
      auth.accessToken,
      bodyParams
    )

    if (resultCreateNewAuthority.status === 200) {
      setSnackbarObject({
        open: true,
        severity: 'success',
        title: 'Satu data kewenangan baru saja dibuat.',
        message: '',
      })
      navigate('/authority')
    } else {
      setSnackbarObject({
        open: true,
        severity: 'error',
        title: 'Gagal membuat data kewenangan baru.',
        message: '',
      })
    }

    abortController.abort()
  }

  const handleResetButtonClick = () => {
    setName('')
  }

  return (
    <Stack className={classes.root}>
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
  )
}

export default CreateAuthority
