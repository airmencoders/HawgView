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
  Marker,
  Popup,
  Rectangle,
  Tooltip,
} from 'react-leaflet'
import L from 'leaflet'
import { LatLon as LL } from 'geodesy/mgrs'
import LatLon from 'geodesy/latlon-spherical'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import { render9line, render15line } from '../functions/renderData'


//----------------------------------------------------------------//
// Layer Markers Component
//----------------------------------------------------------------//
const LayerMarkers = props => {

  const useStyles = makeStyles({
    divIcon: {
      alignItems: 'center',
      color: props.marker.color,
      display: 'flex',
      fontSize: props.markerSize * props.mapZoom,
      fontWeight: 'bold',
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${props.markerSize * props.mapZoom}px`,
      wordWrap: 'break-word',
    },
  })

  const classes = useStyles(props)

  const generatePopupText = marker => {
    let position
    try {
      position = LL.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${marker.latlng.lat.toFixed(4)}, ${marker.latlng.lng.toFixed(4)}`
    }
    return (
      <React.Fragment>
        {marker.title}
        <br />
        {position}
        <br />
        {(marker.elevation !== 'Pending' && marker.elevation !== 'Elevation not found') ?
          `${marker.elevation} feet`
          : 'No elevation'
        }
      </React.Fragment>
    )
  }

  const generatePopup = marker => {
    return (
      <Popup
        maxWidth={1000}
        onClose={handlePopupClose}
      >
        {marker.layer === 'hostile' || marker.layer === 'threat' ?
          marker.data !== null ? render9line(marker.data) : generatePopupText(marker)
          : marker.layer === 'survivor' ?
            marker.data !== null ? render15line(marker.data) : generatePopupText(marker)
            : generatePopupText(marker)
        }
        <br />
        <Button
          color='primary'
          href={`https://viperops.com/#/ArcGISMap?lat=${LatLon.parse(marker.latlng).lat}&lng=${LatLon.parse(marker.latlng).lng}${(marker.data !== null && marker.data !== undefined) ? `&hdg=${marker.data.hdg}&rng=${marker.data.distance}` : ''}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          TGP View
        </Button>
        <Button color='primary' onClick={() => handleEditMarker(marker)}>Edit</Button>
        <Button color='secondary' onClick={() => props.handleDeleteMarker(marker)}>Delete</Button>
      </Popup>
    )
  }

  const generatePAA = (latlng, layer) => {
    // Get the four sides
    const point = LatLon.parse(latlng.lat, latlng.lng)
    const north = point.destinationPoint(2000, 0)
    const south = point.destinationPoint(2000, 180)
    const east = point.destinationPoint(2000, 90)
    const west = point.destinationPoint(2000, 270)
    
    // Get the two corners
    const northwest = [north.lat, west.lon]
    const southeast = [south.lat, east.lon]

    return (
      <Rectangle
        bounds={[northwest, southeast]}
        color={layer === 'friendly' ? '#3388ff' : '#ff0000'}
        dashArray='12,12'
        fill={false}
        weight={4}
      />
    )
  }

  const handlePopupClose = () => {
    props.setFocusedMarker(null)
    props.setFocusedShape(null)
    props.setClickedLatLng(null)
  }

  const handleEditMarker = marker => {
    props.setFocusedMarker(marker)
    props.toggleEditMarkerDialog()
  }

  if (props.interactive) {
    return (
      <React.Fragment>
        {(props.marker.arty.arty && props.marker.arty.display) ? generatePAA(props.marker.latlng, props.marker.layer) : null}
        <Marker
          autoPan
          draggable
          icon={props.marker.iconType === 'img' ?
            L.icon({
              iconUrl: props.marker.iconUrl,
              iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
            })
            :
            L.divIcon({
              className: classes.divIcon,
              color: props.marker.color,
              html: props.marker.title,
              iconSize: [20, 20],
            })
          }
          id={props.marker.id}
          onClick={() => props.setFocusedMarker(props.marker)}
          onDragend={event => props.handleMarkerDrag(props.marker, event.target.getLatLng())}
          position={props.marker.latlng}
          riseOnHover
          title={props.marker.title}
        >
          {generatePopup(props.marker)}
          {(props.tooltipsActive) ?
            <Tooltip
              direction='top'
              offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
              opacity={1}
              permanent
            >
              {props.marker.title}
            </Tooltip>
            : null}
        </Marker>
      </React.Fragment>

    )
  } else {
    return (
      <React.Fragment>
        {(props.marker.arty.arty && props.marker.arty.display) ? generatePAA(props.marker.latlng, props.marker.layer) : null}
        <Marker
          icon={props.marker.iconType === 'img' ?
            L.icon({
              iconUrl: props.marker.iconUrl,
              iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
            })
            :
            L.divIcon({
              className: classes.divIcon,
              html: props.marker.title,
              iconSize: [20, 20],
            })
          }
          id={props.marker.id}
          interactive={false}
          position={props.marker.latlng}
          riseOnHover
          title={props.marker.title}
        >
          {(props.tooltipsActive) ?
            <Tooltip
              direction='top'
              offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
              opacity={1}
              permanent
            >
              {props.marker.tooltip}
            </Tooltip>
            : null}
        </Marker>
      </React.Fragment>
    )
  }
}

export default LayerMarkers