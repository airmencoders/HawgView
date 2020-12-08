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
import {
  airspace
} from '../constants/airspace'

const remapIconUrl = svg => {
  let pngUrl = 'https://hawg-ops.com/pngMarkers/'

  switch (svg) {
    case 'https://hawg-ops.com/static/media/ada.af746e84.svg':
      pngUrl += 'persistent/ada.png'
      break
    case 'https://hawg-ops.com/static/media/airborne.38a043b7.svg':
      pngUrl += 'hostile/airborne.png'
      break
    case 'https://hawg-ops.com/static/media/airborne.df2cd266.svg':
      pngUrl += 'friendly/airborne.png'
      break
    case 'https://hawg-ops.com/static/media/airborne-infantry.7495274f.svg':
      pngUrl += 'hostile/airborne-infantry.png'
      break
    case 'https://hawg-ops.com/static/media/airborne-infantry.a56050c6.svg':
      pngUrl += 'friendly/airborne-infantry.png'
      break
    case 'https://hawg-ops.com/static/media/air-defense.2f6bc0a9.svg':
      pngUrl += 'hostile/air-defense.png'
      break
    case 'https://hawg-ops.com/static/media/air-defense.af8b45b2.svg':
      pngUrl += 'friendly/air-defense.png'
      break
    case 'https://hawg-ops.com/static/media/anti-armor.0b70d1e6.svg':
      pngUrl += 'hostile/anti-armor.png'
      break
    case 'https://hawg-ops.com/static/media/anti-armor.b34f832e.svg':
      pngUrl += 'friendly/anti-armor.png'
      break
    case 'https://hawg-ops.com/static/media/armor.5e34d211.svg':
      pngUrl += 'friendly/armor.png'
      break
    case 'https://hawg-ops.com/static/media/armor.8f32083e.svg':
      pngUrl += 'hostile/armor.png'
      break
    case 'https://hawg-ops.com/static/media/artillery.5cfadcbb.svg':
      pngUrl += 'friendly/artillery.png'
      break
    case 'https://hawg-ops.com/static/media/artillery.7b3a9690.svg':
      pngUrl += 'hostile/artillery.png'
      break
    case 'https://hawg-ops.com/static/media/aviation.05f7fc8d.svg':
      pngUrl += 'hostile/aviation.png'
      break
    case 'https://hawg-ops.com/static/media/aviation.ce5c976a.svg':
      pngUrl += 'friendly/aviation.png'
      break
    case '/static/media/blank.b6c2bdb7.svg':
      pngUrl += 'persistent/bullseye.png'
      break
    case 'https://hawg-ops.com/static/media/cbrne.725c1dc5.svg':
      pngUrl += 'hostile/cbrne.png'
      break
    case 'https://hawg-ops.com/static/media/cbrne.b3d110bc.svg':
      pngUrl += 'friendly/cbrne.png'
      break
    case 'https://hawg-ops.com/static/media/counterbattery-radar.7ec3e713.svg':
      pngUrl += 'hostile/counterbattery-radar.png'
      break
    case 'https://hawg-ops.com/static/media/counterbattery-radar.412bafde.svg':
      pngUrl += 'friendly/counterbattery-radar.png'
      break
    case 'https://hawg-ops.com/static/media/cp.07c4b44b.svg':
      pngUrl += 'persistent/cp.png'
      break
    case 'https://hawg-ops.com/static/media/engineer.9fe6dd66.svg':
      pngUrl += 'hostile/engineer.png'
      break
    case 'https://hawg-ops.com/static/media/engineer.d16ad5e6.svg':
      pngUrl += 'friendly/engineer.png'
      break
    case 'https://hawg-ops.com/static/media/infantry.9c99e29e.svg':
      pngUrl += 'friendly/infantry.png'
      break
    case 'https://hawg-ops.com/static/media/infantry.6137cbdf.svg':
      pngUrl += 'hostile/infantry.png'
      break
    case 'https://hawg-ops.com/static/media/ip.9c70c67c.svg':
      pngUrl += 'persistent/ip.png'
      break
    case 'https://hawg-ops.com/static/media/light-armor.1c44d584.svg':
      pngUrl += 'hostile/light-armor.png'
      break
    case 'https://hawg-ops.com/static/media/light-armor.e877e472.svg':
      pngUrl += 'friendly/light-armor.png'
      break
    case 'https://hawg-ops.com/static/media/maintenance.29fbc2f8.svg':
      pngUrl += 'hostile/maintenance.png'
      break
    case 'https://hawg-ops.com/static/media/maintenance.412b7c3a.svg':
      pngUrl += 'friendly/maintenance.png'
      break
    case 'https://hawg-ops.com/static/media/mech-infantry.8bacdfd9.svg':
      pngUrl += 'friendly/mech-infantry.png'
      break
    case 'https://hawg-ops.com/static/media/mech-infantry.306863c1.svg':
      pngUrl += 'hostile/mech-infantry.png'
      break
    case 'https://hawg-ops.com/static/media/medical.3ae34509.svg':
      pngUrl += 'hostile/medical.png'
      break
    case 'https://hawg-ops.com/static/media/medical.a7456a27.svg':
      pngUrl += 'friendly/medical.png'
      break
    case 'https://hawg-ops.com/static/media/missile.3ee84090.svg':
      pngUrl += 'hostile/missile.png'
      break
    case 'https://hawg-ops.com/static/media/missile.4ce9a7b1.svg':
      pngUrl += 'friendly/missile.png'
      break
    case 'https://hawg-ops.com/static/media/missile.b14edbce.svg':
      pngUrl += 'persistent/missile.png'
      break
    case 'https://hawg-ops.com/static/media/mlrs.3bc1af8e.svg':
      pngUrl += 'friendly/mlrs.png'
      break
    case 'https://hawg-ops.com/static/media/mlrs.6517f49b.svg':
      pngUrl += 'hostile/mlrs.png'
      break
    case 'https://hawg-ops.com/static/media/no-strike.f79b5590.svg':
      pngUrl += 'persistent/no-strike.png'
      break
    case 'https://hawg-ops.com/static/media/recce.59176d11.svg':
      pngUrl += 'friendly/recce.png'
      break
    case 'https://hawg-ops.com/static/media/recce.a6099e4c.svg':
      pngUrl += 'hostile/recce.png'
      break
    case 'https://hawg-ops.com/static/media/self-propelled-artillery.4a8d1d95.svg':
      pngUrl += 'friendly/self-propelled-artillery.png'
      break
    case 'https://hawg-ops.com/static/media/self-propelled-artillery.0790c09d.svg':
      pngUrl += 'hostile/self-propelled-artillery.png'
      break
    case 'https://hawg-ops.com/static/media/signals.14ad4e9c.svg':
      pngUrl += 'hostile/signals.png'
      break
    case 'https://hawg-ops.com/static/media/signals.c34f9425.svg':
      pngUrl += 'friendly/signals.png'
      break
    case 'https://hawg-ops.com/static/media/special-forces.28b08af1.svg':
      pngUrl += 'friendly/special-forces.png'
      break
    case 'https://hawg-ops.com/static/media/special-forces.49fc1351.svg':
      pngUrl += 'hostile/special-forces.png'
      break
    case 'https://hawg-ops.com/static/media/srv.23ace4d0.svg':
      pngUrl += 'persistent/srv.png'
      break
    case 'https://hawg-ops.com/static/media/supply.41ffb33b.svg':
      pngUrl += 'hostile/supply.png'
      break
    case 'https://hawg-ops.com/static/media/supply.46765207.svg':
      pngUrl += 'friendly/supply.png'
      break
    case 'https://hawg-ops.com/static/media/tgt.2daac1ea.svg':
      pngUrl += 'persistent/tgt.png'
      break
    case 'https://hawg-ops.com/static/media/unit.d5cc8d94.svg':
      pngUrl += 'hostile/unit.png'
      break
    case 'https://hawg-ops.com/static/media/unit.d8a35903.svg':
      pngUrl += 'friendly/unit.png'
      break
    case 'https://hawg-ops.com/static/media/wheeled-armor.443d3fce.svg':
      pngUrl += 'friendly/wheeled-armor.png'
      break
    case 'https://hawg-ops.com/static/media/wheeled-armor.dea5279f.svg':
      pngUrl += 'hostile/wheeled-armor.png'
      break
    default:
      console.error('Unidentified iconUrl:', svg)
      pngUrl = ''
  }

  return pngUrl
}

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

  bullseyes.map((bullseye, index) => {
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
      
      for(let i = 1; i <= bullseye.rings; i++) {
        let circle = {
          layer: 'circle',
          unit: 'm',
          radius: bullseye.distance * 1852 * i,
          color: bullseye.color,
          latlng: bullseye.latlng,
        }

        kmlData += generateCircle(circle)
      }

      for(let i = 1; i <= 360; i += bullseye.angle) {
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

  circles.map(circle => {
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

  lines.map(line => {
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

    line.positions.map(coordinate => {
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

  rectangles.map(rectangle => {
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
  
  polygons.map(polygon => {
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

    polygon.positions.map(latlng => kmlData += `${latlng.lng},${latlng.lat}\n`)
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
  if(marker.unit === 'km') {
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

  markers.map(marker => {
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
              <href>${marker.layer === 'buildingLabel' ? 'http://maps.google.com/mapfiles/kml/pushpin/ylw-pushpin.png' : marker.layer === 'kineticPoint' ? 'http://maps.google.com/mapfiles/kml/pushpin/red-pushpin.png' : marker.layer === 'mapLabel' ? 'http://maps.google.com/mapfiles/kml/pushpin/wht-pushpin.png' : remapIconUrl(marker.iconUrl)}</href>
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

  threats.map((threat, index) => {
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
              <width>4</width>
            </LineStyle>
            <PolyStyle>
              <color>00000000</color>
            </PolyStyle>
          </Style>`
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

  airspace.llzs.map(airspace => {
    kmlData +=
      `<Placemark>
        <styleUrl>#poly_purple</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>`

    airspace.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)
    kmlData += `${airspace[0][1]},${airspace[0][0]}\n`

    kmlData += airspaceClose
  })

  //----------------------------------------------------------------//
  // Low MOAs
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='low_moas'>
        <name>Low MOAs</name>
        <open>0</open>`

  airspace.lowMoas.map(airspace => {
    kmlData +=
      `<Placemark>
        <styleUrl>#poly_green</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>`

    airspace.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)
    kmlData += `${airspace[0][1]},${airspace[0][0]}\n`

    kmlData += airspaceClose
  })

  //----------------------------------------------------------------//
  // MOAs
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='moas'>
        <name>MOAs</name>
        <open>0</open>`

  airspace.moas.map(airspace => {
    kmlData +=
      `<Placemark>
        <styleUrl>#poly_teal</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>`

    airspace.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)
    kmlData += `${airspace[0][1]},${airspace[0][0]}\n`

    kmlData += airspaceClose
  })

  //----------------------------------------------------------------//
  // Warning Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='warning_areas'>
        <name>Warning Areas</name>
        <open>0</open>`

  airspace.warningAreas.map(airspace => {
    kmlData +=
      `<Placemark>
        <styleUrl>#poly_orange</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>`

    airspace.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)
    kmlData += `${airspace[0][1]},${airspace[0][0]}\n`

    kmlData += airspaceClose
  })

  //----------------------------------------------------------------//
  // Restricted Areas
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='restricted_areas'>
        <name>Restricted Areas</name>
        <open>0</open>`

  airspace.restrictedAreas.map(airspace => {
    kmlData +=
      `<Placemark>
        <styleUrl>#poly_red</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>`

    airspace.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)
    kmlData += `${airspace[0][1]},${airspace[0][0]}\n`

    kmlData += airspaceClose
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
          <styleUrl>#thick_line_black</styleUrl>
          <LineString>
            <tessellate>1</tessellate>
            <coordinates>`

  airspace.koreaNfl.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)

  kmlData +=
    `</coordinates>
        </LineString>
          </Placemark>`

  //----------------------------------------------------------------//
  // Korea No Fly Line Buffer
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='2nm_buffer'>
        <name>Korea NFL 2NM Buffer</name>
        <open>0</open>
        <Placemark>
          <styleUrl>#thin_line_red</styleUrl>
          <LineString>
            <tessellate>1</tessellate>
            <coordinates>`

  airspace.koreaNflBuffer.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)

  kmlData +=
    `</coordinates>
        </LineString>
          </Placemark>`

  //----------------------------------------------------------------//
  // Korea P-518 Border
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='p518_border'>
        <name>Korea P-518 Border</name>
        <open>0</open>
        <Placemark>
          <styleUrl>#thick_line_red</styleUrl>
          <LineString>
            <tessellate>1</tessellate>
            <coordinates>`

  airspace.p518.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)

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

  airspace.aars.map(airspace => {
    kmlData +=
      `<Placemark>
        <styleUrl>#poly_blue</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>`

    airspace.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)
    kmlData += `${airspace[0][1]},${airspace[0][0]}\n`

    kmlData += airspaceClose
  })

  //----------------------------------------------------------------//
  // ATCAAs
  //----------------------------------------------------------------//
  kmlData +=
    `</Folder>
      <Folder id='atcaas'>
        <name>ATCAAs</name>
        <open>0</open>`

  airspace.atcaas.map(airspace => {
    kmlData +=
      `<Placemark>
        <styleUrl>#poly_yellow</styleUrl>
        <Polygon>
          <outerBoundaryIs>
            <LinearRing>
              <coordinates>`

    airspace.map(coordinate => kmlData += `${coordinate[1]},${coordinate[0]}\n`)
    kmlData += `${airspace[0][1]},${airspace[0][0]}\n`

    kmlData += airspaceClose
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