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
import Control from 'react-leaflet-control'
import '@fontsource/roboto'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  makeStyles
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import generateMapPopup from '../../functions/generateMapPopup'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  mouseCoordinateControlRoot: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: '15px',
    opacity: 0.5,
    textAlign: 'right',
  },
}))

//----------------------------------------------------------------//
// Mouse Coordinates Control Component
//----------------------------------------------------------------//
const MouseCoordinatesControl = props => {

  const classes = useStyles()

  const [data, setData] = React.useState(null)

  //----------------------------------------------------------------//
  // React Effects
  //----------------------------------------------------------------//
  React.useEffect(() => {
    if (props.state.mouseCoords !== null) {
      setData(generateMapPopup(props.state.mouseCoords, props.state.history[props.state.step].anchor, props.state.history[props.state.step].sardot))
    }
  }, [props.state.mouseCoords])

  return (
    <Control
      position='bottomright'
    >
      <table className={classes.mouseCoordinateControlRoot}>
        <tbody>
          <tr>
            <td>{data !== null ? data.dm : ''}</td>
          </tr>
          <tr>
            <td>{data !== null ? data.mgrs : ''}</td>
          </tr>
          {data !== null && props.state.history[props.state.step].anchor.id !== null && data.fromBE !== null && (
            <tr>
              <td>
                B/E {props.state.history[props.state.step].anchor.name} {Number.parseInt(data.fromBE.heading)}&deg; / {Number.parseInt(data.fromBE.nm)} NM
              </td>
            </tr>
          )}
          {data !== null && props.state.history[props.state.step].sardot.id !== null && data.toSardot !== null && (
            <tr>
              <td>
                SARDOT {props.state.history[props.state.step].sardot.name} {Number.parseInt(data.toSardot.heading)}&deg; / {Number.parseInt(data.toSardot.nm)} NM
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </Control>
  )
}

export default MouseCoordinatesControl