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
// Circle Tool Component
//----------------------------------------------------------------//
const CircleTool = (props) => {

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
  }, [props.active])

  React.useEffect(() => {
    if (props.active && props.latlng !== null && props.mouseCoords !== null) {
      setRadius(distanceAndHeading(props.latlng, props.mouseCoords, 0).meters)
      setDistance(distanceAndHeading(props.latlng, props.mouseCoords, 0))
    }
  }, [props.active, props.latlng, props.mouseCoords])

  React.useEffect(() => {
    if (props.active && center === null) {
      setCenter(props.latlng)
    }

    if (props.active && center !== null && radius !== 0) {
      props.submit('create', {
        color: '#4A90E2',
        dashArray: null,
        fillColor: null,
        latlng: center,
        layer: 'circle',
        radius: radius,
        title: 'Circle',
        unit: 'm',
      })
    }
  }, [props.active, props.latlng])

  const handleEsc = event => {
    if (props.active && event.key === 'Escape') {
      setRadius(0)
      setCenter(null)
      props.toggle()
    }
  }

  if (props.active && center !== null) {
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
          center={props.mouseCoords}
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