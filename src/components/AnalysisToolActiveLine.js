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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import L from 'leaflet'
import React from 'react'
import { CircleMarker, Polyline, Tooltip } from 'react-leaflet'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  movingTooltip: {
    backgroundColor: 'rgba(255, 255, 255, .7)',
    backgroundClip: 'padding-box',
    opacity: '0.5',
    border: 'dotted',
    borderColor: 'red',
    //fontSize: 'smaller',
  },
  resultTooltip: {
    backgroundColor: 'white',
    borderWidth: 'medium',
    borderColor: '#de0000',
    //fontSize: 'smaller',
  },
}))

//----------------------------------------------------------------//
// Analysis Tool Active Line Component
//----------------------------------------------------------------//
export default ({ analysisToolHdg, analysisToolMouse, analysisToolM, analysisToolNm, analysisToolPoints, analysisToolTotalM, analysisToolTotalNm, declination }) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      {
        /**
         * Active Line
         */
        (analysisToolPoints.length > 0 && analysisToolMouse !== null) ?
          <Polyline
            color='red'
            dashArray='1 7'
            positions={[...analysisToolPoints.map(point => point.point), analysisToolMouse]}
            weight='2'
          />
          : undefined
      }
      {
        /**
         * Active Circle Markers
         */
        analysisToolPoints.map((point, index) => (
          <CircleMarker
            center={point.point}
            color='red'
            key={`persistent-${index}`}
            radius='2'
          >
            {(index !== 0) ?
              <Tooltip
                className={classes.resultTooltip}
                permanent={true}
              >
                <b>{(point.declination === null) ? 'True:' : 'Mag:'} </b>{point.hdg.toFixed(2)}&deg;
                <br />
                <b>NM: </b>{point.nm.toFixed(2)}
                <br />
                <b>Meters: </b>{point.m.toFixed(2)}
              </Tooltip>
              : undefined
            }
          </CircleMarker>
        ))}
      {
        /**
         * Mouse Circle Marker
         */
        (analysisToolMouse !== null) ?
          <CircleMarker
            center={analysisToolMouse}
            color='red'
            radius='2'
          >
            <Tooltip
              className={classes.movingTooltip}
              offset={L.point(0, -40)}
              permanent={true}
              sticky={true}
            >
              <b>{(declination === null) ? 'True:' : 'Mag:'} </b>{analysisToolHdg.toFixed(2)}&deg;
              <br />
              <b>NM: </b>{(analysisToolTotalNm + analysisToolNm).toFixed(2)} {(analysisToolTotalNm > 0) ? `(+${analysisToolNm.toFixed(2)})` : undefined}
              <br />
              <b>Meters: </b>{(analysisToolTotalM + analysisToolM).toFixed(2)} {(analysisToolTotalM > 0) ? `(+${analysisToolM.toFixed(2)})` : undefined}
            </Tooltip>
          </CircleMarker>
          : undefined
      }
    </React.Fragment>
  )
}