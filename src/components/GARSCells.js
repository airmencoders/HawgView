import React from 'react'
import L from 'leaflet'
import {
  LayerGroup,
  Marker,
  Polyline
} from 'react-leaflet'

import { makeStyles } from '@material-ui/core/styles'

import gridMath from '../functions/gridMath' //{ gridMath.LLtoUTM, gridMath.UTMtoLL } from '../functions/gridMath'

const useStyles = makeStyles(theme => ({
  cellLabel: {
    backgroundColor: 'black',
    color: 'orange',
    fontSize: '0.9rem',
    lineHeight: '20px',
    textAlign: 'center',
  },
}))

export default (props) => {
  const classes = useStyles()

  let tempLines, tempLabels

  // To-do: use props and user settings?
  const cellStyle = {
    color: 'orange',
    opacity: 1,
  }

  const quadrantStyle = {
    color: 'purple',
    opacity: 1,
  }

  const keypadStyle = {
    color: 'white',
    opacity: 1,
    weight: 1,
  }

  const [cells, setCells] = React.useState([])
  const [quadrants, setQuandrants] = React.useState([])
  const [keypads, setKeypads] = React.useState([])
  const [labels, setLabels] = React.useState([])

  React.useEffect(() => {
    generateGARS()
    props.map.on('zoomend', generateGARS)
    props.map.on('moveend', generateGARS)

    return () => {
      props.map.off('zoomend', generateGARS)
      props.map.off('moveend', generateGARS)
    }
  }, [props.zoom])

  const snap = number => {
    //return Math.floor(number / gridSpacing()) * gridSpacing()
  }

  const snapTo = (number, snap) => {
    return Math.floor(number / snap) * snap
  }

  const generateHorizontalLine = (point1, point2, west, east) => {
    const slope = (point1.lat - point2.lat) / (point1.lng - point2.lng)
    const b = point1.lat - slope * point1.lng

    const newWest = slope * west + b
    const newEast = slope * east + b

    return [L.latLng(newWest, west), L.latLng(newEast, east)]
  }

  const generateVerticalLine = (point1, point2, west, east) => {
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
  }

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
      if(cellLatCoords.indexOf(quadrantLat) === -1) {
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
      if(cellLngCoords.indexOf(quadrantLng) === -1) {
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
          color={cellStyle.color}
          key={`gars-cell-line-${index}`}
          opacity={cellStyle.opacity}
          positions={cell.positions}
        />
      ))}
      {props.zoom > 8 && quadrants.map((quadrant, index) => (
        <Polyline
          color={quadrantStyle.color}
          key={`gars-quadrant-line-${index}`}
          opacity={quadrantStyle.opacity}
          positions={quadrant.positions}
        />
      ))}
      {props.zoom > 10 && keypads.map((keypad, index) => (
        <Polyline
          color={keypadStyle.color}
          key={`gars-keypad-line-${index}`}
          opacity={keypadStyle.opacity}
          positions={keypad.positions}
          weight={keypadStyle.weight}
        />
      ))}
      {props.zoom > 8 && labels.map((label, index) => (
        <Marker
          icon={L.divIcon({
            className: classes.cellLabel,
            html: label.text,
            iconSize: [30, 20]
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