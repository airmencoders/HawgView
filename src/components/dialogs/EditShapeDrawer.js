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
import { SketchPicker as ColorPicker } from 'react-color'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button,
  CardMedia,
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
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import { submitCoordInput } from '../../functions/submitCoordInput'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  flex: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  marginsMd: {
    margin: theme.spacing(2),
  },
  marginsSm: {
    margin: theme.spacing(1),
  },
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
    marginBottom: theme.spacing(1),
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}))

//----------------------------------------------------------------//
// Shape Drawer Component
//----------------------------------------------------------------//
const ShapeDrawer = (props) => {
  const classes = useStyles()

  const [dashed, setDashed] = React.useState(false)
  const [dashArray, setDashArray] = React.useState('12, 12')
  const [fill, setFill] = React.useState(false)
  const [fillColor, setFillColor] = React.useState('#4A90E2')
  const [title, setTitle] = React.useState('')
  const [color, setColor] = React.useState('#4A90E2')
  const [length, setLength] = React.useState(10)
  const [width, setWidth] = React.useState(2)
  const [tilt, setTilt] = React.useState(0)
  const [radius, setRadius] = React.useState(0)
  const [unit, setUnit] = React.useState('m')
  const [distance, setDistance] = React.useState(20)
  const [rings, setRings] = React.useState(5)
  const [angle, setAngle] = React.useState(45)
  const [lat, setLat] = React.useState('')
  const [lng, setLng] = React.useState('')
  const [mgrs, setMgrs] = React.useState('')
  const [latlng, setLatlng] = React.useState(false)
  const [showData, setShowData] = React.useState(true)
  const [mgrsDisabled, setMgrsDisabled] = React.useState(false)
  const [isAnchor, setIsAnchor] = React.useState(false)

  const container = props.window !== undefined ? () => window().document.body : undefined

  const getMgrs = () => {
    let position
    let center

    if (props.shape !== null) {
      if(props.shape.layer === 'ellipse') {
        center = props.shape.center
      } else {
        center = props.shape.latlng
      }
      try {
        position = LatLon.parse(center.lat, center.lng).toUtm().toMgrs().toString()
      } catch (error) {
        console.log(`Unable to parse MGRS coordinates from coordinates (${center.lat}, ${center.lng})`)
      }

      if (position !== undefined) {
        setMgrs(position)
        setMgrsDisabled(false)
      } else {
        setLatlng(true)
        setMgrsDisabled(true)
      }
    }
  }

  React.useEffect(() => {
    if (props.shape !== null) {
      setDashed(props.shape.dashArray === null ? false : true)
      setDashArray(props.shape.dashArray === null ? '10,10' : props.shape.dashArray)
      setFill(props.shape.fillColor === null ? false : true)
      setFillColor(props.shape.fillColor === null ? '#4A90E2' : props.shape.fillColor)
      setTitle(props.shape.title)
      setColor(props.shape.color)

      if (props.shape.layer === 'ellipse') {
        setLength(props.shape.length / 926)
        setWidth(props.shape.width / 926)
        setTilt(props.shape.tilt - 90)
      }

      if (props.shape.layer === 'circle') {
        setRadius(Number.parseFloat(props.shape.radius).toFixed(2))
        setUnit(props.shape.unit)
      }

      if (props.shape.layer === 'bullseye') {
        setDistance(props.shape.distance)
        setRings(props.shape.rings)
        setAngle(props.shape.angle)
        setShowData(props.shape.showData)
        setIsAnchor(props.shape.anchor)
      }

      if (props.shape.layer === 'ellipse') {
        getMgrs()
        setLat(props.shape.center.lat.toFixed(4))
        setLng(props.shape.center.lng.toFixed(4))
      }

      if (props.shape.layer === 'circle' || props.shape.layer === 'bullseye') {
        getMgrs()
        setLat(props.shape.latlng.lat.toFixed(4))
        setLng(props.shape.latlng.lng.toFixed(4))
      }
    }
  }, [props.shape])

  const handleUnitChange = newUnit => {
    switch (unit) {
      case 'm':
        if (newUnit === 'km') {
          setRadius((radius / 1000).toFixed(2))
        } else if (newUnit === 'NM') {
          setRadius((radius / 1852).toFixed(2))
        }
        break
      case 'km':
        if (newUnit === 'm') {
          setRadius((radius * 1000).toFixed(2))
        } else if (newUnit === 'NM') {
          setRadius((radius / 1.852).toFixed(2))
        }
        break
      case 'NM':
        if (newUnit === 'm') {
          setRadius((radius * 1852).toFixed(2))
        } else if (newUnit === 'km') {
          setRadius((radius * 1.852).toFixed(2))
        }
        break
      default:
        break
    }
    setUnit(newUnit)
  }

  const handleSubmit = () => {
    let payload = {
      marker: props.shape,
      color: color,
      title: title,
    }

    if (props.shape.layer !== 'bullseye') {
      payload = {
        ...payload,
        dashArray: dashed ? dashArray : null,
      }
    }

    if (props.shape.layer !== 'line' && props.shape.layer !== 'bullseye') {
      payload = {
        ...payload,
        fillColor: fill ? fillColor : null,
      }
    }

    if (props.shape.layer === 'circle' || props.shape.layer === 'ellipse' || props.shape.layer === 'bullseye') {
      let target = false
      if (latlng) {
        target = submitCoordInput(lat + ', ' + lng)
      } else {
        target = submitCoordInput(mgrs.toUpperCase())
      }

      payload = {
        ...payload,
        latlng: { lat: target.lat, lng: target.lon },
      }
    }

    if (props.shape.layer === 'ellipse') {
      payload = {
        ...payload,
        length: length * 926,
        width: width * 926,
        tilt: Number.parseInt(tilt) + 90
      }
    }

    if (props.shape.layer === 'circle') {
      payload = {
        ...payload,
        radius: Number.parseFloat(radius),
        unit: unit,
      }
    }

    if (props.shape.layer === 'bullseye') {
      payload = {
        ...payload,
        anchor: isAnchor,
        distance: isNaN(distance) ? props.shape.distance : Number.parseFloat(distance),
        rings: isNaN(rings) ? props.shape.rings : Number.parseInt(rings),
        angle: isNaN(angle) ? props.shape.angle : Math.round(Number.parseFloat(angle)),
        showData: showData,
      }
    }

    props.submit('edit', payload)
    props.onClose()
    setRadius(0)
    setUnit('m')
    setDashed(false)
    setDashArray('12, 12')
    setFill(false)
    setFillColor('#4A90E2')
    setTitle('')
    setColor('#4A90E2')
    setLength(10)
    setWidth(2)
    setTilt(90)
    setDistance(20)
    setRings(5)
    setAngle(45)
    setMgrs('')
    setLat('')
    setLng('')
    setLatlng(false)
    setIsAnchor(false)
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
        <Grid
          container
          direction='row'
          justify='center'
        >
          <TextField
            className={classes.firstTextField}
            label='Shape label'
            onChange={event => setTitle(event.target.value)}
            variant='outlined'
            value={title}
          />
          {(props.shape !== null && (props.shape.layer === 'circle' || props.shape.layer === 'ellipse' || props.shape.layer === 'bullseye')) ?
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
                {latlng ?
                  <React.Fragment>
                    <TextField
                      className={classes.textField}
                      label='Latitude'
                      onChange={event => setLat(event.target.value)}
                      variant='outlined'
                      value={lat}
                    />
                    <TextField
                      className={classes.textField}
                      label='Longitude'
                      onChange={event => setLng(event.target.value)}
                      variant='outlined'
                      value={lng}
                    />
                  </React.Fragment>
                  :
                  <TextField
                    className={classes.textField}
                    label='MGRS'
                    onChange={event => setMgrs(event.target.value)}
                    variant='outlined'
                    value={mgrs}
                  />
                }
              </React.Fragment>
            ) : null
          }
          {(props.shape !== null && props.shape.layer === 'bullseye') ?
            <React.Fragment>
              <TextField
                className={classes.textField}
                label='Number of rings'
                onChange={event => setRings(event.target.value)}
                variant='outlined'
                value={rings}
              />
              <TextField
                className={classes.textField}
                label='NM between rings'
                onChange={event => setDistance(event.target.value)}
                variant='outlined'
                value={distance}
              />
              <TextField
                className={classes.textField}
                label='Angle between radials'
                onChange={event => setAngle(event.target.value)}
                variant='outlined'
                value={angle}
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
                        checked={showData}
                        color='primary'
                        name='showData'
                        onChange={() => setShowData(!showData)}
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
                      <Switch
                        checked={isAnchor}
                        color='primary'
                        name='isAnchor'
                        onChange={() => setIsAnchor(!isAnchor)}
                      />
                    }
                    label='Use as Anchor'
                  />
                </FormGroup>
              </Grid>
            </React.Fragment>
            : null
          }
          {(props.shape !== null && props.shape.layer === 'circle') ?
            <React.Fragment>
              <TextField
                className={classes.textField}
                label='Radius'
                onChange={event => setRadius(event.target.value)}
                variant='outlined'
                value={radius}
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
            </React.Fragment>
            : null
          }
          {(props.shape !== null && props.shape.layer === 'ellipse') ?
            <React.Fragment>
              <TextField
                className={classes.textField}
                label='Ellipse length'
                onChange={event => setLength(event.target.value)}
                variant='outlined'
                value={length}
              />
              <TextField
                className={classes.textField}
                label='Ellipse width'
                onChange={event => setWidth(event.target.value)}
                variant='outlined'
                value={width}
              />
              <TextField
                className={classes.textField}
                helperText=' -90 (W) to 90 (E)'
                label='Ellipse tilt'
                onChange={event => setTilt(event.target.value)}
                variant='outlined'
                value={tilt}
              />
            </React.Fragment>
            : null
          }
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
            color={color}
            disableAlpha={true}
            onChange={color => setColor(color.hex)}
          />
        </Grid>
        {(props.shape !== null && props.shape.layer !== 'line' && props.shape.layer !== 'bullseye') ?
          <Grid
            container
            direction='row'
            justify='center'
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={fill}
                    color='primary'
                    name='fill'
                    onChange={() => setFill(!fill)}
                  />
                }
                label='Fill'
              />
            </FormGroup>
            {(fill) ?
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
                  color={fillColor}
                  disableAlpha={true}
                  onChange={color => setFillColor(color.hex)}
                />
              </Grid>
              : null
            }
          </Grid>
          : null
        }
        {(props.shape !== null && props.shape.layer !== 'bullseye') ?
          <Grid
            container
            direction='row'
            justify='center'
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={dashed}
                    color='primary'
                    name='dashed'
                    onChange={() => setDashed(!dashed)}
                  />
                }
                label='Dashed'
              />
            </FormGroup>
            {(dashed) ?
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
                    //margin='dense'
                    onChange={event => setDashArray(event.target.value)}
                    value={dashArray}
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
                  onChange={event => setDashArray(event.target.value)}
                  variant='outlined'
                  value={dashArray}
                />
              </Grid>
              : null
            }
          </Grid>
          : null}
        <Grid
          container
          direction='row'
          justify='center'
        >
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

export default ShapeDrawer