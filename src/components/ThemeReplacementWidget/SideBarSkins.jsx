import { useContext } from 'react'

// CONSTANS
import { colors } from 'constants/colors'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'
import { intialAppTheme } from 'constants/values'

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
          label='dark'
          sx={{ color: colors.textPrimary }}
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
        />
        <FormControlLabel
          value='light'
          label='light'
          sx={{ color: colors.textPrimary }}
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
        />
      </RadioGroup>

      <Button
        variant='outlined'
        sx={{
          textTransform: 'none',
          marginTop: '20px',
          ':hover': { backgroundColor: colors.info, color: 'white' },
        }}
        onClick={() => {
          setAppTheme(intialAppTheme)
          setSapnThemeToLocalStorage(intialAppTheme)
        }}
      >
        Reset
      </Button>
    </Stack>
  )
}

export default SideBarSkins
