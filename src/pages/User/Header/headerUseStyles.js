// MUI STYLES
import { makeStyles } from '@mui/styles'

// CONSTANT
import { colors } from 'constants/colors'

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    fontSize: 26,
    fontWeight: 500,
  },
  breadcrumbsText: {
    fontSize: 14,
    color: colors.info,
    cursor: 'pointer',
  },
  breadcrumbsActive: {
    fontSize: 16,
    color: colors.textPrimary,
    cursor: 'default',
  },
  buttonOutlined: {
    color: '#ffffff',
    backgroundColor: '#62a8ea',
    borderColor: '#62a8ea',
    borderRadius: 100,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#7eb7ed',
      borderColor: '#7eb7ed',
    }
  },
}))

export default useStyles