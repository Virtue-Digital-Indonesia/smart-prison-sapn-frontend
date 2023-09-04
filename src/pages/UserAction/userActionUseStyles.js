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
    width: '99.3%',
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: '0 4px 10px -10px',
  },
  pageTitle: {
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    color: '37474f',
    fontSize: '20px',
    fontWeight: 400,
    padding: '20px 40px 10px',
  },
  subtitle: {
    color: '#76838f',
    fontSize: '16px',
    fontWeight: 300,
    padding: '0 40px',
  },
  button: {
    color: '#76838f',
    backgroundColor: '#e4eaec',
    borderColor: '#e4eaec',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#e4eaec80',
      borderColor: '#e4eaec80',
    }
  },
  cameraContainer: {
    flexDirection: 'row',
    width: '100%',
    margin: '40px',
  },
  leftSection: {
    marginLeft: 30,
    marginRight: 40,
    width: 150,
  },
  rightSection: {
  },
  leftSectionText: {
    color: '#76838f',
    fontSize: '16px',
    fontWeight: 300,
  },
  formItemInput: {
    width: 300,
    marginBottom: 16,
  },
  portForm: {
    /* Chrome, Safari, Edge, Opera */
    '& input::-webkit-outer-spin-button, input::-webkit-inner-spin-button': {
      '-webkit-appearance': 'none',
      margin: 0,
    },

    /* Firefox */
    '& input[type=number]': {
      '-moz-appearance': 'textfield',
    },
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
