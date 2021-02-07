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
// Geodesy Components
//----------------------------------------------------------------//
import {
  LatLon as LL
} from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button,
} from '@material-ui/core'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Popup,
  Circle as RLCircle,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Circle Component
//----------------------------------------------------------------//
const Circle = props => {

  let radius = props.circle.radius
  if (props.circle.unit === 'km') {
    radius = radius * 1000
  } else if (props.circle.unit === 'NM') {
    radius = radius * 1852
  }

  const generatePopupText = () => {
    let position
    try {
      position = LL.parse(props.circle.latlng.lat, props.circle.latlng.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${props.circle.latlng.lat.toFixed(4)}, ${props.circle.latlng.lng.toFixed(4)}`
    }

    return (
      <React.Fragment>
        {props.circle.title}
        <br/>
        {position}
        <br/>
        {`Radius: ${props.circle.radius.toFixed(2)} ${props.circle.unit}`}
      </React.Fragment>
    )
  }

  const handleDeleteCircle = () => {
    if (props.state.tool === null) {
      handleMarkerEdit('delete', { marker: props.circle}, props.state, props.setState)
    }
  }

  const handleEditCircle = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        dialog: {
          anchor: null,
          name: 'editShape',
        },
        focusedShape: props.circle,
      })
    }
  }

  return (
    <RLCircle
      center={props.circle.latlng}
      color={props.circle.color}
      dashArray={props.circle.dashArray}
      fill={props.circle.fillColor === null ? false : true}
      fillColor={props.circle.fillColor}
      interactive={props.state.tool === null}
      key={`circle-${props.circle.id}-interactive-${props.state.tool === null}`}
      radius={radius}
      weight={4}
    >
      <Popup
        autoPan={false}
      >
        {generatePopupText()}
        <br />
        <Button
          color='primary'
          onClick={handleEditCircle}
        >
          Edit
        </Button>
        <Button
          color='secondary'
          onClick={handleDeleteCircle}
        >
          Delete
        </Button>
      </Popup>
      {props.state.tooltips ?
        <Tooltip
          direction='top'
          offset={L.point(0, -1 * props.state.markerSize * props.state.map.zoom)}
          opacity={1}
          permanent
        >
          {props.circle.title}
        </Tooltip>
        : undefined}
    </RLCircle>
  )
}

export default Circle