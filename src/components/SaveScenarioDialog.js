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

const SaveScenarioDialog = (props) => {
  const classes = useStyles()
  let scenarioRef = React.useRef(null)

  const [name, setName] = React.useState('')

  const scenario = {
    name: name,
    classification: 'UNCLASSIFIED',
    date: new Date(),
    data: {
      buildingLabels: props.data.buildingLabels,
      bullseyes: props.data.bullseyes,
      circles: props.data.circles,
      ellipses: props.data.ellipses,
      friendlyMarkers: props.data.friendlyMarkers,
      hostileMarkers: props.data.hostileMarkers,
      initialPoints: props.data.initialPoints,
      kineticPoints: props.data.kineticPoints,
      lines: props.data.lines,
      mapLabels: props.data.mapLabels,
      polygons: props.data.polygons,
      rectangles: props.data.rectangles,
      survivors: props.data.survivors,
      styles: props.data.styles,
      threatMarkers: props.data.threatMarkers
    }
  }

  const downloadScenario = () => {
    const element = document.createElement('a')
    const file = new Blob([scenarioRef.current.value], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `Hawg View Scenario ${name}.txt`
    document.body.appendChild(element)
    element.click()

    props.toggle()
    props.toast(`Scenario ${name} saved`)
  }

  return (
    <Dialog
      className={classes.dialog}
      fullWidth={true}
      open={props.open}
      onClose={props.toggle}
      maxWidth='xs'
    >
      <DialogTitle>Save Scenario</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth={true}
          label='Scenario Name (Optional)'
          onChange={event => setName(event.target.value)}
          variant='outlined'
          value={name}
        />
        <TextField
          style={{display: 'none'}}
          inputRef={scenarioRef}
          autoFocus={true}
          value={JSON.stringify(scenario)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={downloadScenario} color='primary'>Download Scenario</Button>
        <Button onClick={props.toggle}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SaveScenarioDialog