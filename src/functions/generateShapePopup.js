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
// Material-UI Components
//----------------------------------------------------------------//
import {
  makeStyles
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  popupCell: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    padding: '5px',
  },
  popupTable: {
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
}))

//----------------------------------------------------------------//
// Generate Shape Popup Function
//----------------------------------------------------------------//
const generateShapePopup = shape => {
  let position = ''

  if (shape.layer === 'ellipse' || shape.layer === 'circle' || shape.layer === 'bullseye') {
    let center

    if (shape.layer === 'ellipse') {
      center = shape.center
    } else {
      center = shape.latlng
    }
    try {
      position = LatLon.parse(center.lat, center.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`
    }
  }

  return (
    <table>
      <tbody>
        <tr>
          <td>
            {shape.title}
          </td>
        </tr>
        <tr>
          <td>
            {position}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default generateShapePopup