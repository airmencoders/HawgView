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
import Mgrs, { LatLon } from 'geodesy/mgrs'

export const submitCoordInput = inputValue => {
  // As long as the input is not blank
  if (inputValue !== '') {
    // RemoveSpaces
    let target = inputValue
    let validInput = true

    let letterCount = 0
    for (let i = 0; i < target.length; i++) {
      if (target.charAt(i) !== ' ' && target.charAt(i) !== '.' && target.charAt(i) !== ',' && !Number.isInteger(parseInt(target.charAt(i)))) {
        letterCount++
      }
    }

    // Determine if use input MGRS or Lat Lon and then fly to the location
    if (letterCount < 3) {

      // Find the end of the latitude
      // Primary is N/S
      // Secondary is a comma
      // Tertiary is a space
      let delimiter = 'letter'
      let index = target.indexOf('N')
      if (index === -1) {
        index = target.indexOf('S')

        if (index === -1) {
          delimiter = 'comma'
          index = target.indexOf(',')

          if (index === -1) {
            index = target.indexOf(' ')
          }
        }
      }

      // Remove commas
      target = target.replace(',', '')

      // Try to parse lat and lng
      if (index !== -1) {
        let lat = target.substr(0, index  + 1).trim()
        if(delimiter === 'comma') {
          lat = target.substr(0, index).trim()
        }
        
        let lng = target.substr(index + 1).trim()

        if (lat.indexOf('N') === -1 && lat.indexOf('S') === -1) {
          if (parseInt(lat) < 0) {
            lat = lat + 'S'
          } else {
            lat = lat + 'N'
          }
        }

        if (lng.indexOf('E') === -1 && lng.indexOf('W') === -1) {
          if (parseInt(lng) < 0) {
            lng = lng + 'W'
          } else {
            lng = lng + 'E'
          }
        }
        target = LatLon.parse(lat, lng)
      } else {
        validInput = false
      }
    } else {
      // Remove spaces
      target = target.replace(/ /g, '')

      // Add leading zero
      if (!Number.isInteger(parseInt(target.charAt(1)))) {
        target = '0' + target
      }

      // Split out the sections
      const grid = target.substr(0, 5)
      const digits = target.substr(5)
      let easting = digits.substr(0, digits.length / 2)
      let northing = digits.substr(digits.length / 2)

      // Pad easting/northing
      while (easting.length < 5) {
        easting = easting + '0'
      }

      while (northing.length < 5) {
        northing = northing + '0'
      }

      // Recombine gridzone, easting, and northing
      target = grid + easting + northing
      try {
        target = Mgrs.parse(target)
        target = target.toUtm().toLatLon()
      } catch (error) {
        console.error(error)
        validInput = false
      }
    }

    if (validInput) {
      return target
    } else {
      return false
    }
  }
}