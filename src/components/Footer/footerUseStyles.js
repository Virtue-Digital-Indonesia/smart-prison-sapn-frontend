// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  copyright: {
    fontSize: 14,
    fontWeight: 400,
    color: theme.palette.text.secondary,
    background: 'transparent',
    position: 'absolute',
    textAlign: 'center',
    bottom: 8,
  },
}))

export default useStyles
