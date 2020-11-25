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
  Marker,
  Popup,
  ScaleControl,
  ZoomControl
} from 'react-leaflet'

import L from 'leaflet'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Snackbar from '@material-ui/core/Snackbar'

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
import CloseIcon from '@material-ui/icons/Close'
import MoreVertIcon from '@material-ui/icons/MoreVert'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import getElevation from './functions/getElevation'
import generateMapPopup from './functions/generateMapPopup'

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
import MinimizedMenu from './components/MinimizedMenu'
import NotificationsDialog from './components/NotificationsDialog'
import RectangleTool from './components/RectangleTool'
import SaveScenarioDialog from './components/SaveScenarioDialog'
import StyleDrawer from './components/StyleDrawer'
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
// CAS Component
//----------------------------------------------------------------//
const Cas = () => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // State Variables
  //----------------------------------------------------------------//
  const [activeDialog, setActiveDialog] = React.useState('notification')
  const [activeTool, setActiveTool] = React.useState(null)
  const [mouseCoords, setMouseCoords] = React.useState(null)
  const [focusedLatlng, setFocusedLatlng] = React.useState(null)
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
  const [lineClosed, setLineClosed] = React.useState(true)
  const [loadScenarioDialogOpen, setLoadScenarioDialogOpen] = React.useState(false)
  const [map, setMap] = React.useState(null)
  const [mapCenter, setMapCenter] = React.useState([35.77, -93.34])
  const [mapColor, setMapColor] = React.useState(true)
  const [mapPopup, setMapPopup] = React.useState(null)
  const [mapZoom, setMapZoom] = React.useState(5)
  const [markerLabel, setMarkerLabel] = React.useState('')
  const [markerSize, setMarkerSize] = React.useState(3)
  const [minMenuAnchorElement, setMinMenuAnchorElement] = React.useState(null)
  const [saveScenarioDialogOpen, setSaveScenarioDialogOpen] = React.useState(false)
  const [snackbarMessage, setSnackbarMessage] = React.useState(undefined)
  const [snackbarOpen, setSnackbarOpen] = React.useState(false)
  const [snackPack, setSnackPack] = React.useState([])
  const [step, setStep] = React.useState(0)
  const [tooltipsActive, setTooltipsActive] = React.useState(false)
  const [pageTitle, setPageTitle] = React.useState('CAS Planner')

  //----------------------------------------------------------------//
  // DEBUGGING AREA
  //----------------------------------------------------------------//
  /*React.useEffect(() => {
    console.log('Focused Latlng:', focusedLatlng)
  }, [focusedLatlng])

  React.useEffect(() => {
    console.log('Active Dialog:', activeDialog)
  }, [activeDialog])

  React.useEffect(() => {
    console.log('Map Popup:', mapPopup)
  }, [mapPopup])*/

  //----------------------------------------------------------------//
  //----------------------------------------------------------------//
  //----------------------------------------------------------------//

  React.useEffect(() => {
    document.title = `Hawg View | ${pageTitle}`
  }, [pageTitle])

  const handleMinMenuOpen = event => {
    setMinMenuAnchorElement(event.currentTarget)
    setActiveDialog('minimizedMenu')
  }

  const handleMinMenuClose = () => {
    setMinMenuAnchorElement(null)
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
    /*if (focusedMarker !== null) {
      setFocusedLatlng(focusedMarker.latlng)
    }*/
  }, [focusedMarker])

  React.useEffect(() => {
    if (activeTool === null && focusedLatlng !== null) {
      setFocusedMarker(null)
      setMapPopup({
        ...generateMapPopup(focusedLatlng),
        elevation: elevation,
      })
    }
  }, [focusedLatlng, activeTool, elevation])

  React.useEffect(() => {
    if (focusedLatlng !== null) {
      (async () => setElevation(await getElevation(focusedLatlng.lat, focusedLatlng.lng)))()
    }
  }, [focusedLatlng])

  /**
   * Helper function to do multiple things when closing the map Popup
   */
  const handleMapReset = () => {
    setActiveDialog(null)
    setFocusedLatlng(null)
    setMouseCoords(null)
    setLineClosed(true)
    setFocusedMarker(null)
    setFocusedShape(null)
    setMapPopup(null)
    setElevation('Pending')
  }

  const toggleTools = tool => {

    setFocusedMarker(null)
    setFocusedLatlng(null)
    //handleMapReset()

    switch (tool) {
      case 'analysis':
        activeTool === 'analysis' ? setActiveTool(null) : setActiveTool('analysis')
        break
      case 'buildingLabel':
        activeTool === 'buildingLabel' ? setActiveTool(null) : setActiveTool('buildingLabel')
        break
      case 'kineticPoint':
        activeTool === 'kineticPoint' ? setActiveTool(null) : setActiveTool('kineticPoint')
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

  const handleCoordInput = latlng => {
    if (latlng === false) {
      toast('Invalid coordinates', 'error')
    } else {
      setFocusedLatlng(latlng)
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
            latlng: focusedLatlng,
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

      // Go through all the markers and IDs

      let newId = 0

      newStep.buildingLabels.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.bullseyes.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.buildingLabels.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.ellipses.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.rectangles.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.friendlyMarkers.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.hostileMarkers.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.initialPoints.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.kineticPoints.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.lines.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.mapLabels.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.polygons.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.circles.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.survivors.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

      newStep.threatMarkers.forEach(element => {
        if (element.id >= newId) {
          newId = element.id + 1
        }
      })

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
          setActiveDialog={dialog => setActiveDialog(dialog)}
        >
          <CoordInput
            map={map}
            submit={latlng => handleCoordInput(latlng)}
          />
          <div className={classes.sectionDesktop}>
            <CASTools
              handleMarkerSizeDecrease={(markerSize > minMarkerSize) ? () => setMarkerSize(markerSize - 1) : undefined}
              handleMarkerSizeIncrease={(markerSize < maxMarkerSize) ? () => setMarkerSize(markerSize + 1) : undefined}
              handleClearMarkers={() => handleMarkerEdit('clear', {})}
              handleColorToggle={handleColorToggle}
              handleRedo={handleRedo}
              handleUndo={handleUndo}
              mapColor={mapColor}
              redoAction={(step === history.length - 1) ? '' : history[step + 1].action}
              redoDisabled={(step === history.length - 1)}
              setActiveDialog={dialog => setActiveDialog(dialog)}
              tooltipsActive={tooltipsActive}
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
          <MinimizedMenu
            handleMarkerSizeDecrease={(markerSize > minMarkerSize) ? () => setMarkerSize(markerSize - 1) : undefined}
            handleMarkerSizeIncrease={(markerSize < maxMarkerSize) ? () => setMarkerSize(markerSize + 1) : undefined}
            handleClearMarkers={() => handleMarkerEdit('clear', {})}
            handleColorToggle={handleColorToggle}
            handleRedo={handleRedo}
            handleUndo={handleUndo}
            mapColor={mapColor}
            minMenuAnchorElement={minMenuAnchorElement}
            onClose={() => setActiveDialog(null)}
            open={activeDialog === 'minimizedMenu'}
            redoAction={(step === history.length - 1) ? '' : history[step + 1].action}
            redoDisabled={(step === history.length - 1)}
            setActiveDialog={dialog => setActiveDialog(dialog)}
            toggleTooltips={() => setTooltipsActive(!tooltipsActive)}
            tooltipsActive={tooltipsActive}
            undoAction={(step === 0) ? '' : history[step].action}
            undoDisabled={(step === 0)}
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
          {(focusedLatlng !== null && focusedMarker === null && focusedShape === null && mapPopup !== null && activeTool === null) ? (
            <Popup
              autoPan={false}
              maxWidth={500}
              key={focusedLatlng}
              onClose={handleMapReset}
              position={focusedLatlng}
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
              <Button
                color='primary'
                href={`https://viperops.com/#/ArcGISMap?lat=${LatLon.parse(mapPopup.latlng).lat}&lng=${LatLon.parse(mapPopup.latlng).lng}`}
                target='_blank'
              >
                TGP View
              </Button>
            </Popup>
          )
            : null
          }

          <LayerControl
            handleMarkerDrag={(marker, latlng) => handleMarkerEdit('drag', { marker: marker, latlng: latlng })}
            interactive={activeTool === null}
            map={map}
            mapCenter={mapCenter}
            mapZoom={mapZoom}
            markerSize={markerSize}
            setActiveDialog={dialog => setActiveDialog(dialog)}
            setFocusedLatlng={latlng => setFocusedLatlng(latlng)}
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
            clearLatlng={() => setFocusedLatlng(null)}
            clearMouse={() => setMouseCoords(null)}
            lineClosed={lineClosed}
            mouseCoords={mouseCoords}
            setLineClosed={setLineClosed}
            toggle={() => toggleTools('analysis')}
            latlng={focusedLatlng}
          />
          <BuildingLabelTool
            active={activeTool === 'buildingLabel'}
            clearLatlng={() => setFocusedLatlng(null)}
            index={history[step].data.buildingLabel}
            latlng={focusedLatlng}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('buildingLabel')}
          />
          <KineticPointTool
            active={activeTool === 'kineticPoint'}
            clearLatlng={() => setFocusedLatlng(null)}
            firstLetter={history[step].data.firstLetter}
            latlng={focusedLatlng}
            secondLetter={history[step].data.secondLetter}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('kineticPoint')}
          />
          <LineTool
            active={activeTool === 'line'}
            latlng={focusedLatlng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('line')}
            tool={activeTool}
          />
          <CircleTool
            active={activeTool === 'circle'}
            latlng={focusedLatlng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('circle')}
          />
          <RectangleTool
            active={activeTool === 'rectangle'}
            latlng={focusedLatlng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('rectangle')}
          />
          <LineTool
            active={activeTool === 'polygon'}
            latlng={focusedLatlng}
            mouseCoords={mouseCoords}
            submit={(action, payload) => handleMarkerEdit(action, payload)}
            toggle={() => toggleTools('polygon')}
            tool={activeTool}
          />
          <EllipseTool
            active={activeTool === 'ellipse'}
            latlng={focusedLatlng}
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
        onClose={() => setActiveDialog(null)}
        open={activeDialog === 'save'}
        toast={(message, severity) => toast(message, severity)}
        toggle={() => setSaveScenarioDialogOpen(!saveScenarioDialogOpen)}
      />
      <LoadScenarioDialog
        onClose={() => setActiveDialog(null)}
        open={activeDialog === 'load'}
        submit={data => handleLoadScenario(data)}
        toggle={() => setLoadScenarioDialogOpen(!loadScenarioDialogOpen)}
      />
    </Box>
  )
}

export default Cas