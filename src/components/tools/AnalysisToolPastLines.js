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
// Analysis Tool Past Lines Component
//----------------------------------------------------------------//
const AnalysisToolPastLines = (props) => {
  const classes = useStyles()

  return (
    <React.Fragment>
      {props.lines.map((line, lineIndex) => (
        <Polyline
          color='red'
          dashArray='1 7'
          key={`line-${lineIndex}`}
          positions={[line.map(point => point.point)]}
        />
      ))}
      {props.lines.map((line, lineIndex) => {
        return (
          line.map((point, pointIndex) => (
            <CircleMarker
              center={point.point}
              color='red'
              key={`line-${lineIndex}-point-${pointIndex}`}
              radius='2'
            >
              {(pointIndex !== 0) ?
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
          ))
        )
      })}
    </React.Fragment>
  )
}

export default AnalysisToolPastLines