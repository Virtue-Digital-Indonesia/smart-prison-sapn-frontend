// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiPaper-root': {
      padding: '24px 48px',
    },
  },
  text: {
    marginBottom: 16,
    textAlign: 'center',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'end',
  },
  actionButton: {
    marginRight: 16,
    textTransform: 'none',
    width: 108,
    '&:last-child': {
      marginRight: 0,
    },
  },
}))

export default useStyles
