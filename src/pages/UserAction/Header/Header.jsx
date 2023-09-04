import { useLocation, useNavigate } from 'react-router-dom'

// CONSTANT
import { colors } from 'constants/colors'

// MUIS
import { Stack, Typography, Breadcrumbs, Button } from '@mui/material'

// MUI ICONS
import ArrowBackIcon from '@mui/icons-material/ChevronLeft'

const Header = () => {
  const location = useLocation()
  const navigate = useNavigate()

  let breadcrumbLast

  if(location.pathname.includes('add-user')){
    breadcrumbLast = 'Tambah Pengguna'
  }
  else{ 
    breadcrumbLast = 'Edit Pengguna'
  }

  return (
    <Stack
      direction='row'
      width='100%'
      justifyContent='space-between'
      alignItems='center'
      padding='0px 40px 24px'
    >
      <Stack>
        {/* TITLE */}
        <Typography fontSize={26} fontWeight={500}>
          Pengelolaan Data Pengguna
        </Typography>

        <Breadcrumbs aria-label='breadcrumb'>
          <Typography
            onClick={() => navigate('/')}
            fontSize={14}
            sx={{
              color: colors.info,
              cursor: 'pointer',
              ':hover': { textDecoration: 'underline' },
            }}
          >
            Beranda
          </Typography>
          <Typography
            onClick={() => navigate('/user')}
            fontSize={14}
            sx={{
              color: colors.info,
              cursor: 'pointer',
              ':hover': { textDecoration: 'underline' },
            }}
          >
            Pengelolaan Data Pengguna
          </Typography>
          <Typography>{ breadcrumbLast }</Typography>
        </Breadcrumbs>
      </Stack>

      {/* BACK BUTTON */}
      <Button
        variant='outlined'
        startIcon={<ArrowBackIcon />}
        size='large'
        sx={{
          color: '#ffffff',
          backgroundColor: '#f96868',
          borderColor: '#f96868',
          borderRadius: 100,
          textTransform: 'none',

          '&:hover': {
            backgroundColor: '#f9686890',
            borderColor: '#f9686890',
          }
        }}
        onClick={() => navigate('/user')}
      >
        Kembali
      </Button>
    </Stack>
  )
}

export default Header