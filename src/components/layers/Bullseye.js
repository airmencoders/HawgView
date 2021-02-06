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
import L from 'leaflet'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Circle,
  Marker,
  Polyline,
  Popup,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import LatLon from 'geodesy/latlon-spherical'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import generateShapePopup from '../../functions/generateShapePopup'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  tooltip: {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    '&:before': {
      border: 'none',
    }
  },
}))

//----------------------------------------------------------------//
// Bullseye Component
//----------------------------------------------------------------//
const Bullseye = props => {
  const classes = useStyles()
  const computedSize = props.state.markerSize * props.state.map.zoom

  const handleClickShape = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        focusedLatlng: {
          latlng: props.bullseye.latlng,
          source: 'marker',
        },
      })
    }
  }

  const handleDeleteShape = () => {
    if (props.state.tool === null) {
      handleMarkerEdit('delete', { marker: props.bullseye }, props.state, props.setState)
    }
  }

  const handleDragShape = latlng => {
    if (props.state.tool === null) {
      handleMarkerEdit('drag', { marker: props.bullseye, latlng: latlng }, props.state, props.setState)
    }
  }

  const handleEditShape = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        dialog: {
          anchor: null,
          name: 'editShape',
        },
        focusedShape: props.bullseye,
      })
    }
  }

  /**
   * 
   * @param {*} bullseye 
   */
  const generateBullCircles = bullseye => {
    let array = []
    const length = bullseye.rings * bullseye.distance * 1852
    const center = LatLon.parse(bullseye.latlng.lat, bullseye.latlng.lng)

    for (let i = 1; i <= bullseye.rings; i++) {
      array.push(
        <Circle
          center={bullseye.latlng}
          color={bullseye.color}
          fill={false}
          key={`bullseye-${bullseye.id}-${bullseye.title}-circle-${i}`}
          radius={bullseye.distance * 1852 * i}
        />
      )
    }

    for (let i = 0; i < 360; i += bullseye.angle) {
      let p2 = center.destinationPoint(length, i + bullseye.declination)
      let positions = [bullseye.latlng, p2]

      array.push(
        <Polyline
          color={bullseye.color}
          key={`bullseye-${bullseye.id}-${bullseye.title}-radial-${i}`}
          positions={positions}
        />
      )
    }

    if (bullseye.showData) {
      for (let i = 1; i <= bullseye.rings; i++) {
        for (let j = 360; j > 0; j -= 90) {
          let position = center.destinationPoint(bullseye.distance * 1852 * i, j + bullseye.declination)

          array.push(
            <Marker
              interactive={false}
              key={`bullseye-${bullseye.id}-${bullseye.title}-circle-${i}-radial-${j}-marker`}
              opacity={0}
              position={position}
            >
              <Tooltip
                className={classes.tooltip}
                direction='top'
                offset={L.point(0, 25)}
                opacity={0.7}
                permanent
              >
                {(i === 1) ?
                  bullseye.sardot ?
                    `${((j + 180) % 360) === 0 ? '360' : ((j + 180) % 360).toString().padStart(3, '0')}/${(bullseye.distance * i).toFixed(1)}` :
                    `${j.toString().padStart(3, '0')}/${(bullseye.distance * i).toFixed(1)}`
                  : `${(bullseye.distance * i).toFixed(1)}`}
              </Tooltip>
            </Marker>
          )
        }
      }
    }
    return array
  }

  const renderBullseye = interactive => {
    return (
      <React.Fragment>
        {generateBullCircles(props.bullseye)}
        <Marker
          autoPan={false}
          draggable={interactive}
          icon={L.icon({
            iconUrl: props.bullseye.iconUrl,
            iconSize: [computedSize, computedSize],
          })}
          id={props.bullseye.id}
          interactive={interactive}
          key={`bullseye-${props.bullseye.id}-interactive-${interactive}`}
          onClick={handleClickShape}
          onDragend={event => handleDragShape(event.target.getLatLng())}
          position={props.bullseye.latlng}
          riseOnHover
          title={props.bullseye.title}
        >
          <Popup
            autoPan={false}
          >
            {generateShapePopup(props.bullseye)}
            <br />
            <Button
              color='primary'
              onClick={handleEditShape}
            >
              Edit
          </Button>
            <Button
              color='secondary'
              onClick={handleDeleteShape}
            >
              Delete
            </Button>
          </Popup>
          {(props.state.tooltips) ?
            <Tooltip
              direction='top'
              offset={L.point(0, -1 * computedSize)}
              opacity='1'
              permanent
            >
              {props.bullseye.title}
            </Tooltip>
            : undefined
          }
        </Marker>
      </React.Fragment>
    )
  }

  if (props.state.tool === null) {
    return <React.Fragment>{renderBullseye(true)}</React.Fragment>
  } else {
    return <React.Fragment>{renderBullseye(false)}</React.Fragment>
  }

}

export default Bullseye