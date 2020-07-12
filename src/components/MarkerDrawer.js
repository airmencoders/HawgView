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

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import FriendlyMarkers from './FriendlyMarkers'
import HostileMarkers from './HostileMarkers'
import PersistentMarkers from './PersistentMarkers'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  descriptionField: {
    margin: theme.spacing(2),
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
export default ({ markerDrawerOpen, handleAddMarker, handleMarkerDrawerToggle, markerLabel, setMarkerLabel, window }) => {
  const classes = useStyles()

  const [hostile, setHostile] = React.useState(false)

  const container = window !== undefined ? () => window().document.body : undefined

  return (
    <nav
      className={classes.drawer}
    >
      <Drawer
        container={container}
        variant='temporary'
        anchor='left'
        open={markerDrawerOpen}
        onClose={handleMarkerDrawerToggle}
        classes={{ paper: classes.drawerPaper, }}
        ModalProps={{ keepMounted: true, }}
      >
        <div>
          <Grid
            container
            direction='row'
            justify='center'
          >
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={hostile}
                    name='hostile'
                    onChange={() => setHostile(!hostile)}
                  />
                }
                label='Hostile'
              />
            </FormGroup>
          </Grid>
          <Divider />
          <TextField
            className={classes.descriptionField}
            label='Marker Label'
            onChange={event => setMarkerLabel(event.target.value)}
            variant='outlined'
            value={markerLabel}
          />
          <Divider />
          <PersistentMarkers
            handleAddMarker={(src, title, sovereignty) => handleAddMarker(src, title, sovereignty)}
            handleMarkerDrawerToggle={handleMarkerDrawerToggle}
          />
          <Divider />
          {(hostile) ?
            <HostileMarkers
              handleAddMarker={(src, title, sovereignty) => handleAddMarker(src, title, sovereignty)}
              handleMarkerDrawerToggle={handleMarkerDrawerToggle}
            />
            :
            <FriendlyMarkers
              handleAddMarker={(src, title, sovereignty) => handleAddMarker(src, title, sovereignty)}
              handleMarkerDrawerToggle={handleMarkerDrawerToggle}
            />
          }
        </div>
      </Drawer>
    </nav>
  )
}