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
import { LatLon as LL } from 'geodesy/mgrs'
import LatLon from 'geodesy/latlon-spherical'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import faaSUA from '../constants/faaSUA.json'
import customGermanAirspace from '../constants/customAirspace/customGermanAirspace.json'
import customSouthKoreanAirspace from '../constants/customAirspace/customSouthKoreanAirspace.json'
import customThailandAirspace from '../constants/customAirspace/customThailandAirspace.json'
import customUnitedStatesAirspace from '../constants/customAirspace/customUnitedStatesAirspace.json'

const airspaceData = [
  ...faaSUA.features,
  ...customGermanAirspace.features,
  ...customSouthKoreanAirspace.features,
  ...customThailandAirspace.features,
  ...customUnitedStatesAirspace.features,
]

let llzs = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'LLZ')
let lowMoas = airspaceData.filter(feature =>
  feature.properties.TYPE_CODE === 'LOW' ||
  (
    feature.properties.TYPE_CODE === 'MOA' &&
    (
      feature.properties.NAME.includes('LOW') ||
      feature.properties.NAME.includes('MOODY 2')
    )
  )
)

let moas = airspaceData.filter(feature =>
  feature.properties.TYPE_CODE === 'MOA' &&
  !(
    feature.properties.NAME.includes('LOW') ||
    feature.properties.NAME.includes('MOODY 2')
  )
)

let advisoryCA = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'ADA')
let alert = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'A')
let warning = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'W')
let dangerCA = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'D')
let restricted = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'R')
let prohibited = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'P')
let nfl = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'NFL')
let nflBuffer = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'NFL-BUFFER')
let aars = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'AAR')
let atcaas = airspaceData.filter(feature => feature.properties.TYPE_CODE === 'ATCAA')



const tryMgrs = latlng => {
  let position

  try {
    position = LL.parse(latlng.lat, latlng.lng).toUtm().toMgrs().toString()
  } catch (e) {
    position = LL.parse(latlng.lat, latlng.lng)
  }

  return position
}

const hexToKmlColor = color => {
  let kml = color.substring(1)
  let r = kml.substring(0, 2)
  let g = kml.substring(2, 4)
  let b = kml.substring(4)

  return `FF${b}${g}${r}`
}

const generateBullseyes = (bullseyes, kmlData) => {
  kmlData +=
    `<Folder id='bullseyes'>
      <name>Bullseyes</name>
      <open>0</open>`

  bullseyes.forEach((bullseye, index) => {
    kmlData +=
      `<Folder id='bullseye-${index}'>
      <name>${bullseye.title}</name>
      <open>0</open>
      <Placemark>
        <name>${bullseye.title}</name>
        <Style>
          <IconStyle><Icon/></IconStyle>
        </Style>
        <Point>
          <coordinates>${bullseye.latlng.lng},${bullseye.latlng.lat}</coordinates>
        </Point>
      </Placemark>
      `

    for (let i = 1; i <= bullseye.rings; i++) {
      let circle = {
        layer: 'circle',
        unit: 'm',
        radius: bullseye.distance * 1852 * i,
        color: bullseye.color,
        latlng: bullseye.latlng,
      }

      kmlData += generateCircle(circle)
    }

    for (let i = 1; i <= 360; i += bullseye.angle) {
      let point = LatLon.parse(bullseye.latlng.lat, bullseye.latlng.lng)
      let endPoint = point.destinationPoint(bullseye.rings * bullseye.distance * 1852, i + bullseye.declination)
      kmlData +=
        `<Placemark>
            <Style>
              <IconStyle><Icon/></IconStyle>
              <LineStyle>
                <color>${hexToKmlColor(bullseye.color)}</color>
                <width>5</width>
              </LineStyle>
            </Style>
            <LineString>
              <tessellate>1</tessellate>
              <coordinates>
                ${bullseye.latlng.lng},${bullseye.latlng.lat}
                ${endPoint.lon},${endPoint.lat}
              </coordinates>
            </LineString>
          </Placemark>`
    }

    kmlData += `</Folder>`
  })

  kmlData += `</Folder>`
  return kmlData
}

