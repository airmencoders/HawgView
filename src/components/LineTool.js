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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'
import {
  FeatureGroup,
  Polyline,
  Polygon,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Analysis Tool Component
//----------------------------------------------------------------//
export default (props) => {
  /**
   * State variables
   */
  const [positions, setPositions] = React.useState([])

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

  /**
   * Listen for the ESCAPE key to close the line or exit the tool
   * 
   * @param {Event} event Key press event
   */
  const handleKeyPress = event => {
    if (props.active && event.key === 'Enter') {
      if (positions.length > 1) {
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

      }

      setPositions([])
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
      </FeatureGroup>
      : null
  )
}