// MUI STYLES
import { makeStyles } from '@mui/styles'

// CONSTANT
import { colors } from 'constants/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: '#f1f4f5',
    padding: '30px 30px 0px 30px',
    position: 'relative',
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: 4,
    position: 'relative',
  },
  titleTableContainer: {
    backgroundColor: colors.info,
    padding: '20px 20px',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
}))

export default useStyles
