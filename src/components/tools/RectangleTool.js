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
  FeatureGroup,
  Rectangle,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Rectangle Tool Component
//----------------------------------------------------------------//
const RectangleTool = props => {

  const [startLatlng, setStartLatlng] = React.useState(null)

  React.useEffect(() => {
    document.addEventListener('keydown', handleEsc, false)
    setStartLatlng(null)

    return () => {
      document.removeEventListener('keydown', handleEsc, false)
      setStartLatlng(null)
    }
  }, [props.active])

  React.useEffect(() => {
    if (props.active && startLatlng === null) {
      setStartLatlng(props.latlng)
    }

    if (props.active && startLatlng !== null) {
      props.submit('create', {
        bounds: [startLatlng, props.latlng],
        color: '#4A90E2',
        dashArray: null,
        fillColor: null,
        layer: 'rectangle',
        title: 'Rectangle',
      })
    }
  }, [props.latlng])

  const handleEsc = event => {
    if (props.active && event.key === 'Escape') {
      setStartLatlng(null)
      props.toggle()
    }
  }

  if (props.active && startLatlng !== null & props.mouseCoords !== null) {
    return (
      <FeatureGroup>
        <Rectangle
          bounds={[startLatlng, props.mouseCoords]}
          color='#4A90E2'
          fill={null}
          weight={4}
        />
      </FeatureGroup>
    )
  } else {
    return null
  }
}

export default RectangleTool