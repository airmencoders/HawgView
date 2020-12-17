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
 * 
 * References:
 * https://www.manongdao.com/article-2180787.html - How to extend Leaflet-Ellipse in React
 */
import L from 'leaflet'
import 'leaflet-ellipse'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Path,
  withLeaflet,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Ellipse Component
//----------------------------------------------------------------//
class Ellipse extends Path {

  createLeafletElement(props) {
    let options = {
      color: props.ellipse.color,
      dashArray: props.ellipse.dashArray,
      fill: props.ellipse.fillColor === null ? false : true,
      fillColor: props.ellipse.fillColor,
      weight: 4,
    }

    return new L.ellipse(
      props.ellipse.center,
      [props.ellipse.length, props.ellipse.width],
      props.ellipse.tilt,
      options)
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.ellipse.center !== fromProps.ellipse.center) {
      this.leafletElement.setLatLng(toProps.ellipse.center)
    }

    if (toProps.ellipse.tilt !== fromProps.ellipse.tilt) {
      this.leafletElement.setTilt(toProps.ellipse.tilt)
    }

    if (
      toProps.ellipse.color !== fromProps.ellipse.color ||
      toProps.ellipse.dashArray !== fromProps.ellipse.dashArray ||
      toProps.ellipse.fill !== fromProps.ellipse.fill ||
      toProps.ellipse.fillColor !== fromProps.ellipse.fillColor
    ) {
      this.leafletElement.setStyle({
        color: toProps.ellipse.color,
        dashArray: toProps.ellipse.dashArray,
        fill: toProps.ellipse.fillColor === null ? false : true,
        fillColor: toProps.ellipse.fillColor,
        weight: 4,
      })
    }

    if (toProps.ellipse.length !== fromProps.ellipse.length || toProps.ellipse.width !== fromProps.ellipse.width) {
      this.leafletElement.setRadius([toProps.ellipse.length, toProps.ellipse.width])
    }
  }
}

export default withLeaflet(Ellipse);