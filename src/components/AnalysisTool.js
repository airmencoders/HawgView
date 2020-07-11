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

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import AnalysisToolActiveLine from '../components/AnalysisToolActiveLine'
import AnalysisToolControl from '../components/AnalysisToolControl'
import AnalysisToolPastLines from '../components/AnalysisToolPastLines'

//----------------------------------------------------------------//
// Analysis Tool Component
//----------------------------------------------------------------//
export default ({ analysisToolActive, analysisToolLineClosed, analysisToolMouse, clickedLatLng, setAnalysisToolLineClosed, setAnalysisToolMouse, setClickedLatLng, setAnalysisToolActive, setMapPopup }) => {
  /**
   * State variables
   */
  const [analysisToolHdg, setAnalysisToolHdg] = React.useState(0)
  const [analysisToolLines, setAnalysisToolLines] = React.useState([])
  const [analysisToolM, setAnalysisToolM] = React.useState(0)
  const [analysisToolNm, setAnalysisToolNm] = React.useState(0)
  const [analysisToolPoints, setAnalysisToolPoints] = React.useState([])
  const [analysisToolTotalNm, setAnalysisToolTotalNm] = React.useState(0)
  const [analysisToolTotalM, setAnalysisToolTotalM] = React.useState(0)
  const [declination, setDeclination] = React.useState(null)

  /**
   * Add Key and mouse listeners for the map
   * 
   * ESC: For use with the Analysis Tool
   * ENTER: For use with the MGRS search (Possible to just have listener in that tool)
   */
  React.useEffect(() => {
    document.addEventListener('keydown', handleEscPress, false)
    document.addEventListener('dblclick', closeLine, false)

    return () => {
      document.removeEventListener('keydown', handleEscPress, false)
      document.removeEventListener('dblclick', closeLine, false)
    }
  }, [analysisToolActive, analysisToolPoints, analysisToolLineClosed])

  /**
   * Every time the clicked latlng changes and isn't null, add it to the analysis tool
   * As long as the tool is active
   */
  React.useEffect(() => {
    if (clickedLatLng !== null && analysisToolActive) {
      setAnalysisToolTotalM(analysisToolTotalM + analysisToolM)
      setAnalysisToolTotalNm(analysisToolTotalNm + analysisToolNm)

      const newPoint = {
        point: clickedLatLng,
        hdg: analysisToolHdg,
        nm: analysisToolTotalNm + analysisToolNm,
        m: analysisToolTotalM + analysisToolM,
        declination: declination
      }
      setAnalysisToolPoints([...analysisToolPoints, newPoint])

      // Set the declination
      setDeclination(null)
      fetch(`https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${clickedLatLng.lat}&lon1=${clickedLatLng.lng}&resultFormat=json`)
        .then(response => response.json())
        .then(json => setDeclination(json.result[0].declination))
    }
  }, [clickedLatLng])

  /**
   * As long as there are two lat/lon points to calculate (starting point and mouse) call the function
   */
  React.useEffect(() => {
    if (clickedLatLng !== null && analysisToolMouse !== null) {
      calculateHeadingAndDistance()
    }
  }, [clickedLatLng, analysisToolMouse])

  /**
   * Handle the Analysis Tool Toggle. Perform startup/cleanup actions
   */
  const handleAnalysisToolToggle = () => {
    setAnalysisToolLines([])
    setClickedLatLng(null)
    setMapPopup(null)
    setAnalysisToolActive(!analysisToolActive)
  }

  /**
   * Calculates the distance and bearing between two points.
   * Uses the NOAA NGDC Magnetic Declination API to get the magnetic variance using the World Magnetic Model (WMM) for the starting point
   */
  const calculateHeadingAndDistance = () => {
    const f1 = clickedLatLng.lat
    const l1 = clickedLatLng.lng
    const f2 = analysisToolMouse.lat
    const l2 = analysisToolMouse.lng

    const toRadian = Math.PI / 180
    const metersR = 6371 * 1000
    const nmR = 6371 * 0.539956803

    const y = Math.sin((l2 - l1) * toRadian) * Math.cos(f2 * toRadian)
    const x = Math.cos(f1 * toRadian) * Math.sin(f2 * toRadian) - Math.sin(f1 * toRadian) * Math.cos(f2 * toRadian) * Math.cos((l2 - l1) * toRadian)
    const bearing = Math.atan2(y, x) * 180 / Math.PI
    const heading = bearing + ((declination === null) ? 0 : declination)
    setAnalysisToolHdg(heading + ((heading < 0) ? heading + 360 : 0))

    const deltaF = (f2 - f1) * toRadian
    const deltaL = (l2 - l1) * toRadian
    const a = Math.sin(deltaF / 2) * Math.sin(deltaF / 2) + Math.cos(f1 * toRadian) * Math.cos(f2 * toRadian) * Math.sin(deltaL / 2) * Math.sin(deltaL / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    setAnalysisToolM(c * metersR)
    setAnalysisToolNm(c * nmR)
  }

  /**
   * Listen for the ESCAPE key to close the line or exit the tool
   * 
   * @param {Event} event Key press event
   */
  const handleEscPress = event => {
    if (analysisToolActive && event.key === 'Escape') {
      if (analysisToolLineClosed) {
        handleAnalysisToolToggle()
      } else {
        closeLine()
      }
      setClickedLatLng(null)
    }
  }

  /**
   * Closing the line pushes the current line into the array of lines
   * and resets the tool for another line
   */
  const closeLine = () => {
    setAnalysisToolLineClosed(true)
    if (analysisToolPoints.length > 1) {
      setAnalysisToolLines([...analysisToolLines, [...analysisToolPoints]])
    }
    setAnalysisToolPoints([])
    setClickedLatLng(null)
    setAnalysisToolMouse(null)
    setDeclination(null)
    setAnalysisToolHdg(0)
    setAnalysisToolNm(0)
    setAnalysisToolM(0)
    setAnalysisToolTotalNm(0)
    setAnalysisToolTotalM(0)
  }

  return (
    <React.Fragment>
      <AnalysisToolControl
        analysisToolActive={analysisToolActive}
        clickedLatLng={clickedLatLng}
        handleAnalysisToolToggle={handleAnalysisToolToggle}
      />
      <FeatureGroup>
        <AnalysisToolActiveLine
          analysisToolHdg={analysisToolHdg}
          analysisToolMouse={analysisToolMouse}
          analysisToolM={analysisToolM}
          analysisToolNm={analysisToolNm}
          analysisToolPoints={analysisToolPoints}
          analysisToolTotalM={analysisToolTotalM}
          analysisToolTotalNm={analysisToolNm}
          declination={declination}
        />
        <AnalysisToolPastLines
          analysisToolLines={analysisToolLines}
        />
      </FeatureGroup>
    </React.Fragment>
  )
}