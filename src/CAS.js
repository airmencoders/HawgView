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
//import L from 'leaflet'

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
  ToolControl,
} from './components/controls'
import {
  Alert,
  CASNavigation,
  CASTools,
  CoordInput,
  Map,
  MobileMenu,
  Popup,
  SiteMenu,
} from './components/core'
import {
  AddMarkerDrawer,
  EditMarkerDrawer,
  EditShapeDrawer,
  MarkerListDialog,
  NotificationsDialog,
  SaveScenarioDialog,
  StyleDrawer,
  LoadScenarioDialog,
} from './components/dialogs'
import {
  AnalysisTool,
  BuildingLabelTool,
  CircleTool,
  EllipseTool,
  KineticPointTool,
  LineTool,
  RectangleTool,
} from './components/tools'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import getElevation from './functions/getElevation'
import { editMarkers } from './functions/editMarkers'

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
  const [activeDialog, setActiveDialog] = React.useState()
  const [activeTool, setActiveTool] = React.useState(null)
  const [brightness, setBrightness] = React.useState(1)   // Actually just sets the opacity of the map. When decreasing brightness (<1) also ensures the map background is black, Increasing the brightness (>= 1) ensures the map background is white
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
  const [mapCenter, setMapCenter] = React.useState([35.77, -93.34])
  const [mapColor, setMapColor] = React.useState(true)
  const [mapZoom, setMapZoom] = React.useState(5)
  const [markerLabel, setMarkerLabel] = React.useState('')
  const [markerSize, setMarkerSize] = React.useState(3)
  const [mobileMenuAnchor, setMobileMenuAnchor] = React.useState(null)
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackPack, setSnackPack] = React.useState([])
  const [step, setStep] = React.useState(0)
  const [tooltipsActive, setTooltipsActive] = React.useState(false)
  const [pageTitle, setPageTitle] = React.useState('CAS Planner')

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
   * Changes the Page Title depending on the name of the loaded scenario
   */
  React.useEffect(() => {
    document.title = `Hawg View | ${pageTitle}`
  }, [pageTitle])

  /**
   * Any time the active dialog changes, reset the map
   */
  React.useEffect(() => {
    if (activeDialog === null) {
      handleMapReset()
    }
  }, [activeDialog])

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
    if (brightness > 1) {
      document.getElementsByClassName('leaflet-container')[0].style.backgroundColor = 'white'
    } else {
      document.getElementsByClassName('leaflet-container')[0].style.backgroundColor = 'black'
    }
  }, [brightness])

  //----------------------------------------------------------------//
  // Private Handlers
  //----------------------------------------------------------------//
  const handleMobileMenuOpen = (event, dialog) => {
    setMobileMenuAnchor(event.currentTarget)
    setActiveDialog(dialog)
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
    setActiveDialog(null)
  }

  /**
   * Handler function for the mouse movement across the map
   * 
   * @param {Object} latlng LatLng coordinates of the mouse cursor
   */
  const handleMouseMove = latlng => {
    if (activeTool === 'analysis') {
      setMouseCoords(latlng)
    } else if (activeTool !== null && activeTool !== 'analysis') {
      setMouseCoords(latlng)
    }
  }

  /**
   * Helper function to do multiple things when closing the map Popup
   */
  const handleMapReset = () => {
    setActiveDialog(null)
    setFocusedLatlng({ latlng: null, source: null })
    setMouseCoords(null)
    setFocusedMarker(null)
    setFocusedShape(null)
    //setMapPopup(null)
    setElevation('Pending')
  }

  /**
   * 
   * @param {*} tool 
   */
  const toggleTools = tool => {
    setFocusedMarker(null)
    setFocusedLatlng({ latlng: null, source: null })
    if (tool === null || tool === activeTool) {
      setActiveTool(null)
    } else {
      setActiveTool(tool)
    }
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

  /**
   * 
   * @param {String} action The action to be completed
   * @param {String} src Source of the marker image (create)
   * @param {String} title Title of the marker (create)
   * @param {String} sovereignty Sovereignty of the marker (create | edit)
   * @param {String} threatSovereignty The sovereignty of the threat (create | edit)
   * @param {Object} latlng The lat/lng of the marker (edit | drag)
   * @param {Object} marker The marker object (edit | delete)
   */
  const handleMarkerEdit = (action, payload) => {
    const supportedActions = ['clear', 'create', 'delete', 'drag', 'edit', '9line', '15line']

    if (supportedActions.includes(action)) {

      let updatedPayload = { ...payload }

      let updatedTitle
      if (payload.layer === 'threat') {
        updatedTitle = payload.title
      } else {
        updatedTitle = markerLabel === '' ? payload.title : markerLabel
      }

      if (action === 'create') {
        updatedPayload = {
          ...updatedPayload,
          id: history[step].data.markerId,
        }

        if (payload.layer !== 'bullseye') {
          updatedPayload = {
            ...updatedPayload,
            elevation: elevation,
          }
        }

        if (payload.layer === 'friendly' || payload.layer === 'hostile' || payload.layer === 'threat' || payload.layer === 'survivor' || payload.layer === 'ip' || payload.layer === 'mapLabel' || payload.layer === 'bullseye')
          updatedPayload = {
            ...updatedPayload,
            latlng: focusedLatlng.latlng,
            title: updatedTitle,
          }
      }

      // Take the payload and add in the marker id (for when creating marker)
      // todo: finish with the payload bullshit from the rest of the 'editMarkers' callbacks lol
      const newStep = editMarkers(action, history, step, updatedPayload)

      if (newStep !== false) {
        let targetHistory
        if (step === history.length - 1) {
          targetHistory = history.slice()
        } else {
          targetHistory = history.slice(0, step + 1)
        }

        setHistory([...targetHistory, newStep])
        setStep(step + 1)

        if (action === 'create') {
          //setMarkerId(markerId + 1)
          setMarkerLabel('')
        }

        handleMapReset()

        if (payload.layer === 'circle' || payload.layer === 'rectangle' || payload.layer === 'line' || payload.layer === 'polygon' || payload.layer === 'ellipse') {
          setFocusedShape(updatedPayload)
          setActiveDialog('editShape')
          setActiveTool(null)
        }
      }
    } else {
      console.error(`Unsupported action ${action}. Could not modify Markers`)
      toast('There was an error performing that action', 'error')
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const handleLoadScenario = data => {
    let json
    try {
      let object = JSON.parse(data)

      if (object && typeof object === 'object') {
        json = object
      }
    } catch (error) {
      console.error(error)
      toast('There was an error loading the scenario', 'error')
    }

    if (json !== undefined) {

      const newStep = {
        action: 'load scenario',
        anchor: json.data.anchor !== undefined ? json.data.anchor : {
          declination: null,
          id: null,
          latlng: null,
          name: null
        },
        buildingLabels: json.data.buildingLabels !== undefined ? json.data.buildingLabels : [],
        bullseyes: json.data.bullseyes !== undefined ? json.data.bullseyes : [],
        circles: json.data.circles !== undefined ? json.data.circles : [],
        data: json.data.data !== undefined ? json.data.data : {
          buildingLabel: 1,
          firstLetter: 65,
          markerId: 0,
          secondLetter: 65,
        },
        ellipses: json.data.ellipses !== undefined ? json.data.ellipses : [],
        rectangles: json.data.rectangles !== undefined ? json.data.rectangles : [],
        friendlyMarkers: json.data.friendlyMarkers !== undefined ? json.data.friendlyMarkers : [],
        hostileMarkers: json.data.hostileMarkers !== undefined ? json.data.hostileMarkers : [],
        initialPoints: json.data.initialPoints !== undefined ? json.data.initialPoints : [],
        kineticPoints: json.data.kineticPoints !== undefined ? json.data.kineticPoints : [],
        lines: json.data.lines !== undefined ? json.data.lines : [],
        mapLabels: json.data.mapLabels !== undefined ? json.data.mapLabels : [],
        polygons: json.data.polygons !== undefined ? json.data.polygons : [],
        survivors: json.data.survivors !== undefined ? json.data.survivors : [],
        styles: json.data.styles !== undefined ? json.data.styles : {
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
        threatMarkers: json.data.threatMarkers !== undefined ? json.data.threatMarkers : []
      }

      if (json.name === undefined || json.name === '') {
        setPageTitle('CAS Planner')
      } else {
        setPageTitle(json.name)
      }

      setHistory([...history, newStep])
      setStep(step + 1)
      //setMarkerId(newId)
      toast('Scenario loaded to map', 'success')
    } else {
      toast('There was an error loading the scenario', 'error')
    }
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      height='100vh'
      width='100vw'
    >
      <Box>
        <CASNavigation
          setActiveDialog={setActiveDialog}
        >
          <CoordInput
            map={map}
            submit={handleCoordInput}
          />
          <div className={classes.sectionDesktop}>
            <CASTools
              brightness={brightness}
              handleClearMarkers={() => handleMarkerEdit('clear', {})}
              handleRedo={handleRedo}
              handleUndo={handleUndo}
              history={history}
              mapColor={mapColor}
              markerSize={markerSize}
              setActiveDialog={setActiveDialog}
              setBrightness={setBrightness}
              setMapColor={setMapColor}
              setMarkerSize={setMarkerSize}
              step={step}
              tooltipsActive={tooltipsActive}
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
            brightness={brightness}
            handleClearMarkers={() => handleMarkerEdit('clear', {})}
            handleRedo={handleRedo}
            handleUndo={handleUndo}
            history={history}
            mapColor={mapColor}
            markerSize={markerSize}
            anchor={mobileMenuAnchor}
            open={activeDialog === 'mobileMenu'}
            setActiveDialog={dialog => setActiveDialog(dialog)}
            setBrightness={setBrightness}
            setMapColor={setMapColor}
            setMarkerSize={setMarkerSize}
            step={step}
            toggleTooltips={() => setTooltipsActive(!tooltipsActive)}
            tooltipsActive={tooltipsActive}
          />
          <SiteMenu
            anchor={mobileMenuAnchor}
            open={activeDialog === 'siteMenu'}
            setActiveDialog={setActiveDialog}
          />
        </CASNavigation>
      </Box>
      <Box
        flex={1}
      >
        <NotificationsDialog
          open={activeDialog === 'notifications'}
          onClose={() => handleMapReset()}
        />
        <Map
          center={mapCenter}
          setMap={setMap}
          toolActive={activeTool !== null}
          setMapCenter={latlng => setMapCenter([latlng.lat, latlng.lng])}
          setMapZoom={zoom => setMapZoom(zoom)}
          setMouseCoords={setMouseCoords}
          setFocusedLatlng={latlng => setFocusedLatlng(latlng)}
          handleMouseMove={latlng => handleMouseMove(latlng)}
          zoom={mapZoom}
        >
          <Popup
            activeTool={activeTool}
            anchor={history[step].anchor}
            elevation={elevation}
            focusedLatlng={focusedLatlng}
            focusedMarker={focusedMarker}
            focusedShape={focusedShape}
            handleMapReset={handleMapReset}
            setFocusedMarker={setFocusedMarker}
          />
          <LayerControl
            anchor={history[step].anchor}
            brightness={brightness}
            handleMarkerDrag={(marker, latlng) => handleMarkerEdit('drag', { marker: marker, latlng: latlng })}
            interactive={activeTool === null}
            map={map}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            markerSize={markerSize}
            setActiveDialog={dialog => setActiveDialog(dialog)}
            setFocusedMarker={marker => setFocusedMarker(marker)}
            setFocusedShape={shape => setFocusedShape(shape)}
            step={history[step]}
            handleDeleteMarker={marker => handleMarkerEdit('delete', { marker: marker })}
            tooltipsActive={tooltipsActive}
          />
          <ZoomControl position='topright' />
          <ToolControl
            activeTool={activeTool}
            toggle={tool => toggleTools(tool)}
          />
          {/*<MouseCoordinatesControl
            anchor={history[step].anchor}
            mouseCoords={mouseCoords}
          />*/}
          <AnalysisTool
            active={activeTool === 'analysis'}
            //clearLatlng={() => setFocusedLatlng(null)}
            clearMouse={() => setMouseCoords(null)}
            mouseCoords={mouseCoords}
            toggle={() => toggleTools('analysis')}
            latlng={focusedLatlng.latlng}
            setFocusedLatlng={latlng => setFocusedLatlng(latlng)}
          />
          <BuildingLabelTool
            active={activeTool === 'buildingLabel'}
            index={history[step].data.buildingLabel}
            latlng={focusedLatlng.latlng}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('buildingLabel')}
          />
          <KineticPointTool
            active={activeTool === 'kineticPoint'}
            firstLetter={history[step].data.firstLetter}
            latlng={focusedLatlng.latlng}
            secondLetter={history[step].data.secondLetter}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('kineticPoint')}
          />
          <LineTool
            active={activeTool === 'line'}
            latlng={focusedLatlng.latlng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('line')}
            tool={activeTool}
          />
          <CircleTool
            active={activeTool === 'circle'}
            latlng={focusedLatlng.latlng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('circle')}
          />
          <RectangleTool
            active={activeTool === 'rectangle'}
            latlng={focusedLatlng.latlng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('rectangle')}
          />
          <LineTool
            active={activeTool === 'polygon'}
            latlng={focusedLatlng.latlng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('polygon')}
            tool={activeTool}
          />
          <EllipseTool
            active={activeTool === 'ellipse'}
            latlng={focusedLatlng.latlng}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('ellipse')}
          />
          <ScaleControl />

        </Map>
      </Box>
      <StyleDrawer
        open={activeDialog === 'style'}
        onClose={() => setActiveDialog(null)}
        submit={(action, payload) => handleMarkerEdit(action, payload)}
      />
      <AddMarkerDrawer
        anchor={history[step].anchor}
        open={activeDialog === 'addMarker'}
        markerLabel={markerLabel}
        onClose={() => setActiveDialog(null)}
        handleAddMarker={payload => handleMarkerEdit('create', payload)}
        setMarkerLabel={setMarkerLabel}
      />
      <EditMarkerDrawer
        marker={focusedMarker}
        open={activeDialog === 'editMarker'}
        onClose={() => setActiveDialog(null)}
        submit={(action, payload) => handleMarkerEdit(action, payload)}
      />
      <EditShapeDrawer
        shape={focusedShape}
        onClose={() => setActiveDialog(null)}
        open={activeDialog === 'editShape'}
        submit={(action, payload) => handleMarkerEdit(action, payload)}
      />
      <MarkerListDialog
        open={activeDialog === 'markerList'}
        onClose={() => setActiveDialog(false)}
        step={history[step]}
      />
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
      <SaveScenarioDialog
        data={history[step]}
        open={activeDialog === 'save'}
        setActiveDialog={dialog => setActiveDialog(dialog)}
        toast={(message, severity) => toast(message, severity)}
      />
      <LoadScenarioDialog
        open={activeDialog === 'load'}
        setActiveDialog={dialog => setActiveDialog(dialog)}
        submit={data => handleLoadScenario(data)}
      />
    </Box>
  )
}

export default Cas