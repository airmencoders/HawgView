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
import React from 'react'
import { FeatureGroup } from 'react-leaflet'

import { distanceAndHeading } from '../functions/mathFunctions'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import AnalysisToolActiveLine from './AnalysisToolActiveLine'
import AnalysisToolPastLines from './AnalysisToolPastLines'

//----------------------------------------------------------------//
// Analysis Tool Component
//----------------------------------------------------------------//
//export default ({ analysisToolActive, analysisToolLineClosed, mouseCoords, clickedLatLng, setAnalysisToolLineClosed, setMouseCoords, setClickedLatLng, toggleAnalysisTool, setMapPopup }) => {
export default (props) => {
  /**
   * State variables
   */
  const [hdg, setHdg] = React.useState(0)
  const [lines, setLines] = React.useState([])
  const [meters, setMeters] = React.useState(0)
  const [miles, setMiles] = React.useState(0)
  const [points, setPoints] = React.useState([])
  const [totalMiles, setTotalMiles] = React.useState(0)
  const [totalMeters, setTotalMeters] = React.useState(0)
  const [declination, setDeclination] = React.useState(null)

  React.useEffect(() => {
    console.log('active', props.active)
  }, [props.active])

  React.useEffect(() => {
    closeLine()
    setLines([])
  }, [props.active])

  /**
   * Add Key and mouse listeners for the map
   * 
   * ESC: For use with the Analysis Tool
   * ENTER: For use with the MGRS search (Possible to just have listener in that tool)
   */
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscPress, false)
    //document.addEventListener('dblclick', closeLine, false)

    return () => {
      document.removeEventListener('keydown', handleEscPress, false)
      //document.removeEventListener('dblclick', closeLine, false)
    }
  }, [props.active, props.lineClosed, points])

  /**
   * Every time the clicked latlng changes and isn't null, add it to the analysis tool
   * As long as the tool is active
   */
  React.useEffect(() => {
    if (props.latlng !== null && props.active) {
      props.setLineClosed(false)
      setTotalMeters(totalMeters + meters)
      setTotalMiles(totalMiles + miles)

      const newPoint = {
        point: props.latlng,
        hdg: hdg,
        nm: totalMiles + miles,
        m: totalMeters + meters,
        declination: declination
      }
      setPoints([...points, newPoint])

      // Set the declination
      setDeclination(null)
      fetch(`https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${props.latlng.lat}&lon1=${props.latlng.lng}&resultFormat=json`)
        .then(response => response.json())
        .then(json => setDeclination(json.result[0].declination))
    }
  }, [props.latlng])

  /**
   * As long as there are two lat/lon points to calculate (starting point and mouse) call the function
   */
  React.useEffect(() => {
    if (props.latlng !== null && props.mouseCoords !== null) {
      calculateHeadingAndDistance()
    }
  }, [props.latlng, props.mouseCoords])

  /**
   * Handle the Analysis Tool Toggle. Perform startup/cleanup actions
   */
  const toggle = () => {
    closeLine()
    setLines([])
    setPoints([])
    props.toggle()
  }

  /**
   * Calculates the distance and bearing between two points.
   * Uses the NOAA NGDC Magnetic Declination API to get the magnetic variance using the World Magnetic Model (WMM) for the starting point
   */
  const calculateHeadingAndDistance = () => {
    const distAndHdg = distanceAndHeading(props.latlng, props.mouseCoords, declination)

    setHdg(distAndHdg.heading)
    setMeters(distAndHdg.meters)
    setMiles(distAndHdg.nm)
  }

  /**
   * Listen for the ESCAPE key to close the line or exit the tool
   * 
   * @param {Event} event Key press event
   */
  const handleEscPress = event => {
    if (props.active && event.key === 'Escape') {
      if (props.lineClosed) {
        toggle()
      } else {
        closeLine()
      }
    }
  }

  /**
   * Closing the line pushes the current line into the array of lines
   * and resets the tool for another line
   */
  const closeLine = () => {
    props.clearLatlng()
    props.clearMouse()
    props.setLineClosed(true)
    if (points.length > 1) {
      setLines([...lines, [...points]])
    }
    setPoints([])
    setDeclination(null)
    setHdg(0)
    setMiles(0)
    setMeters(0)
    setTotalMiles(0)
    setTotalMeters(0)
  }

  return (
    <FeatureGroup>
      <AnalysisToolActiveLine
        active={props.active}
        hdg={hdg}
        mouseCoords={props.mouseCoords}
        meters={meters}
        miles={miles}
        points={points}
        totalMeters={totalMeters}
        totalMiles={totalMiles}
        declination={declination}
      />
      <AnalysisToolPastLines
        lines={lines}
      />
    </FeatureGroup>
  )
}