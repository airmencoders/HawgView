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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import Dms from 'geodesy/dms'
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Generate Map Popup Functions
//----------------------------------------------------------------//
const generateMapPopup = latlng => {
  const lat = Dms.parse(latlng.lat)
  const lng = Dms.parse(latlng.lng)
  //let elevation = null

  // Transform to DD.DDDD
  const latlngD = LatLon.parse(lat, lng)

  // Transform to DD MM.MMMM
  const latDM = Dms.toLat(lat, 'dm', 4)
  const lngDM = Dms.toLon(lng, 'dm', 4)

  // Transform to DMS
  const latDMS = Dms.toLat(lat, 'dms', 4)
  const lngDMS = Dms.toLon(lng, 'dms', 4)

  // Parse MGRS
  let mgrs
  try {
    mgrs = latlngD.toUtm().toMgrs().toString()
  } catch (e) {
    console.error(`Unable to translate Lat/Lng ${latlngD} to MGRS - Outside MGRS Bounds`)
  }

  return {
    latlng: latlngD.toString(),
    dm: `${latDM}, ${lngDM}`,
    dms: `${latDMS}, ${lngDMS}`,
    mgrs,
    elevation: 'Pending',
  }
}

export default generateMapPopup