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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'
import { SketchPicker as ColorPicker } from 'react-color'
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Functions
//----------------------------------------------------------------//
import { submitCoordInput } from '../functions/submitCoordInput'

//----------------------------------------------------------------//
// Constants
//----------------------------------------------------------------//
import { sovereignties, threats, units } from '../constants/threats'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
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

//----------------------------------------------------------------//
// Edit Marker Drawer Component
//----------------------------------------------------------------//
const EditMarkerDrawer = (props) => {
  const classes = useStyles()

  const container = props.window !== undefined ? () => window().document.body : undefined

  // Every Marker has these
  const [title, setTitle] = React.useState('')
  const [mgrs, setMgrs] = React.useState('')
  const [lat, setLat] = React.useState('')
  const [lng, setLng] = React.useState('')
  const [elevation, setElevation] = React.useState('')
  const [mgrsDisabled, setMgrsDisabled] = React.useState(false)

  // Threats
  const [threatType, setThreatType] = React.useState(0)
  const [range, setRange] = React.useState('3')
  const [unit, setUnit] = React.useState('NM')
  const [sovereignty, setSovereignty] = React.useState('Hostile')

  // Arty data display
  const [artyDisplay, setArtyDisplay] = React.useState(true)

  // Building Label Color
  const [color, setColor] = React.useState('')
  const [fillColor, setFillColor] = React.useState('')

  // Control the switch for LatLng, 9-Lines, and 15-Lines, and threat fills
  const [latlng, setLatlng] = React.useState(false)
  const [cas, setCas] = React.useState(false)
  const [csar, setCsar] = React.useState(false)
  const [fill, setFill] = React.useState(false)


  // Control 9-Line TextFields
  const [casIntent, setCasIntent] = React.useState('')
  const [casLabel, setCasLabel] = React.useState('')
  const [casTypeMethod, setCasTypeMethod] = React.useState('')
  const [casIp, setCasIp] = React.useState('')
  const [casHdg, setCasHdg] = React.useState('')
  const [casDistance, setCasDistance] = React.useState('')
  const [casElevation, setCasElevation] = React.useState('')
  const [casDescription, setCasDescription] = React.useState('')
  const [casLocation, setCasLocation] = React.useState('')
  const [casMark, setCasMark] = React.useState('')
  const [casFriendlies, setCasFriendlies] = React.useState('')
  const [casEgress, setCasEgress] = React.useState('')
  const [casRemarks, setCasRemarks] = React.useState('')
  const [casTot, setCasTot] = React.useState('')
  const [casF2F, setCasF2F] = React.useState('')

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

  const getMgrs = () => {
    let position

    if (props.marker !== null) {
      try {
        position = LatLon.parse(props.marker.latlng.lat, props.marker.latlng.lng).toUtm().toMgrs().toString()
      } catch (e) {
        // Logging?
      }

      if (position !== undefined) {
        setMgrs(position)
        setMgrsDisabled(false)
        if (props.marker.data === null) {
          setCasLocation(position)
          setCsarLocation(position)
        }
      } else {
        setLatlng(true)
        setMgrsDisabled(true)
        if (props.marker.data === null) {
          setCasLocation(`${props.marker.latlng.lat.toFixed(4)}, ${props.marker.latlng.lng.toFixed(4)}`)
          setCsarLocation(`${props.marker.latlng.lat.toFixed(4)}, ${props.marker.latlng.lng.toFixed(4)}`)
        }
      }
    }
  }

  React.useEffect(() => {
    if (props.marker !== null) {
      setTitle(props.marker.title)
      getMgrs()
      setLat(props.marker.latlng.lat.toFixed(4))
      setLng(props.marker.latlng.lng.toFixed(4))
      setElevation(props.marker.elevation)
      setCas(false)
      setCsar(false)

      if (props.marker.arty.arty === true) {
        setArtyDisplay(props.marker.arty.display)
      }

      if (props.marker.layer === 'threat') {
        setThreatType(props.marker.threatType)
        setRange(props.marker.range)
        setUnit(props.marker.unit)
        setSovereignty(props.marker.sovereignty)
        setFill(props.marker.fill)
        setFillColor(props.marker.fillColor)
      }

      if (props.marker.layer === 'building' || props.marker.layer === 'threat') {
        setColor(props.marker.color)
      }

      if (props.marker.layer === 'hostile' || props.marker.layer === 'threat') {
        if (props.marker.data === null) {
          setCasElevation(props.marker.elevation)
          setCasDescription(props.marker.title)
          setCasMark('None')
        } else {
          setCas(true)
          setCasLabel(props.marker.data.label)
          setCasIntent(props.marker.data.intent)
          setCasTypeMethod(props.marker.data.typeMethod)
          setCasIp(props.marker.data.ip)
          setCasHdg(props.marker.data.hdg)
          setCasDistance(props.marker.data.distance)
          setCasElevation(props.marker.data.elevation)
          setCasDescription(props.marker.data.description)
          setCasLocation(props.marker.data.location)
          setCasMark(props.marker.data.mark)
          setCasFriendlies(props.marker.data.friendlies)
          setCasEgress(props.marker.data.egress)
          setCasRemarks(props.marker.data.remarks)
          setCasTot(props.marker.data.tot)
          setCasF2F(props.marker.data.f2f)
        }
      } else if (props.marker.layer === 'survivor') {
        if (props.marker.data === null) {
          setCsarCallsign(props.marker.title)
          setCsarFrequency('A')
          setCsarNumObjectives('1')
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

  const handleThreatChange = event => {
    if (event.target.value === 0) {
      setTitle('')
    } else {
      setTitle(threats[event.target.value].label)
    }
    setThreatType(event.target.value)
    setRange(threats[event.target.value].range)
    setUnit('NM')
  }

  const handleSovereigntyChange = event => {
    setSovereignty(event.target.value)
    switch (event.target.value) {
      case 'Hostile':
        setColor('#ff0000')
        setFillColor('#ff0000')
        break
      case 'Suspect':
        setColor('#ffff00')
        setFillColor('#ffff00')
        break
      case 'Unknown':
        setColor('#ffffff')
        setFillColor('#ffffff')
        break
      case 'Friendly':
        setColor('#00ff00')
        setFillColor('#00ff00')
        break
      default:
        console.error(`Error: Unknown sovereignty ${event.target.value}`)
    }
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
      latlng: { lat: target.lat, lng: target.lon },
      title: title,
      arty: props.marker.arty,
    }

    if ((props.marker.layer === 'threat' || props.marker.layer === 'hostile') && cas) {
      payload.data = {
        type: '9line',
        label: casLabel,
        intent: casIntent,
        typeMethod: casTypeMethod,
        ip: casIp,
        hdg: casHdg,
        distance: casDistance,
        elevation: casElevation,
        description: casDescription,
        location: casLocation,
        mark: casMark,
        friendlies: casFriendlies,
        egress: casEgress,
        remarks: casRemarks,
        tot: casTot,
        f2f: casF2F,
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

    if (props.marker.arty.arty === true) {
      payload = {
        ...payload,
        arty: {
          arty: true,
          display: artyDisplay,
        }
      }
    }

    if (props.marker.layer === 'threat') {
      payload = {
        ...payload,
        threatType: threatType,
        range: range,
        unit: unit,
        sovereignty: sovereignty,
        fill: fill,
        fillColor: fillColor,
        label: threatType === 0 ? 'Threat' : threats[threatType].title
      }
    }

    if (props.marker.layer === 'mapLabel' || props.marker.layer === 'threat') {
      payload = {
        ...payload,
        color: color,
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
        {props.marker !== null && props.marker.layer === 'threat' ? (
          <React.Fragment>
            <FormControl
              className={classes.marginsMd}
              variant='outlined'
            >
              <InputLabel>Threat Type</InputLabel>
              <Select
                label='Threat Type'
                onChange={handleThreatChange}
                value={threatType}
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
              className={classes.textField}
              disabled={threatType !== 0}
              label='Range'
              onChange={event => setRange(event.target.value)}
              value={range}
              variant='outlined'
            />
            <FormControl
              className={classes.marginsMd}
              variant='outlined'
            >
              <InputLabel>Unit</InputLabel>
              <Select
                disabled={threatType !== 0}
                label='Unit'
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
            <FormControl
              className={classes.marginsMd}
              variant='outlined'
            >
              <InputLabel>Sovereignty</InputLabel>
              <Select
                label='Sovereignty'
                onChange={handleSovereigntyChange}
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
          </React.Fragment>
        )
          : null}
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
                  disabled={mgrsDisabled}
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
        {(props.marker !== null && (props.marker.layer === 'mapLabel' || props.marker.layer === 'threat')) ?
          <Grid
            container
            direction='row'
            justify='center'
          >
            <Typography
              variant='body1'
            >
              Color
            </Typography>
            <ColorPicker
              className={classes.marginsMd}
              color={color}
              disableAlpha={true}
              onChange={color => setColor(color.hex)}
            />
          </Grid>
          : null
        }
        {props.marker !== null && props.marker.layer === 'threat' ? (
          <React.Fragment>
            <Grid
              container
              direction='row'
              justify='center'
            >
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
            </Grid>
            {fill ?
              <Grid
                container
                direction='row'
                justify='center'
              >
                <Typography
                  variant='body1'
                >
                  Fill Color
                </Typography>
                <ColorPicker
                  className={classes.marginsMd}
                  color={fillColor}
                  disableAlpha={true}
                  onChange={color => setFillColor(color.hex)}
                />
              </Grid>
              : null
            }
          </React.Fragment>

        )
          : null}
        {(props.marker !== null && props.marker.arty.arty === true) ?
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
                      checked={artyDisplay}
                      color='primary'
                      name='Display PAA'
                      onChange={() => setArtyDisplay(!artyDisplay)}
                    />
                  }
                  label='Display PAA'
                />
              </FormGroup>
            </Grid>
          )
          : null

        }
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
                label='GFC Intent'
                onChange={event => setCasIntent(event.target.value)}
                variant='outlined'
                value={casIntent}
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
                label='IP'
                onChange={event => setCasIp(event.target.value)}
                variant='outlined'
                value={casIp}
              />
              <TextField
                className={classes.textField}
                label='HDG'
                onChange={event => setCasHdg(event.target.value)}
                variant='outlined'
                value={casHdg}
              />
              <TextField
                className={classes.textField}
                label='Distance'
                onChange={event => setCasDistance(event.target.value)}
                variant='outlined'
                value={casDistance}
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
              <TextField
                className={classes.textField}
                label='TOT'
                onChange={event => setCasTot(event.target.value)}
                variant='outlined'
                value={casTot}
              />
              <TextField
                className={classes.textField}
                label='Fighter-to-Fighter'
                onChange={event => setCasF2F(event.target.value)}
                variant='outlined'
                value={casF2F}
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

export default EditMarkerDrawer