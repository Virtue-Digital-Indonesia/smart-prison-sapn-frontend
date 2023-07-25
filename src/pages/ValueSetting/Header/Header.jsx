import { useNavigate } from 'react-router-dom'

// CONSTANT
import { colors } from 'constants/colors'

// MUIS
import { Stack, Typography, Breadcrumbs, Button } from '@mui/material'

// MUI ICONS
import AddIcon from '@mui/icons-material/Add'

const Header = () => {
  const navigate = useNavigate()
  return (
    <Stack
      direction='row'
      width='100%'
      justifyContent='space-between'
      alignItems='center'
      padding='0px 30px 30px 30px'
    >
      <Stack>
        {/* TITLE */}
        <Typography fontSize={26} fontWeight={500}>
          Pengaturan Nilai Sholat
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
          <Typography>Pengaturan Nilai Sholat</Typography>
        </Breadcrumbs>
      </Stack>

      <Button
        variant='contained'
        sx={{
          backgroundColor: colors.info,
          textTransform: 'none',
          borderRadius: '100px',
        }}
        startIcon={<AddIcon />}
      >
        Tambah Data
      </Button>
    </Stack>
  )
}

export default Header
