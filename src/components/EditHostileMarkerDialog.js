import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
  },
}))

export default ({ editHostileMarkerDialogOpen, toggleEditHostileMarkerDialog }) => {
  const classes = useStyles()

  return (
    <Dialog
      className={classes.dialog}
      open={editHostileMarkerDialogOpen}
      onClose={toggleEditHostileMarkerDialog}
    >
      <DialogTitle>Edit Marker</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          margin='dense'
          label='Name'
          type='text'
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={toggleEditHostileMarkerDialog} color='primary'>Save Changes</Button>
        <Button onClick={toggleEditHostileMarkerDialog}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}