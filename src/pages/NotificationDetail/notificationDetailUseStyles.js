// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#f1f4f5',
    justifyContent: 'space-between',
    minHeight: '100%',
  },
  container: {
    margin: '20px 40px',
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: '0 4px 10px -10px',
  },
  notificationTitle: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    fontSize: '23px',
    fontWeight: 400,
    padding: '20px 40px',
  },
  button: {
    color: '#76838f',
    backgroundColor: '#e4eaec',
    borderColor: '#e4eaec',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#e4eaec80',
      borderColor: '#e4eaec80',
    },
  },
  detailContainer: {
    margin: '40px',
  },
  foto: {
    width: '350px',
    height: '420px',
    border: '1px solid gray',
    backgroundColor: '#a3afb7',
    objectFit: 'contain',
  },
}))

export default useStyles
