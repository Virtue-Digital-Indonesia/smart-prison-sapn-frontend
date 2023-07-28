import { useContext } from 'react'

// CONSTANS
import { colors } from 'constants/colors'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'

// MUIS
import {
  Stack,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material'

// UTILS
import { setSapnThemeToLocalStorage } from 'utilities/localStorage'

const SideBarSkins = () => {
  const { appTheme, setAppTheme } = useContext(PrivateLayoutContext)

  const handleRadioGroupChange = (event) => {
    setAppTheme((prev) => ({ ...prev, sideBar: event.target.value }))
    setSapnThemeToLocalStorage({ ...appTheme, sideBar: event.target.value })
  }

  return (
    <Stack
      width='260px'
      padding='20px'
      sx={{ backgroundColor: 'white' }}
      border='1px solid #00000014'
      borderTop='none'
    >
      <Typography fontSize={18} fontWeight={500}>
        Sidebar Skins
      </Typography>

      <RadioGroup
        value={appTheme.sideBar}
        onChange={(e) => handleRadioGroupChange(e)}
      >
        <FormControlLabel
          value='dark'
          control={
            <Radio
              size='small'
              sx={{
                color: 'black',
                '&.Mui-checked': {
                  color: 'black',
                },
              }}
            />
          }
          label='dark'
        />
        <FormControlLabel
          value='light'
          control={
            <Radio
              size='small'
              sx={{
                color: '#e4eaec',
                '&.Mui-checked': {
                  color: '#e4eaec',
                },
              }}
            />
          }
          label='light'
        />
      </RadioGroup>

      <Button
        variant='outlined'
        sx={{
          textTransform: 'none',
          marginTop: '20px',
          ':hover': { backgroundColor: colors.info, color: 'white' },
        }}
      >
        Reset
      </Button>
    </Stack>
  )
}

export default SideBarSkins
