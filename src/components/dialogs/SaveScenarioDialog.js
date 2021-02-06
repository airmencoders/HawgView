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
import '@fontsource/roboto'

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
const SaveScenarioDialog = props => {
  const classes = useStyles()
  let scenarioRef = React.useRef(null)

  const [name, setName] = React.useState('')

  let data = props.state.history[props.state.step]

  const scenario = {
    name: name,
    classification: 'UNCLASSIFIED',
    date: new Date(),
    data: {
      anchor: data.anchor,
      buildingLabels: data.buildingLabels,
      bullseyes: data.bullseyes,
      circles: data.circles,
      data: data.data,
      ellipses: data.ellipses,
      friendlyMarkers: data.friendlyMarkers,
      hostileMarkers: data.hostileMarkers,
      initialPoints: data.initialPoints,
      kineticPoints: data.kineticPoints,
      lines: data.lines,
      mapLabels: data.mapLabels,
      neutralMarkers: data.neutralMarkers,
      polygons: data.polygons,
      rectangles: data.rectangles,
      sardot: data.sardot,
      survivors: data.survivors,
      styles: data.styles,
      threatMarkers: data.threatMarkers,
      unknownMarkers: data.unknownMarkers,
    }
  }

  const downloadScenario = () => {
    const element = document.createElement('a')
    const file = new Blob([scenarioRef.current.value], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `Hawg View Scenario ${name}.txt`
    document.body.appendChild(element)
    element.click()

    props.toast(`Scenario ${name} saved`)
    setName('')
  }

  const handleClose = () => {
    setName('')
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
  }

  return (
    <Dialog
      className={classes.dialog}
      fullWidth={true}
      open={props.state.dialog.name === 'save'}
      onClose={handleClose}
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
        <Button onClick={handleClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default SaveScenarioDialog