const generateCircles = (circles, kmlData) => {
  kmlData +=
    `<Folder id='circles'>
      <name>Circles</name>
      <open>0</open>
      `

  circles.forEach(circle => {
    kmlData += generateCircle(circle)
  })

  kmlData += `</Folder>`
  return kmlData
}

const generateLines = (lines, kmlData) => {
  kmlData +=
    `<Folder id='lines'>
      <name>Lines</name>
      <open>0</open>`

  lines.forEach(line => {
    kmlData +=
      `<Placemark>
        <Style>
          <IconStyle><Icon/></IconStyle>
          <LineStyle>
            <color>${hexToKmlColor(line.color)}</color>
            <width>5</width>
          </LineStyle>
        </Style>
        <LineString>
          <tessellate>1</tessellate>
          <coordinates>`

    line.positions.forEach(coordinate => {
      kmlData += `${coordinate.lng},${coordinate.lat}\n`
    })

    kmlData +=
      `</coordinates>
        </LineString>
          </Placemark>`
  })

  kmlData += `</Folder>`
  return kmlData
}

const generateRectangles = (rectangles, kmlData) => {
  kmlData +=
    `<Folder id='rectangles'>
      <name>Rectangles</name>
      <open>0</open>`

  rectangles.forEach(rectangle => {
    kmlData +=
      `<Placemark>
        <Style>
          <IconStyle><Icon/></IconStyle>
          <LineStyle>
            <color>${hexToKmlColor(rectangle.color)}</color>
            <width>5</width>
          </LineStyle>
          <PolyStyle>
            <color>00000000</color>
          </PolyStyle>
        </Style>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>
                ${rectangle.bounds[0].lng},${rectangle.bounds[0].lat}
                ${rectangle.bounds[1].lng},${rectangle.bounds[0].lat}
                ${rectangle.bounds[1].lng},${rectangle.bounds[1].lat}
                ${rectangle.bounds[0].lng},${rectangle.bounds[1].lat}
                ${rectangle.bounds[0].lng},${rectangle.bounds[0].lat}
              </coordinates>
            </LinearRing>
          </outerBoundaryIs>
        </Polygon>
      </Placemark>`
  })

  kmlData += `</Folder>`
  return kmlData
}

const generatePolygons = (polygons, kmlData) => {
  kmlData +=
    `<Folder id='polygons'>
      <name>Polygons</name>
      <open>0</open>`

  polygons.forEach(polygon => {
    kmlData +=
      `<Placemark>
        <Style>
          <IconStyle><Icon/></IconStyle>
          <LineStyle>
            <color>${hexToKmlColor(polygon.color)}</color>
            <width>5</width>
          </LineStyle>
          <PolyStyle>
            <color>00000000</color>
          </PolyStyle>
        </Style>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>`

    polygon.positions.forEach(latlng => kmlData += `${latlng.lng},${latlng.lat}\n`)
    kmlData += `${polygon.positions[0].lng},${polygon.positions[0].lat}`

    kmlData +=
      `</coordinates>
        </LinearRing>
          </outerBoundaryIs>
            </Polygon>
              </Placemark>`

  })

  kmlData += `</Folder>`
  return kmlData
}

const generateCircle = marker => {
  let radius = marker.layer === 'circle' ? marker.radius : marker.range
  if (marker.unit === 'km') {
    radius = radius * 1000
  } else if (marker.unit === 'NM') {
    radius = radius * 1852
  }

  let circleData =
    `<Placemark>
    <name>${marker.layer === 'threat' ? `${marker.title === '' ? 'Custom Threat' : marker.title} (${marker.sovereignty} ${marker.label})` : `${marker.title}`}</name>
    <Style>
      <IconStyle><Icon/></IconStyle>
      <LineStyle>
        <color>${hexToKmlColor(marker.color)}</color>
        <width>5</width>
      </LineStyle>
    </Style>
    <LineString>
      <tessellate>1</tessellate>
      <coordinates>`

  const point = LatLon.parse(marker.latlng.lat, marker.latlng.lng)
  for (let degree = 0; degree <= 360; degree += 5) {
    let newPoint = point.destinationPoint(radius, degree)
    circleData += `${newPoint.lon},${newPoint.lat}\n`
  }

  circleData +=
    `</coordinates>
      </LineString>
        </Placemark>`

  return circleData
}

