// CONSTANTS
import { values } from 'constants/values'

// MUIS
import MuiGlobalStyles from '@mui/material/GlobalStyles'
import { alpha } from '@mui/material/styles'

const GlobalStyles = () => {
  const zoomValue = 0.85

  return (
    <MuiGlobalStyles
      styles={(theme) => ({
        // ALL ELEMENTS
        '*, *::before, *::after': {
          boxSizing: 'border-box',
          fontFamily: values.fontFamily,
          shapeRendering: 'geometricPrecision',
          textRendering: 'geometricPrecision',
          imageRendering: 'optimizeQuality',
          fillRule: 'evenodd',
          clipRule: 'evenodd',
        },

        // FORM
        '.formTextField': {
          marginBottom: 20,
        },

        // GENERAL
        '.colorActionActive': {
          color: theme.palette.action.active,
        },
        '.colorPrimary': {
          color: theme.palette.primary.main,
        },
        '.colorTextSecondary': {
          color: theme.palette.text.secondary,
        },
        '.colorWhite': {
          color: theme.palette.common.white,
        },
        '.cursorPointer': {
          cursor: 'pointer',
        },
        '.flex1': {
          flex: 1,
        },
        '.marginRightAuto': {
          marginRight: 'auto',
        },
        '.marginBottomUnset': {
          marginBottom: 'unset',
        },
        '.padding0': {
          padding: 0,
        },
        '.textMedium': {
          fontWeight: 500,
        },
        '.textSemiBold': {
          fontWeight: 600,
        },
        '.textTransformNone': {
          textTransform: 'none',
        },
        '.widthFitContent': {
          width: 'fit-content',
        },

        // SCROLLBAR
        '&::-webkit-scrollbar': {
          width: 5,
          height: 5,
          backgroundColor: alpha('#000000', 0.16),
        },
        '&::-webkit-scrollbar-thumb': {
          width: 5,
          height: 5,
          backgroundColor: alpha('#000000', 0.2),
        },

        // ZOOM
        '@media only screen and (max-height: 820px)': {
          'body': {
            zoom: zoomValue,
          },
          '.zoom': {
            zoom: zoomValue,
          },
          '.no-zoom': {
            zoom: 1 / zoomValue,
          },
        },
      })}
    />
  )
}

export default GlobalStyles