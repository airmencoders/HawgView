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
/**
 * Takes in an iconUrl for a symbol and then returns an SIDC for use with the new milsymbol package
 * @param {*} iconUrl 
 */
const getSIDCID = iconUrl => {
  const baseUrl = 'https://hawg-ops.com/static/media/'
  const shortUrl = '/static/media/'

  switch (iconUrl) {
    case `${baseUrl}ada.af746e84.svg`:
    case `${shortUrl}ada.af746e84.svg`:
      return 'EWA---'
    case `${baseUrl}missile.b14edbce.svg`:
    case `${shortUrl}missile.b14edbce.svg`:
      return 'EWM---'
    case `${baseUrl}airborne.38a043b7.svg`:
    case `${baseUrl}airborne-infantry.7495274f.svg`:
    case `${baseUrl}airborne.df2cd266.svg`:
    case `${baseUrl}airborne-infantry.a56050c6.svg`:
    case `${shortUrl}airborne.38a043b7.svg`:
    case `${shortUrl}airborne-infantry.7495274f.svg`:
    case `${shortUrl}airborne.df2cd266.svg`:
    case `${shortUrl}airborne-infantry.a56050c6.svg`:
      return 'UCIA--'
    case `${baseUrl}air-defense.2f6bc0a9.svg`:
    case `${baseUrl}air-defense.af8b45b2.svg`:
    case `${shortUrl}air-defense.2f6bc0a9.svg`:
    case `${shortUrl}air-defense.af8b45b2.svg`:
      return 'UCD---'
    case `${baseUrl}anti-armor.0b70d1e6.svg`:
    case `${baseUrl}anti-armor.b34f832e.svg`:
    case `${shortUrl}anti-armor.0b70d1e6.svg`:
    case `${shortUrl}anti-armor.b34f832e.svg`:
      return 'UCAA--'
    case `${baseUrl}armor.5e34d211.svg`:
    case `${baseUrl}armor.8f32083e.svg`:
    case `${shortUrl}armor.5e34d211.svg`:
    case `${shortUrl}armor.8f32083e.svg`:
      return 'UCA---'
    case `${baseUrl}artillery.5cfadcbb.svg`:
    case `${baseUrl}artillery.7b3a9690.svg`:
    case `${shortUrl}artillery.5cfadcbb.svg`:
    case `${shortUrl}artillery.7b3a9690.svg`:
      return 'UCF---'
    case `${baseUrl}aviation.05f7fc8d.svg`:
    case `${baseUrl}aviation.ce5c976a.svg`:
    case `${shortUrl}aviation.05f7fc8d.svg`:
    case `${shortUrl}aviation.ce5c976a.svg`:
      return 'UCV---'
    case `${baseUrl}cbrne.725c1dc5.svg`:
    case `${baseUrl}cbrne.b3d110bc.svg`:
    case `${shortUrl}cbrne.725c1dc5.svg`:
    case `${shortUrl}cbrne.b3d110bc.svg`:
      return 'UUA---'
    case `${baseUrl}counterbattery-radar.7ec3e713.svg`:
    case `${baseUrl}counterbattery-radar.412bafde.svg`:
    case `${shortUrl}counterbattery-radar.7ec3e713.svg`:
    case `${shortUrl}counterbattery-radar.412bafde.svg`:
      return 'UCFTR-'
    case `${baseUrl}engineer.9fe6dd66.svg`:
    case `${baseUrl}engineer.d16ad5e6.svg`:
    case `${shortUrl}engineer.9fe6dd66.svg`:
    case `${shortUrl}engineer.d16ad5e6.svg`:
      return 'UCE---'
    case `${baseUrl}infantry.9c99e29e.svg`:
    case `${baseUrl}infantry.6137cbdf.svg`:
    case `${shortUrl}infantry.9c99e29e.svg`:
    case `${shortUrl}infantry.6137cbdf.svg`:
      return 'UCI---'
    case `${baseUrl}light-armor.1c44d584.svg`:
    case `${baseUrl}light-armor.e877e472.svg`:
    case `${shortUrl}light-armor.1c44d584.svg`:
    case `${shortUrl}light-armor.e877e472.svg`:
      return 'UCATL-'
    case `${baseUrl}maintenance.29fbc2f8.svg`:
    case `${baseUrl}maintenance.412b7c3a.svg`:
    case `${shortUrl}maintenance.29fbc2f8.svg`:
    case `${shortUrl}maintenance.412b7c3a.svg`:
      return 'USX---'
    case `${baseUrl}mech-infantry.8bacdfd9.svg`:
    case `${baseUrl}mech-infantry.306863c1.svg`:
    case `${shortUrl}mech-infantry.8bacdfd9.svg`:
    case `${shortUrl}mech-infantry.306863c1.svg`:
      return 'UCIZ--'
    case `${baseUrl}medical.3ae34509.svg`:
    case `${baseUrl}medical.a7456a27.svg`:
    case `${shortUrl}medical.3ae34509.svg`:
    case `${shortUrl}medical.a7456a27.svg`:
      return 'USM---'
    case `${baseUrl}missile.3ee84090.svg`:
    case `${baseUrl}missile.4ce9a7b1.svg`:
    case `${shortUrl}missile.3ee84090.svg`:
    case `${shortUrl}missile.4ce9a7b1.svg`:
      return 'UCDM--'
    case `${baseUrl}mlrs.3bc1af8e.svg`:
    case `${baseUrl}mlrs.6517f49b.svg`:
    case `${shortUrl}mlrs.3bc1af8e.svg`:
    case `${shortUrl}mlrs.6517f49b.svg`:
      return 'UCFRM-'
    case `${baseUrl}recce.59176d11.svg`:
    case `${baseUrl}recce.a6099e4c.svg`:
    case `${shortUrl}recce.59176d11.svg`:
    case `${shortUrl}recce.a6099e4c.svg`:
      return 'UCR---'
    case `${baseUrl}self-propelled-artillery.4a8d1d95.svg`:
    case `${baseUrl}self-propelled-artillery.0790c09d.svg`:
    case `${shortUrl}self-propelled-artillery.4a8d1d95.svg`:
    case `${shortUrl}self-propelled-artillery.0790c09d.svg`:
      return 'UCFHE-'
    case `${baseUrl}signals.14ad4e9c.svg`:
    case `${baseUrl}signals.c34f9425.svg`:
    case `${shortUrl}signals.14ad4e9c.svg`:
    case `${shortUrl}signals.c34f9425.svg`:
      return 'UUS---'
    case `${baseUrl}special-forces.28b08af1.svg`:
    case `${baseUrl}special-forces.49fc1351.svg`:
    case `${shortUrl}special-forces.28b08af1.svg`:
    case `${shortUrl}special-forces.49fc1351.svg`:
      return '------'
    case `${baseUrl}supply.41ffb33b.svg`:
    case `${baseUrl}supply.46765207.svg`:
    case `${shortUrl}supply.41ffb33b.svg`:
    case `${shortUrl}supply.46765207.svg`:
      return 'USS---'
    case `${baseUrl}unit.d5cc8d94.svg`:
    case `${baseUrl}unit.d8a35903.svg`:
    case `${shortUrl}unit.d5cc8d94.svg`:
    case `${shortUrl}unit.d8a35903.svg`:
      return 'U-----'
    case `${baseUrl}wheeled-armor.443d3fce.svg`:
    case `${baseUrl}wheeled-armor.dea5279f.svg`:
    case `${shortUrl}wheeled-armor.443d3fce.svg`:
    case `${shortUrl}wheeled-armor.dea5279f.svg`:
      return 'UCAW--'
    default:
      console.error(`Error: Unknown v1 graphic (${iconUrl}) - Setting to Unit`)
      return 'U-----'
  }
}

