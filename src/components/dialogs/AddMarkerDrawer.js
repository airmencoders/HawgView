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

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField,
} from '@material-ui/core'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  FriendlyMarkers,
  HostileMarkers,
  PersistentMarkers,
} from '../dialogs'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import useStyles from '../../constants/useStyles'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Add Marker Drawer Component
//----------------------------------------------------------------//
const AddMarkerDrawer = props => {

  //----------------------------------------------------------------//
  // Component Setup
  //----------------------------------------------------------------//
  const classes = useStyles()

  const container = props.window !== undefined ? () => window().document.body : undefined

  const [_state, _setState] = React.useState({
    hostile: false,
    label: '',
  })

  //----------------------------------------------------------------//
  // Component Handlers
  //----------------------------------------------------------------//
  /**
   * Close the Add Marker Drawer
   */
  const handleClose = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      }
    })
  }

  /**
   * Ingest marker data, modify title, and forward to function to modify state
   * 
   * @param {Object} payload Marker object to be added into state
   */
  const handleAddMarker = payload => {

    // If marker is a threat, keep it as the title (default is blank)
    // Otherwise utilize the label if it is present
    let updatedTitle
    if (payload.layer === 'threat') {
      updatedTitle = payload.title
    } else {
      updatedTitle = _state.label === '' ? payload.title : _state.label
    }

    // Update the payload
    const updatedPayload = {
      ...payload,
      title: updatedTitle,
    }

    // Forward to the function
    handleMarkerEdit('create', updatedPayload, props.state, props.setState)
    
    // Clear the marker description TextField
    _setState({
      ..._state,
      label: '',
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
        open={props.state.dialog.name === 'addMarker'}
        onClose={handleClose}
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
                    checked={_state.hostile}
                    name='hostile'
                    onChange={() => _setState({ ..._state, hostile: !_state.hostile })}
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
            onChange={event => _setState({ ..._state, label: event.target.value, })}
            variant='outlined'
            value={_state.label}
          />
          <Divider />
          <PersistentMarkers
            handleAddMarker={payload => handleAddMarker(payload)}
            handleMarkerDrawerToggle={props.onClose}
            state={props.state}
            toggleEditThreatDialog={props.toggleEditThreatDialog}
          />
          <Divider />
          {_state.hostile ?
            <HostileMarkers
              handleAddMarker={payload => handleAddMarker(payload)}
              handleMarkerDrawerToggle={props.onClose}
            />
            :
            <FriendlyMarkers
              handleAddMarker={payload => handleAddMarker(payload)}
              handleMarkerDrawerToggle={props.onClose}
            />
          }
        </div>
      </Drawer>
    </nav>
  )
}

export default AddMarkerDrawer