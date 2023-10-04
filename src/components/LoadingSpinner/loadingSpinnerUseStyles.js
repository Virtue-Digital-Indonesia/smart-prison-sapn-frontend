// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    backgroundColor: 'white',
    transform: 'translate(-50%, -50%)',
    boxShadow: '0px 4px 40px 0px #0000000D',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  logo: {
    width: '20%',
  },
}))

export default useStyles
