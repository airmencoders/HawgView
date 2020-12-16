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
  Box,
  IconButton,
  Tooltip,
} from '@material-ui/core'

import {
  Menu as MenuIcon,
  MoreVert as MoreVertIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// React-Leaflet Components
//----------------------------------------------------------------//
import {
  ScaleControl,
  ZoomControl,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  LayerControl,
  MouseCoordinatesControl,
  ToolControl,
} from './components/controls'

import {
  CASNavigation,
  CASTools,
  CoordInput,
  Map,
  MapPopup,
  MobileMenu,
  SiteMenu,
  Snackbar,
} from './components/core'

import {
  Dialogs
} from './components/dialogs'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import useStyles from './constants/useStyles'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import getElevation from './functions/getElevation'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from './handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
import 'leaflet/dist/leaflet.css'

//----------------------------------------------------------------//
// CAS Component
//----------------------------------------------------------------//
const Cas = () => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // State
  //----------------------------------------------------------------//
  const [state, setState] = React.useState({
    dialog: {
      anchor: null,
      name: null,
    },
    elevation: 'Pending',
    focusedLatlng: {
      latlng: null,
      source: null,
    },
    focusedMarker: null,
    focusedShape: null,
    history: [{
      action: '',
      anchor: {
        declination: null,
        id: null,
        latlng: null,
        name: null,
      },
      buildingLabels: [],
      bullseyes: [],
      circles: [],
      data: {
        buildingLabel: 1,
        firstLetter: 65,
        markerId: 0,
        secondLetter: 65,
      },
      ellipses: [],
      friendlyMarkers: [],
      hostileMarkers: [],
      initialPoints: [],
      kineticPoints: [],
      lines: [],
      mapLabels: [],
      polygons: [],
      rectangles: [],
      survivors: [],
      styles: {
        mgrs: {
          gridzoneColor: '#ffa500',
          lineColor: '#ffffff',
        },
        gars: {
          cellColor: '#ffa500',
          quadrantColor: '#800080',
          keypadColor: '#ffffff'
        },
        buildingLabel: {
          color: '#ffff00',
        },
      },
      threatMarkers: [],
    }],
    map: {
      brightness: 1,
      center: [35.77, -93.34],
      color: true,
      reference: null,
      zoom: 5,
    },
    markerSize: 3,
    mouseCoords: null,
    snackbar: {
      open: false,
      message: undefined,
      pack: [],
    },
    step: 0,
    tool: null,
    tooltips: false,
  })

  const [elevation, setElevation] = React.useState('Pending')
  const [map, setMap] = React.useState(null)

  const [markerLabel, setMarkerLabel] = React.useState('')

  //----------------------------------------------------------------//
  // DEBUGGING AREA
  //----------------------------------------------------------------//

  //----------------------------------------------------------------//
  //----------------------------------------------------------------//
  //----------------------------------------------------------------//

  //----------------------------------------------------------------//
  // React Effects
  //----------------------------------------------------------------//

  /**
   * Listens for window resize to close the mobile menu
   */
  React.useEffect(() => {
    window.addEventListener('resize', handleMobileMenuClose, false)

    return () => {
      window.removeEventListener('resize', handleMobileMenuClose, false)
    }
  }, [state])

  /**
  * Any time the focusd marker changes, set elevation to its default state 'Pending'
  * and set the focused lat/lng to the marker's latlng (If it's not null)
  */
  React.useEffect(() => {
    if (state.focusedMarker !== null) {
      setState({
        ...state,
        elevation: 'Pending',
        focusedLatlng: {
          latlng: state.focusedMarker.latlng,
          source: 'marker',
        },
      })
    }
  }, [state.focusedMarker])

  /**
   * Whenever the focused lat/lng changes, as long as it has a valid lat/lng object and tool is not active,
   * get the elevation
   */
  React.useEffect(() => {
    if (state.focusedLatlng.latlng !== null && state.tool === null) {
      (async () => setElevation(await getElevation(state.focusedLatlng.latlng.lat, state.focusedLatlng.latlng.lng))
      )()
    }
  }, [state.focusedLatlng, state.tool])

  /**
   * Needed due to the asynchronous effect of getting the elevation
   * Any time the elevation changes, modify the master state
   */
  React.useEffect(() => {
    setState({
      ...state,
      elevation: elevation,
    })
  }, [elevation])

  /**
   * Whenever the brightness, zoom, or center of the map changes, set the background color of the leaflet container 
   * to the appropriate color. This is needed because the mpa style is reset every time there is a change in the map state
   * Also change the opacity of the 
   */
  React.useEffect(() => {
    if (state.map.brightness > 1) {
      document.getElementsByClassName('leaflet-container')[0].style.backgroundColor = 'white'
    } else {
      document.getElementsByClassName('leaflet-container')[0].style.backgroundColor = 'black'
    }
  }, [state.map.brightness])

  //----------------------------------------------------------------//
  // Private Handlers
  //----------------------------------------------------------------//
  const handleMobileMenuOpen = (event, dialog) => {
    setState({
      ...state,
      dialog: {
        anchor: event.currentTarget,
        name: dialog,
      },
    })
  }

  const handleMobileMenuClose = () => {
    setState({
      ...state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
  }

  const handleCoordInput = latlng => {
    if (latlng === false) {
      toast('Invalid coordinates', 'error')
    } else {
      setState({
        ...state,
        focusedLatlng: {
          latlng,
          source: 'input',
        },
      })
    }
  }

  const toast = (message, severity) => {
    setState({
      ...state,
      snackbar: {
        ...state.snackbar,
        pack: [...state.snackbar.pack, {
          key: new Date().getTime(),
          message,
          severity,
        }],
      }
    })
  }

  const editMarker = React.useCallback((action, payload) => {
    handleMarkerEdit(action, payload, state, setState, markerLabel, setMarkerLabel, toast)
  }, [state])

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100vh'
      width='100vw'
    >
      <Box>
        <CASNavigation>
          <CoordInput
            map={map}
            submit={handleCoordInput}
          />
          <div className={classes.sectionDesktop}>
            <CASTools
              handleClearMarkers={() => editMarker('clear', {})}

              setState={setState}
              state={state}
            />
          </div>
          <div className={classes.sectionMobile}>
            <Tooltip title='Tools'>
              <IconButton
                color='inherit'
                onClick={event => handleMobileMenuOpen(event, 'mobileMenu')}
              >
                <MoreVertIcon />
              </IconButton>
            </Tooltip>
          </div>
          <div className={classes.grow} />
          <Tooltip title='Menu'>
            <IconButton
              color='inherit'
              onClick={event => handleMobileMenuOpen(event, 'siteMenu')}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <MobileMenu
            handleClearMarkers={() => editMarker('clear', {})}

            setState={setState}
            state={state}
          />
          <SiteMenu
            setState={setState}
            state={state}
          />
        </CASNavigation>
      </Box>
      <Box
        flex={1}
      >
        <Map
          setMap={setMap}
          setState={setState}
          state={state}
        >
          <MapPopup
            setState={setState}
            state={state}
          />
          <LayerControl
            handleMarkerDrag={(marker, latlng) => editMarker('drag', { marker: marker, latlng: latlng })}
            interactive={state.tool === null}
            map={map}
            handleDeleteMarker={marker => editMarker('delete', { marker: marker })}

            setState={setState}
            state={state}
          />
          <ZoomControl position='topright' />
          <ToolControl
            editMarker={editMarker}

            setState={setState}
            state={state}
          />
          <MouseCoordinatesControl
            state={state}
          />
          <ScaleControl />
        </Map>
      </Box>
      <Snackbar
        state={state}
        setState={setState}
      />
      <Dialogs
        handleEditMarker={(action, dialog) => editMarker(action, dialog)}
        markerLabel={markerLabel}
        setMarkerLabel={setMarkerLabel}
        toast={toast}

        setState={setState}
        state={state}
      />
    </Box>
  )
}

export default Cas