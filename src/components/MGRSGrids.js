import React from 'react'
import L from 'leaflet'
import {
  LayerGroup,
  Polyline
} from 'react-leaflet'

import { makeStyles } from '@material-ui/core/styles'
import { LatLon } from 'geodesy/utm'

const useStyles = makeStyles(theme => ({
  lineStyle: {

  },
  zoneStyle: {

  },
}))

export default (props) => {
  const classes = useStyles()

  const [lines, setLines] = React.useState([])
  const [labels, setLabels] = React.useState([])

  const mapBounds = props.map.getBounds().pad(0.5)
  const northBound = 84
  const southBound = -80
  const eastBound = 180
  const westBound = -181
  const labelBounds = props.map.getBounds().pad(-0.03)
  const labelSouth = labelBounds.getSouth()
  const labelWest = labelBounds.getWest()

  let tempLines = []

  React.useEffect(() => {
    generateLines()
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

  const generateVerticalLine = (longitudeArray, northBound, southBound) => {

  }

  const generateHorizontalLine = (latitude, style) => {

  }

  const generateSpecialZone = (longitudeArray, northBound, southBound) => {
    const centerLatitude = southBound + Math.abs(northBound - southBound) / 2

    //let tempLines = []
    for (let i in longitudeArray) {
      tempLines.push({
        positions: [
          [northBound, longitudeArray[i]],
          [southBound, longitudeArray[i]]
        ]
      })//generateVerticalLine(longitudeArray[i]), northBound, southBound)
      const previous = longitudeArray[i - 1] ? longitudeArray[i - 1] : 0
      const labelPoint = L.latLng(centerLatitude, previous + ((longitudeArray[i] - previous) / 2))
      /*setLabels([
        ...labels,
        {
          point: labelPoint,
          //text: LatLon.toUtm({ lat: labelPoint.lat, lon: labelPoint.lng })
        }
      ])*/
    }
    //console.log('special zone', tempLines)
    //setLines([...lines, ...tempLines])
  }

  const snapTo = (number, snap) => {
    return Math.floor(number / snap) * snap
  }


  const generateLines = () => {
    let latitude = snapTo(southBound, 8) // different
    let longitude = snapTo(westBound, 6) + 6 // different
    let latitudes = []
    let longitudes = []
    let zoneBreaks = [westBound]

    while (latitude <= northBound) { // different
      if (latitude === 72) {
        latitudes.push(latitude)// + 6)
        latitude += 12
      } else {
        latitudes.push(latitude)// + 4)
        latitude += 8
      }
    }

    while (longitude <= eastBound) {
      zoneBreaks.push(longitude)
      longitude += 6
    }

    zoneBreaks.push(eastBound) // different

    let vertLines = []
    for (let i = 1; i < zoneBreaks.length - 1; i++) {
      // No Vertical break exceptions
      if (zoneBreaks[i] <= 0 || zoneBreaks[i] >= 42) {

        tempLines.push({
          positions: [
            [84, zoneBreaks[i]],
            [-80, zoneBreaks[i]]
          ]
        })//generateVerticalLine(zoneBreaks[i], 84, -80))
        longitudes.push(zoneBreaks[i - 1] + 3)
      }
      // Norway & Svagard exception
      else {
        tempLines.push({
          positions: [
            [56, zoneBreaks[i]],
            [-80, zoneBreaks[i]]
          ]
        })//generateVerticalLine(zoneBreaks[i], 56, -80))
      }
    }
    console.log('vertLines', vertLines)
    //setLines([...lines, ...tempLines])

    // Handle special exceptions
    generateSpecialZone([3, 12, 18, 24, 30, 36], 64, 56)
    generateSpecialZone([9, 21, 33], 84, 72)
    generateSpecialZone([6, 12, 18, 24, 30, 36], 72, 64)

    let previousLat, previousLng
    let horizLines = []
    for (let x in latitudes) {
      //lines.push(generateHorizontalLine(latitudes[x], 'zone'))
      tempLines.push({
        positions: [
          [latitudes[x], -180],
          [latitudes[x], 180]
        ]
      })

      // Non exceptions
      if (latitudes[x] <= 56 && latitudes[x] > -80) {
        for (let y in longitudes) {
          latitudes[x - 1] === 0 ? previousLat = 0 : previousLat = latitudes[x - 1] ? latitudes[x - 1] : -80
          previousLng = longitudes[y - 1] ? longitudes[y - 1] : 0
          const centerLatitude = previousLat + Math.abs(latitudes[x] - previousLat) / 2
          const labelPoint = L.latLng(centerLatitude, previousLng + ((longitudes[y] - previousLng) / 2))
          /*setLabels([
            ...labels,
            {
              point: labelPoint,
              //text: LatLon.toUtm({ lat: labelPoint.lat, lon: labelPoint.lng })
            }
          ])*/
        }
      }
    }
    //setLines([...lines, ...horizLines])

    setLines([...lines, ...tempLines])
  }

 

  return (
    <LayerGroup>
      {lines.map((line, index) => (
        <Polyline
          color='red'
          key={`mgrs-line-${index}`}
          positions={line.positions}
        />
      ))}
    </LayerGroup>
  )
}