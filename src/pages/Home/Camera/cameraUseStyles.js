// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  container: {
    boxShadow: '0 4px 10px -10px',
    backgroundColor: 'white',

    '&:hover': {
      cursor: 'pointer',
    },
  },
  cameraTitle: {
    fontSize: '20px',
    fontWeight: 400,
  },
  cameraType: {
    color: '#76838f',
  },
  cameraScreen: {
    backgroundColor: 'white',
    height: '450px',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      backgroundColor: 'grey',
    },
  },
  perkelahian: {
    backgroundColor: 'white',
    boxShadow: '0 4px 10px -10px',
    width: '250px',
    height: '70%',
    maxHeight: 460,
    top: 190,
    right: 45,
    position: 'absolute',
  },
  perkelahianTitle: {
    padding: '20px 30px',
  },
  perkelahianBottom: {
    backgroundColor: 'white',
    height: '450px',
  },
}))

export default useStyles
