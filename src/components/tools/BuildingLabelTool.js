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
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Building Label Tool Component
//----------------------------------------------------------------//
const BuildingLabelTool = props => {

  /**
   * 
   */
  React.useEffect(() => {
    if (props.state.tool === 'buildingLabel') {
      document.addEventListener('keydown', handleEscPress, false)
      return () => {
        document.removeEventListener('keydown', handleEscPress, false)
      }
    }
  }, [props.state])

  React.useEffect(() => {
    if (props.state.tool === 'buildingLabel' && props.state.focusedLatlng.latlng !== null) {
      const payload = {
        arty: {
          arty: false,
          display: false,
        },
        iconType: 'div',
        latlng: props.state.focusedLatlng.latlng,
        layer: 'buildingLabel',
        title: props.state.history[props.state.step].data.buildingLabel,
      }

      handleMarkerEdit('create', payload, props.state, props.setState)
    }
  }, [props.state.focusedLatlng.latlng])

  /**
   * 
   * @param {*} event 
   */
  const handleEscPress = event => {
    if (props.state.tool === 'buildingLabel' && event.key === 'Escape') {
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

  return null
}

export default BuildingLabelTool