// MUI STYLES
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    height: 66,
    boxShadow: '0 2px 4px #00000014',
    flexDirection: 'row',
  },
  menuContainer : {
    '& .MuiMenu-list' : {
      paddingTop: 0,
      paddingBottom: 0
    },
    '& 	.MuiMenu-paper' : {
      boxShadow: 'unset',
      border: '1px solid #e4eaec'
    }
  }
}))

export default useStyles