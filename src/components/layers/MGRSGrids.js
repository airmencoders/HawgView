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
import gridMath from '../../functions/gridMath'

//----------------------------------------------------------------//
// MGRS Grid Component
//----------------------------------------------------------------//
const MGRSGrids = (props) => {

  //----------------------------------------------------------------//
  // Custom Styling
  //----------------------------------------------------------------//
  const useStyles = makeStyles({
    zoneLabel: {
      backgroundColor: 'black',
      color: props.style.gridzoneColor,
      fontSize: '0.9rem',
      lineHeight: '20px',
      textAlign: 'center',
    },
  })
  const classes = useStyles(props)

  const zoneStyle = {
    color: props.style.gridzoneColor,
    opacity: 0.6,
  }

  const lineStyle = {
    color: props.style.lineColor,
    opacity: 1,
    weight: 1,
  }

  //----------------------------------------------------------------//
  // State
  //----------------------------------------------------------------//
  const [zoneLines, setZoneLines] = React.useState([])
  const [gridLines, setGridLines] = React.useState([])
  const [labels, setLabels] = React.useState([])

  let tempLines, tempLabels

  React.useEffect(() => {
    generateGridZones()
  }, [props.state.map.zoom, props.state.map.center])

  const gridSpacing = () => {
    if (props.state.map.zoom < 10) {
      return 100000
    } else if (props.state.map.zoom < 13) {
      return 10000
    } else if (props.state.map.zoom < 16) {
      return 1000
    } else if (props.state.map.zoom <= 19) {
      return 100
    } else {
      return NaN
    }
  }

  const mgrsAccuracy = () => {
    if (props.state.map.zoom < 10) {
      return 0
    } else if (props.state.map.zoom < 13) {
      return 1
    } else if (props.state.map.zoom < 16) {
      return 2
    } else if (props.state.map.zoom <= 19) {
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
      const labelUTM = gridMath.LLtoUTM(labelPoint)
      tempLabels.push({
        position: labelPoint,
        text: labelUTM.zoneNumber + '' + labelUTM.zoneLetter
        //text: getMGRSZoneNumber(labelPoint.lat, labelPoint.lng) + getMGRSZoneLetter(labelPoint.lat)
      })
    }
  }

  const snap = number => {
    return Math.floor(number / gridSpacing()) * gridSpacing()
  }

  const snapTo = (number, snap) => {
    return Math.floor(number / snap) * snap
  }

  const generateHorizontalLine = (point1, point2, west, east) => {
    const slope = (point1.lat - point2.lat) / (point1.lng - point2.lng)

    if (isNaN(slope)) {
      return null
    } else {
      const b = point1.lat - slope * point1.lng

      const newWest = slope * west + b
      const newEast = slope * east + b

      return [L.latLng(newWest, west), L.latLng(newEast, east)]
    }
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

  const generateGridZones = () => {
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

    let lat = snapTo(southBound, 8)
    let lng = snapTo(westBound, 6) + 6
    let latCoords = []
    let latMGRS = []
    let lngMGRS = []
    let zoneBreaks = [westBound]

    tempLines = []
    tempLabels = []

    if (lat < -80) {
      lat = -80
    }

    if (lng < -180) {
      lng = -180
    }

    // Push the horizontal coords
    while (lat <= northBound && lat <= 84) {
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
    while (lng <= eastBound && lng <= 180) {
      zoneBreaks.push(lng)
      lng += 6
    }

    // Hack to make this work....
    zoneBreaks.push(eastBound)
    zoneBreaks.push(eastBound)


    // Create vertical lines in the non exclusion zone
    for (var i = 1; i < zoneBreaks.length - 1; i++) {
      if (zoneBreaks[i] <= 0 || zoneBreaks[i] >= 42) {
        tempLines.push({
          positions: [
            [Math.min(northBound, 84), zoneBreaks[i]],
            [Math.max(southBound, -80), zoneBreaks[i]]
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
          [latCoords[y], Math.max(westBound, -180)],
          [latCoords[y], Math.min(eastBound, 180)]
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
          const labelUTM = gridMath.LLtoUTM(labelPoint)
          const number = labelUTM.zoneNumber > 60 ? labelUTM.zoneNumber % 60 : labelUTM.zoneNumber < 1 ? labelUTM.zoneNumber + 60 : labelUTM.zoneNumber
          tempLabels.push({
            position: labelPoint,
            text: number + '' + labelUTM.zoneLetter
            //text: getMGRSZoneNumber(labelPoint.lat, labelPoint.lng) + getMGRSZoneLetter(labelPoint.lat)
          })
        }
      }
    }

    //if (Math.abs(westBound - eastBound) > 8)
    for (let x = 0; x < lngMGRS.length - 1; x++) {
      for (let y = 0; y < latMGRS.length - 1; y++) {
        const labelPoint = L.latLng(latMGRS[y], lngMGRS[x])
        const labelUTM = gridMath.LLtoUTM(labelPoint)
        const number = labelUTM.zoneNumber > 60 ? labelUTM.zoneNumber % 60 : labelUTM.zoneNumber < 1 ? labelUTM.zoneNumber + 60 : labelUTM.zoneNumber
        tempLabels.push({
          position: labelPoint,
          text: number + '' + labelUTM.zoneLetter
          //text: getMGRSZoneNumber(labelPoint.lat, labelPoint.lng) + getMGRSZoneLetter(labelPoint.lat)
        })
      }
    }

    setZoneLines([...tempLines])
    setLabels([...tempLabels])

    //===============================================================================
    // MGRS Grid Lines
    //===============================================================================

    const fFactor = 0.000001
    mapBounds = props.map.getBounds().pad(0.1)
    tempLines = []
    tempLabels = []
    let horizontalLabelLines = []
    let verticalLabelLines = []
    let drawn

    // Draw the horizontal lines
    for (let i = 0; i < zoneBreaks.length - 1; i++) {
      const northwestLL = L.latLng(northBound, zoneBreaks[i] + fFactor)
      const southeastLL = L.latLng(southBound, zoneBreaks[i + 1] - fFactor)
      const centerLL = L.latLngBounds(northwestLL, southeastLL).getCenter()
      const northwestUTM = gridMath.LLtoUTM(northwestLL)
      const southeastUTM = gridMath.LLtoUTM(southeastLL)
      const centerUTM = gridMath.LLtoUTM(centerLL)

      let lat = snap(southeastUTM.northing)
      while (lat < northwestUTM.northing) {
        let leftUTM = {
          northing: lat,
          easting: northwestUTM.easting,
          zoneLetter: centerUTM.zoneLetter,
          zoneNumber: centerUTM.zoneNumber
        }

        const leftLL = gridMath.UTMtoLL(leftUTM)

        let rightUTM = {
          northing: lat,
          easting: southeastUTM.easting,
          zoneLetter: centerUTM.zoneLetter,
          zoneNumber: centerUTM.zoneNumber
        }

        const rightLL = gridMath.UTMtoLL(rightUTM)

        leftUTM.northing += gridSpacing() / 2
        rightUTM.northing += gridSpacing() / 2


        const leftLabel = gridMath.UTMtoLL(leftUTM)
        const rightLabel = gridMath.UTMtoLL(rightUTM)

        if (leftLL !== null && rightLL !== null && leftLabel !== null && rightLabel !== null && zoneBreaks[i] !== null && zoneBreaks[i + 1] !== null) {
          let newLine = generateHorizontalLine(leftLL, rightLL, zoneBreaks[i], zoneBreaks[i + 1])
          let newLabel = generateHorizontalLine(leftLabel, rightLabel, zoneBreaks[i], zoneBreaks[i + 1])

          // generateHorizontalLine can return null if the slope is NaN or some other error due to weird lat/lng issues
          // So omit it if the return is null
          if (newLine !== null && newLabel !== null) {
            tempLines.push({ positions: newLine })
            horizontalLabelLines.push({ positions: newLabel })
          }
        }

        lat += gridSpacing()
      }

      // Draw Vertical Lines
      let lng = snap(northwestUTM.easting - gridSpacing())
      while (lng < southeastUTM.easting) {
        let bottomUTM = {
          northing: southeastUTM.northing,
          easting: lng,
          zoneLetter: centerUTM.zoneLetter,
          zoneNumber: centerUTM.zoneNumber
        }

        const bottomLL = gridMath.UTMtoLL(bottomUTM)

        let topUTM = {
          northing: northwestUTM.northing,
          easting: lng,
          zoneLetter: centerUTM.zoneLetter,
          zoneNumber: centerUTM.zoneNumber
        }

        const topLL = gridMath.UTMtoLL(topUTM)

        bottomUTM.easting += gridSpacing() / 2
        topUTM.easting += gridSpacing() / 2

        const bottomLabel = gridMath.UTMtoLL(bottomUTM)
        const topLabel = gridMath.UTMtoLL(topUTM)

        if (topLL !== null && bottomLL !== null && topLabel !== null && bottomLabel !== null) {
          let newLine = generateVerticalLine(bottomLL, topLL, zoneBreaks[i], zoneBreaks[i + 1])
          let newLabel = generateVerticalLine(bottomLabel, topLabel, zoneBreaks[i], zoneBreaks[i + 1])

          // generateVerticalLine can return null if the slope is NaN or some other error due to weird lat/lng issues
          // So omit it if the return is null
          if (newLine !== null && newLabel !== null) {
            tempLines.push({ positions: newLine })
            verticalLabelLines.push({ positions: newLabel })
          }

        }

        lng += gridSpacing()
      }

      if (props.state.map.zoom >= 9) {
        // Draw grid labels (E/W borders)
        if (mgrsAccuracy() === 0) {
          for (let x in horizontalLabelLines) {
            for (let y in verticalLabelLines) {
              let labelPoint = gridMath.lineIntersect(horizontalLabelLines[x].positions, verticalLabelLines[y].positions)
              if (labelPoint && mapBounds.contains(labelPoint)) {
                let label = gridMath.forward([labelPoint.lng, labelPoint.lat], mgrsAccuracy())

                if (props.state.map.zoom >= 8) {
                  let splitLabel = label.split(' ')
                  label = splitLabel[1]
                }

                tempLabels.push({
                  position: labelPoint,
                  text: label
                })
              }
            }
          }
        } else {
          mapBounds = props.map.getBounds().pad(0.1)
          for (let x in horizontalLabelLines) {
            drawn = false
            for (let y in verticalLabelLines) {
              let labelPoint = gridMath.lineIntersect(horizontalLabelLines[x].positions, verticalLabelLines[y].positions)
              if (labelPoint && mapBounds.contains(labelPoint) && !drawn) {
                let label = gridMath.forward([mapBounds.getWest(), labelPoint.lat], mgrsAccuracy())
                let gridArray = label.split(' ')
                label = gridArray[3]
                label = label.substring(0, mgrsAccuracy())

                let labelUTM = gridMath.LLtoUTM(labelPoint)
                labelUTM.northing -= gridSpacing() / 2
                labelPoint = gridMath.UTMtoLL(labelUTM)
                labelPoint.lng = props.map.getBounds().pad(-0.05).getWest()
                tempLabels.push({
                  position: labelPoint,
                  text: label
                })
                drawn = true
              }
            }
          }

          for (let y in verticalLabelLines) {
            drawn = false
            for (let x in horizontalLabelLines) {
              let labelPoint = gridMath.lineIntersect(horizontalLabelLines[x].positions, verticalLabelLines[y].positions)
              if (labelPoint && mapBounds.contains(labelPoint) && !drawn) {
                let label = gridMath.forward([labelPoint.lng, labelPoint.lat], mgrsAccuracy())

                let gridArray = label.split(' ')
                label = gridArray[2]
                label = label.substring(0, mgrsAccuracy())

                let labelUTM = gridMath.LLtoUTM(labelPoint)
                labelUTM.easting -= gridSpacing() / 2
                labelPoint = gridMath.UTMtoLL(labelUTM)
                labelPoint.lat = props.map.getBounds().pad(-0.05).getSouth()
                tempLabels.push({
                  position: labelPoint,
                  text: label
                })
                drawn = true
              }
            }
          }
        }
        setLabels([...tempLabels])
      }
    }
    setGridLines([...tempLines])
  }

  return (
    <LayerGroup>
      {props.state.map.zoom > 3 && zoneLines.map((line, index) => (
        <React.Fragment
          key={`mgrs-zone-line-${index}`}
        >
          {line.positions !== null ? (
            <Polyline
              color={zoneStyle.color}
              opacity={zoneStyle.opacity}
              positions={line.positions}
            />
          )
            : null}
        </React.Fragment>
      ))}
      {props.state.map.zoom >= 9 && gridLines.map((line, index) => (
        <React.Fragment
          key={`mgrs-grid-line-${index}`}
        >
          {line.positions !== null ? (
            <Polyline
              color={lineStyle.color}
              opacity={lineStyle.opacity}
              positions={line.positions}
              weight={lineStyle.weight}
            />
          )
            : null}
        </React.Fragment>
      ))}
      {props.state.map.zoom > 3 && labels.map((label, index) => (
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

export default MGRSGrids