const isOldTarget = marker => {
  return (
    marker.iconType === 'img' &&
    (marker.iconUrl === '/static/media/tgt.2daac1ea.svg' ||
      marker.iconUrl === 'https://hawg-ops.com/static/media/tgt.2daac1ea.svg')
  )
}

const handleLoadScenario = (data, state, setState, toast) => {
  let json
  try {
    let object = JSON.parse(data)

    if (object && typeof object === 'object') {
      json = object
    }
  } catch (error) {
    console.error(error)
    toast('There was an error loading the scenario', 'error')
  }

  if (json !== undefined) {

    let targetHistory
    if (state.step === state.history.length - 1) {
      targetHistory = state.history.slice()
    } else {
      targetHistory = state.history.slice(0, state.step + 1)
    }

    let newStep = {
      action: 'load scenario',
      anchor: json.data.anchor !== undefined ? json.data.anchor : {
        declination: null,
        id: null,
        latlng: null,
        name: null
      },
      buildingLabels: json.data.buildingLabels !== undefined ? json.data.buildingLabels : [],
      bullseyes: json.data.bullseyes !== undefined ? json.data.bullseyes : [],
      circles: json.data.circles !== undefined ? json.data.circles : [],
      data: json.data.data !== undefined ? json.data.data : {
        buildingLabel: 1,
        firstLetter: 65,
        markerId: 0,
        secondLetter: 65,
      },
      ellipses: json.data.ellipses !== undefined ? json.data.ellipses : [],
      rectangles: json.data.rectangles !== undefined ? json.data.rectangles : [],
      friendlyMarkers: json.data.friendlyMarkers !== undefined ? json.data.friendlyMarkers : [],
      hostileMarkers: json.data.hostileMarkers !== undefined ? json.data.hostileMarkers : [],
      initialPoints: json.data.initialPoints !== undefined ? json.data.initialPoints : [],
      kineticPoints: json.data.kineticPoints !== undefined ? json.data.kineticPoints : [],
      lines: json.data.lines !== undefined ? json.data.lines : [],
      mapLabels: json.data.mapLabels !== undefined ? json.data.mapLabels : [],
      neutralMarkers: json.data.neutralMarkers !== undefined ? json.data.neutralMarkers : [],
      polygons: json.data.polygons !== undefined ? json.data.polygons : [],
      sardot: json.data.sardot !== undefined ? json.data.sardot : {
        declination: null,
        id: null,
        latlng: null,
        name: null,
      },
      survivors: json.data.survivors !== undefined ? json.data.survivors : [],
      styles: json.data.styles !== undefined ? json.data.styles : {
        mgrs: {
          gridzoneColor: '#ffa500',
          lineColor: '#ffffff',
        },
        gars: {
          cellColor: '#ffa500',
          quadrantColor: '#800080',
          keypadColor: '#ffffff'
        },
        buildingLabel: {
          color: '#ffff00',
        },
      },
      threatMarkers: json.data.threatMarkers !== undefined ? json.data.threatMarkers : [],
      unknownMarkers: json.data.unknownMarkers !== undefined ? json.data.unknownMarkers : [],
    }

    if (json.name === undefined || json.name === '') {
      document.title = `Hawg View | CAS Planner`
    } else {
      document.title = `Hawg View | ${json.name}`
    }

    // Go through all the friendly/hostile markers to update from the v1 graphics to v2 milsymbol graphics
    let oldFriendlyMarkers = newStep.friendlyMarkers
    let oldHostileMarkers = newStep.hostileMarkers
    let newFriendlyMarkers = []
    let newHostileMarkers = []

    oldFriendlyMarkers.forEach(marker => {
      let newMarker = {
        arty: marker.arty,
        data: null,
        elevation: marker.elevation,
        iconType: 'sidc',
        layer: 'friendly',
        sidc: marker.iconType === 'sidc' ? marker.sidc : {
          scheme: 'S',
          affiliation: 'F',
          dimension: getSIDCID(marker.iconUrl) === '------' ? 'F' : 'G',
          status: 'P',
          id: getSIDCID(marker.iconUrl),
          modifier: '-',
          echelon: '-',
        },
        title: marker.title,
        id: marker.id,
        latlng: marker.latlng,
      }

      newFriendlyMarkers = [...newFriendlyMarkers, newMarker]
    })

    oldHostileMarkers.forEach(marker => {

      // Because this is an old hostile thing and it's the only hostile non SIDC, if it's the 
      // target, then just put it in, otherwise, convert it to the SIDC
      if (isOldTarget(marker)) {
        newHostileMarkers = [...newHostileMarkers, marker]
      } else {
        let newMarker = {
          arty: marker.arty,
          data: marker.data,
          elevation: marker.elevation,
          iconType: 'sidc',
          layer: 'hostile',
          sidc: marker.iconType === 'sidc' ? marker.sidc : {
            scheme: 'S',
            affiliation: 'H',
            dimension: getSIDCID(marker.iconUrl) === '------' ? 'F' : 'G',
            status: 'P',
            id: getSIDCID(marker.iconUrl),
            modifier: '-',
            echelon: '-',
          },
          title: marker.title,
          id: marker.id,
          latlng: marker.latlng,
        }

        newHostileMarkers = [...newHostileMarkers, newMarker]
      }
    })


    // Go through all the threats to add dashed if it doesn't exist (update the save file)
    let oldThreatMarkers = newStep.threatMarkers
    let newThreatMarkers = []

    oldThreatMarkers.forEach(marker => {
      let newMarker = marker
      if (marker.dashed === undefined) {
        newMarker = {
          ...newMarker,
          dashed: true,
        }
      }

      newThreatMarkers = [...newThreatMarkers, newMarker]
    })

    newStep = {
      ...newStep,
      friendlyMarkers: newFriendlyMarkers,
      hostileMarkers: newHostileMarkers,
      threatMarkers: newThreatMarkers,
    }

    // Need to manually toast, otherwise it loses the change in history
    setState({
      ...state,
      dialog: {
        anchor: null,
        name: null,
      },
      history: [...targetHistory, newStep],
      snackbar: {
        ...state.snackbar,
        pack: [...state.snackbar.pack, {
          key: new Date().getTime(),
          message: 'Scenario loaded to map',
          severity: 'success',
        }]
      },
      step: state.step + 1,
    })
  } else {
    toast('There was an error loading the scenario', 'error')
  }
}

export default handleLoadScenario