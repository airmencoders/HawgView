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
  Button,
}from '@material-ui/core'
import { 
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// React-Leaflet Components
//----------------------------------------------------------------//
import { 
  Popup as RLPopup,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import generateMapPopup from '../../functions/generateMapPopup'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(() => ({
  popupCell: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    padding: '5px',
  },
  popupTable: {
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
}))

//----------------------------------------------------------------//
// Popup Component
//----------------------------------------------------------------//
const Popup = props => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // State
  //----------------------------------------------------------------//
  const [popup, setPopup] = React.useState(null)

  //----------------------------------------------------------------//
  // React Effects
  //----------------------------------------------------------------//
  React.useEffect(() => {
    if (
        props.state.tool === null &&//props.activeTool === null && 
        props.focusedLatlng.latlng !== null &&
        (props.focusedLatlng.source === 'map' || props.focusedLatlng.source === 'input')
    ) {
      props.setFocusedMarker(null)
      setPopup({
        ...generateMapPopup(props.focusedLatlng.latlng, props.anchor),
        elevation: props.elevation
      })
    }
  }, [props.elevation, props.focusedLatlng, props.state.tool])//props.activeTool])

  //----------------------------------------------------------------//
  // Logic
  //----------------------------------------------------------------//
  if (
    props.focusedLatlng !== null &&
    (props.focusedLatlng.source === 'map' || props.focusedLatlng.source === 'input') &&
    props.focusedMarker === null &&
    props.focusedShape === null &&
    popup !== null &&
    //props.activeTool === null
    props.state.tool === null
  ) {
    return (
      <RLPopup
        autoPan={false}
        maxWidth={500}
        key={props.focusedLatlng}
        onClose={props.handleMapReset}
        position={props.focusedLatlng.latlng}
      >
        <table className={classes.popupTable}>
          <tbody>
            <tr>
              <td className={classes.popupCell}>MGRS</td>
              <td className={classes.popupCell}>{popup.mgrs}</td>
            </tr>
            <tr>
              <td className={classes.popupCell}>DD.DD</td>
              <td className={classes.popupCell}>{popup.latlng}</td>
            </tr>
            <tr>
              <td className={classes.popupCell}>DD MM.MM</td>
              <td className={classes.popupCell}>{popup.dm}</td>
            </tr>
            <tr>
              <td className={classes.popupCell}>D M S</td>
              <td className={classes.popupCell}>{popup.dms}</td>
            </tr>
            {popup.fromBE !== null ? (
              <tr>
                <td className={classes.popupCell}>{props.anchor.name}</td>
                <td className={classes.popupCell}>{Number.parseInt(popup.fromBE.heading)}&deg; / {Number.parseInt(popup.fromBE.nm)} NM</td>
              </tr>
            )
              :
              null}
            <tr>
              <td className={classes.popupCell}>Elevation</td>
              <td className={classes.popupCell}>{`${popup.elevation} ${(popup.elevation === 'Pending' || popup.elevation === 'Elevation not found') ? '' : 'feet'}`} </td>
            </tr>
          </tbody>
        </table>
        <Button
          color='primary'
          href={`https://viperops.com/#/ArcGISMap?lat=${LatLon.parse(popup.latlng).lat}&lng=${LatLon.parse(popup.latlng).lng}`}
          target='_blank'
        >
          TGP View
        </Button>
      </RLPopup>
    )
  } else {
    return null
  }
}

export default Popup