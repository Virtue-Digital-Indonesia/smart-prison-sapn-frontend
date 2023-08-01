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
    backgroundColor: '#f96868',
    borderColor: '#f96868',
    borderRadius: 100,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#f9686890',
      borderColor: '#f9686890',
    }
  },
}))

export default useStyles