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
  SketchPicker as ColorPicker 
} from 'react-color'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button,
  CardMedia,
  Checkbox,
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
// Dash Array Images
//----------------------------------------------------------------//
import stroke1_10 from '../../images/stroke-1-10.png'
import stroke10_10 from '../../images/stroke-10-10.png'
import stroke1_10_5_10 from '../../images/stroke-1-10-5-10.png'
import stroke10_10_5_10_5_10 from '../../images/stroke-10-10-5-10-5-10.png'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import { units } from '../../constants/threats'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon as LL } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import { submitCoordInput } from '../../functions/submitCoordInput'

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
// Shape Drawer Component
//----------------------------------------------------------------//
const EditShapeDrawer = props => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // Component State
  //----------------------------------------------------------------//
  const initialState = {
    bullseye: {
      angle: '',
      distance: '',
      rings: '',
    },
    circle: {
      radius: '',
      unit: '',
    },
    color: {
      color: '',
      fillColor: '',
    },
    dashArray: '',
    ellipse: {
      length: '',
      tilt: '',
      width: '',
    },
    location: {
      lat: '',
      lng: '',
      mgrs: '',
    },
    checkboxes: {
      dashed: false,
      fill: false,
      isAnchor: false,
      isSardot: false,
      latlng: false,
      mgrsDisabled: false,
      showData: true,
    },
    title: '',
  }


  const [_state, _setState] = React.useState(initialState)

  const container = props.window !== undefined ? () => window().document.body : undefined

  const getPosition = () => {
    // Get the position of the shape
    // Attempt to get MGRS first
    // If that fails, then disable MGRS, force the switch to lat/lng
    // And set the lat/lng
    let position = null
    let mgrsDisabled = false

    let center
    if (props.state.focusedShape.layer === 'ellipse') {
      center = props.state.focusedShape.center
    } else {
      center = props.state.focusedShape.latlng
    }

    try {
      position = LL.parse(center.lat, center.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`
      mgrsDisabled = true
    }
    return {
      position,
      mgrsDisabled
    }
  }


  React.useEffect(() => {
    if (props.state.focusedShape !== null) {
      let position, mgrsDisabled

      if (props.state.focusedShape.layer === 'bullseye' ||
        props.state.focusedShape.layer === 'circle' ||
        props.state.focusedShape.layer === 'ellipse') {

        let data = getPosition()
        position = data.position
        mgrsDisabled = data.mgrsDisabled
      }

      // Start building the new state
      let newState = {
        ...initialState,
        bullseye: {
          angle: props.state.focusedShape.layer === 'bullseye' ? props.state.focusedShape.angle : 45,
          distance: props.state.focusedShape.layer === 'bullseye' ? props.state.focusedShape.distance : 20,
          rings: props.state.focusedShape.layer === 'bullseye' ? props.state.focusedShape.rings : 5,
        },
        circle: {
          radius: props.state.focusedShape.layer === 'circle' ? props.state.focusedShape.radius.toFixed(2) : 0,
          unit: props.state.focusedShape.layer === 'circle' ? props.state.focusedShape.unit : 'm',
        },
        color: {
          color: props.state.focusedShape.color !== null ? props.state.focusedShape.color : '#4A90E2',
          fillColor: props.state.focusedShape.fillColor !== null ? props.state.focusedShape.fillColor : '#4A90E2',
        },
        dashArray: props.state.focusedShape.dashArray !== null ? props.state.focusedShape.dashArray : '10,10',
        ellipse: {
          length: props.state.focusedShape.layer === 'ellipse' ? props.state.focusedShape.length / 926 : 10,
          width: props.state.focusedShape.layer === 'ellipse' ? props.state.focusedShape.width / 926 : 2,
          tilt: props.state.focusedShape.layer === 'ellipse' ? props.state.focusedShape.tilt - 90 : 0,
        },
        location: {
          lat:
            props.state.focusedShape.layer === 'circle' ||
              props.state.focusedShape.layer === 'bullseye' ?
              props.state.focusedShape.latlng.lat.toFixed(4) :
              props.state.focusedShape.layer === 'ellipse' ?
                props.state.focusedShape.center.lat.toFixed(4) :
                '',
          lng:
            props.state.focusedShape.layer === 'circle' ||
              props.state.focusedShape.layer === 'bullseye' ?
              props.state.focusedShape.latlng.lng.toFixed(4) :
              props.state.focusedShape.layer === 'ellipse' ?
                props.state.focusedShape.center.lng.toFixed(4) :
                '',
          mgrs: mgrsDisabled ? '' : position,
        },
        checkboxes: {
          dashed: props.state.focusedShape.dashArray === null ? false : true,
          fill: props.state.focusedShape.fillColor === null ? false : true,
          isAnchor:
            props.state.focusedShape.layer === 'bullseye' &&
            props.state.focusedShape.anchor,
          isSardot:
            props.state.focusedShape.layer === 'bullseye' &&
            props.state.focusedShape.sardot !== undefined &&
            props.state.focusedShape.sardot,
          mgrsDisabled,
          showData:
            props.state.focusedShape.layer === 'bullseye' &&
            props.state.focusedShape.showData,
        },
        title: props.state.focusedShape.title,
      }

      _setState(newState)
    }
  }, [props.state.focusedShape])

  const handleUnitChange = newUnit => {
    let radius = _state.circle.radius

    switch (_state.circle.unit) {
      case 'm':
        if (newUnit === 'km') {
          radius = (radius / 1000).toFixed(2)
        } else if (newUnit === 'NM') {
          radius = (radius / 1852).toFixed(2)
        }
        break
      case 'km':
        if (newUnit === 'm') {
          radius = (radius * 1000).toFixed(2)
        } else if (newUnit === 'NM') {
          radius = (radius / 1.852).toFixed(2)
        }
        break
      case 'NM':
        if (newUnit === 'm') {
          radius = (radius * 1852).toFixed(2)
        } else if (newUnit === 'km') {
          radius = (radius * 1.852).toFixed(2)
        }
        break
      default:
        break
    }
    _setState({
      ..._state,
      circle: {
        radius,
        unit: newUnit,
      }
    })
  }

  const handleSubmit = () => {
    let payload = {
      marker: props.state.focusedShape,
      color: _state.color.color,
      title: _state.title,
    }

    if (props.state.focusedShape.layer !== 'bullseye') {
      payload = {
        ...payload,
        dashArray: _state.checkboxes.dashed ? _state.dashArray : null,
      }
    }

    if (props.state.focusedShape.layer !== 'line' && props.state.focusedShape.layer !== 'bullseye') {
      payload = {
        ...payload,
        fillColor: _state.checkboxes.fill ? _state.color.fillColor : null,
      }
    }

    if (props.state.focusedShape.layer === 'circle' || props.state.focusedShape.layer === 'ellipse' || props.state.focusedShape.layer === 'bullseye') {
      let target = false
      if (_state.checkboxes.latlng) {
        target = submitCoordInput(_state.location.lat + ', ' + _state.location.lng)
      } else {
        target = submitCoordInput(_state.location.mgrs.toUpperCase())
      }

      if (target === false) {
        target = {
          lat: props.state.focusedShape.latlng.lat,
          lon: props.state.focusedShape.latlng.lng,
        }
      }

      payload = {
        ...payload,
        latlng: { lat: target.lat, lng: target.lon },
      }
    }

    if (props.state.focusedShape.layer === 'ellipse') {
      payload = {
        ...payload,
        length: _state.ellipse.length * 926,
        width: _state.ellipse.width * 926,
        tilt: Number.parseInt(_state.ellipse.tilt) + 90
      }
    }

    if (props.state.focusedShape.layer === 'circle') {
      payload = {
        ...payload,
        radius: Number.parseFloat(_state.circle.radius),
        unit: _state.circle.unit,
      }
    }

    if (props.state.focusedShape.layer === 'bullseye') {
      payload = {
        ...payload,
        anchor: _state.checkboxes.isAnchor,
        sardot: _state.checkboxes.isSardot,
        distance: isNaN(_state.bullseye.distance) ? props.state.focusedShape.distance : Number.parseFloat(_state.bullseye.distance),
        rings: isNaN(_state.bullseye.rings) ? props.state.focusedShape.rings : Number.parseInt(_state.bullseye.rings),
        angle: isNaN(_state.bullseye.angle) ? props.state.focusedShape.angle : Math.round(Number.parseFloat(_state.bullseye.angle)),
        showData: _state.checkboxes.showData,
      }
    }

    handleMarkerEdit('edit', payload, props.state, props.setState)
  }

  const handleClose = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
  }

  return (
    <nav
      className={classes.drawer}
    >
      <Drawer
        container={container}
        variant='temporary'
        anchor='left'
        open={props.state.dialog.name === 'editShape'}
        onClose={handleClose}
        classes={{ paper: classes.drawerPaper, }}
        ModalProps={{ keepMounted: true, }}
      >
        <Grid
          container
          direction='row'
          justify='center'
        >
          <TextField
            className={classes.firstTextField}
            label='Shape label'
            onChange={event => _setState({
              ..._state,
              title: event.target.value,
            })}
            variant='outlined'
            value={_state.title}
          />
          {(props.state.focusedShape !== null &&
            (props.state.focusedShape.layer === 'circle' ||
              props.state.focusedShape.layer === 'ellipse' ||
              props.state.focusedShape.layer === 'bullseye')) &&
            (
              <React.Fragment>
                <Grid
                  container
                  direction='row'
                  justify='center'
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={_state.checkboxes.latlng}
                          color='primary'
                          disabled={_state.checkboxes.mgrsDisabled}
                          name='latLng'
                          onChange={() => _setState({
                            ..._state,
                            checkboxes: {
                              ..._state.checkboxes,
                              latlng: !_state.checkboxes.latlng,
                            },
                          })}
                        />
                      }
                      label='Lat Long'
                    />
                  </FormGroup>
                </Grid>
                {_state.checkboxes.latlng ?
                  <React.Fragment>
                    <TextField
                      className={classes.textField}
                      label='Latitude'
                      onChange={event => _setState({
                        ..._state,
                        location: {
                          ..._state.location,
                          lat: event.target.value,
                        },
                      })}
                      variant='outlined'
                      value={_state.location.lat}
                    />
                    <TextField
                      className={classes.textField}
                      label='Longitude'
                      onChange={event => _setState({
                        ..._state,
                        location: {
                          ..._state.location,
                          lng: event.target.value,
                        },
                      })}
                      variant='outlined'
                      value={_state.location.lng}
                    />
                  </React.Fragment>
                  :
                  <TextField
                    className={classes.textField}
                    label='MGRS'
                    onChange={event => _setState({
                      ..._state,
                      location: {
                        ..._state.location,
                        mgrs: event.target.value,
                      },
                    })}
                    variant='outlined'
                    value={_state.location.mgrs}
                  />
                }
              </React.Fragment>
            )}
          {(props.state.focusedShape !== null && props.state.focusedShape.layer === 'bullseye') &&
            (
              <React.Fragment>
                <TextField
                  className={classes.textField}
                  label='Number of rings'
                  onChange={event => _setState({
                    ..._state,
                    bullseye: {
                      ..._state.bullseye,
                      rings: event.target.value,
                    },
                  })}
                  variant='outlined'
                  value={_state.bullseye.rings}
                />
                <TextField
                  className={classes.textField}
                  label='NM between rings'
                  onChange={event => _setState({
                    ..._state,
                    bullseye: {
                      ..._state.bullseye,
                      distance: event.target.value,
                    },
                  })}
                  variant='outlined'
                  value={_state.bullseye.distance}
                />
                <TextField
                  className={classes.textField}
                  label='Angle between radials'
                  onChange={event => _setState({
                    ..._state,
                    bullseye: {
                      ..._state.bullseye,
                      angle: event.target.value,
                    },
                  })}
                  variant='outlined'
                  value={_state.bullseye.angle}
                />
                <Grid
                  container
                  direction='row'
                  justify='center'
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={_state.checkboxes.showData}
                          color='primary'
                          name='showData'
                          onChange={() => _setState({
                            ..._state,
                            checkboxes: {
                              ..._state.checkboxes,
                              showData: !_state.checkboxes.showData,
                            },
                          })}
                        />
                      }
                      label='Show Data'
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='center'
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={_state.checkboxes.isAnchor}
                          color='primary'
                          name='isAnchor'
                          onChange={() => _setState({
                            ..._state,
                            checkboxes: {
                              ..._state.checkboxes,
                              isAnchor: !_state.checkboxes.isAnchor,
                              isSardot: false,
                            },
                          })}
                        />
                      }
                      label='Use as Anchor'
                    />
                  </FormGroup>
                </Grid>
                <Grid
                  container
                  direction='row'
                  justify='center'
                >
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={_state.checkboxes.isSardot}
                          color='primary'
                          name='isSardot'
                          onChange={() => _setState({
                            ..._state,
                            checkboxes: {
                              ..._state.checkboxes,
                              isAnchor: false,
                              isSardot: !_state.checkboxes.isSardot,
                            },
                          })}
                        />
                      }
                      label='Use as SARDOT'
                    />
                  </FormGroup>
                </Grid>
              </React.Fragment>
            )}
          {(props.state.focusedShape !== null && props.state.focusedShape.layer === 'circle') &&
            (
              <React.Fragment>
                <TextField
                  className={classes.textField}
                  label='Radius'
                  onChange={event => _setState({
                    ..._state,
                    circle: {
                      ..._state.circle,
                      radius: event.target.value,
                    },
                  })}
                  variant='outlined'
                  value={_state.circle.radius}
                />
                <FormControl
                  className={classes.marginsMd}
                  fullWidth={true}
                  variant='outlined'
                >
                  <InputLabel>Radius Unit</InputLabel>
                  <Select
                    label='Radius Unit'
                    onChange={event => handleUnitChange(event.target.value)}
                    value={_state.circle.unit}
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
              </React.Fragment>
            )}
          {(props.state.focusedShape !== null && props.state.focusedShape.layer === 'ellipse') &&
            (
              <React.Fragment>
                <TextField
                  className={classes.textField}
                  label='Ellipse length (NM)'
                  onChange={event => _setState({
                    ..._state,
                    ellipse: {
                      ..._state.ellipse,
                      length: event.target.value,
                    },
                  })}
                  variant='outlined'
                  value={_state.ellipse.length}
                />
                <TextField
                  className={classes.textField}
                  label='Ellipse width (NM)'
                  onChange={event => _setState({
                    ..._state,
                    ellipse: {
                      ..._state.ellipse,
                      width: event.target.value,
                    },
                  })}
                  variant='outlined'
                  value={_state.ellipse.width}
                />
                <TextField
                  className={classes.textField}
                  helperText=' -90 (W) to 90 (E)'
                  label='Ellipse tilt'
                  onChange={event => _setState({
                    ..._state,
                    ellipse: {
                      ..._state.ellipse,
                      tilt: event.target.value,
                    },
                  })}
                  variant='outlined'
                  value={_state.ellipse.tilt}
                />
              </React.Fragment>
            )}
        </Grid>
        <Grid
          container
          direction='row'
          justify='center'
        >
          <Typography
            variant='body1'
          >
            Stroke Color
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
              },
            })}
          />
        </Grid>
        {(props.state.focusedShape !== null && props.state.focusedShape.layer !== 'line' && props.state.focusedShape.layer !== 'bullseye') &&
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
                      checked={_state.checkboxes.fill}
                      color='primary'
                      name='fill'
                      onChange={() => _setState({
                        ..._state,
                        checkboxes: {
                          ..._state.checkboxes,
                          fill: !_state.checkboxes.fill,
                        },
                      })}
                    />
                  }
                  label='Fill'
                />
              </FormGroup>
              {_state.checkboxes.fill ?
                <Grid
                  container
                  direction='row'
                  justify='center'
                >
                  <Typography variant='body1'>
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
                      },
                    })}
                  />
                </Grid>
                : null
              }
            </Grid>
          )}
        {(props.state.focusedShape !== null && props.state.focusedShape.layer !== 'bullseye') &&
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
                      checked={_state.checkboxes.dashed}
                      color='primary'
                      name='dashed'
                      onChange={() => _setState({
                        ..._state,
                        checkboxes: {
                          ..._state.checkboxes,
                          dashed: !_state.checkboxes.dashed,
                        },
                      })}
                    />
                  }
                  label='Dashed'
                />
              </FormGroup>
              {_state.checkboxes.dashed &&
                (
                  <Grid
                    container
                    direction='row'
                    justify='center'
                  >
                    <FormControl
                      className={classes.marginsMd}
                      fullWidth
                      variant='outlined'
                    >
                      <InputLabel>Dash Array</InputLabel>
                      <Select
                        label='Dash Array'
                        onChange={event => _setState({
                          ..._state,
                          dashArray: event.target.value
                        })}
                        value={_state.dashArray}
                      >
                        <MenuItem
                          value='1,10'
                        >
                          <CardMedia
                            alt={'Stroke 1,10'}
                            component='img'
                            src={stroke1_10}
                            title='Stroke 1,10'
                          />
                        </MenuItem>
                        <MenuItem
                          value='10,10'
                        >
                          <CardMedia
                            alt={'Stroke 10,10'}
                            component='img'
                            src={stroke10_10}
                            title='Stroke 10,10'
                          />
                        </MenuItem>
                        <MenuItem
                          value='1,10,5,10'
                        >
                          <CardMedia
                            alt={'Stroke 1,10,5,10'}
                            component='img'
                            src={stroke1_10_5_10}
                            title='Stroke 1,10,5,10'
                          />
                        </MenuItem>
                        <MenuItem
                          value='10,10,5,10,5,10'
                        >
                          <CardMedia
                            alt={'Stroke 10,10,5,10,5,10'}
                            component='img'
                            src={stroke10_10_5_10_5_10}
                            title='Stroke 10,10,5,10,5,10'
                          />
                        </MenuItem>
                      </Select>
                    </FormControl>
                    <TextField
                      className={classes.textField}
                      helperText='Comma separated values, every other number is line to gap in pixels.'
                      label='Dash Array'
                      onChange={event => _setState({
                        ..._state,
                        dashArray: event.target.value,
                      })}
                      variant='outlined'
                      value={_state.dashArray}
                    />
                  </Grid>
                )}
            </Grid>
          )}
        <Grid
          container
          direction='row'
          justify='center'
        >
          {props.state.focusedShape !== null &&
            (props.state.focusedShape.layer === 'line' ||
              props.state.focusedShape.layer === 'polygon' ||
              props.state.focusedShape.layer === 'rectangle') &&
            (
              <Button
                className={classes.marginsMd}
                color='primary'
                onClick={() => props.setState({
                  ...props.state,
                  dialog: {
                    anchor: null,
                    name: 'shapePoints',
                  },
                })}
                variant='contained'
              >
                {`View ${props.state.focusedShape.layer === 'rectangle' ? 'Bounds' : 'Points'}`}
              </Button>
            )}
          <Button
            className={classes.marginsMd}
            color='primary'
            onClick={() => handleSubmit()}
            variant='contained'
          >
            Save Changes
          </Button>
        </Grid>
      </Drawer>
    </nav>
  )
}

export default EditShapeDrawer