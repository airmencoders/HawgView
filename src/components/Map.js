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
import {

  Map,
  Popup,
  ScaleControl,
  ZoomControl
} from 'react-leaflet'
import Dms from 'geodesy/dms'
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import AnalysisTool from '../components/AnalysisTool'
import LayerControl from '../components/LayerControl'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
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
}))

//----------------------------------------------------------------//
// Map Component
//----------------------------------------------------------------//
export default ({ clickedLatLng, history, markerSize, setClickedLatLng, setHistory, setStep, step }) => {
  const classes = useStyles()
  const [mapZoom, setMapZoom] = React.useState(5)
  const [mapPopup, setMapPopup] = React.useState(null)
  const [analysisToolActive, setAnalysisToolActive] = React.useState(false)
  const [analysisToolLineClosed, setAnalysisToolLineClosed] = React.useState(true)
  const [analysisToolMouse, setAnalysisToolMouse] = React.useState(null)

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
   * Display a Popup on the Map with the Coordinate information of the clicked location
   * 
   * @param {Object} latlng Lat/Lng coordinates of the clicked location
   */
  const handleMapClick = latlng => {
    const lat = Dms.parse(latlng.lat)
    const lng = Dms.parse(latlng.lng)

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

    setClickedLatLng(latlng)

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

  /**
   * Helper function to do multiple things when closing the map Popup
   */
  const handleMapPopupClose = () => {
    setClickedLatLng(null)
    setMapPopup(null)
  }

  /**
   * If the user drags the marker, once done reset the lat/lon and title for the popup
   * 
   * @param {Object} marker Object representing the marker being drug around the map
   * @param {Object} newLatLng New Lat/Lng coordinates of the marker
   */
  const handleMarkerDrag = (marker, newLatLng) => {
    let targetHistory, filteredMarkers, newStep, newMarker
    let invalidMarker = false

    if (step === history.length - 1) {
      targetHistory = history.slice()
    } else {
      targetHistory = history.slice(0, step + 1)
    }

    switch (marker.sovereignty) {
      case 'friendly':
        filteredMarkers = targetHistory[step].friendlyMarkers.filter(currentMarker => currentMarker.id !== marker.id)
        newMarker = {
          ...marker,
          latlng: newLatLng
        }
        filteredMarkers = [...filteredMarkers, newMarker]
        newStep = {
          ...targetHistory[step],
          friendlyMarkers: filteredMarkers
        }
        break
      case 'hostile':
        filteredMarkers = targetHistory[step].hostileMarkers.filter(currentMarker => currentMarker.id !== marker.id)
        newMarker = {
          ...marker,
          latlng: newLatLng
        }
        filteredMarkers = [...filteredMarkers, newMarker]
        newStep = {
          ...targetHistory[step],
          hostileMarkers: filteredMarkers
        }
        break
      case 'ip':
        filteredMarkers = targetHistory[step].initialPoints.filter(currentMarker => currentMarker.id !== marker.id)
        newMarker = {
          ...marker,
          latlng: newLatLng
        }
        filteredMarkers = [...filteredMarkers, newMarker]
        newStep = {
          ...targetHistory[step],
          initialPoints: filteredMarkers
        }
        break
      case 'survivor':
        filteredMarkers = targetHistory[step].survivors.filter(currentMarker => currentMarker.id !== marker.id)
        newMarker = {
          ...marker,
          latlng: newLatLng
        }
        filteredMarkers = [...filteredMarkers, newMarker]
        newStep = {
          ...targetHistory[step],
          survivors: filteredMarkers
        }
        break
      case 'threat':
        filteredMarkers = targetHistory[step].threatMarkers.filter(currentMarker => currentMarker.id !== marker.id)
        newMarker = {
          ...marker,
          latlng: newLatLng
        }
        filteredMarkers = [...filteredMarkers, newMarker]
        newStep = {
          ...targetHistory[step],
          threatMarkers: filteredMarkers
        }
        break
      default:
        invalidMarker = true
        console.error(`Invalid Sovereignty, ${marker.sovereignty}, passed to function. Unable to add new marker`, marker)
        break
    }

    if (!invalidMarker) {
      setHistory([...targetHistory, newStep])
      setStep(step + 1)
      handleMapPopupClose()
    }
  }

  return (
    <Map
      center={[35.77, -93.34]}
      className={classes.leafletMap}
      doubleClickZoom={(analysisToolActive) ? false : true}
      onZoomend={event => setMapZoom(event.target.getZoom())}
      onClick={event => handleMapClick(event.latlng)}
      onMouseMove={event => handleMouseMove(event.latlng)}
      style={(analysisToolActive) ? { cursor: 'crosshair' } : undefined}
      worldCopyJump={true}
      zoom={5}
      zoomControl={false}
    >
      <LayerControl
        friendlyMarkers={history[step].friendlyMarkers}
        handleMarkerDrag={handleMarkerDrag}
        hostileMarkers={history[step].hostileMarkers}
        initialPoints={history[step].initialPoints}
        mapZoom={mapZoom}
        markerSize={markerSize}
        survivors={history[step].survivors}
        threatMarkers={history[step].threatMarkers}
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
  )
}