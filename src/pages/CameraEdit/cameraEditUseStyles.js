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
    justifyContent: 'flex-end',
    alignContent: 'center',
  },
  leftSectionText: {
    color: '#76838f',
    fontSize: '16px',
    fontWeight: 300,
    paddingBottom: '30px', 
  }
}))

export default useStyles
