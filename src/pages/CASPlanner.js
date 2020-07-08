import React from 'react'

import Box from '@material-ui/core/Box'

import CASNavigation from '../components/CASNavigation'
import MarkerDrawer from '../components/MarkerDrawer'
import Map from '../components/Map'

import 'leaflet/dist/leaflet.css'

export default ({ state }) => {

  // Set the Page Title
  document.title = 'Hawg View | CAS Planner'

  const [markerDrawerOpen, setMarkerDrawerOpen] = React.useState(false)
  const [mapColor, setMapColor] = React.useState(true)
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
  const [step, setStep] = React.useState(0)
  const [targetLatLng, setTargetLatLng] = React.useState(null)
  const [markerId, setMarkerId] = React.useState(0)
  const [markerSize, setMarkerSize] = React.useState(3)

  /**
   * Clears all the markers from the map. But only does so if there is anything to clear.
   * Performs length check on the various arrays in history for the current step to decide
   * if there is anything to clear.
   */
  const handleClearMarkers = () => {
    if (history[step].buildingLabels.length > 0 ||
      history[step].combatAirPatrols.length > 0 ||
      history[step].engagementAreas.length > 0 ||
      history[step].friendlyMarkers.length > 0 ||
      history[step].hostileMarkers.length > 0 ||
      history[step].initialPoints.length > 0 ||
      history[step].lines.length > 0 ||
      history[step].polygons.length > 0 ||
      history[step].restrictedOperatingZones.length > 0 ||
      history[step].survivors.length > 0 ||
      history[step].threatMarkers.length > 0) {

      const newStep = {
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
      }

      let targetHistory
      if (step === history.length - 1) {
        targetHistory = history.slice()
      } else {
        targetHistory = history.slice(0, step + 1)
      }

      setHistory([...targetHistory, newStep])
      setStep(step + 1)
    }
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
   * Create a new marker, add it to a new step object, and add the step object to the history array.
   * Alternatively, if the user is adding a new marker and they are not at the next step, then 
   * remove all the 'alternate reality' future steps and then add the step object.
   * 
   * @param {String} src Static URL of the Marker being placed
   * @param {String} sovereignty Sovereignty of the Marker being placed
   */
  const handleAddMarker = (src, sovereignty) => {
    if (targetLatLng !== null) {
      const marker = {
        autoPan: true,
        data: null,
        draggable: true,
        elevation: 0,
        iconType: 'img',
        iconUrl: src,
        id: markerId,
        latlng: targetLatLng,
        riseOnHover: true,
        sovereignty,
        title: 'test',
      }

      let targetHistory, newMarkers, newStep
      let invalidMarker = false

      if (step === history.length - 1) {
        targetHistory = history.slice()
      } else {
        targetHistory = history.slice(0, step + 1)
      }

      switch (sovereignty) {
        case 'friendly':
          newMarkers = [...targetHistory[step].friendlyMarkers, marker]
          newStep = {
            ...targetHistory[step],
            friendlyMarkers: newMarkers
          }
          break
        case 'hostile':
          newMarkers = [...targetHistory[step].hostileMarkers, marker]
          newStep = {
            ...targetHistory[step],
            hostileMarkers: newMarkers
          }
          break
        case 'ip':
          newMarkers = [...targetHistory[step].initialPoints, marker]
          newStep = {
            ...targetHistory[step],
            initialPoints: newMarkers
          }
          break
        case 'survivor':
          newMarkers = [...targetHistory[step].survivors, marker]
          newStep = {
            ...targetHistory[step],
            survivors: newMarkers
          }
          break
        case 'threat':
          newMarkers = [...targetHistory[step].threatMarkers, marker]
          newStep = {
            ...targetHistory[step],
            threatMarkers: newMarkers
          }
          break
        default:
          invalidMarker = true
          console.error(`Invalid Sovereignty, ${sovereignty}, passed to function. Unable to add new marker`, marker)
          break
      }

      if (!invalidMarker) {
        setHistory([...targetHistory, newStep])
        setStep(step + 1)
        setMarkerId(markerId + 1)
        setTargetLatLng(null)
      }
    }
  }

  const handleMarkerSizeDecrease = () => {
    if (markerSize > 1) {
      setMarkerSize(markerSize - 1)
    }
  }

  const handleMarkerSizeIncrease = () => {
    if (markerSize < 10) {
      setMarkerSize(markerSize + 1)
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

  return (
    <React.Fragment>
      <Box
        display='flex'
        flexDirection='column'
        height='100vh'
        width='100vw'
      >
        <Box>
          <CASNavigation
            handleMarkerDrawerToggle={() => setMarkerDrawerOpen(!markerDrawerOpen)}
            handleMarkerSizeDecrease={handleMarkerSizeDecrease}
            handleMarkerSizeIncrease={handleMarkerSizeIncrease}
            handleClearMarkers={handleClearMarkers}
            handleColorToggle={handleColorToggle}
            handleRedo={handleRedo}
            handleUndo={handleUndo}
            redoDisabled={(step === history.length - 1)}
            state={state}
            undoDisabled={(step === 0)}
          />
        </Box>
        <Box flex={1}>
          <Map
            history={history}
            markerSize={markerSize}
            setHistory={setHistory}
            setStep={setStep}
            setTargetLatLng={setTargetLatLng}
            step={step}
            targetLatLng={targetLatLng}
          />
        </Box>
      </Box>
      <MarkerDrawer
        markerDrawerOpen={markerDrawerOpen}
        handleAddMarker={(src, sovereignty) => handleAddMarker(src, sovereignty)}
        handleMarkerDrawerToggle={() => setMarkerDrawerOpen(!markerDrawerOpen)}
      />
    </React.Fragment>
  )
}