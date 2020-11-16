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

//----------------------------------------------------------------//
// Analysis Tool Component
//----------------------------------------------------------------//
/**
 * 
 * @param {*} props 
 */
const BuildingLabelTool = (props) => {

  //const [index, setIndex] = React.useState(1)

  /**
   * 
   */
  React.useEffect(() => {
    if (props.active) {
      document.addEventListener('keydown', handleEscPress, false)
      return () => {
        document.removeEventListener('keydown', handleEscPress, false)
      }
    }
  }, [props.active])

  React.useEffect(() => {
    if (props.active && props.latlng !== null) {
      const newData = {
        arty: {
          arty: false,
          display: false,
        },
        iconType: 'div',
        latlng: props.latlng,
        layer: 'buildingLabel',
        title: props.index,
      }

      props.submit('create', newData)
    }
  }, [props.latlng])

  /**
   * 
   * @param {*} event 
   */
  const handleEscPress = event => {
    if (props.active && event.key === 'Escape') {
      props.toggle()
    }
  }

  return null
}

export default BuildingLabelTool