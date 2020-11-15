/**
 * ${SUMMARY}
 * 
 * Based on the leaflet.js plugin leaflet-ruler. A bearing and range analysis tool.
 * Improvements include modularization for use with React and the ability to use
 * magnetic declination for magnetic rather than true headings.
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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

//----------------------------------------------------------------//
// Constants
//----------------------------------------------------------------//
import { sovereignties } from '../constants/threats'
import { threats } from '../constants/threats'
import { units } from '../constants/threats'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
  },
  flex: {
    display: 'flex',
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginTop: '3px',
  },
  fullWidthFormControl: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

//----------------------------------------------------------------//
// Edit Threat Dialog Component
//----------------------------------------------------------------//
const EditThreatDialog = (props) => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // State
  //----------------------------------------------------------------//
  const [custom, setCustom] = React.useState(props.marker !== null && props.marker.layer === 'threat' ? props.marker.threatType.title === 'Custom' ? true : false : true)
  const [fill, setFill] = React.useState(props.marker !== null && props.marker.layer === 'threat' ? props.marker.fill : false)
  const [threat, setThreat] = React.useState(props.marker !== null && props.marker.layer === 'threat' ? threats.indexOf(props.marker.threatType) : 0)
  const [label, setLabel] = React.useState(props.marker !== null && props.marker.layer === 'threat' ? props.marker.title : '')
  const [range, setRange] = React.useState(props.marker !== null && props.marker.layer === 'threat' ? props.marker.range : '3')
  const [unit, setUnit] = React.useState(props.marker !== null && props.marker.layer === 'threat' ? props.marker.unit : 'NM')
  const [sovereignty, setSovereignty] = React.useState(props.marker !== null && props.marker.layer === 'threat' ? props.marker.sovereignty : 'Hostile')

  const handleThreatChange = event => {
    setThreat(event.target.value)
    setRange(threats[event.target.value].range)
    setUnit('NM')

    if (event.target.value === 0) {
      setLabel('')
      setCustom(true)
    } else {
      setLabel(threats[event.target.value].title)
      setCustom(false)
    }
  }

  const handleSubmit = () => {
    if (props.marker === null) {
      props.submit('create', {
        data: null,
        elevation: 0,
        fill: fill,
        iconType: 'div',
        label: custom ? label : threats[threat].label,
        layer: 'threat',
        range: range === '' ? '1' : range,
        sovereignty: sovereignty,
        threatType: threats[threat],
        title: label,
        unit: unit,
      })
    } else {
      props.submit('edit', {
        marker: props.marker,
        data: props.marker.data,
        fill: fill,
        label: custom ? label : threats[threat].label,
        range: range === '' ? '1' : range,
        sovereignty: sovereignty,
        threatType: threats[threat],
        title: label,
        unit: unit,
        latlng: props.marker.latlng,
        elevation: props.marker.elevation,
      })
    }

    props.toggle()
  }

  return (
    <Dialog
      className={classes.dialog}
      open={props.open}
      onClose={props.toggle}
    >
      <DialogTitle>{props.marker !== null && props.marker.layer === 'threat' ? 'Edit threat' : 'Create threat'}</DialogTitle>
      <DialogContent>
        <FormControl
          className={classes.flex}
          variant='outlined'
        >
          <InputLabel>Threat type</InputLabel>
          <Select
            className={classes.grow}
            label='Mission Threat'
            margin='dense'
            onChange={handleThreatChange}
            value={threat}
          >
            {threats.map((threat, index) => (
              <MenuItem
                key={threat.title}
                value={index}
              >
                {threat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin='dense'
          label='Label'
          onChange={event => setLabel(event.target.value)}
          fullWidth
          value={label}
          variant='outlined'
        />
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <TextField
            className={classes.grow}
            disabled={!custom}
            margin='dense'
            label='Range'
            onChange={event => setRange(event.target.value)}
            value={range}
            variant='outlined'
          />
          <FormControl
            className={classes.formControl}
            variant='outlined'
          >
            <InputLabel>Unit</InputLabel>
            <Select
              disabled={!custom}
              label='Unit'
              margin='dense'
              onChange={event => setUnit(event.target.value)}
              value={unit}
            >
              {units.map(unit => (
                <MenuItem
                  key={unit}
                  value={unit}
                >
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl
          className={classes.fullWidthFormControl}
          variant='outlined'
        >
          <InputLabel>Sovereignty</InputLabel>
          <Select
            className={classes.grow}
            label='Sovereignty'
            margin='dense'
            onChange={event => setSovereignty(event.target.value)}
            value={sovereignty}
          >
            {sovereignties.map(sovereignty => (
              <MenuItem
                key={sovereignty}
                value={sovereignty}
              >
                {sovereignty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Switch
              checked={fill}
              onChange={event => setFill(event.target.checked)}
              color='primary'
            />
          }
          label='Fill'
        />
      </DialogContent>
      {props.marker && sovereignty !== 'Friendly' ? (
        <DialogActions>
          <Button color='primary' onClick={() => props.toggle9LineDialog()}>Edit 9-line</Button>
          <Button color='secondary' onClick={() => props.submit('9line', { marker: props.marker, data: null })}>Delete 9-line</Button>
        </DialogActions>
      )
        : undefined
      }
      <DialogActions>
        <Button onClick={handleSubmit} color='primary'>Save changes</Button>
        <Button onClick={(props.toggle)}>Cancel</Button>
      </DialogActions>
    </Dialog >
  )
}

export default EditThreatDialog