//----------------------------------------------------------------//
// Generate Markers Function
//----------------------------------------------------------------//
const generateMarkers = (markers, folderName, folderId, kmlData) => {
  kmlData +=
    `<Folder id='${folderId}'>
      <name>${folderName}</name>
      <open>1</open>`

  markers.forEach(marker => {
    kmlData +=
      `<Placemark>
        <description>
          ${marker.data !== null && marker.data !== undefined ? marker.data.type === '9line' ?
        (
          `<table>
            <tbody>
              <tr>
                <td>Label</td>
                <td>${marker.data.label}</td>
              </tr>
              <tr>
                <td>GFC Intent</td>
                <td>${marker.data.intent}</td>
              </tr>
              <tr>
                <td>Type/Method</td>
                <td>${marker.data.typeMethod}</td>
              </tr>
              <tr>
                <td>IP / Hdg / Distance</td>
                <td>${marker.data.ip}/${marker.data.hdg}/${marker.data.distance}</td>
              </tr>
              <tr>
                <td>Elevation</td>
                <td>${marker.data.elevation}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>${marker.data.description}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>${marker.data.location}</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>${marker.data.mark}</td>
              </tr>
              <tr>
                <td>Friendlies</td>
                <td>${marker.data.friendlies}</td>
              </tr>
              <tr>
                <td>Egress</td>
                <td>${marker.data.egress}</td>
              </tr>
              <tr>
                <td>Remarks/Restrictions</td>
                <td>${marker.data.remarks}</td>
              </tr>
              <tr>
                <td>TOT</td>
                <td>${marker.data.tot}</td>
              </tr>
              <tr>
                <td>Fighter-to-Fighter</td>
                <td>${marker.data.f2f}</td>
              </tr>
            </tbody>
          </table>`
        ) :
        (
          `<table>
            <tbody>
              <tr>
                <td>Callsign</td>
                <td>${marker.data.callsign}</td>
              </tr>
              <tr>
                <td>Frequency</td>
                <td>${marker.data.frequency}</td>
              </tr>
              <tr>
                <td>PLS/HHRID</td>
                <td>${marker.data.plsHhrid}</td>
              </tr>
              <tr>
                <td>Number of Objectives</td>
                <td>${marker.data.numObjectives}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>${marker.data.location}</td>
              </tr>
              <tr>
                <td>Elevation</td>
                <td>${marker.data.elevation}</td>
              </tr>
              <tr>
                <td>Date/Time(z)</td>
                <td>${marker.data.dateTime}</td>
              </tr>
              <tr>
                <td>Source</td>
                <td>${marker.data.source}</td>
              </tr>
              <tr>
                <td>Condition</td>
                <td>${marker.data.condition}</td>
              </tr>
              <tr>
                <td>Equipment</td>
                <td>${marker.data.equipment}</td>
              </tr>
              <tr>
                <td>Authentication</td>
                <td>${marker.data.authentication}</td>
              </tr>
              <tr>
                <td>Threats</td>
                <td>${marker.data.threats}</td>
              </tr>
              <tr>
                <td>PZ Description</td>
                <td>${marker.data.pzDescription}</td>
              </tr>
              <tr>
                <td>OSC/frequency</td>
                <td>${marker.data.oscFreq}</td>
              </tr>
              <tr>
                <td>IP/Heading</td>
                <td>${marker.data.ipHdg}</td>
              </tr>
              <tr>
                <td>Rescort</td>
                <td>${marker.data.rescort}</td>
              </tr>
              <tr>
                <td>Terminal Area Gameplan</td>
                <td>${marker.data.gameplan}</td>
              </tr>
              <tr>
                <td>Signal</td>
                <td>${marker.data.signal}</td>
              </tr>
              <tr>
                <td>Egress Hdg</td>
                <td>${marker.data.egress}</td>
              </tr>
            </tbody>
          </table>`
        )
        :
        `<table>
          <tbody>
            <tr>
              <td>${tryMgrs(marker.latlng)}</td>
            </tr>
            <tr>
              <td>${marker.elevation} ${Number.isInteger(marker.elevation) ? 'feet' : ''}</td>
            </tr>
          </tbody>
        </table>`
      }
        </description>
        <name>${marker.title}</name>
        <Style>
          <IconStyle>
            <Icon>
              <href>${marker.layer === 'buildingLabel' ? 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png' : marker.layer === 'kineticPoint' ? 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png' : marker.layer === 'mapLabel' ? 'http://maps.google.com/mapfiles/kml/pushpin/wht-pushpin.png' : 'http://maps.google.com/mapfiles/kml/pushpin/blue-pushpin.png'}</href>
            </Icon>
          </IconStyle>
        </Style>
        <Point>
          <coordinates>${marker.latlng.lng},${marker.latlng.lat}</coordinates>
        </Point>
      </Placemark>`
  })

  kmlData += `</Folder>`
  return kmlData
}

