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
import L from 'leaflet'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Marker,
  Popup,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button,
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon as LL } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import {
  render9line,
  render15line,
} from '../../functions/renderData'

//----------------------------------------------------------------//
// Shape Component
//----------------------------------------------------------------//
const Shape = props => {

  const useStyles = makeStyles({
    divIcon: {
      alignItems: 'center',
      color: props.marker.color,
      display: 'flex',
      fontSize: props.markerSize * props.state.map.zoom,
      fontWeight: 'bold',
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${props.markerSize * props.state.map.zoom}px`,
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
        autoPan={false}
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
        <Button color='primary' onClick={() => handleEditMarker(marker)}>Edit</Button>
        <Button color='secondary' onClick={() => props.handleDeleteMarker(marker)}>Delete</Button>
      </Popup>
    )
  }

  const handlePopupClose = () => {
    props.setFocusedMarker(null)
    props.setFocusedShape(null)
    props.setClickedLatLng(null)
  }

  const handleEditMarker = marker => {
    props.setFocusedMarker(marker)
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: 'editMarker',
      },
    })
  }

  if (props.interactive) {
    return (
      <Marker
        draggable
        icon={props.marker.iconType === 'img' ?
          L.icon({
            iconUrl: props.marker.iconUrl,
            iconSize: [props.markerSize * props.state.map.zoom, props.markerSize * props.state.map.zoom],
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
            offset={L.point(0, -1 * props.markerSize * props.state.map.zoom)}
            opacity={1}
            permanent
          />
          : null}
      </Marker>
    )
  } else {
    return (
      <Marker
        icon={props.marker.iconType === 'img' ?
          L.icon({
            iconUrl: props.marker.iconUrl,
            iconSize: [props.markerSize * props.state.map.zoom, props.markerSize * props.state.map.zoom],
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
            offset={L.point(0, -1 * props.markerSize * props.state.map.zoom)}
            opacity={1}
            permanent
          />
          : null}
      </Marker>
    )
  }
}

export default Shape