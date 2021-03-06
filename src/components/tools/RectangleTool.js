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
import '@fontsource/roboto'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  FeatureGroup,
  Rectangle,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

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
  }, [props.state.tool])

  React.useEffect(() => {
    if (props.state.tool === 'rectangle' && startLatlng === null) {
      setStartLatlng(props.state.focusedLatlng.latlng)
    }

    if (props.state.tool === 'rectangle' && startLatlng !== null) {
      let payload = {
        bounds: [startLatlng, props.state.focusedLatlng.latlng],
        color: '#4A90E2',
        dashArray: null,
        fillColor: null,
        layer: 'rectangle',
        title: 'Rectangle',
      }

      handleMarkerEdit('create', payload, props.state, props.setState)
    }
  }, [props.state.focusedLatlng])

  const handleEsc = event => {
    if (props.state.tool === 'rectangle' && event.key === 'Escape') {
      setStartLatlng(null)
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

  if (props.state.tool === 'rectangle' && startLatlng !== null & props.state.mouseCoords !== null) {
    return (
      <FeatureGroup>
        <Rectangle
          bounds={[startLatlng, props.state.mouseCoords]}
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