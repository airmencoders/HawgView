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
import { SketchPicker as ColorPicker } from 'react-color'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const drawerWidth = 750

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
// Style Drawer Component
//----------------------------------------------------------------//
/**
 * 
 * @param {*} props 
 */
const StyleDrawer = (props) => {
  const classes = useStyles()

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
        lineBehavior: {
          auto: true,
          gridZone: false,
          hundredKm: false,
          tenKm: false,
          oneKm: false,
          hundredM: false,
          tenM: false,
          oneM: false,
        }
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

    props.submit('edit', newStyles)
    props.onClose()
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
              <Typography
                className={classes.marginsMd}
                variant='body2'
              >
                Line Behavior
              </Typography>
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