const generateThreats = (threats, kmlData) => {
  kmlData +=
    `<Folder id='threats'>
      <name>Threats</name>
      <open>1</open>`

  threats.forEach((threat, index) => {
    kmlData +=
      `<Folder id='threat-${index}'>
        <name>${threat.title === '' ? 'Custom Threat' : threat.title} (${threat.sovereignty} ${threat.label})</name>
        <open>0</open> 
        <Placemark>
        <description>
          ${threat.data !== null ? (
        `<table>
            <tbody>
              <tr>
                <td>Label</td>
                <td>${threat.data.label}</td>
              </tr>
              <tr>
                <td>GFC Intent</td>
                <td>${threat.data.intent}</td>
              </tr>
              <tr>
                <td>Type/Method</td>
                <td>${threat.data.typeMethod}</td>
              </tr>
              <tr>
                <td>IP / Hdg / Distance</td>
                <td>${threat.data.ip}/${threat.data.hdg}/${threat.data.distance}</td>
              </tr>
              <tr>
                <td>Elevation</td>
                <td>${threat.data.elevation}</td>
              </tr>
              <tr>
                <td>Description</td>
                <td>${threat.data.description}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>${threat.data.location}</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>${threat.data.mark}</td>
              </tr>
              <tr>
                <td>Friendlies</td>
                <td>${threat.data.friendlies}</td>
              </tr>
              <tr>
                <td>Egress</td>
                <td>${threat.data.egress}</td>
              </tr>
              <tr>
                <td>Remarks/Restrictions</td>
                <td>${threat.data.remarks}</td>
              </tr>
              <tr>
                <td>TOT</td>
                <td>${threat.data.tot}</td>
              </tr>
              <tr>
                <td>Fighter-to-Fighter</td>
                <td>${threat.data.f2f}</td>
              </tr>
            </tbody>
          </table>`
      )
        :
        `<table>
            <tbody>
              <tr>
                <td>${tryMgrs(threat.latlng)}</td>
              </tr>
              <tr>
                <td>${threat.elevation} ${Number.isInteger(threat.elevation) ? 'feet' : ''}</td>
              </tr>
            </tbody>
            </table>`
      }
        </description>
        <name>${threat.title === '' ? 'Custom Threat' : threat.title} (${threat.sovereignty} ${threat.label})</name>
        <Style>
          <IconStyle>
            <Icon>
              <href>http://maps.google.com/mapfiles/kml/shapes/caution.png</href>
            </Icon>
          </IconStyle>
        </Style>
        <Point>
          <coordinates>${threat.latlng.lng},${threat.latlng.lat}</coordinates>
        </Point>
      </Placemark>
      `

    kmlData += generateCircle(threat)
    kmlData += `</Folder>`
  })

  kmlData += `</Folder>`
  return kmlData
}

