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
  ZoomControl } from 'react-leaflet'
import Dms from 'geodesy/dms'
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import MapControl from '../components/MapControl'

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
export default ({ history, setHistory, setStep, setTargetLatLng, step, targetLatLng }) => {
  const classes = useStyles()
  const [mapZoom, setMapZoom] = React.useState(5)

  const [mapPopup, setMapPopup] = React.useState(null)

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

    setMapPopup({
      latlng: latlngD.toString(),
      dm: `${latDM}, ${lngDM}`,
      dms: `${latDMS}, ${lngDMS}`,
      mgrs
    })

    setTargetLatLng(latlng)
  }

  const handleMapPopupClose = () => {
    setTargetLatLng(null)
    setMapPopup(null)
  }

  const handleMarkerDrag = (marker, newLatLng) => {
    const filteredFriendlyMarkers = history[step].friendlyMarkers.filter(currentMarker => currentMarker.id !== marker.id)

    const newMarker = {
      ...marker,
      latlng: newLatLng
    }

    const friendlyMarkers = [...filteredFriendlyMarkers, newMarker]

    if (step === history.length - 1) {
      const newStep = {
        ...history[step],
        friendlyMarkers: friendlyMarkers
      }

      setHistory([...history, newStep])
    } else {
      const newHistory = history.slice(0, step + 1)

      const newStep = {
        ...newHistory[step],
        friendlyMarkers
      }

      setHistory([...newHistory, newStep])
    }

    setStep(step + 1)
  }

  return (
    <Map
      center={[35.77, -93.34]}
      className={classes.leafletMap}
      worldCopyJump={true}
      zoom={5}
      zoomControl={false}
      onZoomend={event => setMapZoom(event.target.getZoom())}
      onClick={event => handleMapClick(event.latlng)}
    >
      <MapControl
        friendlyMarkers={history[step].friendlyMarkers}
        handleMarkerDrag={handleMarkerDrag}
        mapZoom={mapZoom}
      />
      <ZoomControl position='topright' />
      <ScaleControl />
      {(targetLatLng !== null) ?
        <Popup
          maxWidth={500}
          position={targetLatLng}
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