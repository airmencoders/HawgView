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

const LoadScenarioDialog = (props) => {
  const classes = useStyles()

  const [scenario, setScenario] = React.useState('')

  return (
    <Dialog
      className={classes.dialog}
      fullWidth={true}
      open={props.open}
      onClose={props.toggle}
      maxWidth='lg'
    >
      <DialogTitle>Load Scenario</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.form}
          autoFocus={true}
          fullWidth={true}
          label='Scenario Data'
          multiline={true}
          onChange={event => setScenario(event.target.value)}
          value={scenario}
          variant='outlined'          
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.submit(scenario)} color='primary'>Load Scenario</Button>
        <Button onClick={props.toggle}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoadScenarioDialog