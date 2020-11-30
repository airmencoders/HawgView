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
//export const editMarkers = (action, history, step, iconType, color, src, title, sovereignty, threatSovereignty, id, latlng, marker, data) => {

/*async function getDeclination(latlng) {
  let response = await fetch(`https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${latlng.lat}&lon1=${latlng.lng}&resultFormat=json`)

  let json = await response.json()
  let declination = await json.result[0].declination

  return declination
}*/

const getDeclination = latlng => {
  let request = new XMLHttpRequest()
  request.open('GET', `https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=${latlng.lat}&lon1=${latlng.lng}&resultFormat=json`, false)
  request.send(null)

  /*let json = await response.json()
  let declination = await json.result[0].declination

  return declination*/
  let json = JSON.parse(request.responseText)
  let declination = json.result[0].declination
  return declination
}

export const editMarkers = (action, history, step, payload) => {

  switch (action) {
    case 'clear':
      return clearMarkers(history, step)
    case 'create':
      return createMarker(history, step, payload)
    case 'delete':
      return deleteMarker(history, step, payload)
    case 'drag':
      return dragMarker(history, step, payload)
    case 'edit':
      return editMarker(history, step, payload)
    default:
      console.error(`Error: Invalid action ${action}`)
      return false
  }
}

/**
 * Clears all the markers from the map. But only does so if there is anything to clear.
 * Performs length check on the various arrays in history for the current step to decide
 * if there is anything to clear.
 */
const clearMarkers = (history, step) => {
  if (history[step].buildingLabels.length > 0 ||
    history[step].bullseyes.length > 0 ||
    history[step].circles.length > 0 ||
    history[step].ellipses.length > 0 ||
    history[step].friendlyMarkers.length > 0 ||
    history[step].hostileMarkers.length > 0 ||
    history[step].initialPoints.length > 0 ||
    history[step].kineticPoints.length > 0 ||
    history[step].lines.length > 0 ||
    history[step].mapLabels.length > 0 ||
    history[step].polygons.length > 0 ||
    history[step].rectangles.length > 0 ||
    history[step].survivors.length > 0 ||
    history[step].threatMarkers.length > 0) {

    return {
      action: 'Clear markers',
      buildingLabels: [],
      bullseyes: [],
      circles: [],
      data: {
        buildingLabel: 1,
        firstLetter: 65,
        markerId: 0,
        secondLetter: 65,
      },
      ellipses: [],
      friendlyMarkers: [],
      hostileMarkers: [],
      initialPoints: [],
      kineticPoints: [],
      lines: [],
      mapLabels: [],
      polygons: [],
      rectangles: [],
      survivors: [],
      styles: history[step].styles,
      threatMarkers: [],
    }
  } else {
    return false
  }
}

/**
 * Create a new marker, add it to a new step object, and add the step object to the history array.
 * Alternatively, if the user is adding a new marker and they are not at the next step, then 
 * remove all the 'alternate reality' future steps and then add the step object.
 * 
 * @param {Object} history 
 * @param {Integer} step 
 * @param {Object} payload
 */
const createMarker = (history, step, payload) => {

  if (payload.latlng !== null) {
    let targetHistory
    if (step === history.length - 1) {
      targetHistory = history.slice()
    } else {
      targetHistory = history.slice(0, step + 1)
    }

    switch (payload.layer) {
      case 'friendly':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          friendlyMarkers: [...targetHistory[step].friendlyMarkers, payload]
        }
      case 'hostile':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          hostileMarkers: [...targetHistory[step].hostileMarkers, payload]
        }
      case 'ip':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          initialPoints: [...targetHistory[step].initialPoints, payload]
        }
      case 'survivor':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          survivors: [...targetHistory[step].survivors, payload]
        }
      case 'threat':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          threatMarkers: [...targetHistory[step].threatMarkers, payload]
        }
      case 'circle':
        return {
          ...targetHistory[step],
          action: `create circle`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          circles: [...targetHistory[step].circles, payload]
        }
      case 'rectangle':
        return {
          ...targetHistory[step],
          action: `create rectangle`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          rectangles: [...targetHistory[step].rectangles, payload]
        }
      case 'line':
        return {
          ...targetHistory[step],
          action: `create line`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          lines: [...targetHistory[step].lines, payload]
        }
      case 'polygon':
        return {
          ...targetHistory[step],
          action: `create polygon`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          polygons: [...targetHistory[step].polygons, payload]
        }
      case 'buildingLabel':
        return {
          ...targetHistory[step],
          action: `create building label`,
          buildingLabels: [...targetHistory[step].buildingLabels, payload],
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel + 1,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter
          }
        }
      case 'kineticPoint':
        let _secondLetter = targetHistory[step].data.secondLetter
        let _firstLetter = targetHistory[step].data.firstLetter

        if (_secondLetter === 90) {
          _firstLetter++
          _secondLetter = 65
        } else {
          _secondLetter++
        }
        return {
          ...targetHistory[step],
          action: `create kinetic point`,
          kineticPoints: [...targetHistory[step].kineticPoints, payload],
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: _firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: _secondLetter
          }
        }
      case 'mapLabel':
        return {
          ...targetHistory[step],
          action: `create map label`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          mapLabels: [...targetHistory[step].mapLabels, payload]
        }
      case 'bullseye':
        let declination = getDeclination(payload.latlng)

        payload = {
          ...payload,
          declination
        }
        return {
          ...targetHistory[step],
          action: `create bullseye`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          bullseyes: [...targetHistory[step].bullseyes, payload]
        }
      case 'ellipse':
        return {
          ...targetHistory[step],
          action: `create ellipse`,
          data: {
            buildingLabel: targetHistory[step].data.buildingLabel,
            firstLetter: targetHistory[step].data.firstLetter,
            markerId: targetHistory[step].data.markerId + 1,
            secondLetter: targetHistory[step].data.secondLetter,
          },
          ellipses: [...targetHistory[step].ellipses, payload]
        }
      default:
        console.error(`Error: Could not create marker. Invalid layer (${payload.layer})`)
        return false
    }
  } else {
    return false
  }
}

const deleteMarker = (history, step, payload) => {
  const marker = { ...payload.marker }

  switch (marker.layer) {
    case 'friendly':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        friendlyMarkers: history[step].friendlyMarkers.filter(fMarker => fMarker.id !== marker.id)
      }
    case 'hostile':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        hostileMarkers: history[step].hostileMarkers.filter(hMarker => hMarker.id !== marker.id)
      }
    case 'threat':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        threatMarkers: history[step].threatMarkers.filter(tMarker => tMarker.id !== marker.id)
      }
    case 'ip':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        initialPoints: history[step].initialPoints.filter(iMarker => iMarker.id !== marker.id)
      }
    case 'survivor':
      return {
        ...history[step],
        action: `delete ${marker.title}`,
        survivors: history[step].survivors.filter(sMarker => sMarker.id !== marker.id)
      }
    case 'circle':
      return {
        ...history[step],
        action: `delete circle ${marker.title}`,
        circles: history[step].circles.filter(cMarker => cMarker.id !== marker.id)
      }
    case 'rectangle':
      return {
        ...history[step],
        action: `delete rectangle ${marker.title}`,
        rectangles: history[step].rectangles.filter(rMarker => rMarker.id !== marker.id)
      }
    case 'line':
      return {
        ...history[step],
        action: `delete line ${marker.title}`,
        lines: history[step].lines.filter(lMarker => lMarker.id !== marker.id)
      }
    case 'polygon':
      return {
        ...history[step],
        action: `delete polygon ${marker.title}`,
        polygons: history[step].polygons.filter(pMarker => pMarker.id !== marker.id)
      }
    case 'buildingLabel':
      return {
        ...history[step],
        action: `delete building label ${marker.title}`,
        buildingLabels: history[step].buildingLabels.filter(lMarker => lMarker.id !== marker.id)
      }
    case 'kineticPoint':
      return {
        ...history[step],
        action: `delete kinetic point ${marker.title}`,
        kineticPoints: history[step].kineticPoints.filter(kMarker => kMarker.id !== marker.id)
      }
    case 'mapLabel':
      return {
        ...history[step],
        action: `delete map label ${marker.title}`,
        mapLabels: history[step].mapLabels.filter(mMarker => mMarker.id !== marker.id)
      }
    case 'bullseye':
      return {
        ...history[step],
        action: `delete bullseye ${marker.title}`,
        bullseyes: history[step].bullseyes.filter(bMarker => bMarker.id !== marker.id)
      }
    case 'ellipse':
      return {
        ...history[step],
        action: `delete ellipse ${marker.title}`,
        ellipses: history[step].ellipses.filter(eMarker => eMarker.id !== marker.id)
      }
    default:
      console.error(`Error: Could not delete marker (${marker}). Invalid layer (${marker.layer})`)
      return false
  }
}

/**
 * If the user drags the marker, once done reset the lat/lon and title for the popup
 * 
 * @param {Object} marker Object representing the marker being drug around the map
 * @param {Object} newLatLng New Lat/Lng coordinates of the marker
 */
const dragMarker = (history, step, payload) => {
  let targetHistory, filteredMarkers

  const marker = payload.marker

  if (step === history.length - 1) {
    targetHistory = history.slice()
  } else {
    targetHistory = history.slice(0, step + 1)
  }

  let newMarker = {
    ...marker,
    latlng: payload.latlng
  }

  if (newMarker.layer === 'bullseye') {
    let declination = getDeclination(newMarker.latlng)
    newMarker = {
      ...newMarker,
      declination,
    }
  }

  switch (marker.layer) {
    case 'friendly':
      filteredMarkers = targetHistory[step].friendlyMarkers.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        friendlyMarkers: [...filteredMarkers, newMarker]
      }
    case 'hostile':
      filteredMarkers = targetHistory[step].hostileMarkers.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        hostileMarkers: [...filteredMarkers, newMarker]
      }
    case 'ip':
      filteredMarkers = targetHistory[step].initialPoints.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        initialPoints: [...filteredMarkers, newMarker]
      }
    case 'survivor':
      filteredMarkers = targetHistory[step].survivors.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        survivors: [...filteredMarkers, newMarker]
      }
    case 'threat':
      filteredMarkers = targetHistory[step].threatMarkers.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move ${marker.title}`,
        threatMarkers: [...filteredMarkers, newMarker]
      }
    case 'circle':
      filteredMarkers = targetHistory[step].circles.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move circle ${marker.title}`,
        circles: [...filteredMarkers, newMarker]
      }
    case 'rectangle':
      filteredMarkers = targetHistory[step].rectangles.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move rectangle ${marker.title}`,
        rectangles: [...filteredMarkers, newMarker]
      }
    case 'buildingLabel':
      filteredMarkers = targetHistory[step].buildingLabels.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move building label ${marker.title}`,
        buildingLabels: [...filteredMarkers, newMarker]
      }
    case 'kineticPoint':
      filteredMarkers = targetHistory[step].kineticPoints.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move kinetic point ${marker.title}`,
        kineticPoints: [...filteredMarkers, newMarker]
      }
    case 'mapLabel':
      filteredMarkers = targetHistory[step].mapLabels.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move map label ${marker.title}`,
        mapLabels: [...filteredMarkers, newMarker]
      }
    case 'bullseye':
      filteredMarkers = targetHistory[step].bullseyes.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `move bullseye ${marker.title}`,
        bullseyes: [...filteredMarkers, newMarker]
      }
    default:
      console.error(`Error: Could not drag marker (${marker}). Invalid sovereignty (${marker.sovereignty})`)
      return false
  }
}

const editMarker = (history, step, payload) => {
  let targetHistory, filteredMarkers, newMarker

  const marker = payload.marker

  if (step === history.length - 1) {
    targetHistory = history.slice()
  } else {
    targetHistory = history.slice(0, step + 1)
  }

  switch (marker.layer) {
    case 'friendly':
      filteredMarkers = targetHistory[step].friendlyMarkers.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        arty: payload.arty,
        elevation: payload.elevation,
        title: payload.title,
        latlng: payload.latlng,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        friendlyMarkers: [...filteredMarkers, newMarker]
      }
    case 'hostile':
      filteredMarkers = targetHistory[step].hostileMarkers.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        arty: payload.arty,
        data: payload.data,
        elevation: payload.elevation,
        title: payload.title,
        latlng: payload.latlng,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        hostileMarkers: [...filteredMarkers, newMarker]
      }
    case 'ip':
      filteredMarkers = targetHistory[step].initialPoints.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        elevation: payload.elevation,
        title: payload.title,
        latlng: payload.latlng,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        initialPoints: [...filteredMarkers, newMarker]
      }
    case 'survivor':
      filteredMarkers = targetHistory[step].survivors.filter(currentMarker => currentMarker.id !== marker.id)
      newMarker = {
        ...marker,
        data: payload.data,
        elevation: payload.elevation,
        title: payload.title,
        latlng: payload.latlng,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        survivors: [...filteredMarkers, newMarker]
      }
    case 'threat':
      filteredMarkers = targetHistory[step].threatMarkers.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        color: payload.color,
        data: payload.data,
        elevation: payload.elevation,
        fill: payload.fill,
        fillColor: payload.fillColor,
        label: payload.label,
        latlng: payload.latlng,
        range: payload.range,
        sovereignty: payload.sovereignty,
        threatType: payload.threatType,
        title: payload.title,
        unit: payload.unit,
      }

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        threatMarkers: [...filteredMarkers, newMarker]
      }
    case 'circle':
      filteredMarkers = targetHistory[step].circles.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        color: payload.color,
        latlng: payload.latlng,
        fillColor: payload.fillColor,
        title: payload.title,
        dashArray: payload.dashArray,
        radius: payload.radius,
        unit: payload.unit,
      }

      return {
        ...targetHistory[step],
        action: `edit circle ${marker.title}`,
        circles: [...filteredMarkers, newMarker]
      }
    case 'rectangle':
      filteredMarkers = targetHistory[step].rectangles.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        color: payload.color,
        fillColor: payload.fillColor,
        title: payload.title,
        dashArray: payload.dashArray,
      }

      return {
        ...targetHistory[step],
        action: `edit rectangle ${marker.title}`,
        rectangles: [...filteredMarkers, newMarker]
      }
    case 'line':
      filteredMarkers = targetHistory[step].lines.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        color: payload.color,
        title: payload.title,
        dashArray: payload.dashArray,
      }

      return {
        ...targetHistory[step],
        action: `edit line ${marker.title}`,
        lines: [...filteredMarkers, newMarker]
      }
    case 'polygon':
      filteredMarkers = targetHistory[step].polygons.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        color: payload.color,
        dashArray: payload.dashArray,
        fillColor: payload.fillColor,
        title: payload.title,
      }

      return {
        ...targetHistory[step],
        action: `edit polygon ${marker.title}`,
        polygons: [...filteredMarkers, newMarker]
      }
    case 'buildingLabel':
      filteredMarkers = targetHistory[step].buildingLabels.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        title: payload.title,
        latlng: payload.latlng,
        elevation: payload.elevation,
      }

      return {
        ...targetHistory[step],
        action: `edit building label ${marker.title}`,
        buildingLabels: [...filteredMarkers, newMarker]
      }
    case 'kineticPoint':
      filteredMarkers = targetHistory[step].kineticPoints.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        title: payload.title,
        latlng: payload.latlng,
        elevation: payload.elevation,
      }

      return {
        ...targetHistory[step],
        action: `edit kinetic point ${marker.title}`,
        kineticPoints: [...filteredMarkers, newMarker]
      }
    case 'mapLabel':
      filteredMarkers = targetHistory[step].mapLabels.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        color: payload.color,
        title: payload.title,
        latlng: payload.latlng,
        elevation: payload.elevation,
      }

      return {
        ...targetHistory[step],
        action: `edit map label ${marker.title}`,
        mapLabels: [...filteredMarkers, newMarker]
      }
    case 'bullseye':
      filteredMarkers = targetHistory[step].bullseyes.filter(currentMarker => currentMarker.id !== marker.id)
      let declination = getDeclination(payload.latlng)

      newMarker = {
        ...marker,
        color: payload.color,
        title: payload.title,
        rings: payload.rings,
        distance: payload.distance,
        angle: payload.angle,
        latlng: payload.latlng,
        declination,
        showData: payload.showData,
      }

      return {
        ...targetHistory[step],
        action: `edit bullseye ${marker.title}`,
        bullseyes: [...filteredMarkers, newMarker]
      }
    case 'ellipse':
      filteredMarkers = targetHistory[step].ellipses.filter(currentMarker => currentMarker.id !== marker.id)

      newMarker = {
        ...marker,
        center: payload.latlng,
        color: payload.color,
        dashArray: payload.dashArray,
        fillColor: payload.fillColor,
        tilt: payload.tilt,
        title: payload.title,
        length: payload.length,
        width: payload.width,
      }

      return {
        ...targetHistory[step],
        action: `edit ellipse ${marker.title}`,
        ellipses: [...filteredMarkers, newMarker]
      }
    case 'styles':
      
      const newStyles = {
        mgrs: {
          gridzoneColor: payload.mgrs.gridzoneColor,
          lineColor: payload.mgrs.lineColor,
        },
        gars: {
          cellColor: payload.gars.cellColor,
          quadrantColor: payload.gars.quadrantColor,
          keypadColor: payload.gars.keypadColor,
        },
        buildingLabel: {
          color: payload.buildingLabel.color,
        },
      }

      return {
        ...targetHistory[step],
        action: `edit styles`,
        styles: newStyles
      }
    default:
      console.error(`Error: Could not edit marker (${marker}). Invalid layer (${marker.layer})`)
      return false
  }
}