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
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Map as LMap,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(() => ({
  leafletMap: {
    backgroundColor: 'black',
    height: '100%',
    width: '100%',
  },
}))

//----------------------------------------------------------------//
// Map Component
//----------------------------------------------------------------//
const Map = (props) => {
  const classes = useStyles()

  let mapRef = React.useRef()

  //----------------------------------------------------------------//
  // React Callback Functions
  //----------------------------------------------------------------//
  const handleMouseMove = React.useCallback(latlng => {
    props.setMouseCoords(latlng)
  }, [props.mouseCoords])

  //----------------------------------------------------------------//
  // React Effects
  //----------------------------------------------------------------//
  React.useEffect(() => {
    if (mapRef !== null) {
      props.setMap(mapRef)
    }
  }, [mapRef])

  //----------------------------------------------------------------//
  // Render
  //----------------------------------------------------------------//
  return (
    <LMap
      center={props.center}
      className={classes.leafletMap}
      doubleClickZoom={props.state.tool !== null ? false : true}
      maxZoom={19}
      onMoveend={event => props.setMapCenter(event.target.getCenter())}
      onZoomend={event => props.setMapZoom(event.target.getZoom())}
      onClick={event => props.setFocusedLatlng({ latlng: event.latlng, source: 'map' })}
      onMouseMove={event => handleMouseMove(event.latlng)}
      ref={map => (map !== null) ? mapRef = map.leafletElement : undefined}
      style={props.state.tool !== null ? { cursor: 'crosshair' } : undefined}
      worldCopyJump={true}
      zoom={props.zoom}
      zoomControl={false}
    >
      {props.children}
    </LMap>
  )
}

export default Map