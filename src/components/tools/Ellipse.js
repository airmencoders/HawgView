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
    return new L.ellipse(props.center, [props.length, props.width], props.tilt, props.options)
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.center !== fromProps.center) {
      this.leafletElement.setLatLng(toProps.center)
    }

    if (toProps.tilt !== fromProps.tilt) {
      this.leafletElement.setTilt(toProps.tilt)
    }

    if (toProps.options !== fromProps.options) {
      this.leafletElement.setStyle(toProps.options)
    }

    if (toProps.length !== fromProps.length || toProps.width !== fromProps.width) {
      this.leafletElement.setRadius([toProps.length, toProps.width])
    }
  }
}

export default withLeaflet(Ellipse);