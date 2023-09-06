// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  buttonOutlined: {
    color: '#ffffff',
    backgroundColor: '#f96868',
    borderColor: '#f96868',
    borderRadius: 100,
    textTransform: 'none',

    '&:hover': {
      backgroundColor: '#f9686890',
      borderColor: '#f9686890',
    },
  },
}))

export default useStyles
