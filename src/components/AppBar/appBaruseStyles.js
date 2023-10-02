// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 66,
    boxShadow: '0 2px 4px #00000014',
    flexDirection: 'row',
  },
  menuContainer: {
    '&.MuiMenu-list': {
      paddingTop: 0,
      paddingBottom: 0,
    },
    '&.MuiMenu-paper': {
      boxShadow: 'unset',
      border: '1px solid #e4eaec',
    },
  },
  notifications: {
    '&:hover': {
      color: 'white',
      backgroundColor: 'grey',
      cusrsor: 'pointer',
    }
  },
  notificationContainer: {
    padding: 10,
    '&:hover': {
      cursor: 'pointer',
    }
  },
  sholat: {
    padding: 2,
    margin: 5,
    color: 'white',
    backgroundColor: 'green',
    borderRadius: 5,
    pointerEvents: 'none',
  },
  perkelahian: {
    padding: 2,
    margin: 5,
    color: 'white',
    backgroundColor: 'red',
    borderRadius: 5,
    pointerEvents: 'none',
  }
}))

export default useStyles
