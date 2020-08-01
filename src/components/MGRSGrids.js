import React from 'react'
import L from 'leaflet'
import {
  LayerGroup,
  Marker,
  Polyline
} from 'react-leaflet'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  lineStyle: {

  },
  zoneLabel: {
    backgroundColor: 'black',
    color: 'orange',
    fontSize: '0.9rem',
    lineHeight: '20px',
    textAlign: 'center',
  },
}))

export default (props) => {
  const classes = useStyles()

  // To-do: use props and user settings?
  const zoneStyle = {
    color: 'orange',
    opacity: 0.6,
  }

  const [lines, setLines] = React.useState([])
  const [labels, setLabels] = React.useState([])

  //const mapBounds = props.map.getBounds().pad(0.5)
  const northBound = 84//mapBounds.getNorth()//84
  const southBound = -80//mapBounds.getSouth()//-80
  const eastBound = 180//mapBounds.getEast() //180
  const westBound = -180//mapBounds.getWest() //-180
  /*const labelBounds = props.map.getBounds().pad(-0.03)
  const labelNorth = labelBounds.getNorth()
  const labelSouth = labelBounds.getSouth()
  const labelEast = labelBounds.getEast()
  const labelWest = labelBounds.getWest()*/

  let tempLines = []
  let tempLabels = []

  React.useEffect(() => {
    generateGridZones()
  }, [])

  const gridSpacing = () => {
    if (props.zoom < 10) {
      return 100000
    } else if (props.zoom < 14) {
      return 10000
    } else if (props.zoom < 17) {
      return 1000
    } else if (props.zoom <= 20) {
      return 100
    } else {
      return NaN
    }
  }

  const mgrsAccuracy = () => {
    if (props.zoom < 10) {
      return 0
    } else if (props.zoom < 14) {
      return 1
    } else if (props.zoom < 17) {
      return 2
    } else if (props.zoom <= 20) {
      return 3
    } else {
      return NaN
    }
  }

  const generateSpecialZone = (lngArray, northBound, southBound) => {
    const centerLat = southBound + Math.abs(northBound - southBound) / 2

    for (let i in lngArray) {
      tempLines.push({
        positions: [
          [northBound, lngArray[i]],
          [southBound, lngArray[i]]
        ]
      })
      const previous = lngArray[i - 1] ? lngArray[i - 1] : 0
      const labelPoint = L.latLng(centerLat, previous + ((lngArray[i] - previous) / 2))
      tempLabels.push({
        position: labelPoint,
        text: getMGRSZoneNumber(labelPoint.lat, labelPoint.lng) + getMGRSZoneLetter(labelPoint.lat)
      })
    }
  }

  const snap = number => {
    return Math.floor(number / gridSpacing()) * gridSpacing()
  }

  const snapTo = (number, snap) => {
    return Math.floor(number / snap) * snap
  }

  const getMGRSZoneLetter = lat => {
    if (lat <= 84 && lat >= 72) {
      return 'X'
    } else if (lat < 72 && lat >= 64) {
      return 'W'
    } else if (lat < 64 && lat >= 56) {
      return 'V'
    } else if (lat < 56 && lat >= 48) {
      return 'U'
    } else if (lat < 48 && lat >= 40) {
      return 'T'
    } else if (lat < 40 && lat >= 32) {
      return 'S'
    } else if (lat < 32 && lat >= 24) {
      return 'R'
    } else if (lat < 24 && lat >= 16) {
      return 'Q'
    } else if (lat < 16 && lat >= 8) {
      return 'P'
    } else if (lat < 8 && lat >= 0) {
      return 'N'
    } else if (lat < 0 && lat >= -8) {
      return 'M'
    } else if (lat < -8 && lat >= -16) {
      return 'L'
    } else if (lat < -16 && lat >= -24) {
      return 'K'
    } else if (lat < -24 && lat >= -32) {
      return 'J'
    } else if (lat < -32 && lat >= -40) {
      return 'H'
    } else if (lat < -40 && lat >= -48) {
      return 'G'
    } else if (lat < -48 && lat >= -56) {
      return 'F'
    } else if (lat < -56 && lat >= -64) {
      return 'E'
    } else if (lat < -64 && lat >= -72) {
      return 'D'
    } else if (lat < -72 && lat >= -80) {
      return 'C'
    } else {
      return 'Z'
    }
  }

  const getMGRSZoneNumber = (lat, lng) => {
    let zoneNumber = Math.floor((lng + 180) / 6) + 1

    if (lng === 180) {
      zoneNumber = 60
    }

    if (lat >= 56 && lat < 64 && lng >= 3 && lng < 12) {
      zoneNumber = 32
    }

    if (lat >= 72 && lat < 84) {
      if (lng >= 0 && lng < 9) {
        zoneNumber = 31
      } else if (lng >= 9 && lng < 21) {
        zoneNumber = 33
      } else if (lng >= 21 && lng < 33) {
        zoneNumber = 35
      } else if (lng >= 33 && lng < 42) {
        zoneNumber = 37
      }
    }

    return zoneNumber
  }

  const generateGridZones = () => {
    //===============================================================================
    // MGRS Gridzone break lines
    //===============================================================================
    let lat = snapTo(southBound, 8)
    let lng = snapTo(westBound, 6) + 6
    let latCoords = []
    let latMGRS = []
    let lngMGRS = []
    let zoneBreaks = [westBound, westBound]

    if (lat < -80) {
      lat = -80
    }

    // Push the horizontal coords
    while (lat <= northBound) {
      latCoords.push(lat)
      if (lat === 72) {
        latMGRS.push(lat + 6)
        lat += 12
      } else {
        latMGRS.push(lat + 4)
        lat += 8
      }
    }

    // Push the vertical lines
    while (lng < eastBound) {
      zoneBreaks.push(lng)
      lng += 6
    }

    // Hack to make this work....
    zoneBreaks.push(eastBound)
    zoneBreaks.push(eastBound)
    zoneBreaks.push(eastBound)

    // Create horizontal lines in the non exclusion zone
    for (var i = 1; i < zoneBreaks.length - 1; i++) {
      if (zoneBreaks[i] <= 0 || zoneBreaks[i] >= 42) {
        tempLines.push({
          positions: [
            [84, zoneBreaks[i]],
            [-80, zoneBreaks[i]]
          ]
        })
        lngMGRS.push(zoneBreaks[i - 1] + 3)
      } else {
        tempLines.push({
          positions: [
            [56, zoneBreaks[i]],
            [-80, zoneBreaks[i]]
          ]
        })
      }
    }

    // Generate the special zones for Norway and Svalbard
    let lngArray = [3, 12, 18, 24, 30, 36]
    generateSpecialZone(lngArray, 64, 56)
    lngArray = [9, 21, 33]
    generateSpecialZone(lngArray, 84, 72)
    lngArray = [6, 12, 18, 24, 30, 36]
    generateSpecialZone(lngArray, 72, 64)

    for (let y in latCoords) {
      tempLines.push({
        positions: [
          [latCoords[y], westBound],
          [latCoords[y], eastBound]
        ]
      })

      let previousLat, previousLng

      // Create the labels for below the irregularity zone
      if (latCoords[y] <= 56 && latCoords[y] > -80) {
        for (let x in lngArray) {
          if (latCoords[y - 1] === 0) {
            previousLat = 0
          } else {
            previousLat = latCoords[y - 1] ? latCoords[y - 1] : -80
          }

          const centerLat = previousLat + Math.abs(latCoords[y] - previousLat) / 2
          previousLng = lngArray[x - 1] ? lngArray[x - 1] : 0
          const labelPoint = L.latLng(centerLat, previousLng + ((lngArray[x] - previousLng) / 2))
          tempLabels.push({
            position: labelPoint,
            text: getMGRSZoneNumber(labelPoint.lat, labelPoint.lng) + getMGRSZoneLetter(labelPoint.lat)
          })
        }
      }
    }

    //if (Math.abs(westBound - eastBound) > 8)
    for (let x = 0; x < lngMGRS.length - 1; x++) {
      for (let y = 0; y < latMGRS.length - 1; y++) {
        const labelPoint = L.latLng(latMGRS[y], lngMGRS[x])
        tempLabels.push({
          position: labelPoint,
          text: getMGRSZoneNumber(labelPoint.lat, labelPoint.lng) + getMGRSZoneLetter(labelPoint.lat)
        })
      }
    }

    setLines([...tempLines])
    setLabels([...tempLabels])

    //===============================================================================
    // MGRS grid lines (10, 100, 1,000, 10,000 meter lines)
    //===============================================================================
    const fFactor = .000001
    const gridBounds = props.map.getBounds().pad(0.1)
    tempLabels = []

    let labelY = []
    let labelX = []
    let drawn = false

  }

  return (
    <LayerGroup>
      {lines.map((line, index) => (
        <Polyline
          color={zoneStyle.color}
          key={`mgrs-line-${index}`}
          opacity={zoneStyle.opacity}
          positions={line.positions}
        />
      ))}
      {props.zoom > 3 && labels.map((label, index) => (
        <Marker
          icon={L.divIcon({
            className: classes.zoneLabel,
            html: label.text,
            iconSize: [30, 20]
          })}
          key={`mgrs-label-${index}`}
          position={label.position}
        />
      ))}
    </LayerGroup>
  )
}