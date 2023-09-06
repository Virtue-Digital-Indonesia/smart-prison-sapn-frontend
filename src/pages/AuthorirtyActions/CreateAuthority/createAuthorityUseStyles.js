// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f4f5',
    padding: '30px 30px 0',
    position: 'relative',
  },
  container: {
    width: '100%',
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: '0 4px 10px -10px',
    padding: 30,
  },
  saveButton: {
    color: '#ffffff',
    backgroundColor: '#62a8ea',
    borderColor: '#62a8ea',
    marginRight: 10,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#62a8ea90',
      borderColor: '#62a8ea90',
    },

    '&:active': {
      backgroundColor: '#358fe4',
      borderColor: '#358fe4',
    },
  },
  resetButton: {
    color: '#76838f',
    backgroundColor: '#ffffff',
    borderColor: '#e4eaec',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#e4eaec90',
      borderColor: '#e4eaec90',
    },
  },
}))

export default useStyles
