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
import '@fontsource/roboto'
import L from 'leaflet'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Circle,
  Marker,
  Popup,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon as LL } from 'geodesy/mgrs'
import LatLon from 'geodesy/latlon-spherical'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import { render9line } from '../../functions/renderData'
import { distanceAndHeading } from '../../functions/mathFunctions'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Threat Component
//----------------------------------------------------------------//
const Threat = props => {

  const computedSize = props.state.markerSize * props.state.map.zoom

  //----------------------------------------------------------------//
  // Styles
  //----------------------------------------------------------------//
  const useStyles = makeStyles(theme => ({
    divIcon: {
      alignItems: 'center',
      color: props.marker.color,
      display: 'flex',
      fontSize: computedSize,
      fontWeight: 'bold',
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${computedSize}px`,
      wordWrap: 'break-word',
    },
  }))

  const classes = useStyles()

  const handleClickThreat = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        focusedLatlng: {
          latlng: props.marker.latlng,
          source: 'marker',
        },
      })
    }
  }

  const handleDeleteThreat = () => {
    if (props.state.tool === null) {
      handleMarkerEdit('delete', { marker: props.marker }, props.state, props.setState)
    }
  }

  const handleDragThreat = latlng => {
    if (props.state.tool === null) {
      handleMarkerEdit('drag', { marker: props.marker, latlng: latlng }, props.state, props.setState)
    }
  }

  const handleEditThreat = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        dialog: {
          anchor: null,
          name: 'editMarker',
        },
        focusedMarker: props.marker,
      })
    }
  }

  /**
   * 
   * @param {*} marker 
   */
  const generatePopupText = marker => {
    let position
    try {
      position = LL.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${marker.latlng.lat.toFixed(4)}, ${marker.latlng.lng.toFixed(4)}`
    }

    let fromBE = null
    if (props.state.history[props.state.step].anchor.id !== null) {
      fromBE = distanceAndHeading(props.state.history[props.state.step].anchor.latlng, marker.latlng, props.state.history[props.state.step].anchor.declination)
    }

    return (
      <table>
        <tbody>
          <tr>
            <td>{marker.title} ({marker.sovereignty} {marker.label})</td>
          </tr>
          <tr>
            <td>{position}</td>
          </tr>
          {fromBE !== null ? (
            <tr>
              <td>{props.state.history[props.state.step].anchor.name} {Number.parseInt(fromBE.heading)}&deg; / {fromBE.nm.toFixed(2)} NM</td>
            </tr>
          )
            :
            null}
          <tr>
            <td>{marker.elevation !== 'Pending' && marker.elevation !== 'Elevation not found' ? `${marker.elevation} feet` : 'No elevation'} </td>
          </tr>
        </tbody>
      </table>
    )
  }

  /**
   * 
   * @param {*} marker 
   */
  const generatePopup = marker => {
    return (
      <Popup
        autoPan={false}
        maxWidth={1000}
      >
        {marker.data !== null ? render9line(marker.data) : generatePopupText(marker)}
        <br />
        <Button
          color='primary'
          href={`https://viperops.com/#/ArcGISMap?lat=${LatLon.parse(marker.latlng).lat}&lng=${LatLon.parse(marker.latlng).lng}${(marker.data !== null && marker.data !== undefined) ? `&hdg=${marker.data.hdg}&rng=${marker.data.distance}` : ''}`}
          rel='noopener noreferrer'
          target='_blank'
        >
          TGP View
        </Button>
        <Button
          color='primary'
          onClick={handleEditThreat}
        >
          Edit
        </Button>
        <Button
          color='secondary'
          onClick={handleDeleteThreat}
        >
          Delete
        </Button>
      </Popup>
    )
  }

  return (
    <React.Fragment>
      <Marker
        draggable={props.state.tool === null}
        icon={
          L.divIcon({
            className: classes.divIcon,
            color: props.marker.color,
            html: props.marker.title,
            iconSize: [computedSize, computedSize],
          })
        }
        id={props.marker.id}
        onClick={handleClickThreat}
        onDragend={event => handleDragThreat(event.target.getLatLng())}
        position={props.marker.latlng}
        riseOnHover
        title={props.marker.title}
      >
        {generatePopup(props.marker)}
        {(props.state.tooltips) ?
          <Tooltip
            direction='top'
            offset={L.point(0, -1 * computedSize)}
            opacity={1}
            permanent
          >
            {props.marker.title}
          </Tooltip>
          : null}
      </Marker>
      <Circle
        center={props.marker.latlng}
        color={props.marker.color}
        dashArray={props.marker.dashed ? '12,12' : null}
        fill={props.marker.fill}
        fillColor={props.marker.fillColor}
        radius={props.marker.unit === 'm' ? Number.parseInt(props.marker.range) : props.marker.unit === 'km' ? props.marker.range * 1000 : props.marker.range * 1852}
      />
    </React.Fragment>
  )
}

export default Threat