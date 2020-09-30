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
import Dms from 'geodesy/dms'
import { LatLon } from 'geodesy/mgrs'
import {
  Popup,
  ScaleControl,
  ZoomControl
} from 'react-leaflet'

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
// Custom Components
//----------------------------------------------------------------//
import AnalysisTool from './components/AnalysisTool'
//import AuthenticatedUserMenu from './components/AuthenticatedUserMenu'
import CASNavigation from './components/CASNavigation'
import CASTools from './components/CASTools'
import CircleTool from './components/CircleTool'
import CoordInput from './components/CoordInput'
import ShapeDrawer from './components/ShapeDrawer'
import Edit9LineDialog from './components/Edit9LineDialog'
import Edit15LineDialog from './components/Edit15LineDialog'
import EditThreatDialog from './components/EditThreatDialog'
import EditMarkerDialog from './components/EditMarkerDialog'
import EditMarkerDrawer from './components/EditMarkerDrawer'
import EllipseTool from './components/EllipseTool'
import { editMarkers } from './functions/editMarkers'
import LayerControl from './components/LayerControl'
import LineTool from './components/LineTool'
import MarkerDrawer from './components/MarkerDrawer'
import MarkerListDialog from './components/MarkerListDialog'
import Map from './components/Map'
import MinimizedMenu from './components/MinimizedMenu'
//import UnauthenticatedUserMenu from './components/UnauthenticatedUserMenu'
import RectangleTool from './components/RectangleTool'
import SaveScenarioDialog from './components/SaveScenarioDialog'
import LoadScenarioDialog from './components/LoadScenarioDialog'
import Alert from './components/Alert'
import ToolControls from './components/ToolControls'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
import 'leaflet/dist/leaflet.css'

