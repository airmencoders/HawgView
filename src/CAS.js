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

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Badge,
  Box,
  IconButton,
  Tooltip,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

import {
  HelpOutline as HelpOutlineIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  NotificationImportant as NotificationImportantIcon,
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
  Snackbar,
} from './components/core'

import {
  Dialogs
} from './components/dialogs'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import getElevation from './functions/getElevation'
import generateKML from './functions/generateKML'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleColorChange from './handlers/handleColorChange'
import handleMarkerEdit from './handlers/handleMarkerEdit'
import {
  handleMarkerSizeDecrease,
  handleMarkerSizeIncrease,
} from './handlers/handleMarkerSizeChange'
import {
  handleBrightnessDecrease,
  handleBrightnessIncrease,
} from './handlers/handleBrightnessChange'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
import 'leaflet/dist/leaflet.css'

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
}))

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
      neutralMarkers: [],
      polygons: [],
      rectangles: [],
      sardot: {
        declination: null,
        id: null,
        latlng: null,
        name: null,
      },
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
      unknownMarkers: [],
    }],
    map: {
      baselayer: 'Imagery Firefly',
      brightness: 1,
      center: [35.77, -93.34],
      color: true,
      overlays: {
        imagery: true,
        transportation: false,
      },
      //reference: null,              // Currently unused
      zoom: 5,
    },
    markerSize: 3,
    notificationsRead: false,
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
    window.addEventListener('keydown', keyboardShortcutHandler, false)

    return () => {
      window.removeEventListener('resize', handleMobileMenuClose, false)
      window.removeEventListener('keydown', keyboardShortcutHandler, false)
    }
  }, [state])

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

  /**
   * Listen to the fullscreen state to request or exit fullscreen
   */
  /*React.useEffect(() => {
    if (state.fullscreen && !document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else if (!state.fullscreen && document.fullscreenElement) {
      if (document.exitFullscreen) {
        document.exitFullscreen()
      }
    }
  }, [state.fullscreen])*/

  /**
   * Catch any ESCAPE key presses that can exit fullscreen without updating state
   * NOTE: when the user presses the `exit fullscreen` button, this can cause a double state update which is known
   */
  /*React.useEffect(() => {
    if (!document.fullscreenElement) {
      setState({
        ...state,
        fullscreen: false,
      })
    }
  }, [document.fullscreenElement])*/

  //----------------------------------------------------------------//
  // Private Handlers
  //----------------------------------------------------------------//
  const keyboardShortcutHandler = e => {
    // Analysis Tool
    if (e.ctrlKey && e.key === '1') {
      e.preventDefault()
      setState({
        ...state,
        tool: 'analysis',
      })
    }

    // Building Label Tool
    if (e.ctrlKey && e.key === '2') {
      e.preventDefault()
      setState({
        ...state,
        tool: 'buildingLabel',
      })
    }

    // Kinetic Point Tool
    if (e.ctrlKey && e.key === '3') {
      e.preventDefault()
      setState({
        ...state,
        tool: 'kineticPoint',
      })
    }

    // Line Tool
    if (e.ctrlKey && e.key === '4') {
      e.preventDefault()
      setState({
        ...state,
        tool: 'line',
      })
    }

    // Circle Tool
    if (e.ctrlKey && e.key === '5') {
      e.preventDefault()
      setState({
        ...state,
        tool: 'circle',
      })
    }

    // Rectangle Tool
    if (e.ctrlKey && e.key === '6') {
      e.preventDefault()
      setState({
        ...state,
        tool: 'rectangle'
      })
    }

    // Polygon Tool
    if (e.ctrlKey && e.key === '7') {
      e.preventDefault()
      setState({
        ...state,
        tool: 'polygon',
      })
    }

    // Ellipse Tool
    if (e.ctrlKey && e.key === '8') {
      e.preventDefault()
      setState({
        ...state,
        tool: 'ellipse',
      })
    }

    // Reset Marker Size
    if (e.ctrlKey && e.key === ',') {
      e.preventDefault()
      setState({
        ...state,
        markerSize: 3,
      })
    }

    // Reset Map Brightness
    if (e.ctrlKey && e.key === '.') {
      e.preventDefault()
      setState({
        ...state,
        map: {
          ...state.map,
          brightness: 1,
        }
      })
    }

    // Toggle Map Color
    if (e.ctrlKey && e.key === 'c') {
      e.preventDefault()
      handleColorChange(state, setState)
    }

    // Download Scenario
    if (e.ctrlKey && e.key === 'd') {
      e.preventDefault()
      generateKML(state.history[state.step])
    }

    // Load Scenario
    if (e.ctrlKey && e.key === 'o') {
      e.preventDefault()
      setState({
        ...state,
        dialog: {
          anchor: null,
          name: 'load',
        },
      })
    }

    // Save Scenario
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault()
      setState({
        ...state,
        dialog: {
          anchor: null,
          name: 'save',
        },
      })
    }

    // Toggle Marker Labels
    if (e.ctrlKey && e.key === 'l') {
      e.preventDefault()
      setState({
        ...state,
        tooltips: !state.tooltips,
      })
    }

    // Redo
    if (e.ctrlKey && e.key === 'y') {
      if (state.step < state.history.length - 1) {
        e.preventDefault()
        setState({
          ...state,
          step: state.step + 1,
        })
      }
    }

    // Undo
    if (e.ctrlKey && e.key === 'z') {
      if (state.step > 0) {
        e.preventDefault()
        setState({
          ...state,
          step: state.step - 1,
        })
      }
    }

    // Decrease Marker Size
    if (e.ctrlKey && e.key === '[') {
      e.preventDefault()
      handleMarkerSizeDecrease(state, setState)
    }

    // Increase Marker Size
    if (e.ctrlKey && e.key === ']') {
      e.preventDefault()
      handleMarkerSizeIncrease(state, setState)
    }

    // Decrease Map Brightness
    if (e.shiftKey && e.key === '{' && state.dialog.name === null) {
      e.preventDefault()
      handleBrightnessDecrease(state, setState)
    }

    // Increase Map Brightness
    if (e.shiftKey && e.key === '}' && state.dialog.name === null) {
      e.preventDefault()
      handleBrightnessIncrease(state, setState)
    }

    // Clear all markers
    if (e.shiftKey && e.key === 'Escape') {
      e.preventDefault()
      handleMarkerEdit('clear', {}, state, setState)
    }
  }

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
      dialog: {
        anchor: null,
        name: null,
      },
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
          <Tooltip title='Notifications'>
            <IconButton
              color='inherit'
              onClick={() => setState({
                ...state,
                dialog: {
                  anchor: null,
                  name: 'notifications'
                },
                notificationsRead: true,
              })}
            >
              {state.notificationsRead ? <NotificationsIcon /> : <NotificationImportantIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title='Wiki'>
            <a
              href='https://wiki.hawg-ops.com'
              style={{ color: 'inherit', textDecoration: 'none' }}
              target='_blank'
              rel='noopener noreferrer'
            >
              <IconButton
                color='inherit'
              >
                <HelpOutlineIcon />
              </IconButton>
            </a>
          </Tooltip>
          <MobileMenu
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
            map={map}
            setState={setState}
            state={state}
          />
          <ZoomControl position='topright' />
          <ToolControl
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
        setState={setState}
        state={state}
        toast={toast}
      />
    </Box>
  )
}

export default Cas