import { useNavigate, useLocation } from 'react-router-dom'

// CONSTANT
import { colors } from 'constants/colors'

// MUIS
import { Stack, Typography, Breadcrumbs, Button } from '@mui/material'

// MUI ICONS
import ArrowBackIcon from '@mui/icons-material/ChevronLeft'

// STYLES
import useStyles from './headerUseStyles'

const Header = () => {
  const navigate = useNavigate()
  const classes = useStyles()
  const location = useLocation()

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
          Kewenangan Pengguna
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
            onClick={() => navigate('/authority')}
            fontSize={14}
            sx={{
              color: colors.info,
              cursor: 'pointer',
              ':hover': { textDecoration: 'underline' },
            }}
          >
            Kewenangan Pengguna
          </Typography>
          <Typography>
            {location.pathname.includes('edit') ? 'Edit Data' : 'Tambah Data'}
          </Typography>
        </Breadcrumbs>
      </Stack>

      {/* BACK BUTTON */}
      <Button
        variant='outlined'
        startIcon={<ArrowBackIcon />}
        size='large'
        className={classes.buttonOutlined}
        onClick={() => navigate('/authority')}
      >
        Kembali
      </Button>
    </Stack>
  )
}

export default Header
