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
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button,
} from '@material-ui/core'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Polygon as RLPolygon,
  Popup,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Polygon Component
//----------------------------------------------------------------//
const Polygon = props => {

  const handleDeletePolygon = () => {
    if (props.state.tool === null) {
      handleMarkerEdit('delete', { marker: props.polygon }, props.state, props.setState)
    }
  }

  const handleEditPolygon = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        dialog: {
          anchor: null,
          name: 'editShape',
        },
        focusedShape: props.polygon,
      })
    }
  }

  return (
    <RLPolygon
      color={props.polygon.color}
      dashArray={props.polygon.dashArray}
      fill={props.polygon.fillColor === null ? false : true}
      fillColor={props.polygon.fillColor}
      interactive={props.state.tool === null}
      key={`polygon-${props.polygon.id}-interactive-${props.state.tool === null}`}
      positions={props.polygon.positions}
      weight={4}
    >
      <Popup
        autoPan={false}
      >
        <React.Fragment>
          {props.polygon.title}
          <br />
        </React.Fragment>
        <Button
          color='primary'
          onClick={handleEditPolygon}
        >
          Edit
        </Button>
        <Button
          color='secondary'
          onClick={handleDeletePolygon}
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
          {props.polygon.title}
        </Tooltip>
        : undefined}
    </RLPolygon>
  )
}

export default Polygon