// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    minHeight: '100vh !important',
    height: '100%',
  },
  leftSection: {
    width: '100%',
    backgroundColor: 'rgba(38,50,56,.6)',
  },
  rightSection: {
    width: '100%',
    backgroundColor: '#ffffff',
    maxWidth: 470,
    padding: 60
  },
  logo: {
    display: 'block',
    width: '40%',
    margin: 'auto',
    marginTop: 140
  },
  title: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 28
  },
  signInCaption : {
    color: '#37474f',
    marginTop: 180,
    marginBottom: 10
  },
  caption: {
    color: '#76838f',
    marginBottom: 30
  },
  textInput: {
    width: '100%',
    marginBottom: 16,
  },
  buttonSignIn: {
    width: '100%',
    height: 42,
    backgroundColor: '#62a8ea',
    borderColor: '#62a8ea',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#7eb7ed',
      borderColor: '#7eb7ed',
    }
  },
  copyright: {
    position: 'absolute',
    textAlign: 'center',
    bottom: 22,
  },
}))

export default useStyles