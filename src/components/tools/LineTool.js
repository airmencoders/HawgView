/**
 * ${SUMMARY}
 * 
 * Based on the leaflet.js plugin leaflet-ruler. A bearing and range analysis tool.
 * Improvements include modularization for use with React and the ability to use
 * magnetic declination for magnetic rather than true headings.
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
  CircleMarker,
  FeatureGroup,
  Polyline,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import { distanceAndHeading } from '../../functions/mathFunctions'

//----------------------------------------------------------------//
// Analysis Tool Component
//----------------------------------------------------------------//
const LineTool = props => {
  /**
   * State variables
   */
  const [positions, setPositions] = React.useState([])
  const [distances, setDistances] = React.useState(null)

  React.useEffect(() => {
    setPositions([])
  }, [props.active])

  /**
   * Add Key and mouse listeners for the map
   * 
   * ESC: For use with the Analysis Tool
   * ENTER: For use with the MGRS search (Possible to just have listener in that tool)
   */
  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress, false)

    return () => {
      document.removeEventListener('keydown', handleKeyPress, false)
    }
  }, [props.active, positions])

  /**
   * Every time the clicked latlng changes and isn't null, add it to the analysis tool
   * As long as the tool is active
   */
  React.useEffect(() => {
    if (props.latlng !== null && props.active) {
      setPositions([...positions, props.latlng])
    }
  }, [props.latlng])

  React.useEffect(() => {
    if(props.latlng !== null && props.mouseCoords !== null) {
      setDistances(distanceAndHeading(props.latlng, props.mouseCoords, 0))
    }
  }, [props.latlng, props.mouseCoords])

  /**
   * Listen for the ESCAPE key to close the line or exit the tool
   * 
   * @param {Event} event Key press event
   */
  const handleKeyPress = event => {
    if (props.active && event.key === 'Escape') {
      setPositions([])
      setDistances(null)
      props.toggle()
    }
  }

  const handleSubmit = () => {
    if (props.active && positions.length > 1) {
      if (props.tool === 'line') {
        props.submit('create', {
          color: '#4A90E2',
          dashArray: null,
          layer: 'line',
          positions: positions,
          title: 'Line',
        })
      } else if (props.tool === 'polygon') {
        props.submit('create', {
          color: '#4A90E2',
          dashArray: null,
          fillColor: null,
          layer: 'polygon',
          positions: positions,
          title: 'Polygon',
        })
      } else {
        console.error(`Invalid tool (${props.tool}) selected.`)
      }

      setPositions([])
      setDistances(null)
      props.toggle()
    }
  }

  return (
    (props.active && positions.length > 0 && props.mouseCoords !== null) ?
      <FeatureGroup>
        <Polyline
          color='#4A90E2'
          positions={[...positions, props.mouseCoords]}
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
            {`NM: ${distances !== null ? distances.nm.toFixed(2) : ''}`}
            <br/>
            {`meters: ${distances !== null ? distances.meters.toFixed(2) : ''}`}
            <br/>
            {`Click ${props.tool === 'line' ? 'last' : 'first'} point to finish ${props.tool}`}
          </Tooltip>
        </CircleMarker>
        {(positions.length > (props.tool === 'line' ? 1 : 2)) ?
          <CircleMarker
            center={props.tool === 'line' ? positions[positions.length - 1] : positions[0]}
            color='white'
            fill={true}
            fillColor='white'
            fillOpacity='1'
            onClick={handleSubmit}
            radius='5'
          />
          : null
        }

      </FeatureGroup>
      : null
  )
}

export default LineTool