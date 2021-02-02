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
import {
  SketchPicker as ColorPicker,
} from 'react-color'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button,
  Drawer,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import {
  LatLon as LL,
} from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import {
  sovereignties,
  threats,
  units,
} from '../../constants/threats'

import {
  echelons,
} from '../../constants/sidcCodes'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import { submitCoordInput } from '../../functions/submitCoordInput'
import getElevation from '../../functions/getElevation'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const drawerWidth = 240
const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  firstTextField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
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
}))

//----------------------------------------------------------------//
// Edit Marker Drawer Component
//----------------------------------------------------------------//
const EditMarkerDrawer = props => {

  //----------------------------------------------------------------//
  // Component Setup
  //----------------------------------------------------------------//
  const classes = useStyles()

  const container = props.window !== undefined ? () => window().document.body : undefined

  //----------------------------------------------------------------//
  // Component State
  //----------------------------------------------------------------//

  let initialState = {
    affiliation: '',
    color: {
      color: '',
      fillColor: '',
    },
    data: {
      cas: {
        intent: '',
        label: '',
        typeMethod: '',
        ip: '',
        hdg: '',
        distance: '',
        elevation: '',
        description: '',
        location: '',
        mark: 'None',
        friendlies: '',
        egress: '',
        remarks: '',
        tot: '',
        f2f: '',
      },
      csar: {
        callsign: '',
        frequency: 'A',
        plsHhrid: '',
        numObjectives: '1',
        location: '',
        elevation: '',
        dateTime: '',
        source: 'CSEL',
        condition: 'Ambulatory',
        equipment: 'Standard',
        authentication: '',
        threats: '',
        pzDescription: '',
        oscFreq: '',
        ipHdg: '',
        rescort: '',
        gameplan: '',
        signal: '',
        egress: '',
      },
    },
    echelon: '',
    location: {
      elevation: '',
      lat: '',
      lng: '',
      mgrs: '',
    },
    switches: {
      cas: false,
      csar: false,
      dashed: true,
      displayArty: true,
      fill: false,
      latlng: false,
      mgrsDisabled: false,
    },
    threat: {
      type: 0,
      range: 3,
      unit: 'NM',
      sovereignty: 'Hostile',
    },
    title: '',
  }

  const [_state, _setState] = React.useState(initialState)

  const getPosition = () => {
    // Get the position of the marker
    // Attempt to get MGRS first
    // If that fails, then disable MGRS, force the switch to lat/lng
    // And set the lat/lng
    let position = null
    let mgrsDisabled = false
    try {
      position = LL.parse(props.state.focusedMarker.latlng.lat, props.state.focusedMarker.latlng.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${props.state.focusedMarker.latlng.lat.toFixed(4)}, ${props.state.focusedMarker.latlng.lng.toFixed(4)}`
      mgrsDisabled = true
    }
    return {
      position,
      mgrsDisabled
    }
  }

  React.useEffect(() => {
    if (props.state.focusedMarker !== null) {
      let { position, mgrsDisabled } = getPosition()

      // Set the data to the initial state
      let cas = { ...initialState.data.cas }
      let csar = { ...initialState.data.csar }

      // Parse out the data
      if (props.state.focusedMarker.data !== null && props.state.focusedMarker.data !== undefined) {
        let { type, ...rest } = props.state.focusedMarker.data
        if (type === '9line') {
          cas = rest
        } else if (type === '15line') {
          csar = rest
        }
      }
      // If there is no data...
      else {
        cas = {
          ...cas,
          description: props.state.focusedMarker.title,
          elevation: props.state.focusedMarker.elevation,
          location: position,
        }
        csar = {
          ...csar,
          callsign: props.state.focusedMarker.title,
          elevation: props.state.focusedMarker.elevation,
          location: position,
        }
      }

      // Start building the new state
      let newState = {
        ...initialState,
        // Color is for threat and map label
        // Fill color is for the threat only
        color: {
          color: props.state.focusedMarker.color !== undefined ? props.state.focusedMarker.color : '',
          fillColor: props.state.focusedMarker.fillColor !== undefined ? props.state.focusedMarker.fillColor : '',
        },
        // Set the data to the parsed out data
        data: {
          cas,
          csar,
        },
        // Set location data
        // If MGRS is disabled, set it to blank
        location: {
          ..._state.location,
          elevation: props.state.focusedMarker.elevation,
          lat: props.state.focusedMarker.latlng.lat.toFixed(4),
          lng: props.state.focusedMarker.latlng.lng.toFixed(4),
          mgrs: mgrsDisabled ? '' : position,
        },
        // Set the state of all the switches
        switches: {
          cas:
            props.state.focusedMarker.data !== null &&
            props.state.focusedMarker.data !== undefined &&
            props.state.focusedMarker.data.type === '9line',
          csar:
            props.state.focusedMarker.data !== null &&
            props.state.focusedMarker.data !== undefined &&
            props.state.focusedMarker.data.type === '15line',
          dashed: props.state.focusedMarker.layer === 'threat' &&
            props.state.focusedMarker.dashed,
          displayArty:
            props.state.focusedMarker.arty.arty &&
            props.state.focusedMarker.arty.display,
          fill:
            props.state.focusedMarker.layer === 'threat' &&
            props.state.focusedMarker.fill,
          latlng: mgrsDisabled ? true : false,
          mgrsDisabled: mgrsDisabled ? true : false,
        },
        title: props.state.focusedMarker.title,
        threat: {
          type: props.state.focusedMarker.layer === 'threat' ? props.state.focusedMarker.threatType : 0,
          range: props.state.focusedMarker.layer === 'threat' ? props.state.focusedMarker.range : 3,
          unit: props.state.focusedMarker.layer === 'threat' ? props.state.focusedMarker.unit : 'NM',
          sovereignty: props.state.focusedMarker.layer === 'threat' ? props.state.focusedMarker.sovereignty : 'Hostile',
        }
      }

      if (props.state.focusedMarker.iconType === 'sidc') {
        newState = {
          ...newState,
          affiliation: props.state.focusedMarker.sidc.affiliation,
          echelon: props.state.focusedMarker.sidc.echelon,
        }
      }

      _setState(newState)
    }
  }, [props.state.focusedMarker])

  const handleClose = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
  }

  const pullElevation = () => {
    let position = false

    if (_state.switches.latlng) {
      position = submitCoordInput(_state.location.lat + ' ' + _state.location.lng)
    } else {
      position = submitCoordInput(_state.location.mgrs)
    }

    if (position !== false) {
      (async () => _setState({
        ..._state,
        location: {
          ..._state.location,
          elevation: (await getElevation(position.lat, position.lng))
        }
      }))()
    }
  }

  const handleThreatChange = event => {
    _setState({
      ..._state,
      threat: {
        ..._state.threat,
        type: event.target.value,
        range: threats[event.target.value].range,
        unit: 'NM',
      },
      title: event.target.value === 0 ?
        '' :
        threats[event.target.value].label
    })
  }

  const handleSovereigntyChange = event => {
    let color = {
      ..._state.color
    }

    switch (event.target.value) {
      case 'Hostile':
        color = {
          color: '#ff0000',
          fillColor: '#ff0000',
        }
        break
      case 'Suspect':
        color = {
          color: '#ffff00',
          fillColor: '#ffff00',
        }
        break
      case 'Unknown':
        color = {
          color: '#ffffff',
          fillColor: '#ffffff',
        }
        break
      case 'Friendly':
        color = {
          color: '#00ff00',
          fillColor: '#00ff00',
        }
        break
      default:
        console.error(`Error: Unknown sovereignty ${event.target.value}`)
    }

    _setState({
      ..._state,
      color,
      threat: {
        ..._state.threat,
        sovereignty: event.target.value,
      },
    })
  }

  const handleSubmit = () => {
    let target = false
    if (_state.switches.latlng) {
      target = submitCoordInput(_state.location.lat + ' ' + _state.location.lng)
    } else {
      target = submitCoordInput(_state.location.mgrs.toUpperCase())
    }

    if (target === false) {
      target = {
        lat: props.state.focusedMarker.latlng.lat,
        lon: props.state.focusedMarker.latlng.lng,
      }
    }

    let payload = {
      marker: props.state.focusedMarker,
      data: null,
      elevation: _state.location.elevation,
      latlng: { lat: target.lat, lng: target.lon },
      title: _state.title,
      arty: props.state.focusedMarker.arty,
    }

    if (props.state.focusedMarker.iconType === 'sidc') {
      payload = {
        ...payload,
        sidc: {
          affiliation: _state.affiliation,
          echelon: _state.echelon,
        }
      }
    }

    if ((props.state.focusedMarker.layer === 'threat' || props.state.focusedMarker.layer === 'hostile') && _state.switches.cas) {
      payload.data = {
        type: '9line',
        ..._state.data.cas,
      }
    } else if (props.state.focusedMarker.layer === 'survivor' && _state.switches.csar) {
      payload.data = {
        type: '15line',
        ..._state.data.csar,
      }
    }

    if (props.state.focusedMarker.arty.arty === true) {
      payload = {
        ...payload,
        arty: {
          arty: true,
          display: _state.switches.displayArty,
        }
      }
    }

    if (props.state.focusedMarker.layer === 'threat') {
      payload = {
        ...payload,
        threatType: _state.threat.type,
        range: _state.threat.range,
        unit: _state.threat.unit,
        sovereignty: _state.threat.sovereignty,
        fill: _state.switches.fill,
        fillColor: _state.color.fillColor,
        label: _state.threat.type === 0 ? 'Threat' : threats[_state.threat.type].title,
        dashed: _state.switches.dashed,
      }
    }

    if (props.state.focusedMarker.layer === 'mapLabel' || props.state.focusedMarker.layer === 'threat') {
      payload = {
        ...payload,
        color: _state.color.color,
      }
    }

    // Forward to the function
    handleMarkerEdit('edit', payload, props.state, props.setState)
  }

  return (
    <nav
      className={classes.drawer}
    >
      <Drawer
        container={container}
        variant='temporary'
        anchor='left'
        open={props.state.dialog.name === 'editMarker'}
        onClose={handleClose}
        classes={{ paper: classes.drawerPaper, }}
        ModalProps={{ keepMounted: true, }}
      >
        <TextField
          className={classes.firstTextField}
          label='Marker title'
          onChange={event => _setState({
            ..._state,
            title: event.target.value,
          })}
          variant='outlined'
          value={_state.title}
        />
        {props.state.focusedMarker !== null && props.state.focusedMarker.iconType === 'sidc' &&
          (
            <React.Fragment>
              <FormControl
                className={classes.marginsMd}
                variant='outlined'
              >
                <InputLabel>Affiliation</InputLabel>
                <Select
                  label='Affiliation'
                  onChange={event => _setState({ ..._state, affiliation: event.target.value })}
                  value={_state.affiliation}
                >
                  <MenuItem value='F'>Friendly</MenuItem>
                  <MenuItem value='H'>Hostile</MenuItem>
                  <MenuItem value='U'>Unknown</MenuItem>
                  <MenuItem value='N'>Neutral</MenuItem>
                </Select>
              </FormControl>
              <FormControl
                className={classes.marginsMd}
                variant='outlined'
              >
                <InputLabel>Echelon</InputLabel>
                <Select
                  label='Echelon'
                  onChange={event => _setState({ ..._state, echelon: event.target.value })}
                  value={_state.echelon}
                >
                  {echelons.map(code => (
                    <MenuItem
                      key={code.value}
                      value={code.value}
                    >
                      {code.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </React.Fragment>
          )}
        {props.state.focusedMarker !== null && props.state.focusedMarker.layer === 'threat' &&
          (
            <React.Fragment>
              <FormControl
                className={classes.marginsMd}
                variant='outlined'
              >
                <InputLabel>Threat Type</InputLabel>
                <Select
                  label='Threat Type'
                  onChange={handleThreatChange}
                  value={_state.threat.type}
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
                disabled={_state.threat.type !== 0}
                label='Range'
                onChange={event => _setState({
                  ..._state,
                  threat: {
                    ..._state.threat,
                    range: event.target.value
                  }
                })}
                value={_state.threat.range}
                variant='outlined'
              />
              <FormControl
                className={classes.marginsMd}
                variant='outlined'
              >
                <InputLabel>Unit</InputLabel>
                <Select
                  disabled={_state.threat.type !== 0}
                  label='Unit'
                  onChange={event => _setState({
                    ..._state,
                    threat: {
                      ..._state.threat,
                      unit: event.target.value
                    }
                  })}
                  value={_state.threat.unit}
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
                  value={_state.threat.sovereignty}
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
          )}
        <Grid
          container
          direction='row'
          justify='center'
        >
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={_state.switches.latlng}
                  color='primary'
                  disabled={_state.switches.mgrsDisabled}
                  name='Lat Long'
                  onChange={() => _setState({
                    ..._state,
                    switches: {
                      ..._state.switches,
                      latlng: !_state.switches.latlng,
                    },
                  })}
                />
              }
              label='Lat Long'
            />
          </FormGroup>
        </Grid>
        {_state.switches.latlng ?
          (
            <React.Fragment>
              <TextField
                className={classes.textField}
                label='Latitude'
                onBlur={pullElevation}
                onChange={event => _setState({
                  ..._state,
                  location: {
                    ..._state.location,
                    lat: event.target.value,
                  }
                })}
                variant='outlined'
                value={_state.location.lat}
              />
              <TextField
                className={classes.textField}
                label='Longitude'
                onBlur={pullElevation}
                onChange={event => _setState({
                  ..._state,
                  location: {
                    ..._state.location,
                    lng: event.target.value,
                  }
                })}
                variant='outlined'
                value={_state.location.lng}
              />
            </React.Fragment>
          ) :
          (
            <TextField
              className={classes.textField}
              label='MGRS'
              onBlur={pullElevation}
              onChange={event => _setState({
                ..._state,
                location: {
                  ..._state.location,
                  mgrs: event.target.value,
                }
              })}
              variant='outlined'
              value={_state.location.mgrs}
            />
          )
        }
        <TextField
          className={classes.textField}
          label='Elevation'
          onChange={event => _setState({
            ..._state,
            location: {
              ..._state.location,
              elevation: event.target.value,
            }
          })}
          variant='outlined'
          value={_state.location.elevation}
        />
        {(props.state.focusedMarker !== null && (props.state.focusedMarker.layer === 'mapLabel' || props.state.focusedMarker.layer === 'threat')) &&
          (
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
                color={_state.color.color}
                disableAlpha={true}
                onChange={color => _setState({
                  ..._state,
                  color: {
                    ..._state.color,
                    color: color.hex,
                  }
                })}
              />
            </Grid>
          )}
        {props.state.focusedMarker !== null && props.state.focusedMarker.layer === 'threat' &&
          (
            <React.Fragment>
              <Grid
                container
                direction='row'
                justify='center'
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={_state.switches.fill}
                      onChange={() => _setState({
                        ..._state,
                        switches: {
                          ..._state.switches,
                          fill: !_state.switches.fill,
                        }
                      })}
                      color='primary'
                    />
                  }
                  label='Fill'
                />
              </Grid>
              {_state.switches.fill && (
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
                    color={_state.color.fillColor}
                    disableAlpha={true}
                    onChange={color => _setState({
                      ..._state,
                      color: {
                        ..._state.color,
                        fillColor: color.hex,
                      }
                    })}
                  />
                </Grid>
              )}
              <Grid
                container
                direction='row'
                justify='center'
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={_state.switches.dashed}
                      onChange={() => _setState({
                        ..._state,
                        switches: {
                          ..._state.switches,
                          dashed: !_state.switches.dashed,
                        }
                      })}
                      color='primary'
                    />
                  }
                  label='Dashed'
                />
              </Grid>
            </React.Fragment>
          )}
        {(props.state.focusedMarker !== null && props.state.focusedMarker.arty.arty === true) &&
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
                      checked={_state.switches.displayArty}
                      color='primary'
                      name='Display PAA'
                      onChange={() => _setState({
                        ..._state,
                        switches: {
                          ..._state.switches,
                          displayArty: !_state.switches.displayArty,
                        }
                      })}
                    />
                  }
                  label='Display PAA'
                />
              </FormGroup>
            </Grid>
          )}
        {(props.state.focusedMarker !== null && (props.state.focusedMarker.layer === 'hostile' || props.state.focusedMarker.layer === 'threat')) &&
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
                      checked={_state.switches.cas}
                      color='primary'
                      name='9 Line'
                      onChange={() => _setState({
                        ..._state,
                        switches: {
                          ..._state.switches,
                          cas: !_state.switches.cas,
                        }
                      })}
                    />
                  }
                  label='9 Line'
                />
              </FormGroup>
            </Grid>
          )}
        {(props.state.focusedMarker !== null && props.state.focusedMarker.layer === 'survivor') &&
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
                      checked={_state.switches.csar}
                      color='primary'
                      name='15 Line'
                      onChange={() => _setState({
                        ..._state,
                        switches: {
                          ..._state.switches,
                          csar: !_state.switches.csar,
                        }
                      })}
                    />
                  }
                  label='15 Line'
                />
              </FormGroup>
            </Grid>
          )}
        {(props.state.focusedMarker !== null && _state.switches.cas) &&
          (
            <React.Fragment>
              <TextField
                className={classes.firstTextField}
                label='Label'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      label: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.label}
              />
              <TextField
                className={classes.textField}
                label='GFC Intent'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      intent: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.intent}
              />
              <TextField
                className={classes.textField}
                label='Type / Method'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      typeMethod: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.typeMethod}
              />
              <TextField
                className={classes.textField}
                label='IP'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      ip: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.ip}
              />
              <TextField
                className={classes.textField}
                label='HDG'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      hdg: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.hdg}
              />
              <TextField
                className={classes.textField}
                label='Distance'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      distance: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.distance}
              />
              <TextField
                className={classes.textField}
                label='Elevation'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      elevation: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.elevation}
              />
              <TextField
                className={classes.textField}
                label='Description'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      description: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.description}
              />
              <TextField
                className={classes.textField}
                label='Location'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      location: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.location}
              />
              <TextField
                className={classes.textField}
                label='Mark'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      mark: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.mark}
              />
              <TextField
                className={classes.textField}
                label='Friendlies'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      friendlies: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.friendlies}
              />
              <TextField
                className={classes.textField}
                label='Egress'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      egress: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.egress}
              />
              <TextField
                className={classes.textField}
                label='Remarks &amp; Restrictions'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      remarks: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.remarks}
              />
              <TextField
                className={classes.textField}
                label='TOT'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      tot: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.tot}
              />
              <TextField
                className={classes.textField}
                label='Fighter-to-Fighter'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    cas: {
                      ..._state.data.cas,
                      f2f: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.cas.f2f}
              />
            </React.Fragment>
          )}
        {(props.state.focusedMarker !== null && _state.switches.csar) &&
          (
            <React.Fragment>
              <TextField
                className={classes.textField}
                label='Callsign'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      callsign: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.callsign}
              />
              <TextField
                className={classes.textField}
                label='Frequency'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      frequency: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.frequency}
              />
              <TextField
                className={classes.textField}
                label='PLS/HHRID'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      plsHhrid: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.plsHhrid}
              />
              <TextField
                className={classes.textField}
                label='# of Objectives'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      numObjectives: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.numObjectives}
              />
              <TextField
                className={classes.textField}
                label='Location'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      location: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.location}
              />
              <TextField
                className={classes.textField}
                label='Elevation'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      elevation: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.elevation}
              />
              <TextField
                className={classes.textField}
                label='Date/Time(Z)'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      dateTime: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.dateTime}
              />
              <TextField
                className={classes.textField}
                label='Source'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      source: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.source}
              />
              <TextField
                className={classes.textField}
                label='Condition'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      condition: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.condition}
              />
              <TextField
                className={classes.textField}
                label='Equipment'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      equipment: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.equipment}
              />
              <TextField
                className={classes.textField}
                label='Authentication'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      authentication: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.authentication}
              />
              <TextField
                className={classes.textField}
                label='Threats'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      threats: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.threats}
              />
              <TextField
                className={classes.textField}
                label='PZ Description'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      pzDescription: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.pzDescription}
              />
              <TextField
                className={classes.textField}
                label='OSC/Freq'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      oscFreq: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.oscFreq}
              />
              <TextField
                className={classes.textField}
                label='IP/Heading'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      ipHdg: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.ipHdg}
              />
              <TextField
                className={classes.textField}
                label='Rescort'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      rescort: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.rescort}
              />
              <TextField
                className={classes.textField}
                label='Term Area Gameplan'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      gameplan: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.gameplan}
              />
              <TextField
                className={classes.textField}
                label='Signal'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      signal: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.signal}
              />
              <TextField
                className={classes.textField}
                label='Egress'
                onChange={event => _setState({
                  ..._state,
                  data: {
                    ..._state.data,
                    csar: {
                      ..._state.data.csar,
                      egress: event.target.value,
                    }
                  }
                })}
                variant='outlined'
                value={_state.data.csar.egress}
              />
            </React.Fragment>
          )}
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