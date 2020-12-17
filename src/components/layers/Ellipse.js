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
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon as LL } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button
} from '@material-ui/core'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Popup,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  Ellipse as LEllipse
} from '../tools'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Ellipse Component
//----------------------------------------------------------------//
const Ellipse = props => {

  const generatePopupText = () => {
    let position
    try {
      position = LL.parse(props.ellipse.center.lat, props.ellipse.center.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${props.ellipse.center.lat.toFixed(4)}, ${props.ellipse.center.lng.toFixed(4)}`
    }

    return (
      <React.Fragment>
        {props.ellipse.title}
        <br />
        {position}
      </React.Fragment>
    )
  }

  const handleDeleteEllipse = () => {
    if (props.state.tool === null) {
      handleMarkerEdit('delete', { marker: props.ellipse }, props.state, props.setState)
    }
  }

  const handleEditEllipse = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        dialog: {
          anchor: null,
          name: 'editShape',
        },
        focusedShape: props.ellipse
      })
    }
  }

  return (
    <LEllipse
      ellipse={props.ellipse}
    >
      <Popup
        autoPan={false}
      >
        {generatePopupText()}
        <br />
        <Button
          color='primary'
          onClick={handleEditEllipse}
        >
          Edit
        </Button>
        <Button
          color='secondary'
          onClick={handleDeleteEllipse}
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
          {props.ellipse.title}
        </Tooltip>
        : undefined
      }
    </LEllipse>
  )
}

export default Ellipse