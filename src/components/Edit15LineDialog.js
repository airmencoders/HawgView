import React from 'react'

import { LatLon } from 'geodesy/mgrs'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
//import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  box: {
    //marginBottom: theme.spacing(1),
  },
  dialog: {
    padding: theme.spacing(2),
  },
  flex: {
    display: 'flex',
  },
  textField: {
    marginLeft: theme.spacing(1),
    //marginTop: '3px',
  },
  grow: {
    flexGrow: 1,
  }
}))

const Edit15LineDialog = (props) => {
  const classes = useStyles()

  const [callsign, setCallsign] = React.useState(props.marker.data === null ? props.marker.title : props.marker.data.callsign)
  const [frequency, setFrequency] = React.useState(props.marker.data === null ? 'A' : props.marker.data.frequency)
  const [plsHhrid, setPlsHhrid] = React.useState(props.marker.data === null ? '' : props.marker.data.plsHhrid)
  const [numObjectives, setNumObjectives] = React.useState(props.marker.data === null ? '1' : props.marker.data.numObjectives)
  const [location, setLocation] = React.useState(props.marker.data === null ? LatLon.parse(props.marker.latlng).toUtm().toMgrs().toString() : props.marker.data.location)
  const [elevation, setElevation] = React.useState(props.marker.data === null ? props.marker.elevation : props.marker.data.elevation)
  const [dateTime, setDateTime] = React.useState(props.marker.data === null ? '' : props.marker.data.dateTime)
  const [source, setSource] = React.useState(props.marker.data === null ? 'CSEL' : props.marker.data.source)
  const [condition, setCondition] = React.useState(props.marker.data === null ? 'Ambulatory' : props.marker.data.condition)
  const [equipment, setEquipment] = React.useState(props.marker.data === null ? 'Standard' : props.marker.data.equipment)
  const [authentication, setAuthentication] = React.useState(props.marker.data === null ? '' : props.marker.data.authentication)
  const [threats, setThreats] = React.useState(props.marker.data === null ? '' : props.marker.data.threats)
  const [pzDescription, setPzDescription] = React.useState(props.marker.data === null ? '' : props.marker.data.pzDescription)
  const [oscFreq, setOscFreq] = React.useState(props.marker.data === null ? '' : props.marker.data.oscFreq)
  const [ipHdg, setIpHdg] = React.useState(props.marker.data === null ? '' : props.marker.data.ipHdg)
  const [rescort, setRescort] = React.useState(props.marker.data === null ? '' : props.marker.data.rescort)
  const [gameplan, setGameplan] = React.useState(props.marker.data === null ? '' : props.marker.data.gameplan)
  const [signal, setSignal] = React.useState(props.marker.data === null ? '' : props.marker.data.signal)
  const [egress, setEgress] = React.useState(props.marker.data === null ? '' : props.marker.data.egress)

  const handleSubmit = () => {
    const data = {
      type: '15line',
      callsign,
      frequency,
      plsHhrid,
      numObjectives,
      location,
      elevation,
      dateTime,
      source,
      condition,
      equipment,
      authentication,
      threats,
      pzDescription,
      oscFreq,
      ipHdg,
      rescort,
      gameplan,
      signal,
      egress,
    }

    props.submit({
      marker: props.marker,
      data: data,
    })
  }

  return (
    <Dialog
      className={classes.dialog}
      fullWidth={true}
      maxWidth='lg'
      open={props.open}
      onClose={props.toggle}
    >
      <DialogTitle>Edit {props.marker.title} 15-line</DialogTitle>
      <DialogContent>
        <Box
          className={classes.box}
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <TextField
            autoFocus={true}
            margin='dense'
            label='Callsign'
            onChange={event => setCallsign(event.target.value)}
            fullWidth
            value={callsign}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Frequency'
            onChange={event => setFrequency(event.target.value)}
            fullWidth
            value={frequency}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='PLS/HHRID'
            onChange={event => setPlsHhrid(event.target.value)}
            fullWidth
            value={plsHhrid}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Number of objectives'
            onChange={event => setNumObjectives(event.target.value)}
            fullWidth
            value={numObjectives}
            variant='outlined'
          />
        </Box>
        <Box
          className={classes.box}
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <TextField
            margin='dense'
            label='Location'
            onChange={event => setLocation(event.target.value)}
            fullWidth
            value={location}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Elevation'
            onChange={event => setElevation(event.target.value)}
            fullWidth
            value={elevation}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Date/Time(z)'
            onChange={event => setDateTime(event.target.value)}
            fullWidth
            value={dateTime}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Source'
            onChange={event => setSource(event.target.value)}
            fullWidth
            value={source}
            variant='outlined'
          />
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <TextField
            margin='dense'
            label='Condition'
            onChange={event => setCondition(event.target.value)}
            fullWidth
            value={condition}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Equipment'
            onChange={event => setEquipment(event.target.value)}
            fullWidth
            value={equipment}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Authentication'
            onChange={event => setAuthentication(event.target.value)}
            fullWidth
            value={authentication}
            variant='outlined'
          />
        </Box>
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <TextField
            margin='dense'
            label='Threats'
            onChange={event => setThreats(event.target.value)}
            fullWidth
            value={threats}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='PZ Description'
            onChange={event => setPzDescription(event.target.value)}
            fullWidth
            value={pzDescription}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='OSC/Freq'
            onChange={event => setOscFreq(event.target.value)}
            fullWidth
            value={oscFreq}
            variant='outlined'
          />
        </Box>
        <Box
          className={classes.box}
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <TextField
            margin='dense'
            label='IP/Heading'
            onChange={event => setIpHdg(event.target.value)}
            fullWidth
            value={ipHdg}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Rescort'
            onChange={event => setRescort(event.target.value)}
            fullWidth
            value={rescort}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Terminal area gameplan'
            onChange={event => setGameplan(event.target.value)}
            fullWidth
            value={gameplan}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Signal'
            onChange={event => setSignal(event.target.value)}
            fullWidth
            value={signal}
            variant='outlined'
          />
          <TextField
            className={classes.textField}
            margin='dense'
            label='Egress HDG'
            onChange={event => setEgress(event.target.value)}
            fullWidth
            value={egress}
            variant='outlined'
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color='primary'>Save changes</Button>
        <Button onClick={props.toggle}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Edit15LineDialog