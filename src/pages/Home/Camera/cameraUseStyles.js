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
  mediaPlayerContainer: {
    zIndex: 9,
    cursor: 'zoom-out',
    color: 'white',
  },
}))

export default useStyles
