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

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Circle,
  CircleMarker,
  FeatureGroup,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import { distanceAndHeading } from '../../functions/mathFunctions'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Circle Tool Component
//----------------------------------------------------------------//
const CircleTool = props => {

  const [radius, setRadius] = React.useState(0)
  const [center, setCenter] = React.useState(null)
  const [distance, setDistance] = React.useState(null)

  React.useEffect(() => {
    document.addEventListener('keydown', handleEsc, false)
    setCenter(null)
    setRadius(0)

    return () => {
      document.removeEventListener('keydown', handleEsc, false)
      setCenter(null)
      setRadius(0)
    }
  }, [props.state.tool])

  React.useEffect(() => {
    if (
      props.state.tool === 'circle' && 
      props.state.focusedLatlng.latlng !== null && 
      props.state.mouseCoords !== null
    ) {
      setRadius(distanceAndHeading(props.state.focusedLatlng.latlng, props.state.mouseCoords, 0).meters)
      setDistance(distanceAndHeading(props.state.focusedLatlng.latlng, props.state.mouseCoords, 0))
    }
  }, [props.state.tool, props.state.focusedLatlng, props.state.mouseCoords])

  React.useEffect(() => {
    if (props.state.tool === 'circle' && center === null) {
      setCenter(props.state.focusedLatlng.latlng)
    }

    if (props.state.tool === 'circle' && center !== null && radius !== 0) {
      const payload = {
        color: '#4A90E2',
        dashArray: null,
        fillColor: null,
        latlng: center,
        layer: 'circle',
        radius: radius,
        title: 'Circle',
        unit: 'm',
      }

      handleMarkerEdit('create', payload, props.state, props.setState)
    }
  }, [props.state.tool, props.state.focusedLatlng])

  const handleEsc = event => {
    if (props.state.tool === 'circle' && event.key === 'Escape') {
      setRadius(0)
      setCenter(null)
      props.setState({
        ...props.state,
        focusedLatlng: {
          latlng: null,
          source: null,
        },
        tool: null,
      })
    }
  }

  if (props.state.tool === 'circle' && center !== null) {
    return (
      <FeatureGroup>
        <Circle
          center={center}
          color='#4A90E2'
          fill={null}
          radius={radius}
          weight={4}
        />
        <CircleMarker
          center={props.state.mouseCoords}
          fill='false'
          opacity='0'
        >
          <Tooltip
            direction='top'
            offset={[0, -10]}
            permanent={true}
          >
            Radius
            <hr/>
            {`NM: ${distance !== null ? distance.nm.toFixed(2) : ''}`}
            <br/>
            {`meters: ${distance !== null ? distance.meters.toFixed(2) : ''}`}
            <br/>
            {`Click to finish circle`}
          </Tooltip>
        </CircleMarker>
      </FeatureGroup>
    )
  } else {
    return null
  }
}

export default CircleTool