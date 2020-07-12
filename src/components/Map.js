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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'
import {
  Map,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const useStyles = makeStyles(() => ({
  leafletMap: {
    height: '100%',
    width: '100%',
  },
}))

//----------------------------------------------------------------//
// Map Component
//----------------------------------------------------------------//
export default (props) => {
  const classes = useStyles()

  let mapRef = React.useRef()

  React.useEffect(() => {
    if (mapRef !== null) {
      props.setMap(mapRef)
    }
  }, [mapRef])

  return (
    <Map
      center={[35.77, -93.34]}
      className={classes.leafletMap}
      doubleClickZoom={(props.analysisToolActive) ? false : true}
      onZoomend={event => props.setMapZoom(event.target.getZoom())}
      onClick={event => props.setClickedLatLng(event.latlng)}
      onMouseMove={event => props.handleMouseMove(event.latlng)}
      ref={map => (map !== null) ? mapRef = map.leafletElement : undefined}
      style={(props.analysisToolActive) ? { cursor: 'crosshair' } : undefined}
      worldCopyJump={true}
      zoom={5}
      zoomControl={false}
    >
      {props.children}
    </Map>
  )
}