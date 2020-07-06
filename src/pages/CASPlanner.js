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
    friendlyMarkers: [],
    hostileMarkers: [],
    threatMarkers: [],
    lines: [],
    polygons: [],
    restrictedOperatingZones: [],
    engagementAreas: [],
    combatAirPatrols: [],
    buildingLabels: [],
  }])
  const [step, setStep] = React.useState(0)
  const [targetLatLng, setTargetLatLng] = React.useState(null)

  const handleColorToggle = () => {
    if (mapColor) {
      document.getElementsByClassName('leaflet-tile-container')[0].style.filter = 'grayscale(100%)'
    } else {
      document.getElementsByClassName('leaflet-tile-container')[0].style.filter = 'none'
    }

    setMapColor(!mapColor)
  }

  const handleCreateMarker = src => {
    if (targetLatLng !== null) {
      const marker = {
        autoPan: true,
        data: null,
        draggable: true,
        elevation: 0,
        iconType: 'img',
        iconUrl: src,
        latlng: targetLatLng,
        riseOnHover: true,
        sovereignty: 'friendly',
        title: 'test',
      }

      if (step === history.length - 1) {
        const friendlyMarkers = [...history[step].friendlyMarkers, marker]
        const newStep = {
          ...history[step],
          friendlyMarkers
        }
        setHistory([...history, newStep])
      } else {
        const newHistory = history.slice(0, step + 1)

        const friendlyMarkers = [...newHistory[step].friendlyMarkers, marker]
        const newStep = {
          ...newHistory[step],
          friendlyMarkers
        }
        setHistory([...newHistory, newStep])
      }
      setStep(step + 1)
      setTargetLatLng(null)
    }
  }

  const handleUndo = () => {
    if (step > 0) {
      setStep(step - 1)
    }
  }

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
        handleAddMarker={src => handleCreateMarker(src)}
        handleMarkerDrawerToggle={() => setMarkerDrawerOpen(!markerDrawerOpen)}
      />
    </React.Fragment>
  )
}