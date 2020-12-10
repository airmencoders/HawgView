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
  Snackbar,
  Tooltip,
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles'
import {
  Close as CloseIcon,
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
  Alert,
  CASNavigation,
  CASTools,
  CoordInput,
  Map,
  MapPopup,
  MobileMenu,
  SiteMenu,
} from './components/core'
import {
  Dialogs
} from './components/dialogs'

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

const useStyles = makeStyles(theme => ({
  leafletMap: {
    height: '100%',
    width: '100%',
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
  grow: {
    flexGrow: 1,
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
    map: {
      brightness: 1,
      center: [35.77, -93.34],
      color: true,
      zoom: 5,
    },
    tool: null,
    tooltips: false,
  })

  const [mouseCoords, setMouseCoords] = React.useState(null)
  const [focusedLatlng, setFocusedLatlng] = React.useState({ latlng: null, source: null })
  const [elevation, setElevation] = React.useState('Pending')
  const [focusedMarker, setFocusedMarker] = React.useState(null)
  const [focusedShape, setFocusedShape] = React.useState(null)
  const [history, setHistory] = React.useState([{
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
  }])
  const [map, setMap] = React.useState(null)
  const [markerLabel, setMarkerLabel] = React.useState('')
  const [markerSize, setMarkerSize] = React.useState(3)
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null)
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackPack, setSnackPack] = React.useState([])
  const [step, setStep] = React.useState(0)

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
  }, [])

  /**
   * Any time the active dialog changes, reset the map
   */
  React.useEffect(() => {
    if (state.dialog.name === null) {
      handleMapReset()
    }
  }, [state.dialog.name])

  /**
  * Any time the focusd marker changes, set elevation to its default state 'Pending'
  * and set the focused lat/lng to the marker's latlng (If it's not null)
  */
  React.useEffect(() => {
    setElevation('Pending')
    if (focusedMarker !== null) {
      setFocusedLatlng({ latlng: focusedMarker.latlng, source: 'marker' })
    }
  }, [focusedMarker])

  /**
   * Whenever the focused lat/lng changes, as long as it has a valid lat/lng object, get the elevation
   */
  React.useEffect(() => {
    if (focusedLatlng.latlng !== null) {
      (async () => setElevation(await getElevation(focusedLatlng.latlng.lat, focusedLatlng.latlng.lng)))()
    }
  }, [focusedLatlng])

  /**
   * Whenever any changes occur to the snackbar, handle various changes to the package
   */
  React.useEffect(() => {
    if (snackPack.length && !snackbarMessage) {
      setSnackbarMessage({ ...snackPack[0] })
      setSnackPack(prev => prev.slice(1))
      setSnackbarOpen(true)
    } else if (snackPack.length && snackbarMessage && snackbarOpen) {
      setSnackbarOpen(false)
    }
  }, [snackPack, snackbarMessage, snackbarOpen])

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

  /**
   * Helper function to do multiple things when closing the map Popup
   */
  const handleMapReset = () => {
    setFocusedLatlng({ latlng: null, source: null })
    setMouseCoords(null)
    setFocusedMarker(null)
    setFocusedShape(null)
    //setMapPopup(null)
    setElevation('Pending')

    setState({
      ...state,
      dialog: {
        anchor: null,
        name: null,
      },
      tool: null,
    })
  }

  const handleCoordInput = latlng => {
    if (latlng === false) {
      toast('Invalid coordinates', 'error')
    } else {
      setFocusedLatlng({ latlng: latlng, source: 'input' })
    }
  }

  /**
   * Set the current step to the previous step (not less than 0)
   */
  const handleUndo = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

  /**
   * Set the current step to the next step (not to exceed history length)
   */
  const handleRedo = () => {
    if (step < history.length - 1) {
      setStep(step + 1)
    }
  }

  const toast = (message, severity) => {
    setSnackPack(prev => [...prev, { message, key: new Date().getTime(), severity }])
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const editMarker = (action, payload) => {
    handleMarkerEdit(action, payload, state, setState, elevation, focusedLatlng, markerLabel, history, step, setHistory, setStep, setMarkerLabel, handleMapReset, setFocusedMarker, setFocusedShape, toast)
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
              handleClearMarkers={() => editMarker('clear', {})}
              handleRedo={handleRedo}
              handleUndo={handleUndo}
              history={history}
              markerSize={markerSize}
              setMarkerSize={setMarkerSize}
              step={step}

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
            handleRedo={handleRedo}
            handleUndo={handleUndo}
            history={history}
            markerSize={markerSize}
            anchor={mobileMenuAnchor}
            setMarkerSize={setMarkerSize}
            step={step}

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
          mouseCoords={mouseCoords}
          setMouseCoords={setMouseCoords}
          setFocusedLatlng={latlng => setFocusedLatlng(latlng)}

          setState={setState}
          state={state}
        >
          <MapPopup
            anchor={history[step].anchor}
            elevation={elevation}
            focusedLatlng={focusedLatlng}
            focusedMarker={focusedMarker}
            focusedShape={focusedShape}
            handleMapReset={handleMapReset}
            setFocusedMarker={setFocusedMarker}

            setState={setState}
            state={state}
          />
          <LayerControl
            anchor={history[step].anchor}
            handleMarkerDrag={(marker, latlng) => editMarker('drag', { marker: marker, latlng: latlng })}
            interactive={state.tool === null}
            map={map}
            markerSize={markerSize}
            setFocusedMarker={marker => setFocusedMarker(marker)}
            setFocusedShape={shape => setFocusedShape(shape)}
            step={history[step]}
            handleDeleteMarker={marker => editMarker('delete', { marker: marker })}

            setState={setState}
            state={state}
          />
          <ZoomControl position='topright' />
          <ToolControl
            editMarker={editMarker}
            focusedLatlng={focusedLatlng}
            history={history}
            mouseCoords={mouseCoords}
            setFocusedMarker={setFocusedMarker}
            setFocusedLatlng={setFocusedLatlng}
            setMouseCoords={setMouseCoords}
            step={step}

            setState={setState}
            state={state}
          />
          <MouseCoordinatesControl
            anchor={history[step].anchor}
            mouseCoords={mouseCoords}
          />
          <ScaleControl />
        </Map>
      </Box>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        key={snackbarMessage ? snackbarMessage.key : undefined}
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        onExited={() => setSnackbarMessage(undefined)}
        action={
          <IconButton size='small' aria-label='close' color='inherit' onClick={handleSnackbarClose}>
            <CloseIcon fontSize='small' />
          </IconButton>
        }
      >
        <Alert severity={snackbarMessage ? snackbarMessage.severity : undefined} onClose={handleSnackbarClose}>
          {snackbarMessage ? snackbarMessage.message : undefined}
        </Alert>
      </Snackbar>
      <Dialogs
        focusedMarker={focusedMarker}
        focusedShape={focusedShape}
        handleEditMarker={(action, dialog) => editMarker(action, dialog)}
        handleMapReset={handleMapReset}
        history={history}
        markerLabel={markerLabel}
        setHistory={setHistory}
        setMarkerLabel={setMarkerLabel}
        setStep={setStep}
        step={step}
        toast={toast}

        setState={setState}
        state={state}
      />
    </Box>
  )
}

export default Cas