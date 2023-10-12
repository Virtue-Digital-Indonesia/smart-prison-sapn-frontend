// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#f1f4f5',
    minHeight: '100%',
    justifyContent: 'space-between',
  },
  pageTitle: {
    fontSize: '35px',
    fontWeight: 500,
    padding: '20px 40px 0',
  },
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
  mediaPlayerContainer: {
    zIndex: 9,
    cursor: 'zoom-out',
    color: 'white',
  },
}))

export default useStyles
