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
import ms from 'milsymbol'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Divider,
  Drawer,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Tooltip,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

import {
  Search as SearchIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  PersistentMarkers,
} from '../dialogs'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import {
  echelons,
  sidcCodes
} from '../../constants/sidcCodes'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const drawerWidth = 360
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
  marginsMd: {
    margin: theme.spacing(2),
  },
  marginsSm: {
    margin: theme.spacing(1),
  }
}))

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
    codeArray: [...sidcCodes],
    hostile: false,
    label: '',
    searchValue: '',
    sidc: {
      scheme: 'S',
      affiliation: 'F',
      dimension: 'G',
      status: 'P',
      id: 'U-----',
      modifier: '-',
      echelon: '-',
    },
    svg: null,
  })

  React.useEffect(() => {
    _setState({
      ..._state,
      svg: new ms.Symbol(`${_state.sidc.scheme}${_state.sidc.affiliation}${_state.sidc.dimension}${_state.sidc.status}${_state.sidc.id}${_state.sidc.modifier}${_state.sidc.size}`, { size: 50 }),
    })
  }, [_state.sidc, _state.label])

  React.useEffect(() => {
      _setState({
        ..._state,
        codeArray: sidcCodes.filter(code => code.name.toLowerCase().includes(_state.searchValue.toLowerCase())),
      })
  }, [_state.searchValue])

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
   * @param {Object} code SIDC object to be added into state
   */
  const prepPayload = code => {

    let layer
    switch (_state.sidc.affiliation) {
      case 'F':
        layer = 'friendly'
        break
      case 'H':
        layer = 'hostile'
        break
      case 'U':
        layer = 'unknown'
        break
      case 'N':
        layer = 'neutral'
        break
      default:
        layer = 'unknown'
    }

    let payload = {
      arty: {
        arty: false,
        display: false,
      },
      data: null,
      elevation: 0,
      iconType: 'sidc',
      layer,
      sidc: {
        scheme: _state.sidc.scheme,
        affiliation: _state.sidc.affiliation,
        dimension: _state.sidc.dimension,
        status: _state.sidc.status,
        id: code.value,
        modifier: _state.sidc.modifier,
        echelon: _state.sidc.echelon,
      },
      title: _state.label === '' ? code.name : _state.label,
    }

    if (code.value.substr(0, 3) === 'UCF') {
      payload = {
        ...payload,
        arty: {
          arty: true,
          display: true,
        },
      }
    }

    handleAddMarker(payload)
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
        <TextField
          className={classes.marginsMd}
          label='Marker Title'
          onChange={event => _setState({ ..._state, label: event.target.value })}
          value={_state.label}
          variant='outlined'
        />
        <Divider className={classes.marginsMd} />
        <PersistentMarkers
          handleAddMarker={payload => handleAddMarker(payload)}
          state={props.state}
        />
        <Divider className={classes.marginsMd} />
        <FormControl
          className={classes.marginsMd}
          variant='outlined'
        >
          <InputLabel>Affiliation</InputLabel>
          <Select
            label='Affiliation'
            onChange={event => _setState({ ..._state, sidc: { ..._state.sidc, affiliation: event.target.value } })}
            value={_state.sidc.affiliation}
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
            onChange={event => _setState({ ..._state, sidc: { ..._state.sidc, echelon: event.target.value } })}
            value={_state.sidc.echelon}
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
        <TextField
          className={classes.marginsMd}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            )
          }}
          label='Search for Marker'
          onChange={event => _setState({
            ..._state,
            searchValue: event.target.value,
          })}
          value={_state.searchValue}
          variant='outlined'
        />
        <div>
          {_state.codeArray.map(code => (
            <Tooltip
              key={code.value}
              title={code.name}
            >
              <img
                alt={code.name}
                className={classes.marginsSm}
                onClick={() => prepPayload(code)}
                src={new ms.Symbol(`${_state.sidc.scheme}${_state.sidc.affiliation}${_state.sidc.dimension}${_state.sidc.status}${code.value}${_state.sidc.modifier}${_state.sidc.echelon}`, { size: 30 }).toDataURL()}
              />
            </Tooltip>
          ))}
        </div>
      </Drawer>
    </nav >
  )
}

export default AddMarkerDrawer