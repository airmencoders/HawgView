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

    const newStep = {
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

    console.log('newStep', newStep)

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