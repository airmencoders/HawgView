import React from 'react'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
  },
}))

export default (props) => {
  const classes = useStyles()

  const [title, setTitle] = React.useState(props.marker.title)

  return (
    <Dialog
      className={classes.dialog}
      open={props.open}
      onClose={props.toggle}
    >
      <DialogTitle>Edit {props.marker.title}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          fullWidth
          label='Name'
          margin='dense'
          onChange={event => setTitle(event.target.value)}
          value={title}
        />
        {
          (props.marker.sovereignty === 'hostile' || props.marker.sovereignty === 'threat') ?
            <DialogContent>
              <Button
                color='primary'
                onClick={() => props.toggle9LineDialog()}
              >
                Edit 9-Line
              </Button>
              <Button
                color='secondary'
                onClick={() => props.submit(props.marker, title)}
              >
                Delete 9-line
              </Button>
            </DialogContent>
            : null
        }
      </DialogContent>
            <DialogActions>
              <Button onClick={() => props.submit(props.marker, title)} color='primary'>Save Changes</Button>
              <Button onClick={props.toggle}>Cancel</Button>
            </DialogActions>
    </Dialog>
  )
}