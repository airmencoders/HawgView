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
  CircleMarker, 
  Polyline, 
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import useStyles from '../../constants/useStyles'

//----------------------------------------------------------------//
// Analysis Tool Active Line Component
//----------------------------------------------------------------//
const AnalysisToolActiveLine = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      {/**
       * Create a polyline that will go through all the points that are passed
       */}
      {(props.points.length > 0 && props.state.mouseCoords !== null) ?
          <Polyline
            color='red'
            dashArray='1 7'
            positions={[...props.points.map(point => point.point), props.state.mouseCoords]}
            weight='2'
          />
          : undefined
      }
      {/**
       * Create a circle marker at each of the vertices of the line with a popup of that point
       */}
      {props.points.map((point, index) => (
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
                <b>{(point.declination === null) ? 'True:' : 'Mag:'} </b>{point.hdg.toFixed(2)}&deg; ({point.mils.toFixed(2)} mils)
                <br />
                <b>NM: </b>{point.nm.toFixed(2)}
                <br />
                <b>Meters: </b>{point.m.toFixed(2)}
              </Tooltip>
              : undefined
            }
          </CircleMarker>
        ))}
      {/**
       * Create the circle marker at the mouse only if the mouse coordinates are not null, the tool is active, and there is at least
       * one point in the array
       */}
      {(props.state.mouseCoords !== null && props.points.length > 0 && props.state.tool === 'analysis') ?
          <CircleMarker
            center={props.state.mouseCoords}
            color='red'
            radius='2'
          >
            <Tooltip
              className={classes.movingTooltip}
              offset={L.point(0, -40)}
              permanent={true}
              sticky={true}
            >
              <b>{(props.declination === null) ? 'True:' : 'Mag:'} </b>{props.hdg.toFixed(2)}&deg; ({props.mils.toFixed(2)} mils)
              <br />
              <b>NM: </b>{(props.totalMiles + props.miles).toFixed(2)} {(props.totalMiles > 0) ? `(+${props.miles.toFixed(2)})` : undefined}
              <br />
              <b>Meters: </b>{(props.totalMeters + props.meters).toFixed(2)} {(props.totalMeters > 0) ? `(+${props.meters.toFixed(2)})` : undefined}
            </Tooltip>
          </CircleMarker>
          : undefined
      }
    </React.Fragment>
  )
}

export default AnalysisToolActiveLine