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

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import useStyles from '../../constants/useStyles'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Style Drawer Component
//----------------------------------------------------------------//
/**
 * 
 * @param {*} props 
 */
const StyleDrawer = (props) => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // State
  //----------------------------------------------------------------//
  const [mgrsGZColor, setMgrsGZColor] = React.useState('#ffa500')
  const [mgrsLineColor, setMgrsLineColor] = React.useState('#ffffff')
  const [garsCellColor, setGarsCellColor] = React.useState('#ffa500')
  const [garsQuadColor, setGarsQuadColor] = React.useState('#800080')
  const [garsKPColor, setGarsKPColor] = React.useState('#ffffff')
  const [buildingLabelColor, setBuildingLabelColor] = React.useState('#ffff00')

  const container = props.window !== undefined ? () => window().document.body : undefined

  const handleSubmit = () => {
    const newStyles = {
      marker: {
        layer: 'styles',
      },
      mgrs: {
        gridzoneColor: mgrsGZColor,
        lineColor: mgrsLineColor,
      },
      gars: {
        cellColor: garsCellColor,
        quadrantColor: garsQuadColor,
        keypadColor: garsKPColor,
      },
      buildingLabel: {
        color: buildingLabelColor,
      },
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
                color={mgrsGZColor}
                disableAlpha={true}
                onChange={color => setMgrsGZColor(color.hex)}
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
                color={mgrsLineColor}
                disableAlpha={true}
                onChange={color => setMgrsLineColor(color.hex)}
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
                color={garsCellColor}
                disableAlpha={true}
                onChange={color => setGarsCellColor(color.hex)}
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
                color={garsQuadColor}
                disableAlpha={true}
                onChange={color => setGarsQuadColor(color.hex)}
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
                color={garsKPColor}
                disableAlpha={true}
                onChange={color => setGarsKPColor(color.hex)}
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
                color={buildingLabelColor}
                disableAlpha={true}
                onChange={color => setBuildingLabelColor(color.hex)}
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