// CONSTANTS
import { colors } from 'constants/colors'

// MUIS
import { makeStyles } from '@mui/styles'

const useStyles = makeStyles((theme) => ({
  columnFilterText: {
    flex: 1,
    fontWeight: 500,
  },
  columnUnsortedIconAsc: {
    width: 18,
    height: 18,
    transform: 'rotate(0deg)',
    transition: 'transform 0.25s ease-in-out',
  },
  columnSortedIconAsc: {
    transform: 'rotate(0deg)',
  },
  columnSortedIconDesc: {
    transform: 'rotate(180deg)',
  },
}))

export default useStyles
