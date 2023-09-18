// MUIS
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'

// STYLES
import useStyles from './dialogDeleteUseStyles'

const DialogDelete = (props) => {
  const { dialogDelete, setDialogDelete, title, handleOkButtonClick } = props

  const classes = useStyles()

  const handleDialogClose = (event, reason) => {
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') return false
    else setDialogDelete(false)
  }

  return (
    <Dialog
      open={Boolean(dialogDelete)}
      onClose={handleDialogClose}
      className={classes.root}
    >
      {/* TITLE */}
      <Typography variant='h6' className={classes.text}>
        {title}
      </Typography>

      {/* ACTIONS */}
      <Box className={classes.actions}>
        {/* OK BUTTON */}
        <Button
          variant='outlined'
          color='error'
          className={classes.actionButton}
          onClick={handleOkButtonClick}
        >
          Hapus
        </Button>

        {/* CANCEL BUTTON */}
        <Button
          variant='contained'
          className={classes.actionButton}
          onClick={() => setDialogDelete(false)}
          disableElevation
        >
          Batalkan
        </Button>
      </Box>
    </Dialog>
  )
}

export default DialogDelete
