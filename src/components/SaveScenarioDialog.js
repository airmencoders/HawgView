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
  let scenarioRef = React.useRef(null)

  const copyScenario = () => {
    scenarioRef.current.children[1].children[0].select()
    document.execCommand('copy')
    props.toggle()
    props.toast('Scenario copied to clipboard', 'success')
  }

  const scenario = {
    classification: 'UNCLASSIFIED',
    date: new Date(),
    data: {
      buildingLabels: props.data.buildingLabels,
      circles: props.data.circles,
      combatAirPatrols: props.data.combatAirPatrols,      
      friendlyMarkers: props.data.friendlyMarkers,
      hostileMarkers: props.data.hostileMarkers,
      initialPoints: props.data.initialPoints,
      lines: props.data.lines,
      polygons: props.data.polygons,      
      rectangles: props.data.rectangles,
      survivors: props.data.survivors,
      threatMarkers: props.data.threatMarkers
    }
  }

  return (
    <Dialog
      className={classes.dialog}
      fullWidth={true}
      open={props.open}
      onClose={props.toggle}
      maxWidth='lg'
    >
      <DialogTitle>Save Scenario</DialogTitle>
      <DialogContent>
        <DialogContentText>Copy the data below</DialogContentText>
        <TextField
          className={classes.form}
          autoFocus={true}
          fullWidth={true}
          label='Scenario Data'
          ref={scenarioRef}
          value={JSON.stringify(scenario)}
          variant='outlined'
          multiline={true}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={copyScenario} color='primary'>Copy Scenario</Button>
        <Button onClick={props.toggle}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}