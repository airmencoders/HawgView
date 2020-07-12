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
import { NavLink } from 'react-router-dom'
//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
import MoreVertIcon from '@material-ui/icons/MoreVert'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import AnalysisTool from '../components/AnalysisTool'
import AuthenticatedUserMenu from '../components/AuthenticatedUserMenu'
import CASNavigation from '../components/CASNavigation'
import CASTools from '../components/CASTools'
import CoordInput from '../components/CoordInput'
import EditFriendlyMarkerDialog from '../components/EditFriendlyMarkerDialog'
import EditHostileMarkerDialog from '../components/EditHostileMarkerDialog'
import { editMarkers } from '../functions/editMarkers'
import EditThreatDialog from '../components/EditThreatDialog'
import LayerControl from '../components/LayerControl'
import MarkerDrawer from '../components/MarkerDrawer'
import Map from '../components/Map'
import MinimizedMenu from '../components/MinimizedMenu'
import UnauthenticatedUserMenu from '../components/UnauthenticatedUserMenu'

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

  // Set the Page Title
  document.title = 'Hawg View | CAS Planner'

  //----------------------------------------------------------------//
  // State Variables
  //----------------------------------------------------------------//
  const [analysisToolActive, setAnalysisToolActive] = React.useState(false)
  const [analysisToolLineClosed, setAnalysisToolLineClosed] = React.useState(true)
  const [analysisToolMouse, setAnalysisToolMouse] = React.useState(null)
  const [clickedLatLng, setClickedLatLng] = React.useState(null)
  const [edit9LineDialogOpen, setEdit9LineDialogOpen] = React.useState(false)
  const [edit15LineDialogOpen, setEdit15LineDialogOpen] = React.useState(false)
  const [editCapDialogOpen, setEditCapDialogOpen] = React.useState(false)
  const [editFriendlyMarkerDialogOpen, setEditFriendlyMarkerDialogOpen] = React.useState(false)
  const [editHostileMarkerDialogOpen, setEditHostileMarkerDialogOpen] = React.useState(false)
  const [editSurvivorDialogOpen, setEditSurvivorDialogOpen] = React.useState(false)
  const [editThreatDialogOpen, setEditThreatDialogOpen] = React.useState(false)
  const [history, setHistory] = React.useState([{
    buildingLabels: [],
    combatAirPatrols: [],
    engagementAreas: [],
    friendlyMarkers: [],
    hostileMarkers: [],
    initialPoints: [],
    lines: [],
    polygons: [],
    restrictedOperatingZones: [],
    survivors: [],
    threatMarkers: [],
  }])
  const [map, setMap] = React.useState(null)
  const [mapColor, setMapColor] = React.useState(true)
  const [mapPopup, setMapPopup] = React.useState(null)
  const [mapZoom, setMapZoom] = React.useState(5)
  const [markerDrawerOpen, setMarkerDrawerOpen] = React.useState(false)
  const [markerId, setMarkerId] = React.useState(0)
  const [markerLabel, setMarkerLabel] = React.useState('')
  const [markerSize, setMarkerSize] = React.useState(3)
  const [menuAnchorElement, setMenuAnchorElement] = React.useState(null)
  const [minMenuAnchorElement, setMinMenuAnchorElement] = React.useState(null)
  const [step, setStep] = React.useState(0)

  const menuOpen = Boolean(menuAnchorElement)
  const minimizedMenuOpen = Boolean(minMenuAnchorElement)

  const handleMenuOpen = event => {
    setMenuAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorElement(null)
  }

  const handleMinMenuOpen = event => {
    setMinMenuAnchorElement(event.currentTarget)
  }

  const handleMinMenuClose = () => {
    setMinMenuAnchorElement(null)
  }


  /**
   * Handler function for the mouse movement across the map
   * 
   * @param {Object} latlng LatLng coordinates of the mouse cursor
   */
  const handleMouseMove = latlng => {
    if (analysisToolActive && !analysisToolLineClosed) {
      setAnalysisToolMouse(latlng)
    }
  }

  /**
   * React hook that sets the popup whenever the clicked Lat/Lng changes
   * Using a hook instead of a function here allows us to use the search bar
   */
  React.useEffect(() => {
    if (clickedLatLng !== null) {
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

      if (!analysisToolActive) {
        setMapPopup({
          latlng: latlngD.toString(),
          dm: `${latDM}, ${lngDM}`,
          dms: `${latDMS}, ${lngDMS}`,
          mgrs
        })
      } else if (analysisToolActive && analysisToolLineClosed) {
        setAnalysisToolLineClosed(false)
      }
    }
  }, [clickedLatLng])

  /**
   * Helper function to do multiple things when closing the map Popup
   */
  const handleMapPopupClose = () => {
    setClickedLatLng(null)
    setMapPopup(null)
  }

  /**
   * Toggle the map tiles between color and black and white
   */
  const handleColorToggle = () => {
    if (mapColor) {
      document.getElementsByClassName('leaflet-tile-container')[0].style.filter = 'grayscale(100%)'
    } else {
      document.getElementsByClassName('leaflet-tile-container')[0].style.filter = 'none'
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

  /**
   * 
   * @param {String} action The action to be completed
   * @param {String} src Source of the marker image (create)
   * @param {String} title Title of the marker (create)
   * @param {String} sovereignty Sovereignty of the marker (create | edit)
   * @param {Object} latlng The lat/lng of the marker (edit | drag)
   * @param {Object} marker The marker object (edit | delete)
   */
  const handleMarkerEdit = (action, src, title, sovereignty, latlng, marker) => {
    let newStep = false
    switch(action) {
      case 'clear':
        newStep = editMarkers('clear', history, step)
        break
      case 'create':
        newStep = editMarkers('create', history, step, src, title, sovereignty, markerId, latlng)
        break
      case 'delete':
        newStep = editMarkers('delete', history, step, null, null, null, null, null, marker)
        break
      case 'drag':
        newStep = editMarkers('drag', history, step, null, null, null, null, latlng, marker)
        break
      default:
        console.log(`Error: Invalid action (${action}`)
    }

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

      if(action === 'create') {
        setMarkerId(markerId + 1)
        setMarkerLabel('')
      }
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
              handleClearMarkers={() => handleMarkerEdit('clear')}
              handleColorToggle={handleColorToggle}
              handleRedo={handleRedo}
              handleUndo={handleUndo}
              redoDisabled={(step === history.length - 1)}
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
          {state.isAuthenticated && (
            <AuthenticatedUserMenu
              handleMenuClose={handleMenuClose}
              handleMenuOpen={handleMenuOpen}
              menuAnchorElement={menuAnchorElement}
              menuOpen={menuOpen}
            />
          )}
          {!state.isAuthenticated && (
            <UnauthenticatedUserMenu />
          )}
          <MinimizedMenu
            handleMarkerDrawerToggle={() => setMarkerDrawerOpen(!markerDrawerOpen)}
            handleMarkerSizeDecrease={(markerSize > minMarkerSize) ? () => setMarkerSize(markerSize - 1) : undefined}
            handleMarkerSizeIncrease={(markerSize < maxMarkerSize) ? () => setMarkerSize(markerSize + 1) : undefined}
            handleClearMarkers={() => editMarkers('clear')}
            handleColorToggle={handleColorToggle}
            handleMinMenuClose={handleMinMenuClose}
            handleRedo={handleRedo}
            handleUndo={handleUndo}
            minimizedMenuOpen={minimizedMenuOpen}
            minMenuAnchorElement={minMenuAnchorElement}
            redoDisabled={(step === history.length - 1)}
            undoDisabled={(step === 0)}
          />
        </CASNavigation>
      </Box>
      <Box flex={1}>
        <Map
          setMap={setMap}
          analysisToolActive={analysisToolActive}
          setMapZoom={zoom => setMapZoom(zoom)}
          setClickedLatLng={latlng => setClickedLatLng(latlng)}
          handleMouseMove={latlng => handleMouseMove(latlng)}
        >
          <LayerControl
            friendlyMarkers={history[step].friendlyMarkers}
            handleMarkerDrag={(marker, latlng) => handleMarkerEdit('drag', null, null, null, latlng, marker)}
            hostileMarkers={history[step].hostileMarkers}
            initialPoints={history[step].initialPoints}
            mapZoom={mapZoom}
            markerSize={markerSize}
            survivors={history[step].survivors}
            threatMarkers={history[step].threatMarkers}
            handleDeleteMarker={marker => handleMarkerEdit('delete', null, null, null, null, marker)}
          />
          <ZoomControl position='topright' />
          <AnalysisTool
            analysisToolActive={analysisToolActive}
            analysisToolLineClosed={analysisToolLineClosed}
            analysisToolMouse={analysisToolMouse}
            setAnalysisToolMouse={setAnalysisToolMouse}
            setClickedLatLng={setClickedLatLng}
            setAnalysisToolActive={setAnalysisToolActive}
            setMapPopup={setMapPopup}
            setAnalysisToolLineClosed={setAnalysisToolLineClosed}
            clickedLatLng={clickedLatLng}
          />
          <ScaleControl />
          {(clickedLatLng !== null && mapPopup !== null && analysisToolActive === false) ?
            <Popup
              maxWidth={500}
              position={clickedLatLng}
              onClose={() => handleMapPopupClose()}
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
        handleAddMarker={(src, title, sovereignty) => handleMarkerEdit('create', src, title, sovereignty, clickedLatLng)}
        handleMarkerDrawerToggle={() => setMarkerDrawerOpen(!markerDrawerOpen)}
        setMarkerLabel={setMarkerLabel}
        toggleEditThreatDialog={() => setEditThreatDialogOpen(!editThreatDialogOpen)}
      />
      <EditFriendlyMarkerDialog
        editFriendlyMarkerDialogOpen={editFriendlyMarkerDialogOpen}
        toggleEditFriendlyMarkerDialog={() => setEditFriendlyMarkerDialogOpen(!editFriendlyMarkerDialogOpen)}
      />
      <EditThreatDialog
        editThreatDialogOpen={editThreatDialogOpen}
        toggleEditThreatDialog={() => setEditThreatDialogOpen(!editThreatDialogOpen)}
      />
      <EditHostileMarkerDialog
        editHostileMarkerDialogOpen={editHostileMarkerDialogOpen}
        toggleEditHostileMarkerDialog={() => setEditHostileMarkerDialogOpen(!editHostileMarkerDialogOpen)}
      />
    </Box>
  )
}