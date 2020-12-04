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
// Ellipse Tool Component
//----------------------------------------------------------------//
const EllipseTool = props => {

  /**
   * Since the Leaflet Ellipse plugin isn't dynamic, we're kinda hacking it here.
   * Create an ellipse with the default values that the user can then change through the drawer
   */ 
  React.useEffect(() => {
    if(props.active && props.latlng !== null) {
      props.submit('create', {
        center: props.latlng,
        color: '#4A90E2',
        dashArray: null,
        fillColor: null,
        layer: 'ellipse',
        length: 9260,
        tilt: 90,
        title: 'Ellipse',
        width: 4630,
      })
    }
  }, [props.active, props.latlng])

  return null
}

export default EllipseTool