// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: '20px 40px',
    marginBottom: 0,
    padding: '30px 30px 0px 30px',
    borderRadius: '5px 5px 0 0',
    backgroundColor: 'white',
    boxShadow: '0 4px 10px -10px',
    maxWidth: 1640,
    width: '100%'
  },
  optionsList: {
    padding: '10px 30px',
    alignItems: 'center',
    borderRadius: '5px 5px 0 0',

    '&:hover': {
      cursor: 'pointer'
    }
  },
  title: {
    fontSize: '20px',
    fontWeight: 400,
  }
}))

export default useStyles