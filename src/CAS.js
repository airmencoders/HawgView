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
// Material-UI Core Components
//----------------------------------------------------------------//
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
import CloseIcon from '@material-ui/icons/Close'
import MoreVertIcon from '@material-ui/icons/MoreVert'

//----------------------------------------------------------------//
// React-Leaflet Components
//----------------------------------------------------------------//
import {
  ScaleControl,
  ZoomControl
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import AnalysisTool from './components/AnalysisTool'
import BuildingLabelTool from './components/BuildingLabelTool'
import CASNavigation from './components/CASNavigation'
import CASTools from './components/CASTools'
import CircleTool from './components/CircleTool'
import CoordInput from './components/CoordInput'
import EditShapeDrawer from './components/EditShapeDrawer'
import EditMarkerDrawer from './components/EditMarkerDrawer'
import EllipseTool from './components/EllipseTool'
import { editMarkers } from './functions/editMarkers'
import KineticPointTool from './components/KineticPointTool'
import LayerControl from './components/LayerControl'
import LineTool from './components/LineTool'
import MarkerDrawer from './components/MarkerDrawer'
import MarkerListDialog from './components/MarkerListDialog'
import Map from './components/Map'
import MapPopup from './components/MapPopup'
import MobileMenu from './components/MobileMenu'
import NotificationsDialog from './components/NotificationsDialog'
import RectangleTool from './components/RectangleTool'
import SaveScenarioDialog from './components/SaveScenarioDialog'
import StyleDrawer from './components/StyleDrawer'
import LoadScenarioDialog from './components/LoadScenarioDialog'
import Alert from './components/Alert'
import ToolControls from './components/ToolControls'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import getElevation from './functions/getElevation'

//----------------------------------------------------------------//
// Class Styling
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
  const [activeDialog, setActiveDialog] = React.useState('notification')
  const [activeTool, setActiveTool] = React.useState(null)
  const [mouseCoords, setMouseCoords] = React.useState(null)
  const [focusedLatlng, setFocusedLatlng] = React.useState({ latlng: null, source: null })
  const [elevation, setElevation] = React.useState('Pending')
  const [focusedMarker, setFocusedMarker] = React.useState(null)
  const [focusedShape, setFocusedShape] = React.useState(null)
  const [history, setHistory] = React.useState([{
    action: '',
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

  React.useEffect(() => {
    document.title = `Hawg View | ${pageTitle}`
  }, [pageTitle])

  const handleMobileMenuOpen = event => {
    setMobileMenuAnchor(event.currentTarget)
    setActiveDialog('mobileMenu')
  }

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null)
    setActiveDialog(null)
  }

  React.useEffect(() => {
    if (activeDialog === null) {
      handleMapReset()
    }
  }, [activeDialog])

  /**
   * React hook that listens for the resize of the window and closes the minimized menu if it's open
   */
  React.useEffect(() => {
    window.addEventListener('resize', handleMobileMenuClose, false)

    return () => {
      window.removeEventListener('resize', handleMobileMenuClose, false)
    }
  }, [])

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
   * React hook that sets the popup whenever the clicked Lat/Lng changes
   * Using a hook instead of a function here allows us to use the search bar
   */
  React.useEffect(() => {
    setElevation('Pending')
    if (focusedMarker !== null) {
      setFocusedLatlng({ latlng: focusedMarker.latlng, source: 'marker' })
    }
  }, [focusedMarker])

  React.useEffect(() => {
    if (focusedLatlng.latlng !== null) {
      (async () => setElevation(await getElevation(focusedLatlng.latlng.lat, focusedLatlng.latlng.lng)))()
    }
  }, [focusedLatlng])

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

        console.log('layer:', payload.layer)

        if (payload.layer === 'circle' || payload.layer === 'rectangle' || payload.layer === 'line' || payload.layer === 'polygon' || payload.layer === 'ellipse') {
          console.log('here')
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
        buildingLabels: json.data.buildingLabels,
        bullseyes: json.data.bullseyes,
        data: json.data.data,
        ellipses: json.data.ellipses,
        rectangles: json.data.rectangles,
        friendlyMarkers: json.data.friendlyMarkers,
        hostileMarkers: json.data.hostileMarkers,
        initialPoints: json.data.initialPoints,
        kineticPoints: json.data.kineticPoints,
        lines: json.data.lines,
        mapLabels: json.data.mapLabels,
        polygons: json.data.polygons,
        circles: json.data.circles,
        survivors: json.data.survivors,
        styles: json.data.styles,
        threatMarkers: json.data.threatMarkers
      }

      if (json.name === '') {
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
              handleClearMarkers={() => handleMarkerEdit('clear', {})}
              handleRedo={handleRedo}
              handleUndo={handleUndo}
              history={history}
              mapColor={mapColor}
              markerSize={markerSize}
              setActiveDialog={setActiveDialog}
              setMapColor={setMapColor}
              setMarkerSize={setMarkerSize}
              step={step}
              tooltipsActive={tooltipsActive}
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              color='inherit'
              onClick={handleMobileMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <MobileMenu
            handleClearMarkers={() => handleMarkerEdit('clear', {})}
            handleRedo={handleRedo}
            handleUndo={handleUndo}
            history={history}
            mapColor={mapColor}
            markerSize={markerSize}
            anchor={mobileMenuAnchor}
            open={activeDialog === 'mobileMenu'}
            setActiveDialog={dialog => setActiveDialog(dialog)}
            setMapColor={setMapColor}
            setMarkerSize={setMarkerSize}
            step={step}
            toggleTooltips={() => setTooltipsActive(!tooltipsActive)}
            tooltipsActive={tooltipsActive}
          />
        </CASNavigation>
      </Box>
      <Box flex={1}>
        <NotificationsDialog
          open={activeDialog === 'notification'}
          onClose={() => handleMapReset()}
        />
        <Map
          center={mapCenter}
          setMap={setMap}
          toolActive={activeTool !== null}
          setMapCenter={latlng => setMapCenter([latlng.lat, latlng.lng])}
          setMapZoom={zoom => setMapZoom(zoom)}
          setFocusedLatlng={latlng => setFocusedLatlng(latlng)}
          handleMouseMove={latlng => handleMouseMove(latlng)}
          zoom={mapZoom}
        >
          <MapPopup
            activeTool={activeTool}
            elevation={elevation}
            focusedLatlng={focusedLatlng}
            focusedMarker={focusedMarker}
            focusedShape={focusedShape}
            handleMapReset={handleMapReset}
            setFocusedMarker={setFocusedMarker}
          />
          <LayerControl
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
          <ToolControls
            activeTool={activeTool}
            toggle={tool => toggleTools(tool)}
          />
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
      <MarkerDrawer
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