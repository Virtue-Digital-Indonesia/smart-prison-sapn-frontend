// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '30px 0 0 0',
    maxHeight: 720,
    overflow: 'auto',
    flexGrow: 1,
  },
  container: {
    margin: '0 0 30px 40px',
    boxShadow: '0 4px 10px -10px',
    backgroundColor: 'white',

    '&:hover': {
      cursor: 'pointer'
    }
  },
  camera: {
    padding: '20px 30px',
    maxWidth: '520px',
    backgroundColor: 'white',
  },
  cameraTitle: {
    fontSize: '20px',
    fontWeight: 400,
  },
  cameraType: {
    color: '#76838f'
  },
  cameraScreen: {
    backgroundColor: 'white',
    height: '450px',
    alignItems: 'center',
    justifyContent: 'center',

    '&:hover': {
      backgroundColor: 'grey',
    }
  },
  perkelahian: {
    backgroundColor: 'white',
    boxShadow: '0 4px 10px -10px',
    minWidth: 270,
    width: '20%',
    top: 201,
    right: 40,
    position: 'absolute'
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