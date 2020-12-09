/**
 * ${SUMMARY}
 * 
 * ${DESCRIPTION}
 * 
 * @author  chris-m92
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Airmen Coders
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import React from 'react'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
  },
}))

//----------------------------------------------------------------//
// Save Scenario Dialog Component
//----------------------------------------------------------------//
const SaveScenarioDialog = (props) => {
  const classes = useStyles()
  let scenarioRef = React.useRef(null)

  const [name, setName] = React.useState('')

  const scenario = {
    name: name,
    classification: 'UNCLASSIFIED',
    date: new Date(),
    data: {
      anchor: props.data.anchor,
      buildingLabels: props.data.buildingLabels,
      bullseyes: props.data.bullseyes,
      circles: props.data.circles,
      data: props.data.data,
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

  const resetDialog = () => {
    setName('')
    console.log('[SaveScenarioDialog] resetDialog setting state')
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
  }

  const downloadScenario = () => {
    const element = document.createElement('a')
    const file = new Blob([scenarioRef.current.value], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `Hawg View Scenario ${name}.txt`
    document.body.appendChild(element)
    element.click()

    setName('')
    console.log('[SaveScenarioDialog] downloadScenario setting state')
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
    props.toast(`Scenario ${name} saved`)
  }

  return (
    <Dialog
      className={classes.dialog}
      fullWidth={true}
      open={props.state.dialog.name === 'save'}
      onClose={resetDialog}
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
        <Button onClick={resetDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SaveScenarioDialog