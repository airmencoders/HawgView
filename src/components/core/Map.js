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
import '@fontsource/roboto'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Map as LMap,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  leafletMap: {
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
  },
}))

//----------------------------------------------------------------//
// Map Component
//----------------------------------------------------------------//
const Map = props => {
  const classes = useStyles()

  let mapRef = React.useRef()

  //----------------------------------------------------------------//
  // React Callback Functions
  //----------------------------------------------------------------//
  const handleMouseMove = React.useCallback(latlng => {
    props.setState({
      ...props.state,
      mouseCoords: latlng,
    })
  }, [props.state])

  const handleMapClick = latlng => {
    props.setState({
      ...props.state,
      focusedLatlng: {
        latlng,
        source: 'map',
      },
    })
  }

  const handleBaseLayerChange = event => {
    props.setState({
      ...props.state,
      map: {
        ...props.state.map,
        baselayer: event.name,
      },
    })
  }

  const handleOverlayAdd = event => {
    if (event.name === 'Imagery Labels') {
      props.setState({
        ...props.state,
        map: {
          ...props.state.map,
          overlays: {
            ...props.state.map.overlays,
            imagery: true,
          },
        },
      })
    }

    if (event.name === 'Transportation Labels') {
      props.setState({
        ...props.state,
        map: {
          ...props.state.map,
          overlays: {
            ...props.state.map.overlays,
            transportation: true,
          }
        }
      })
    }
  }

  const handleOverlayRemove = event => {
    if (event.name === 'Imagery Labels') {
      props.setState({
        ...props.state,
        map: {
          ...props.state.map,
          overlays: {
            ...props.state.map.overlays,
            imagery: false,
          },
        },
      })
    }

    if (event.name === 'Transportation Labels') {
      props.setState({
        ...props.state,
        map: {
          ...props.state.map,
          overlays: {
            ...props.state.map.overlays,
            transportation: false,
          },
        },
      })
    }
  }

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
      animate={false}
      center={props.state.map.center}
      className={classes.leafletMap}
      doubleClickZoom={props.state.tool !== null ? false : true}
      maxZoom={19}
      onMoveend={event => props.setState({
        ...props.state,
        map: {
          ...props.state.map,
          center: event.target.getCenter(),
        },
      })}
      onZoomend={event => props.setState({
        ...props.state,
        map: {
          ...props.state.map,
          zoom: event.target.getZoom(),
        },
      })}
      onBaselayerChange={handleBaseLayerChange}
      onOverlayAdd={handleOverlayAdd}
      onOverlayRemove={handleOverlayRemove}
      onClick={event => handleMapClick(event.latlng)}
      onMouseMove={event => handleMouseMove(event.latlng)}
      ref={map => (map !== null) ? mapRef = map.leafletElement : undefined}
      style={props.state.tool !== null ? { cursor: 'crosshair' } : undefined}
      worldCopyJump={true}
      zoom={props.state.map.zoom}
      zoomControl={false}
    >
      {props.children}
    </LMap>
  )
}

export default Map