const useStyles = makeStyles(theme => ({
  leafletMap: {
    height: '100%',
    width: '100%',
  },
  popupTable: {
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  popupCell: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    padding: '5px',
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
// Constants
//----------------------------------------------------------------//
const minMarkerSize = 1
const maxMarkerSize = 10

//----------------------------------------------------------------//
// CAS Planner Page
//----------------------------------------------------------------//
export default ({ state }) => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // State Variables
  //----------------------------------------------------------------//
  const [activeTool, setActiveTool] = React.useState(null)
  const [mouseCoords, setMouseCoords] = React.useState(null)
  const [clickedLatLng, setClickedLatLng] = React.useState(null)
  const [edit9LineDialogOpen, setEdit9LineDialogOpen] = React.useState(false)
  const [edit15LineDialogOpen, setEdit15LineDialogOpen] = React.useState(false)
  //const [editCapDialogOpen, setEditCapDialogOpen] = React.useState(false)
  const [editMarkerDialogOpen, setEditMarkerDialogOpen] = React.useState(false)
  const [editMarkerDrawerOpen, setEditMarkerDrawerOpen] = React.useState(false)
  const [editThreatDialogOpen, setEditThreatDialogOpen] = React.useState(false)
  const [elevation, setElevation] = React.useState('Pending')
  const [focusedMarker, setFocusedMarker] = React.useState(null)
  const [focusedShape, setFocusedShape] = React.useState(null)
  const [history, setHistory] = React.useState([{
    action: '',
    buildingLabels: [],
    bullseyes: [],
    circles: [],
    ellipses: [],
    friendlyMarkers: [],
    hostileMarkers: [],
    initialPoints: [],
    lines: [],
    polygons: [],
    rectangles: [],
    survivors: [],
    threatMarkers: [],
  }])
  const [lineClosed, setLineClosed] = React.useState(true)
  const [loadScenarioDialogOpen, setLoadScenarioDialogOpen] = React.useState(false)
  const [map, setMap] = React.useState(null)
  const [mapColor, setMapColor] = React.useState(true)
  const [mapPopup, setMapPopup] = React.useState(null)
  const [mapZoom, setMapZoom] = React.useState(5)
  const [markerDrawerOpen, setMarkerDrawerOpen] = React.useState(false)
  const [markerId, setMarkerId] = React.useState(0)
  const [markerLabel, setMarkerLabel] = React.useState('')
  const [markerListDialogOpen, setMarkerListDialogOpen] = React.useState(false)
  const [markerSize, setMarkerSize] = React.useState(3)
  //const [menuAnchorElement, setMenuAnchorElement] = React.useState(null)
  const [minMenuAnchorElement, setMinMenuAnchorElement] = React.useState(null)
  const [saveScenarioDialogOpen, setSaveScenarioDialogOpen] = React.useState(false)
  const [shapeDrawerOpen, setShapeDrawerOpen] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackPack, setSnackPack] = React.useState([])
  const [step, setStep] = React.useState(0)
  const [tooltipsActive, setTooltipsActive] = React.useState(false)
  const [pageTitle, setPageTitle] = React.useState('CAS Planner')

  // const menuOpen = Boolean(menuAnchorElement)
  const minimizedMenuOpen = Boolean(minMenuAnchorElement)

  /*const handleMenuOpen = event => {
    setMenuAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorElement(null)
  }*/

  React.useEffect(() => {
    document.title = `Hawg View | ${pageTitle}`
  }, [pageTitle])

  const handleMinMenuOpen = event => {
    setMinMenuAnchorElement(event.currentTarget)
  }

  const handleMinMenuClose = () => {
    setMinMenuAnchorElement(null)
  }

  /**
   * React hook that listens for the resize of the window and closes the minimized menu if it's open
   */
  React.useEffect(() => {
    window.addEventListener('resize', handleMinMenuClose, false)

    return () => {
      window.removeEventListener('resize', handleMinMenuClose, false)
    }
  }, [])

  /**
   * Handler function for the mouse movement across the map
   * 
   * @param {Object} latlng LatLng coordinates of the mouse cursor
   */
  const handleMouseMove = latlng => {
    if (activeTool === 'analysis' && !lineClosed) {
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
    if (focusedMarker !== null) {
      setClickedLatLng(focusedMarker.latlng)
    } else if (clickedLatLng !== null && activeTool === null && focusedMarker === null) {

      const lat = Dms.parse(clickedLatLng.lat)
      const lng = Dms.parse(clickedLatLng.lng)

      // Transform to DD.DDDD
      const latlngD = LatLon.parse(lat, lng)

      // Transform to DD MM.MMMM
      const latDM = Dms.toLat(lat, 'dm', 4)
      const lngDM = Dms.toLon(lng, 'dm', 4)

      // Transform to DMS
      const latDMS = Dms.toLat(lat, 'dms', 4)
      const lngDMS = Dms.toLon(lng, 'dms', 4)

      // Parse MGRS
      const mgrs = latlngD.toUtm().toMgrs().toString()

      // Get the elevation
      fetch(`https://nationalmap.gov/epqs/pqs.php?x=${lng}&y=${lat}&units=Feet&output=json`)
        .then(response => response.json())
        .then(json => (Number.parseInt(json.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation) === -1000000) ? setElevation(0) : Number.parseInt(setElevation(json.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation)))

      setMapPopup({
        latlng: latlngD.toString(),
        dm: `${latDM}, ${lngDM}`,
        dms: `${latDMS}, ${lngDMS}`,
        mgrs,
        elevation: elevation
      })
    }
  }, [clickedLatLng, activeTool, elevation, focusedMarker])

  /**
   * Helper function to do multiple things when closing the map Popup
   */
  const handleMapReset = () => {
    setClickedLatLng(null)
    setFocusedMarker(null)
    setFocusedShape(null)
    setMapPopup(null)
    setShapeDrawerOpen(false)
    setMarkerDrawerOpen(false)
    setEditMarkerDrawerOpen(false)
    setElevation('Pending')
  }

  const toggleTools = tool => {

    setClickedLatLng(null)
    setMouseCoords(null)
    setLineClosed(true)
    setMapPopup(null)

    switch (tool) {
      case 'analysis':
        activeTool === 'analysis' ? setActiveTool(null) : setActiveTool('analysis')
        break
      case 'line':
        activeTool === 'line' ? setActiveTool(null) : setActiveTool('line')
        break
      case 'circle':
        activeTool === 'circle' ? setActiveTool(null) : setActiveTool('circle')
        break
      case 'rectangle':
        activeTool === 'rectangle' ? setActiveTool(null) : setActiveTool('rectangle')
        break
      case 'polygon':
        activeTool === 'polygon' ? setActiveTool(null) : setActiveTool('polygon')
        break
      case 'ellipse':
        activeTool === 'ellipse' ? setActiveTool(null) : setActiveTool('ellipse')
        break
      default:
        setActiveTool(null)
        console.error(`Error: Tool (${tool}) not recognized.`)
    }
  }

  /**
   * Toggle the map tiles between color and black and white
   */
  const handleColorToggle = () => {
    if (mapColor) {
      document.getElementsByClassName('leaflet-layer-imagery')[0].style.filter = 'grayscale(100%)'
    } else {
      document.getElementsByClassName('leaflet-layer-imagery')[0].style.filter = 'none'
    }

    setMapColor(!mapColor)
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
          id: markerId,
        }

        if (payload.layer !== 'bullseye') {
          updatedPayload = {
            ...updatedPayload,
            elevation: elevation,
          }
        }

        if (payload.layer === 'friendly' || payload.layer === 'hostile' || payload.layer === 'threat' || payload.layer === 'survivor' || payload.layer === 'ip' || payload.layer === 'building' || payload.layer === 'bullseye')
          updatedPayload = {
            ...updatedPayload,
            latlng: clickedLatLng,
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
        setClickedLatLng(null)
        setMouseCoords(null)

        if (action === 'create') {
          setMarkerId(markerId + 1)
          setMarkerLabel('')
        }
        setFocusedMarker(null)
        setFocusedShape(null)
        setEditMarkerDialogOpen(false)
        setEditMarkerDrawerOpen(false)
        setEditThreatDialogOpen(false)
        setEdit9LineDialogOpen(false)
        setEdit15LineDialogOpen(false)

        if (payload.layer === 'circle' || payload.layer === 'rectangle' || payload.layer === 'line' || payload.layer === 'polygon' || payload.layer === 'ellipse') {
          setFocusedShape(updatedPayload)
          setShapeDrawerOpen(true)
          setActiveTool(null)
        }
      }
    } else {
      console.error(`Unsupported action ${action}. Could not modify Markers`)
    }
  }

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setSnackbarOpen(false)
  }

  const handleLoadScenario = data => {
    setLoadScenarioDialogOpen(!loadScenarioDialogOpen)
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
        ellipses: json.data.ellipses,
        rectangles: json.data.rectangles,
        friendlyMarkers: json.data.friendlyMarkers,
        hostileMarkers: json.data.hostileMarkers,
        initialPoints: json.data.initialPoints,
        lines: json.data.lines,
        polygons: json.data.polygons,
        circles: json.data.circles,
        survivors: json.data.survivors,
        threatMarkers: json.data.threatMarkers
      }

      if (json.name === '') {
        setPageTitle('CAS Planner')
      } else {
        setPageTitle(json.name)
      }

      setHistory([...history, newStep])
      setStep(step + 1)
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
          state={state}
        >
          <CoordInput
            map={map}
            submit={latlng => setClickedLatLng(latlng)}
          />
          <div className={classes.sectionDesktop}>
            <CASTools
              handleMarkerDrawerToggle={() => setMarkerDrawerOpen(!markerDrawerOpen)}
              handleMarkerSizeDecrease={(markerSize > minMarkerSize) ? () => setMarkerSize(markerSize - 1) : undefined}
              handleMarkerSizeIncrease={(markerSize < maxMarkerSize) ? () => setMarkerSize(markerSize + 1) : undefined}
              handleClearMarkers={() => handleMarkerEdit('clear', {})}
              handleColorToggle={handleColorToggle}
              handleRedo={handleRedo}
              handleUndo={handleUndo}
              mapColor={mapColor}
              //mouseClickActive={mouseClickActive}
              redoAction={(step === history.length - 1) ? '' : history[step + 1].action}
              redoDisabled={(step === history.length - 1)}
              toggleLoadScenarioDialog={() => setLoadScenarioDialogOpen(!loadScenarioDialogOpen)}
              toggleSaveScenarioDialog={() => setSaveScenarioDialogOpen(!saveScenarioDialogOpen)}
              toggleTooltips={() => setTooltipsActive(!tooltipsActive)}
              toggleMarkerListDialog={() => setMarkerListDialogOpen(true)}
              tooltipsActive={tooltipsActive}
              //toggleMouseClick={() => setMouseClickActive(!mouseClickActive)}
              undoAction={(step === 0) ? '' : history[step].action}
              undoDisabled={(step === 0)}
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              color='inherit'
              onClick={handleMinMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <div className={classes.grow} />
          {/*state.isAuthenticated && (
            <AuthenticatedUserMenu
              handleMenuClose={handleMenuClose}
              handleMenuOpen={handleMenuOpen}
              menuAnchorElement={menuAnchorElement}
              menuOpen={menuOpen}
            />
          )*/}
          {/*!state.isAuthenticated && (
            <UnauthenticatedUserMenu />
          )*/}
          <MinimizedMenu
            handleMarkerDrawerToggle={() => setMarkerDrawerOpen(!markerDrawerOpen)}
            handleMarkerSizeDecrease={(markerSize > minMarkerSize) ? () => setMarkerSize(markerSize - 1) : undefined}
            handleMarkerSizeIncrease={(markerSize < maxMarkerSize) ? () => setMarkerSize(markerSize + 1) : undefined}
            handleClearMarkers={() => handleMarkerEdit('clear', {})}
            handleColorToggle={handleColorToggle}
            handleMinMenuClose={handleMinMenuClose}
            handleRedo={handleRedo}
            handleUndo={handleUndo}
            mapColor={mapColor}
            minimizedMenuOpen={minimizedMenuOpen}
            minMenuAnchorElement={minMenuAnchorElement}
            //mouseClickActive={mouseClickActive}
            redoAction={(step === history.length - 1) ? '' : history[step + 1].action}
            redoDisabled={(step === history.length - 1)}
            toggleLoadScenarioDialog={() => setLoadScenarioDialogOpen(!loadScenarioDialogOpen)}
            toggleSaveScenarioDialog={() => setSaveScenarioDialogOpen(!saveScenarioDialogOpen)}
            toggleTooltips={() => setTooltipsActive(!tooltipsActive)}
            tooltipsActive={tooltipsActive}
            toggleMarkerListDialog={() => setMarkerListDialogOpen(!markerListDialogOpen)}
            undoAction={(step === 0) ? '' : history[step].action}
            undoDisabled={(step === 0)}
          />
        </CASNavigation>
      </Box>
      <Box flex={1}>
        <Map
          setMap={setMap}
          toolActive={activeTool !== null}
          setMapZoom={zoom => setMapZoom(zoom)}
          setClickedLatLng={latlng => setClickedLatLng(latlng)}
          handleMouseMove={latlng => handleMouseMove(latlng)}
        >
          <LayerControl
            handleMarkerDrag={(marker, latlng) => handleMarkerEdit('drag', { marker: marker, latlng: latlng })}
            interactive={activeTool === null}
            map={map}
            mapZoom={mapZoom}
            markerSize={markerSize}
            setClickedLatLng={latlng => setClickedLatLng(latlng)}
            setFocusedMarker={marker => setFocusedMarker(marker)}
            setFocusedShape={shape => setFocusedShape(shape)}
            step={history[step]}
            setShapeDrawerOpen={setShapeDrawerOpen}
            toggleEditMarkerDialog={() => setEditMarkerDrawerOpen(!editMarkerDrawerOpen)}//setEditMarkerDialogOpen(!editMarkerDialogOpen)}
            toggleEditThreatDialog={() => setEditThreatDialogOpen(!editThreatDialogOpen)}
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
            clearLatlng={() => setClickedLatLng(null)}
            clearMouse={() => setMouseCoords(null)}
            lineClosed={lineClosed}
            mouseCoords={mouseCoords}
            setLineClosed={setLineClosed}
            toggle={() => toggleTools('analysis')}
            latlng={clickedLatLng}
          />
          <LineTool
            active={activeTool === 'line'}
            latlng={clickedLatLng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('line')}
            tool={activeTool}
          />
          <CircleTool
            active={activeTool === 'circle'}
            latlng={clickedLatLng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('circle')}
          />
          <RectangleTool
            active={activeTool === 'rectangle'}
            latlng={clickedLatLng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('rectangle')}
          />
          <LineTool
            active={activeTool === 'polygon'}
            latlng={clickedLatLng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('polygon')}
            tool={activeTool}
          />
          <EllipseTool
            active={activeTool === 'ellipse'}
            latlng={clickedLatLng}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('ellipse')}
          />
          <ScaleControl />
          {(clickedLatLng !== null && mapPopup !== null && activeTool === null && focusedMarker === null) ?
            <Popup
              autoPan={false}
              maxWidth={500}
              position={clickedLatLng}
              onClose={handleMapReset}
            >
              <table className={classes.popupTable}>
                <tbody>
                  <tr>
                    <td className={classes.popupCell}>MGRS</td>
                    <td className={classes.popupCell}>{mapPopup.mgrs}</td>
                  </tr>
                  <tr>
                    <td className={classes.popupCell}>DD.DD</td>
                    <td className={classes.popupCell}>{mapPopup.latlng}</td>
                  </tr>
                  <tr>
                    <td className={classes.popupCell}>DD MM.MM</td>
                    <td className={classes.popupCell}>{mapPopup.dm}</td>
                  </tr>
                  <tr>
                    <td className={classes.popupCell}>D M S</td>
                    <td className={classes.popupCell}>{mapPopup.dms}</td>
                  </tr>
                  <tr>
                    <td className={classes.popupCell}>Elevation</td>
                    <td className={classes.popupCell}>{`${mapPopup.elevation} ${(mapPopup.elevation === 'Pending' || mapPopup.elevation === 'Elevation not found') ? '' : 'feet'}`} </td>
                  </tr>
                </tbody>
              </table>
            </Popup> :
            null
          }
        </Map>
      </Box>
      <MarkerDrawer
        markerDrawerOpen={markerDrawerOpen}
        markerLabel={markerLabel}
        handleAddMarker={payload => handleMarkerEdit('create', payload)}
        handleMarkerDrawerToggle={() => setMarkerDrawerOpen(!markerDrawerOpen)}
        setMarkerLabel={setMarkerLabel}
        toggleEditThreatDialog={() => setEditThreatDialogOpen(!editThreatDialogOpen)}
      />
      <EditMarkerDrawer
        marker={focusedMarker}
        open={editMarkerDrawerOpen}
        onClose={handleMapReset}
        submit={(action, payload) => handleMarkerEdit(action, payload)}
      />
      <ShapeDrawer
        shape={focusedShape}
        onClose={handleMapReset}
        open={shapeDrawerOpen}
        submit={(action, payload) => handleMarkerEdit(action, payload)}
      />
      <MarkerListDialog
        friendlies={history[step].friendlyMarkers}
        survivors={history[step].survivors}
        hostiles={history[step].hostileMarkers}
        threats={history[step].threatMarkers}
        open={markerListDialogOpen}
        onClose={() => setMarkerListDialogOpen(false)}
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
      {
        (editMarkerDialogOpen) ?
          <EditMarkerDialog
            onExited={handleMapReset}
            open={editMarkerDialogOpen}
            marker={focusedMarker}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => setEditMarkerDialogOpen(!editMarkerDialogOpen)}
            toggle9LineDialog={() => setEdit9LineDialogOpen(!edit9LineDialogOpen)}
            toggle15LineDialog={() => setEdit15LineDialogOpen(!edit15LineDialogOpen)}
          />
          : undefined
      }
      {
        (edit9LineDialogOpen) ?
          <Edit9LineDialog
            onExited={handleMapReset}
            open={edit9LineDialogOpen}
            marker={focusedMarker}
            submit={payload => handleMarkerEdit('9line', payload)}
            toggle={() => setEdit9LineDialogOpen(!edit9LineDialogOpen)}
          />
          : undefined
      }
      {
        (edit15LineDialogOpen) ?
          <Edit15LineDialog
            onExited={handleMapReset}
            open={edit15LineDialogOpen}
            marker={focusedMarker}
            submit={payload => handleMarkerEdit('15line', payload)}
            toggle={() => setEdit15LineDialogOpen(!edit15LineDialogOpen)}
          />
          : undefined
      }
      {
        (editThreatDialogOpen) ?
          <EditThreatDialog
            onExited={handleMapReset}
            open={editThreatDialogOpen}
            marker={focusedMarker}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => setEditThreatDialogOpen(!editThreatDialogOpen)}
            toggle9LineDialog={() => setEdit9LineDialogOpen(!edit9LineDialogOpen)}
          />
          : undefined
      }
      {
        (saveScenarioDialogOpen) ?
          <SaveScenarioDialog
            data={history[step]}
            open={saveScenarioDialogOpen}
            toast={(message, severity) => toast(message, severity)}
            toggle={() => setSaveScenarioDialogOpen(!saveScenarioDialogOpen)}
          />
          : undefined
      }
      {
        (loadScenarioDialogOpen) ?
          <LoadScenarioDialog
            open={loadScenarioDialogOpen}
            submit={data => handleLoadScenario(data)}
            toggle={() => setLoadScenarioDialogOpen(!loadScenarioDialogOpen)}
          />
          : undefined
      }
    </Box>
  )
}