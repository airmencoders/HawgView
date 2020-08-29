import React from 'react'

import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Functions
//----------------------------------------------------------------//
import { submitCoordInput } from '../functions/submitCoordInput'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  drawerPaper: {
    width: drawerWidth,
  },
  marginsMd: {
    margin: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  firstTextField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
}))

export default (props) => {
  const classes = useStyles()

  const container = props.window !== undefined ? () => window().document.body : undefined

  // Every Marker has these
  const [title, setTitle] = React.useState('')
  const [mgrs, setMgrs] = React.useState('')
  const [lat, setLat] = React.useState('')
  const [lng, setLng] = React.useState('')
  const [elevation, setElevation] = React.useState('')

  // Control the switch for LatLng, 9-Lines, and 15-Lines, and threat fills
  const [latlng, setLatlng] = React.useState(false)
  const [cas, setCas] = React.useState(false)
  const [csar, setCsar] = React.useState(false)
  const [fill, setFill] = React.useState(false)

  // Control 9-Line TextFields
  const [casLabel, setCasLabel] = React.useState('')
  const [casTypeMethod, setCasTypeMethod] = React.useState('')
  const [casIpHdgDistance, setCasIpHdgDistance] = React.useState('')
  const [casElevation, setCasElevation] = React.useState('')
  const [casDescription, setCasDescription] = React.useState('')
  const [casLocation, setCasLocation] = React.useState('')
  const [casMark, setCasMark] = React.useState('')
  const [casFriendlies, setCasFriendlies] = React.useState('')
  const [casEgress, setCasEgress] = React.useState('')
  const [casRemarks, setCasRemarks] = React.useState('')

  // Control 15-Line TextFields
  const [csarCallsign, setCsarCallsign] = React.useState('')
  const [csarFrequency, setCsarFrequency] = React.useState('')
  const [csarPlsHhrid, setCsarPlsHhrid] = React.useState('')
  const [csarNumObjectives, setCsarNumObjectives] = React.useState('')
  const [csarLocation, setCsarLocation] = React.useState('')
  const [csarElevation, setCsarElevation] = React.useState('')
  const [csarDateTime, setCsarDateTime] = React.useState('')
  const [csarSource, setCsarSource] = React.useState('')
  const [csarCondition, setCsarCondition] = React.useState('')
  const [csarEquipment, setCsarEquipment] = React.useState('')
  const [csarAuthentication, setCsarAuthentication] = React.useState('')
  const [csarThreats, setCsarThreats] = React.useState('')
  const [csarPzDescription, setCsarPzDescription] = React.useState('')
  const [csarOscFreq, setCsarOscFreq] = React.useState('')
  const [csarIpHdg, setCsarIpHdg] = React.useState('')
  const [csarRescort, setCsarRescort] = React.useState('')
  const [csarGameplan, setCsarGameplan] = React.useState('')
  const [csarSignal, setCsarSignal] = React.useState('')
  const [csarEgress, setCsarEgress] = React.useState('')

  React.useEffect(() => {
    if (props.marker !== null) {
      setTitle(props.marker.title)
      setMgrs(LatLon.parse(props.marker.latlng).toUtm().toMgrs().toString())
      setLat(props.marker.latlng.lat.toFixed(4))
      setLng(props.marker.latlng.lng.toFixed(4))
      setElevation(props.marker.elevation)
      setCas(false)
      setCsar(false)

      if (props.marker.layer === 'hostile' || props.marker.layer === 'threat') {
        if (props.marker.data === null) {
          setCasIpHdgDistance('N/A')
          setCasElevation(props.marker.elevation)
          setCasDescription(props.marker.title)
          setCasLocation(LatLon.parse(props.marker.latlng).toUtm().toMgrs().toString())
          setCasMark('None')
        } else {
          setCas(true)
          setCasLabel(props.marker.data.label)
          setCasTypeMethod(props.marker.data.typeMethod)
          setCasIpHdgDistance(props.marker.data.ipHdgDistance)
          setCasElevation(props.marker.data.elevation)
          setCasDescription(props.marker.data.description)
          setCasLocation(props.marker.data.location)
          setCasMark(props.marker.data.mark)
          setCasFriendlies(props.marker.data.friendlies)
          setCasEgress(props.marker.data.egress)
          setCasRemarks(props.marker.data.remarks)
        }
      } else if (props.marker.layer === 'survivor') {
        if (props.marker.data === null) {
          setCsarCallsign(props.marker.title)
          setCsarFrequency('A')
          setCsarNumObjectives('1')
          setCsarLocation(LatLon.parse(props.marker.latlng).toUtm().toMgrs().toString())
          setCsarElevation(props.marker.elevation)
          setCsarSource('CSEL')
          setCsarCondition('Ambulatory')
          setCsarEquipment('Standard')
        } else {
          setCsar(true)
          setCsarCallsign(props.marker.data.callsign)
          setCsarFrequency(props.marker.data.frequency)
          setCsarPlsHhrid(props.marker.data.plsHhrid)
          setCsarNumObjectives(props.marker.data.numObjectives)
          setCsarLocation(props.marker.data.location)
          setCsarElevation(props.marker.data.elevation)
          setCsarDateTime(props.marker.data.dateTime)
          setCsarSource(props.marker.data.source)
          setCsarCondition(props.marker.data.condition)
          setCsarEquipment(props.marker.data.equipment)
          setCsarAuthentication(props.marker.data.authentication)
          setCsarThreats(props.marker.data.threats)
          setCsarPzDescription(props.marker.data.pzDescription)
          setCsarOscFreq(props.marker.data.oscFreq)
          setCsarIpHdg(props.marker.data.ipHdg)
          setCsarRescort(props.marker.data.rescort)
          setCsarGameplan(props.marker.data.gameplan)
          setCsarSignal(props.marker.data.signal)
          setCsarEgress(props.marker.data.egress)
        }
      }
    }
  }, [props.marker])

  const pullElevation = () => {
    setElevation('Pending')

    let target = false
    if (latlng) {
      target = submitCoordInput(lat + ' ' + lng)
    } else {
      target = submitCoordInput(mgrs)
    }

    // Get the elevation
    fetch(`https://nationalmap.gov/epqs/pqs.php?x=${target.lng}&y=${target.lat}&units=Feet&output=json`)
      .then(response => response.json())
      .then(json => (Number.parseInt(json.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation) === -1000000) ? setElevation(0) : Number.parseInt(setElevation(json.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation)))
  }

  const handleSubmit = () => {
    let target = false
    if (latlng) {
      target = submitCoordInput(lat + ' ' + lng)
    } else {
      target = submitCoordInput(mgrs)
    }

    let payload = {
      marker: props.marker,
      data: null,
      elevation: elevation,
      latlng: target,
      title: title,
    }

    if ((props.marker.layer === 'threat' || props.marker.layer === 'hostile') && cas) {
      payload.data = {
        type: '9line',
        label: casLabel,
        typeMethod: casTypeMethod,
        ipHdgDistance: casIpHdgDistance,
        elevation: casElevation,
        description: casDescription,
        location: casLocation,
        mark: casMark,
        friendlies: casFriendlies,
        egress: casEgress,
        remarks: casRemarks,
      }
    } else if (props.marker.layer === 'survivor' && csar) {
      payload.data = {
        type: '15line',
        callsign: csarCallsign,
        frequency: csarFrequency,
        plsHhrid: csarPlsHhrid,
        numObjectives: csarNumObjectives,
        location: csarLocation,
        elevation: csarElevation,
        dateTime: csarDateTime,
        source: csarSource,
        condition: csarCondition,
        equipment: csarEquipment,
        authentication: csarAuthentication,
        threats: csarThreats,
        pzDescription: csarPzDescription,
        oscFreq: csarOscFreq,
        ipHdg: csarIpHdg,
        rescort: csarRescort,
        gameplan: csarGameplan,
        signal: csarSignal,
        egress: csarEgress,
      }
    }

    props.submit('edit', payload)
  }

  return (
    <nav
      className={classes.drawer}
    >
      <Drawer
        container={container}
        variant='temporary'
        anchor='left'
        open={props.open}
        onClose={props.onClose}
        classes={{ paper: classes.drawerPaper, }}
        ModalProps={{ keepMounted: true, }}
      >
        <TextField
          className={classes.firstTextField}
          label='Marker title'
          onChange={event => setTitle(event.target.value)}
          variant='outlined'
          value={title}
        />
        <Grid
          container
          direction='row'
          justify='center'
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={latlng}
                  color='primary'
                  name='Lat Long'
                  onChange={() => setLatlng(!latlng)}
                />
              }
              label='Lat Long'
            />
          </FormGroup>
        </Grid>
        {(latlng) ?
          (
            <React.Fragment>
              <TextField
                className={classes.textField}
                label='Latitude'
                onBlur={pullElevation}
                onChange={event => setLat(event.target.value)}
                variant='outlined'
                value={lat}
              />
              <TextField
                className={classes.textField}
                label='Longitude'
                onBlur={pullElevation}
                onChange={event => setLng(event.target.value)}
                variant='outlined'
                value={lng}
              />
            </React.Fragment>
          ) :
          (
            <TextField
              className={classes.textField}
              label='MGRS'
              onBlur={pullElevation}
              onChange={event => setMgrs(event.target.value.toUpperCase())}
              variant='outlined'
              value={mgrs}
            />
          )
        }
        <TextField
          className={classes.textField}
          label='Elevation'
          onChange={event => setElevation(event.target.value)}
          variant='outlined'
          value={elevation}
        />
        {(props.marker !== null && (props.marker.layer === 'hostile' || props.marker.layer === 'threat')) ?
          (
            <Grid
              container
              direction='row'
              justify='center'
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={cas}
                      color='primary'
                      name='9 Line'
                      onChange={() => setCas(!cas)}
                    />
                  }
                  label='9 Line'
                />
              </FormGroup>
            </Grid>
          )
          : null
        }
        {(props.marker !== null && props.marker.layer === 'survivor') ?
          (
            <Grid
              container
              direction='row'
              justify='center'
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={csar}
                      color='primary'
                      name='15 Line'
                      onChange={() => setCsar(!csar)}
                    />
                  }
                  label='15 Line'
                />
              </FormGroup>
            </Grid>
          )
          : null
        }
        {(props.marker !== null && cas) ?
          (
            <React.Fragment>
              <TextField
                className={classes.firstTextField}
                label='Label'
                onChange={event => setCasLabel(event.target.value)}
                variant='outlined'
                value={casLabel}
              />
              <TextField
                className={classes.textField}
                label='Type / Method'
                onChange={event => setCasTypeMethod(event.target.value)}
                variant='outlined'
                value={casTypeMethod}
              />
              <TextField
                className={classes.textField}
                label='IP / HDG / Distance'
                onChange={event => setCasIpHdgDistance(event.target.value)}
                variant='outlined'
                value={casIpHdgDistance}
              />
              <TextField
                className={classes.textField}
                label='Elevation'
                onChange={event => setCasElevation(event.target.value)}
                variant='outlined'
                value={casElevation}
              />
              <TextField
                className={classes.textField}
                label='Description'
                onChange={event => setCasDescription(event.target.value)}
                variant='outlined'
                value={casDescription}
              />
              <TextField
                className={classes.textField}
                label='Location'
                onChange={event => setCasLocation(event.target.value)}
                variant='outlined'
                value={casLocation}
              />
              <TextField
                className={classes.textField}
                label='Mark'
                onChange={event => setCasMark(event.target.value)}
                variant='outlined'
                value={casMark}
              />
              <TextField
                className={classes.textField}
                label='Friendlies'
                onChange={event => setCasFriendlies(event.target.value)}
                variant='outlined'
                value={casFriendlies}
              />
              <TextField
                className={classes.textField}
                label='Egress'
                onChange={event => setCasEgress(event.target.value)}
                variant='outlined'
                value={casEgress}
              />
              <TextField
                className={classes.textField}
                label='Remarks &amp; Restrictions'
                onChange={event => setCasRemarks(event.target.value)}
                variant='outlined'
                value={casRemarks}
              />
            </React.Fragment>
          )
          : null
        }
        {(props.marker !== null && csar) ?
          (
            <React.Fragment>
              <TextField
                className={classes.textField}
                label='Callsign'
                onChange={event => setCsarCallsign(event.target.value)}
                variant='outlined'
                value={csarCallsign}
              />
              <TextField
                className={classes.textField}
                label='Frequency'
                onChange={event => setCsarFrequency(event.target.value)}
                variant='outlined'
                value={csarFrequency}
              />
              <TextField
                className={classes.textField}
                label='PLS/HHRID'
                onChange={event => setCsarPlsHhrid(event.target.value)}
                variant='outlined'
                value={csarPlsHhrid}
              />
              <TextField
                className={classes.textField}
                label='# of Objectives'
                onChange={event => setCsarNumObjectives(event.target.value)}
                variant='outlined'
                value={csarNumObjectives}
              />
              <TextField
                className={classes.textField}
                label='Location'
                onChange={event => setCsarLocation(event.target.value)}
                variant='outlined'
                value={csarLocation}
              />
              <TextField
                className={classes.textField}
                label='Elevation'
                onChange={event => setCsarElevation(event.target.value)}
                variant='outlined'
                value={csarElevation}
              />
              <TextField
                className={classes.textField}
                label='Date/Time(Z)'
                onChange={event => setCsarDateTime(event.target.value)}
                variant='outlined'
                value={csarDateTime}
              />
              <TextField
                className={classes.textField}
                label='Source'
                onChange={event => setCsarSource(event.target.value)}
                variant='outlined'
                value={csarSource}
              />
              <TextField
                className={classes.textField}
                label='Condition'
                onChange={event => setCsarCondition(event.target.value)}
                variant='outlined'
                value={csarCondition}
              />
              <TextField
                className={classes.textField}
                label='Equipment'
                onChange={event => setCsarEquipment(event.target.value)}
                variant='outlined'
                value={csarEquipment}
              />
              <TextField
                className={classes.textField}
                label='Authentication'
                onChange={event => setCsarAuthentication(event.target.value)}
                variant='outlined'
                value={csarAuthentication}
              />
              <TextField
                className={classes.textField}
                label='Threats'
                onChange={event => setCsarThreats(event.target.value)}
                variant='outlined'
                value={csarThreats}
              />
              <TextField
                className={classes.textField}
                label='PZ Description'
                onChange={event => setCsarPzDescription(event.target.value)}
                variant='outlined'
                value={csarPzDescription}
              />
              <TextField
                className={classes.textField}
                label='OSC/Freq'
                onChange={event => setCsarOscFreq(event.target.value)}
                variant='outlined'
                value={csarOscFreq}
              />
              <TextField
                className={classes.textField}
                label='IP/Heading'
                onChange={event => setCsarIpHdg(event.target.value)}
                variant='outlined'
                value={csarIpHdg}
              />
              <TextField
                className={classes.textField}
                label='Rescort'
                onChange={event => setCsarRescort(event.target.value)}
                variant='outlined'
                value={csarRescort}
              />
              <TextField
                className={classes.textField}
                label='Term Area Gameplan'
                onChange={event => setCsarGameplan(event.target.value)}
                variant='outlined'
                value={csarGameplan}
              />
              <TextField
                className={classes.textField}
                label='Signal'
                onChange={event => setCsarSignal(event.target.value)}
                variant='outlined'
                value={csarSignal}
              />
              <TextField
                className={classes.textField}
                label='Egress'
                onChange={event => setCsarEgress(event.target.value)}
                variant='outlined'
                value={csarEgress}
              />
            </React.Fragment>
          )
          : null
        }
        <Grid
          container
          direction='row'
          justify='center'
        >
          <Button
            className={classes.marginsMd}
            color='primary'
            onClick={handleSubmit}
            variant='contained'
          >
            Save Changes
        </Button>
        </Grid>
      </Drawer>
    </nav>
  )
}