// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  copyright: {
    fontSize: 14,
    fontWeight: 400,
    paddingTop: 15,
    color: theme.palette.text.secondary,
    background: 'transparent',
    textAlign: 'center',
  },
}))

export default useStyles
