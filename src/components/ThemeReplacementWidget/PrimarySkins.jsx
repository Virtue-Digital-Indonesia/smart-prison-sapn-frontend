import { useContext, useState } from 'react'

// CONSTANS
import { colors } from 'constants/colors'

// CONTEXTS
import { PrivateLayoutContext } from 'contexts/PrivateLayoutContext'
import { intialAppTheme } from 'constants/values'

// MUIS
import {
  Checkbox,
  Stack,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  Button,
} from '@mui/material'

// UTILS
import { setSapnThemeToLocalStorage } from 'utilities/localStorage'

const PrimarySkins = () => {
  const { appTheme, setAppTheme } = useContext(PrivateLayoutContext)

  const navbarSkinColors = [
    {
      name: 'primary',
      color: '#fff',
    },
    {
      name: 'brown',
      color: '#8d6658',
    },
    {
      name: 'cyan',
      color: '#57c7d4',
    },
    {
      name: 'green',
      color: '#46be8a',
    },
    {
      name: 'grey',
      color: '#757575',
    },
    {
      name: 'indigo',
      color: '#677ae4',
    },
    {
      name: 'orange',
      color: '#f2a654',
    },
    {
      name: 'pink',
      color: '#f96197',
    },
    {
      name: 'purple',
      color: '#926dde',
    },
    {
      name: 'red',
      color: '#f96868',
    },
    {
      name: 'teal',
      color: '#3aa99e',
    },
    {
      name: 'yellow',
      color: '#f9cd48',
    },
  ]

  const handleRadioGroupChange = (event) => {
    setAppTheme((prev) => ({ ...prev, primarySkin: event.target.value }))
    setSapnThemeToLocalStorage({ ...appTheme, primarySkin: event.target.value })
  }

  return (
    <Stack
      width='260px'
      padding='20px'
      sx={{ backgroundColor: 'white' }}
      border='1px solid #00000014'
      borderTop='none'
    >
      {/* NAVBAR SKINS */}
      <>
        <Typography fontSize={18} fontWeight={500} marginTop='8px'>
          Primary Skins
        </Typography>

        <RadioGroup
          value={appTheme.primarySkin}
          onChange={(e) => handleRadioGroupChange(e)}
        >
          {navbarSkinColors.map((item, index) => (
            <FormControlLabel
              key={index}
              value={item.color}
              label={item.name}
              sx={{ color: colors.textPrimary }}
              control={
                <Radio
                  size='small'
                  sx={{
                    color: index === 0 ? colors.info : item.color,
                    '&.Mui-checked': {
                      color: index === 0 ? colors.info : item.color,
                    },
                  }}
                />
              }
            />
          ))}
        </RadioGroup>
      </>

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

export default PrimarySkins
