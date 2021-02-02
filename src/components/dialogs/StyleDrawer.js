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
  Grid,
  Typography,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const wideDrawerWidth = 750
const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: wideDrawerWidth,
      flexShrink: 0,
    },
  },
  marginsMd: {
    margin: theme.spacing(2),
  },
  wideDrawerPaper: {
    width: wideDrawerWidth
  },
}))

//----------------------------------------------------------------//
// Style Drawer Component
//----------------------------------------------------------------//
const StyleDrawer = props => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // State
  //----------------------------------------------------------------//
  const [_state, _setState] = React.useState({
    buildingLabel: {
      color: '#ffff00',
    },
    gars: {
      cellColor: '#ffa500',
      keypadColor: '#ffffff',
      quadrantColor: '#800080',
    },
    mgrs: {
      gridzoneColor: '#ffa500',
      lineColor: '#ffffff',
    },
  })

  const container = props.window !== undefined ? () => window().document.body : undefined

  const handleSubmit = () => {
    const newStyles = {
      marker: {
        layer: 'styles',
      },
      ..._state,
    }

    handleMarkerEdit('edit', newStyles, props.state, props.setState)
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
        open={props.state.dialog.name === 'style'}
        onClose={handleClose}
        classes={{ paper: classes.wideDrawerPaper, }}
        ModalProps={{ keepMounted: true }}
      >
        <Grid
          container
          direction='row'
          justify='center'
        >
          <Typography
            variant='body1'
          >
            MGRS Styles
          </Typography>
          <Grid
            container
            direction='row'
            justify='center'
          >
            <Grid
              item
              xs={4}
            >
              <Typography
                className={classes.marginsMd}
                variant='body2'
              >
                Gridzone Color
              </Typography>
              <ColorPicker
                className={classes.marginsMd}
                color={_state.mgrs.gridzoneColor}
                disableAlpha={true}
                onChange={color => _setState({
                  ..._state,
                  mgrs: {
                    ..._state.mgrs,
                    gridzoneColor: color.hex,
                  },
                })}
              />
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Typography
                className={classes.marginsMd}
                variant='body2'
              >
                Line Color
              </Typography>
              <ColorPicker
                className={classes.marginsMd}
                color={_state.mgrs.lineColor}
                disableAlpha={true}
                onChange={color => _setState({
                  ..._state,
                  mgrs: {
                    ..._state.mgrs,
                    lineColor: color.hex,
                  },
                })}
              />
            </Grid>
            <Grid
              item
              xs={4}
            >
            </Grid>
          </Grid>
          <Typography
            variant='body1'
          >
            GARS Styles
          </Typography>
          <Grid
            container
            direction='row'
            justify='center'
          >
            <Grid
              item
              xs={4}
            >
              <Typography
                className={classes.marginsMd}
                variant='body2'
              >
                Cell Color
              </Typography>
              <ColorPicker
                className={classes.marginsMd}
                color={_state.gars.cellColor}
                disableAlpha={true}
                onChange={color => _setState({
                  ..._state,
                  gars: {
                    ..._state.gars,
                    cellColor: color.hex,
                  },
                })}
              />
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Typography
                className={classes.marginsMd}
                variant='body2'
              >
                Quadrant Color
              </Typography>
              <ColorPicker
                className={classes.marginsMd}
                color={_state.gars.quadrantColor}
                disableAlpha={true}
                onChange={color => _setState({
                  ..._state,
                  gars: {
                    ..._state.gars,
                    quadrantColor: color.hex,
                  },
                })}
              />
            </Grid>
            <Grid
              item
              xs={4}
            >
              <Typography
                className={classes.marginsMd}
                variant='body2'
              >
                Keypad Color
              </Typography>
              <ColorPicker
                className={classes.marginsMd}
                color={_state.gars.keypadColor}
                disableAlpha={true}
                onChange={color => _setState({
                  ..._state,
                  gars: {
                    ..._state.gars,
                    keypadColor: color.hex,
                  },
                })}
              />
            </Grid>
          </Grid>
          <Typography
            variant='body1'
          >
            Building Label Styles
          </Typography>
          <Grid
            container
            direction='row'
            justify='center'
          >
            <Grid
              item
              xs={4}
            >
              <Typography
                className={classes.marginsMd}
                variant='body2'
              >
                Label Color
              </Typography>
              <ColorPicker
                className={classes.marginsMd}
                color={_state.buildingLabel.color}
                disableAlpha={true}
                onChange={color => _setState({
                  ..._state,
                  buildingLabel: {
                    color: color.hex,
                  }
                })}
              />
            </Grid>
            <Grid
              item
              xs={4}
            >
            </Grid>
            <Grid
              item
              xs={4}
            >
            </Grid>
          </Grid>
        </Grid>
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

export default StyleDrawer