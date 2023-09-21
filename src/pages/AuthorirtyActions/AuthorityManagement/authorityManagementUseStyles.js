// MUI STYLES
import { makeStyles } from '@mui/styles'

// COLORS
import { colors } from 'constants/colors'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f4f5',
    padding: '30px 30px 0',
    position: 'relative',
  },
  container: {
    width: '100%',
    marginBottom: 0,
    borderRadius: 5,
    backgroundColor: 'white',
    boxShadow: '0 4px 10px -10px',
    padding: 30,
  },
  tableHead: {
    backgroundColor: '#f1f4f5',
    height: '60px',
  },
  tableHeadCell: {
    borderRight: `2px solid ${colors.divider}`,
    padding: 0,
    maxWidth: 40,
  },
  table: {
    border: `2px solid ${colors.divider}`,
  },
  tableHeadName: {
    minWidth: '500px',
    borderRight: `2px solid ${colors.divider}`,
    padding: 8,
  },
  tableBodyName: {
    minWidth: '500px',
    borderRight: `2px solid ${colors.divider}`,
    padding: 8,
    color: colors.textPrimary,
  },
  tableBody: {
    height: '50px',
  },
  tableBodyCell: {
    borderRight: `2px solid ${colors.divider}`,
    padding: 0,
  },
  buttonUpdate: {
    textTransform: 'none',
    backgroundColor: colors.info,
  },
}))

export default useStyles
