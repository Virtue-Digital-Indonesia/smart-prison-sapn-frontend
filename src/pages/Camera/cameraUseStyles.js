// MUI STYLES
import { makeStyles } from '@mui/styles'

// CONSTANT
import { colors } from 'constants/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#f1f4f5',
    padding: '30px 30px 0px',
    minHeight: '100%',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontSize: '35px',
    fontWeight: 500,
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    position: 'relative',
  },
  titleTableContainer: {
    backgroundColor: colors.info,
    padding: '20px 20px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  settingButton: {
    backgroundColor: '#f2a654',
    borderColor: '#f2a654',
    color: '#ffffff',
    padding: '9px 8px 9px 22px',

    '&:hover': {
      backgroundColor: '#f2a65490',
      borderColor: '#f2a65490',
    },
  },
  menuButton: {
    backgroundColor: '#e4eaec',
    borderColor: '#e4eaec',
    textTransform: 'none',
    justifyContent: 'left',
    color: '#76838f',
    width: '100%',
    padding: '9px 14px 9px 16px',

    '&:hover': {
      backgroundColor: '#e4eaec90',
      borderColor: '#e4eaec90',
    },
  },
}))

export default useStyles
