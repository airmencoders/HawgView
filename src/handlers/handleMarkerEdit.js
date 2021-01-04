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
// Hawg View Functions
//----------------------------------------------------------------//
import { editMarkers } from '../functions/editMarkers'

//----------------------------------------------------------------//
// Handle Marker Edit Function
//----------------------------------------------------------------//
const handleMarkerEdit = (action, payload, state, setState) => {
  const supportedActions = ['clear', 'create', 'delete', 'drag', 'edit', '9line', '15line']

  if (supportedActions.includes(action)) {

    let updatedPayload = { ...payload }

    if (action === 'create') {
      updatedPayload = {
        ...updatedPayload,
        id: state.history[state.step].data.markerId,
      }

      if (payload.layer !== 'bullseye') {
        updatedPayload = {
          ...updatedPayload,
          elevation: state.elevation,
        }
      }

      if (payload.layer === 'friendly' || payload.layer === 'hostile' || payload.layer === 'neutral' || payload.layer === 'unknown' || payload.layer === 'threat' || payload.layer === 'survivor' || payload.layer === 'ip' || payload.layer === 'mapLabel' || payload.layer === 'bullseye')
        updatedPayload = {
          ...updatedPayload,
          latlng: state.focusedLatlng.latlng,
        }
    }

    // Take the payload and add in the marker id (for when creating marker)
    // todo: finish with the payload bullshit from the rest of the 'editMarkers' callbacks lol
    const newStep = editMarkers(action, updatedPayload, state)

    if (newStep !== false) {

      let targetHistory
      if (state.step === state.history.length - 1) {
        targetHistory = state.history.slice()
      } else {
        targetHistory = state.history.slice(0, state.step + 1)
      }

      let newState = {
        ...state,
        dialog: {
          anchor: null,
          name: null,
        },
        focusedLatlng: {
          latlng: null,
          source: null,
        },
        focusedMarker: null,
        focusedShape: null,
        history: [...targetHistory, newStep],
        step: state.step + 1,
      }

      if (action === 'create') {

        if (payload.layer === 'circle' || payload.layer === 'rectangle' || payload.layer === 'line' || payload.layer === 'polygon' || payload.layer === 'ellipse') {
          newState = {
            ...newState,
            dialog: {
              anchor: null,
              name: 'editShape',
            },
            focusedShape: updatedPayload,
            tool: null,
          }
        } else if (payload.layer === 'threat') {
          newState = {
            ...newState,
            dialog: {
              anchor: null,
              name: 'editMarker',
            },
            focusedMarker: updatedPayload
          }
        }
      }
      setState(newState)
    }
  } else {
    console.error(`Unsupported action ${action}. Could not modify Markers`)
  }
}

export default handleMarkerEdit