const generateKML = step => {
  let title = document.title

  title = title.split('| ')
  title = title[1]

  if (title === 'CAS Planner') {
    title = 'Scenario'
  }

  let kmlData =
    `<?xml version='1.0' encoding='UTF-8'?>
      <kml xmlns='http://www.opengis.net/kml/2.2'>
        <Document>
          <name>Hawg View ${title}</name>
          <open>1</open>
          <Style id='poly_red'>
            <LineStyle>
              <color>ff0000ff</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>000000ff</color>
            </PolyStyle>
          </Style>
          <Style id='poly_yellow'>
            <LineStyle>
              <color>ff00ffff</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>0000ffff</color>
            </PolyStyle>
          </Style>
          <Style id='poly_orange'>
            <LineStyle>
              <color>ff0090ff</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>000090ff</color>
            </PolyStyle>
          </Style>
          <Style id='poly_blue'>
            <LineStyle>
              <color>ff800007</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>00800007</color>
            </PolyStyle>
          </Style>
          <Style id='poly_teal'>
            <LineStyle>
              <color>ffffff00</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>00ffff00</color>
            </PolyStyle>
          </Style>
          <Style id='poly_green'>
            <LineStyle>
              <color>ff00ff00</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>0000ff00</color>
            </PolyStyle>
          </Style>
          <Style id='poly_purple'>
            <LineStyle>
              <color>ffff00aa</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>00ff00aa</color>
            </PolyStyle>
          </Style>
          <Style id='thick_line_red'>
            <LineStyle>
              <color>ff0000ff</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>000000ff</color>
            </PolyStyle>
          </Style>
          <Style id='thin_line_red'>
            <LineStyle>
              <color>ff0000ff</color>
              <width>2</width>
            </LineStyle>
            <PolyStyle>
              <color>000000ff</color>
            </PolyStyle>
          </Style>
          <Style id='thick_line_black'>
            <LineStyle>
              <color>ff000000</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>00000000</color>
            </PolyStyle>
          </Style>
          <Style id='thick_line_orange'>
            <LineStyle>
              <color>ff0090ff</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>000090ff</color>
            </PolyStyle>
          </Style>
          <Style id='thick_line_teal'>
            <LineStyle>
              <color>ffffff00</color>
              <width>5</width>
            </LineStyle>
            <PolyStyle>
              <color>00ffff00</color>
            </PolyStyle>
          </Style>
          `
  const fileClose = `</Document></kml>`
  const airspaceClose = `</coordinates></LinearRing></outerBoundaryIs></Polygon></Placemark>`

  //----------------------------------------------------------------//
  // Add all the airspace
  //----------------------------------------------------------------//
  // Korea Low Level Zones
  //----------------------------------------------------------------//
  kmlData +=
    `<Folder id='korea_llzs'>
      <name>Korea LLZs</name>
      <open>0</open>`

  llzs.forEach(llz => {
    if (llz.geometry.type === 'Polygon') {
      kmlData +=
        `<Placemark>
          <name>${llz.properties.NAME}</name>
          <styleUrl>#poly_purple</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>`

      llz.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${llz.geometry.coordinates[0][0][0]},${llz.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    } else {
      console.error(`LLZ Error: Unknown geometry type (${llz.geometry.type})`)
    }
  })



  //----------------------------------------------------------------//
  // Low MOAs
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='low_moas'>
        <name>Low MOAs</name>
        <open>0</open>`

  lowMoas.forEach(lowMoa => {
    kmlData +=
      `<Placemark>
      <name>${lowMoa.properties.NAME}</name>
    `

    if (lowMoa.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_green</styleUrl>
            <Polygon>
              <outerBoundaryIs>
                <LinearRing>
                  <coordinates>`
      lowMoa.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${lowMoa.geometry.coordinates[0][0][0]},${lowMoa.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose

    } else {
      console.error(`Low MOA Error: Unknown geometry type (${lowMoa.geometry.type})`)
    }
  })

  //----------------------------------------------------------------//
  // MOAs
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='moas'>
        <name>MOAs</name>
        <open>0</open>`

  moas.forEach(moa => {
    kmlData +=
      `<Placemark>
        <name>${moa.properties.NAME}</name>`

    if (moa.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_teal</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>`

      moa.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${moa.geometry.coordinates[0][0][0]},${moa.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    } else if (moa.geometry.type === 'MultiLineString') {
      kmlData +=
      `<styleUrl>#thick_line_teal</styleUrl>
        <MultiGeometry>
      `

      moa.geometry.coordinates.forEach(line => {
        kmlData +=
        `<LineString>
          <tessellate>1</tessellate>
            <coordinates>`

        line.forEach(coordinate => {
          kmlData += `${coordinate[0]},${coordinate[1]}\n`
        })

        kmlData +=
        `</coordinates>
          </LineString>`
      })

      kmlData +=
        `</MultiGeometry>
          </Placemark>`
    } else {
      console.error(`MOA Error: Unknown geometry type (${moa.geometry.type})`)
    }
  })

  //----------------------------------------------------------------//
  // Advisory Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='advisory_areas'>
        <name>Advisory Areas</name>
        <open>0</open>`

  advisoryCA.forEach(advisory => {
    kmlData +=
      `<Placemark>
      <name>${advisory.properties.NAME}</name>`

    if (advisory.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_orange</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>`

      advisory.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${advisory.geometry.coordinates[0][0][0]},${advisory.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    } else {
      console.error(`Advisory Area Error: Unknown Geometry Type (${advisory.geometry.type})`)
    }
  })

  //----------------------------------------------------------------//
  // Alert Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='alert_areas'>
        <name>Alert Areas</name>
        <open>0</open>`

  alert.forEach(al => {
    kmlData +=
      `<Placemark>
        <name>${al.properties.NAME}</name>`
    if (al.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_orange</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>`

      al.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${al.geometry.coordinates[0][0][0]},${al.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    } else {
      console.error(`Alert Area Error: Unknown geometry type (${al.geometry.type})`)
    }
  })

  //----------------------------------------------------------------//
  // Warning Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='warning_areas'>
        <name>Warning Areas</name>
        <open>0</open>`

  warning.forEach(warn => {
    kmlData +=
      `<Placemark>
        <name>${warn.properties.NAME}</name>
      `

    if (warn.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_orange</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>
      `
      warn.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${warn.geometry.coordinates[0][0][0]},${warn.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    } else if (warn.geometry.type === 'LineString') {
      kmlData +=
        `<styleUrl>#thick_line_orange</styleUrl>
        <LineString>
          <tessellate>1</tessellate>
            <coordinates>
      `
      warn.geometry.coordinates.forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData +=
        `</coordinates>
          </LineString>
            </Placemark>            
        `
    } else if (warn.geometry.type === 'MultiLineString') {
      kmlData +=
        `<styleUrl>#thick_line_orange</styleUrl>
        <MultiGeometry>
      `

      warn.geometry.coordinates.forEach(line => {
        kmlData +=
          `<LineString>
          <tessellate>1</tessellate>
            <coordinates>
        `

        line.forEach(coordinate => {
          kmlData += `${coordinate[0]},${coordinate[1]}\n`
        })

        kmlData +=
          `</coordinates>
          </LineString>
        `
      })

      kmlData +=
        `</MultiGeometry>
        </Placemark>
      `
    } else {
      console.error(`Warning Area Error: Unknown geometry type (${warn.geometry.type})`)
    }
  })

  //----------------------------------------------------------------//
  // Danger Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='danger_areas'>
        <name>Danger Areas</name>
        <open>0</open>`

  dangerCA.forEach(danger => {
    kmlData +=
      `<Placemark>
        <name>${danger.properties.NAME}</name>`

    if (danger.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_red</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>`

      danger.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${danger.geometry.coordinates[0][0][0]},${danger.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    }
  })

  //----------------------------------------------------------------//
  // Restricted Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='restricted_areas'>
        <name>Restricted Areas</name>
        <open>0</open>`

  restricted.forEach(rest => {
    kmlData +=
      `<Placemark>
        <name>${rest.properties.NAME}</name>
      `

    if (rest.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_red</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>
      `
      rest.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${rest.geometry.coordinates[0][0][0]},${rest.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    } else if (rest.geometry.type === 'LineString') {
      kmlData +=
        `<styleUrl>#thick_line_red</styleUrl>
        <LineString>
          <tessellate>1</tessellate>
            <coordinates>
      `
      rest.geometry.coordinates.forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData +=
        `</coordinates>
        </LineString>
          </Placemark>
      `
    } else {
      console.error(`Restricted Area Error: Unknown geometry type (${rest.geometry.type})`)
    }
  })

  //----------------------------------------------------------------//
  // Prohibited Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='prohibited_areas'>
        <name>Prohibited Areas</name>
        <open>0</open>`

  prohibited.forEach(p => {
    kmlData +=
      `<Placemark>
        <name>${p.properties.NAME}</name>`

    if (p.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_red</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>`

      p.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${p.geometry.coordinates[0][0][0]},${p.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    } else {
      console.error(`Prohibited Area Error: Unknown geometry type (${p.geometry.type})`)
    }
  })

  //----------------------------------------------------------------//
  // Korea No Fly Line
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='korea_nfl'>
        <name>Korea NFL</name>
        <open>0</open>
        <Placemark>
          <name>NO FLY LINE</name>
          <styleUrl>#thick_line_black</styleUrl>
          <LineString>
            <tessellate>1</tessellate>
            <coordinates>`

  nfl[0].geometry.coordinates.forEach(coordinate => {
    kmlData += `${coordinate[0]},${coordinate[1]}\n`
  })

  kmlData +=
    `</coordinates>
        </LineString>
          </Placemark>`

  //----------------------------------------------------------------//
  // Korea No Fly Line Buffer
  //----------------------------------------------------------------//
  kmlData +=
    `<Placemark>
      <name>NO FLY LINE BUFFER</name>
      <styleUrl>#thin_line_red</styleUrl>
        <LineString>
          <tessellate>1</tessellate>
          <coordinates>`

  nflBuffer[0].geometry.coordinates.forEach(coordinate => {
    kmlData += `${coordinate[0]},${coordinate[1]}\n`
  })

  kmlData +=
    `</coordinates>
        </LineString>
          </Placemark>`

  //----------------------------------------------------------------//
  // Air to Air Refueling Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='aars'>
        <name>AARs</name>
        <open>0</open>`

  aars.forEach(aar => {
    kmlData +=
      `<Placemark>
        <name>${aar.properties.NAME}</name>`

    if (aar.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_blue</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>`

      aar.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${aar.geometry.coordinates[0][0][0]},${aar.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    }
  })

  //----------------------------------------------------------------//
  // ATCAAs
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='atcaas'>
        <name>ATCAAs</name>
        <open>0</open>`

  atcaas.forEach(atcaa => {
    kmlData +=
      `<Placemark>
        <name>${atcaa.properties.NAME}</name>`

    if (atcaa.geometry.type === 'Polygon') {
      kmlData +=
        `<styleUrl>#poly_yellow</styleUrl>
          <Polygon>
            <outerBoundaryIs>
              <LinearRing>
                <coordinates>`

      atcaa.geometry.coordinates[0].forEach(coordinate => {
        kmlData += `${coordinate[0]},${coordinate[1]}\n`
      })

      kmlData += `${atcaa.geometry.coordinates[0][0][0]},${atcaa.geometry.coordinates[0][0][1]}`
      kmlData += airspaceClose
    }
  })

  kmlData += `</Folder>`

  //----------------------------------------------------------------//
  // Add Markers
  //----------------------------------------------------------------//
  kmlData = generateMarkers(step.friendlyMarkers, 'Friendly Markers', 'friendly_markers', kmlData)
  kmlData = generateMarkers(step.survivors, 'Survivors', 'survivors', kmlData)
  kmlData = generateMarkers(step.hostileMarkers, 'Hostile Markers', 'hostile_markers', kmlData)
  kmlData = generateMarkers(step.initialPoints, 'Initial Points', 'intial_points', kmlData)
  kmlData = generateMarkers(step.buildingLabels, 'Building Labels', 'building_labels', kmlData)
  kmlData = generateMarkers(step.kineticPoints, 'Kinetic Points', 'kinetic_points', kmlData)
  kmlData = generateMarkers(step.mapLabels, 'Map Labels', 'map_labels', kmlData)
  kmlData = generateBullseyes(step.bullseyes, kmlData)
  kmlData = generateThreats(step.threatMarkers, kmlData)
  kmlData = generateCircles(step.circles, kmlData)
  kmlData = generateLines(step.lines, kmlData)
  kmlData = generateRectangles(step.rectangles, kmlData)
  kmlData = generatePolygons(step.polygons, kmlData)

  kmlData += fileClose

  const element = document.createElement('a')
  const file = new Blob([kmlData], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = `Hawg View Scenario ${title === 'Scenario' ? '' : title + ' '}KML.kml`
  document.body.appendChild(element)
  element.click()
}

export default generateKML