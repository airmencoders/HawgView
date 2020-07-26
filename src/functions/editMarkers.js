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
    case '9line':
      return edit9Line(history, step, payload)
    case '15line':
      return edit15Line(history, step, payload)
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
    history[step].circles.length > 0 ||
    history[step].combatAirPatrols.length > 0 ||
    history[step].friendlyMarkers.length > 0 ||
    history[step].hostileMarkers.length > 0 ||
    history[step].initialPoints.length > 0 ||
    history[step].lines.length > 0 ||
    history[step].polygons.length > 0 ||
    history[step].rectangles.length > 0 ||
    history[step].survivors.length > 0 ||
    history[step].threatMarkers.length > 0) {

    return {
      action: 'Clear markers',
      buildingLabels: [],
      circles: [],
      combatAirPatrols: [],
      friendlyMarkers: [],
      hostileMarkers: [],
      initialPoints: [],
      lines: [],
      polygons: [],
      rectangles: [],
      survivors: [],
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
          friendlyMarkers: [...targetHistory[step].friendlyMarkers, payload]
        }
      case 'hostile':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          hostileMarkers: [...targetHistory[step].hostileMarkers, payload]
        }
      case 'ip':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          initialPoints: [...targetHistory[step].initialPoints, payload]
        }
      case 'survivor':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          survivors: [...targetHistory[step].survivors, payload]
        }
      case 'threat':
        return {
          ...targetHistory[step],
          action: `create ${payload.title}`,
          threatMarkers: [...targetHistory[step].threatMarkers, payload]
        }
      case 'circle':
        return {
          ...targetHistory[step],
          action: `create circle`,
          circles: [...targetHistory[step].circles, payload]
        }
      case 'rectangle':
        return {
          ...targetHistory[step],
          action: `create rectangle`,
          rectangles: [...targetHistory[step].rectangles, payload]
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

  const newMarker = {
    ...marker,
    latlng: payload.latlng
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
    default:
      console.error(`Error: Could not drag marker (${marker}). Invalid sovereignty (${marker.sovereignty})`)
      return false
  }
}

const edit9Line = (history, step, payload) => {
  let targetHistory, filteredMarkers
  const marker = payload.marker

  if (step === history.length - 1) {
    targetHistory = history.slice()
  } else {
    targetHistory = history.slice(0, step + 1)
  }

  const newMarker = {
    ...marker,
    data: payload.data,
  }

  switch (marker.layer) {
    case 'hostile':
      filteredMarkers = targetHistory[step].hostileMarkers.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        hostileMarkers: [...filteredMarkers, newMarker]
      }
    case 'threat':
      filteredMarkers = targetHistory[step].threatMarkers.filter(currentMarker => currentMarker.id !== marker.id)

      return {
        ...targetHistory[step],
        action: `edit ${marker.title}`,
        threatMarkers: [...filteredMarkers, newMarker]
      }
    default:
      console.error(`Error: Could not edit marker (${marker}). Invalid layer (${marker.layer})`)
      return false
  }
}

const edit15Line = (history, step, payload) => {
  let targetHistory, filteredMarkers
  const marker = payload.marker

  if (step === history.length - 1) {
    targetHistory = history.slice()
  } else {
    targetHistory = history.slice(0, step + 1)
  }

  const newMarker = {
    ...marker,
    data: payload.data,
  }

  filteredMarkers = targetHistory[step].survivors.filter(currentMarker => currentMarker.id !== marker.id)

  return {
    ...targetHistory[step],
    action: `edit ${marker.title}`,
    survivors: [...filteredMarkers, newMarker]
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
        title: payload.title,
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
        title: payload.title,
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
        title: payload.title,
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
        title: payload.title,
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
        fill: payload.fill,
        label: payload.label,
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
        fillColor: payload.fillColor,
        title: payload.title,
        dashArray: payload.dashArray,
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
    default:
      console.error(`Error: Could not edit marker (${marker}). Invalid layer (${marker.layer})`)
      return false
  }
}