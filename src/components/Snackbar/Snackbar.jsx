import PropTypes from 'prop-types'

// MUIS
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import MuiSnackbar from '@mui/material/Snackbar'

const Snackbar = (props) => {
  const { open, setToast, severity, title, message, action } = props

  const handleToastClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setToast((current) => {
      return {
        ...current,
        open: false,
      }
    })
  }

  return (
    <MuiSnackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleToastClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      onClick={action}
    >
      <Alert
        elevation={6}
        onClose={handleToastClose}
        severity={severity}
        sx={{ cursor: 'pointer' }}
      >
        {/* TITLE */}
        {title !== '' && <AlertTitle>{title}</AlertTitle>}

        {/* MESSAGE */}
        {message !== '' && message}
      </Alert>
    </MuiSnackbar>
  )
}

Snackbar.defaultProps = {
  open: false,
  severity: 'success',
  title: '',
  message: '',
  action: () => {},
}

Snackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  setToast: PropTypes.func.isRequired,
  severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  action: PropTypes.func,
}

export default Snackbar
