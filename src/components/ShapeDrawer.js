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

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
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
}))

//----------------------------------------------------------------//
// Marker Drawer Component
//----------------------------------------------------------------//
export default (props) => {
  const classes = useStyles()

  const container = props.window !== undefined ? () => window().document.body : undefined

  return (
    <nav
      className={classes.drawer}
    >
      <Drawer
        container={container}
        variant='temporary'
        anchor='left'
        open={props.open}
        onClose={props.toggle}
        classes={{ paper: classes.drawerPaper, }}
        ModalProps={{ keepMounted: true, }}
      >
        <Grid
          container
          direction='row'
          justify='center'
        >
          <TextField
            className={classes.marginsMd}
            label='Shape Label'
            onChange={event => props.setShapeLabel(event.target.value)}
            variant='outlined'
            value={props.shapeLabel}
          />
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
            color={props.shapeStrokeColor}
            disableAlpha={true}
            onChange={color => props.setShapeStrokeColor(color.hex)}
          />
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
                  checked={props.shapeFill}
                  color='primary'
                  name='fill'
                  onChange={() => props.setShapeFill(!props.shapeFill)}
                />
              }
              label='Fill'
            />
          </FormGroup>
          {(props.shapeFill) ?
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
                color={props.shapeFillColor}
                disableAlpha={true}
                onChange={color => props.setShapeFillColor(color.hex)}
              />
            </Grid>
            : null
          }
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
                  checked={props.shapeDashed}
                  color='primary'
                  name='dashed'
                  onChange={() => props.setShapeDashed(!props.shapeDashed)}
                />
              }
              label='Dashed'
            />
          </FormGroup>
          {(props.shapeDashed) ?
            <Grid
              container
              direction='row'
              justify='center'
            >
              <TextField
                className={classes.marginsMd}
                helperText='Comma separated values, every other number is line to gap in pixels.'
                label='Dash Array'
                onChange={event => props.setShapeDashArray(event.target.value)}
                variant='outlined'
                value={props.shapeDashArray}
              />
            </Grid>
            : null
          }
        </Grid>
      </Drawer>
    </nav>
  )
}