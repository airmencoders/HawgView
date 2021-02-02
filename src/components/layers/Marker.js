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
import ms from 'milsymbol'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Marker as RLMarker,
  Popup,
  Rectangle,
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
import { LatLon as LL } from 'geodesy/mgrs'
import LatLon from 'geodesy/latlon-spherical'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import {
  echelons,
} from '../../constants/sidcCodes'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import {
  render9line,
  render15line,
} from '../../functions/renderData'
import { distanceAndHeading } from '../../functions/mathFunctions'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Layer Markers Component
//----------------------------------------------------------------//
const Marker = props => {

  const computedSize = props.state.markerSize * props.state.map.zoom

  //----------------------------------------------------------------//
  // Styles
  //----------------------------------------------------------------//
  const useStyles = makeStyles(theme => ({
    divIcon: {
      alignItems: 'center',
      color: props.marker.color ? props.marker.color : props.state.history[props.state.step].styles.buildingLabel.color,
      display: 'flex',
      fontSize: computedSize,
      fontWeight: 'bold',
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${computedSize}px`,
      wordWrap: 'break-word',
    },
    kineticPoint: {
      alignItems: 'center',
      backgroundColor: '#ffff00',
      border: 'solid #000000 2px',
      color: 'black',
      display: 'flex',
      fontSize: computedSize / 2,
      fontWeight: 'bold',
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${computedSize / 2}px`,
      wordWrap: 'break-word',
    },
  }))

  const classes = useStyles()

  const getAffiliation = affiliation => {
    switch(affiliation) {
      case 'F':
        return 'Friendly'
      case 'H':
        return 'Hostile'
      case 'U':
        return 'Unknown'
      case 'N':
        return 'Neutral'
      default:
        console.error(`Error: Unknown Affiliation (${affiliation})`)
        return ''
    }
  }

  const getEchelon = echelon => {
    if (echelon === '-') {
      return 'Unit'
    } else {
      let result = echelons.filter(ech => ech.value === echelon)
      return `${result[0].name}`
    }
  }

  const handleClickMarker = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        focusedLatlng: {
          latlng: props.marker.latlng,
          source: 'marker',
        },
      })
    }
  }

  const handleDeleteMarker = () => {
    if (props.state.tool === null) {
      handleMarkerEdit('delete', { marker: props.marker }, props.state, props.setState)
    }
  }


  const handleDragMarker = latlng => {
    if (props.state.tool === null) {
      handleMarkerEdit('drag', { marker: props.marker, latlng: latlng }, props.state, props.setState)
    }
  }

  const handleEditMarker = () => {
    if (props.state.tool === null) {
      props.setState({
        ...props.state,
        dialog: {
          anchor: null,
          name: 'editMarker',
        },
        focusedMarker: props.marker,
      })
    }
  }

  /**
   * 
   * @param {*} marker 
   */
  const generatePopupText = marker => {
    let position
    try {
      position = LL.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${marker.latlng.lat.toFixed(4)}, ${marker.latlng.lng.toFixed(4)}`
    }

    let fromBE = null
    if (props.state.history[props.state.step].anchor.id !== null) {
      fromBE = distanceAndHeading(
        props.state.history[props.state.step].anchor.latlng,
        marker.latlng,
        props.state.history[props.state.step].anchor.declination
      )
    }
    return (
      <table>
        <tbody>
          {marker.iconType === 'sidc' ? 
          <tr>
            <td>{getAffiliation(marker.sidc.affiliation)}</td>
          </tr>
          : null}
          <tr>
            <td>{marker.title}</td>
          </tr>
          {marker.iconType === 'sidc' ? 
          <tr>
            <td>{getEchelon(marker.sidc.echelon)}</td>  
          </tr>
          : null}
          <tr>
            <td>{position}</td>
          </tr>
          {fromBE !== null ? (
            <tr>
              <td>{props.state.history[props.state.step].anchor.name} {Number.parseInt(fromBE.heading)}&deg; / {Number.parseInt(fromBE.nm)} NM</td>
            </tr>
          )
            :
            null}
          <tr>
            <td>{marker.elevation !== 'Pending' && marker.elevation !== 'Elevation not found' ? `${marker.elevation} feet` : 'No elevation'} </td>
          </tr>
        </tbody>
      </table>
    )
  }

  /**
   * 
   * @param {*} marker 
   */
  const generatePopup = marker => {
    return (
      <Popup
        autoPan={false}
        maxWidth={1000}
      >
        {marker.layer === 'hostile' || marker.layer === 'threat' ?
          marker.data !== null ? render9line(marker.data) : generatePopupText(marker)
          : marker.layer === 'survivor' ?
            marker.data !== null ? render15line(marker.data) : generatePopupText(marker)
            : generatePopupText(marker)
        }
        <br />
        <Button
          color='primary'
          href={`https://viperops.com/#/ArcGISMap?lat=${LatLon.parse(marker.latlng).lat}&lng=${LatLon.parse(marker.latlng).lng}${(marker.data !== null && marker.data !== undefined) ? `&hdg=${marker.data.hdg}&rng=${marker.data.distance}` : ''}`}
          target='_blank'
        >
          TGP View
      </Button>
        <Button
          color='primary'
          onClick={handleEditMarker}
        >
          Edit
        </Button>
        <Button
          color='secondary'
          onClick={handleDeleteMarker}
        >Delete</Button>
      </Popup>
    )
  }

  /**
   * 
   * @param {*} latlng 
   * @param {*} layer 
   */
  const generatePAA = (latlng, layer) => {
    // Get the four sides
    const point = LatLon.parse(latlng.lat, latlng.lng)
    const north = point.destinationPoint(2000, 0)
    const south = point.destinationPoint(2000, 180)
    const east = point.destinationPoint(2000, 90)
    const west = point.destinationPoint(2000, 270)

    // Get the two corners
    const northwest = [north.lat, west.lon]
    const southeast = [south.lat, east.lon]

    return (
      <Rectangle
        bounds={[northwest, southeast]}
        color={layer === 'friendly' ? '#3388ff' : '#ff0000'}
        dashArray='12,12'
        fill={false}
        weight={4}
      />
    )
  }

  return (
    <React.Fragment>
      {(props.marker.arty.arty && props.marker.arty.display) ? generatePAA(props.marker.latlng, props.marker.layer) : null}
      <RLMarker
        draggable={props.state.tool === null}
        icon={props.marker.iconType === 'sidc' ?
            L.icon({
              iconUrl: new ms.Symbol(`${props.marker.sidc.scheme}${props.marker.sidc.affiliation}${props.marker.sidc.dimension}${props.marker.sidc.status}${props.marker.sidc.id}${props.marker.sidc.modifier}${props.marker.sidc.echelon}`, { size: 50}).toDataURL(),
              iconSize: [computedSize, computedSize]
            })
          : props.marker.iconType === 'img' ?
            L.icon({
              iconUrl: props.marker.iconUrl,
              iconSize: [computedSize, computedSize]
            })
            :
            L.divIcon({
              className: props.marker.layer === 'kineticPoint' ? classes.kineticPoint : classes.divIcon,
              html: props.marker.title,
              iconSize: props.marker.layer === 'kineticPoint' ? [computedSize, computedSize] : [20, 20],
            })
        }
        id={props.marker.id}
        onClick={handleClickMarker}
        onDragend={event => handleDragMarker(event.target.getLatLng())}
        position={props.marker.latlng}
        title={props.marker.title}
      >
        {generatePopup(props.marker)}
        {(props.state.tooltips) ?
          <Tooltip
            direction='top'
            offset={L.point(0, -1 * computedSize)}
            opacity={1}
            permanent
          >
            {props.marker.title}
          </Tooltip>
          : null}
      </RLMarker>
    </React.Fragment>
  )
}

export default Marker