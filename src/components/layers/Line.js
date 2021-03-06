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
  Polyline,
  Popup,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Line Component
//----------------------------------------------------------------//
const Line = props => {

  const handleDeleteLine = () => {
    if (props.state.tool === null) {
      handleMarkerEdit('delete', { marker: props.line }, props.state, props.setState)
    }
  }

  const handleEditLine = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        dialog: {
          anchor: null,
          name: 'editShape',
        },
        focusedShape: props.line,
      })
    }
  }

  return (
    <Polyline
      color={props.line.color}
      dashArray={props.line.dashArray}
      interactive={props.state.tool === null}
      key={`line-${props.line.id}-interactive-${props.state.tool === null}`}
      positions={props.line.positions}
      weight={4}
    >
      <Popup
        autoPan={false}
      >
        <React.Fragment>
          {props.line.title}
        </React.Fragment>
        <br />
        <Button
          color='primary'
          onClick={handleEditLine}
        >
          Edit
        </Button>
        <Button
          color='secondary'
          onClick={handleDeleteLine}
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
          {props.line.title}
        </Tooltip>
        : undefined}
    </Polyline>
  )
}

export default Line