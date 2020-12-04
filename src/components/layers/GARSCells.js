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
import L from 'leaflet'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  LayerGroup,
  Marker,
  Polyline,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import { 
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import gridMath from '../../functions/gridMath' //{ gridMath.LLtoUTM, gridMath.UTMtoLL } from '../functions/gridMath'

//----------------------------------------------------------------//
// GARS Cells Component
//----------------------------------------------------------------//
const GARSCells = (props) => {

  //----------------------------------------------------------------//
  // Custom Styles
  //----------------------------------------------------------------//
  const useStyles = makeStyles(({
    cellLabel: {
      backgroundColor: 'black',
      color: props.style.cellColor,
      fontSize: '0.9rem',
      lineHeight: '20px',
      textAlign: 'center',
    },
  }))

  const classes = useStyles(props)

  // To-do: use props and user settings?
  /*const cellStyle = {
    color: props.style.cellColor,
    opacity: 1,
  }

  const quadrantStyle = {
    color: props.style.quadrantColor,
    opacity: 1,
  }

  const keypadStyle = {
    color: props.style.keypadColor,
    opacity: 1,
    weight: 1,
  }*/

  const [cells, setCells] = React.useState([])
  const [quadrants, setQuandrants] = React.useState([])
  const [keypads, setKeypads] = React.useState([])
  const [labels, setLabels] = React.useState([])

  React.useEffect(() => {
    generateGARS()
  }, [props.zoom, props.center])

  /*const snap = number => {
    //return Math.floor(number / gridSpacing()) * gridSpacing()
  }*/

  const snapTo = (number, snap) => {
    return Math.floor(number / snap) * snap
  }

  /*const generateHorizontalLine = (point1, point2, west, east) => {
    const slope = (point1.lat - point2.lat) / (point1.lng - point2.lng)
    const b = point1.lat - slope * point1.lng

    const newWest = slope * west + b
    const newEast = slope * east + b

    return [L.latLng(newWest, west), L.latLng(newEast, east)]
  }*/

  /*const generateVerticalLine = (point1, point2, west, east) => {
    const slope = (point1.lat - point2.lat) / (point1.lng - point2.lng)

    if (point2.lng > east) {
      const newLat = point1.lat + (slope * (east - point1.lng))
      point2 = L.latLng(newLat, east)
    }

    if (point2.lng < west) {
      const newLat = point1.lat + (slope * (west - point1.lng))
      point2 = L.latLng(newLat, west)
    }

    return [point1, point2]
  }*/

  const generateGARS = () => {
    //===============================================================================
    // MGRS Grid Zones
    //===============================================================================
    let mapBounds = props.map.getBounds().pad(0.5)
    let northBound = mapBounds.getNorth()//84//mapBounds.getNorth()//84
    let southBound = mapBounds.getSouth()//- 80//mapBounds.getSouth()//-80
    let eastBound = mapBounds.getEast()//180//mapBounds.getEast() //180
    let westBound = mapBounds.getWest()//-180//mapBounds.getWest() //-180
    /*const labelBounds = props.map.getBounds().pad(-0.03)
    const labelNorth = labelBounds.getNorth()
    const labelSouth = labelBounds.getSouth()
    const labelEast = labelBounds.getEast()
    const labelWest = labelBounds.getWest()*/

    let cellLat = snapTo(southBound, 0.5)
    let cellLng = snapTo(westBound, 0.5) + 0.5
    let quadrantLat = snapTo(southBound, 0.5)
    let quadrantLng = snapTo(westBound, 0.5) + 0.5
    let keypadLat = snapTo(southBound, 0.5)
    let keypadLng = snapTo(westBound, 0.5) + 0.5
    let cellLatCoords = []
    let cellLngCoords = []
    let quadrantLatCoords = []
    let quadrantLngCoords = []
    let keypadLatCoords = []
    let keypadLngCoords = []

    let cellLines = []
    let quadrantLines = []
    let keypadLines = []
    let tempLabels = []

    if (cellLat < -80) {
      cellLat = -80
      quadrantLat = -80
      keypadLat = -80
    }

    if (cellLng < -180) {
      cellLng = -180
      quadrantLng = -180
      keypadLng = -180
    }

    // Push the horizontal coords
    while (cellLat <= northBound && cellLat <= 84) {
      cellLatCoords.push(cellLat)
      cellLat += 0.5
    }
    while (quadrantLat <= northBound && quadrantLat <= 84) {
      if (cellLatCoords.indexOf(quadrantLat) === -1) {
        quadrantLatCoords.push(quadrantLat)
      }
      quadrantLat += 0.25
    }
    let index = 0
    while (keypadLat <= northBound && keypadLat <= 84) {
      if (index % 3 !== 0) {
        keypadLatCoords.push(keypadLat)
      }
      index++
      keypadLat += (5 / 60)
    }

    // Push the vertical coords
    while (cellLng <= eastBound && cellLng <= 180) {
      cellLngCoords.push(cellLng)
      cellLng += 0.5
    }
    while (quadrantLng <= eastBound && quadrantLng <= 180) {
      if (cellLngCoords.indexOf(quadrantLng) === -1) {
        quadrantLngCoords.push(quadrantLng)
      }
      quadrantLng += 0.25
    }

    index = 0
    while (keypadLng <= eastBound && keypadLng <= 180) {
      if (index % 3 !== 0) {
        keypadLngCoords.push(keypadLng)
      }
      index++
      keypadLng += (5 / 60)
    }

    cellLngCoords.push(eastBound)

    for (let y in cellLatCoords) {
      cellLines.push({
        positions: [
          [cellLatCoords[y], Math.max(westBound, -180)],
          [cellLatCoords[y], Math.min(eastBound, 180)]
        ]
      })
    }

    for (let y in quadrantLatCoords) {
      //if (cellLatCoords.indexOf(quadrantLatCoords[y]) === -1) {
      quadrantLines.push({
        positions: [
          [quadrantLatCoords[y], Math.max(westBound, -180)],
          [quadrantLatCoords[y], Math.min(eastBound, 180)]
        ]
      })
      //}
    }

    for (let y = 0; y < keypadLatCoords.length; y++) {
      //if (y % 3 !== 0) {
      keypadLines.push({
        positions: [
          [keypadLatCoords[y], Math.max(westBound, -180)],
          [keypadLatCoords[y], Math.min(eastBound, 180)]
        ]
      })
      //}

    }

    for (let x in cellLngCoords) {
      cellLines.push({
        positions: [
          [Math.max(southBound, -84), cellLngCoords[x]],
          [Math.min(northBound, 80), cellLngCoords[x]]
        ]
      })
    }

    for (let x in quadrantLngCoords) {
      //if (cellLngCoords.indexOf(quadrantLngCoords[x]) === -1) {
      quadrantLines.push({
        positions: [
          [Math.max(southBound, -84), quadrantLngCoords[x]],
          [Math.min(northBound, 80), quadrantLngCoords[x]]
        ]
      })
      //}
    }

    for (let x = 0; x < keypadLngCoords.length; x++) {
      //if (x % 3 !== 0) {
      keypadLines.push({
        positions: [
          [Math.max(southBound, -84), keypadLngCoords[x]],
          [Math.min(northBound, 80), keypadLngCoords[x]]
        ]
      })
      //}
    }

    for (let x in quadrantLatCoords) {
      for (let y in quadrantLngCoords) {
        let labelPoint = L.latLng(quadrantLatCoords[x], quadrantLngCoords[y])
        if (mapBounds.contains(labelPoint)) {
          tempLabels.push({
            position: labelPoint,
            text: gridMath.getGARSCellLabel(labelPoint)
          })
        }
      }
    }

    setCells([...cellLines])
    setQuandrants([...quadrantLines])
    setKeypads([...keypadLines])
    setLabels([...tempLabels])
  }

  return (
    <LayerGroup>
      {props.zoom > 6 && cells.map((cell, index) => (
        <Polyline
          color={props.style.cellColor}
          key={`gars-cell-line-${index}`}
          opacity={1}
          positions={cell.positions}
        />
      ))}
      {props.zoom > 8 && quadrants.map((quadrant, index) => (
        <Polyline
          color={props.style.quadrantColor}
          key={`gars-quadrant-line-${index}`}
          opacity={1}
          positions={quadrant.positions}
        />
      ))}
      {props.zoom > 10 && keypads.map((keypad, index) => (
        <Polyline
          color={props.style.keypadColor}
          key={`gars-keypad-line-${index}`}
          opacity={1}
          positions={keypad.positions}
          weight={1}
        />
      ))}
      {props.zoom > 8 && labels.map((label, index) => (
        <Marker
          icon={L.divIcon({
            className: classes.cellLabel,
            html: label.text,
            iconSize: [50, 20]
          })}
          key={`gars-cell-label-${index}`}
          position={label.position}
        />
      ))}
      {/*props.zoom >= 9 && gridLines.map((line, index) => (
        <Polyline
          color={lineStyle.color}
          key={`mgrs-grid-line-${index}`}
          opacity={lineStyle.opacity}
          positions={line.positions}
          weight={lineStyle.weight}
        />
      ))*/}
      {/*props.zoom > 3 && labels.map((label, index) => (
        <Marker
          icon={L.divIcon({
            className: classes.zoneLabel,
            html: label.text,
            iconSize: [30, 20]
          })}
          key={`mgrs-label-${index}`}
          position={label.position}
        />
        ))*/}
    </LayerGroup>
  )
}

export default GARSCells