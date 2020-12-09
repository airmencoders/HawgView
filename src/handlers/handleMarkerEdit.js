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
const handleMarkerEdit = (action, payload, state, setState, elevation, focusedLatlng, markerLabel, history, step, setHistory, setStep, setMarkerLabel, handleMapReset, setFocusedMarker, setFocusedShape, /*setActiveDialog,*/ setActiveTool, toast) => {
  const supportedActions = ['clear', 'create', 'delete', 'drag', 'edit', '9line', '15line']

  if (supportedActions.includes(action)) {

    let updatedPayload = { ...payload }

    let updatedTitle
    if (payload.layer === 'threat') {
      updatedTitle = payload.title
    } else {
      updatedTitle = markerLabel === '' ? payload.title : markerLabel
    }

    if (action === 'create') {
      updatedPayload = {
        ...updatedPayload,
        id: history[step].data.markerId,
      }

      if (payload.layer !== 'bullseye') {
        updatedPayload = {
          ...updatedPayload,
          elevation: elevation,
        }
      }

      if (payload.layer === 'friendly' || payload.layer === 'hostile' || payload.layer === 'threat' || payload.layer === 'survivor' || payload.layer === 'ip' || payload.layer === 'mapLabel' || payload.layer === 'bullseye')
        updatedPayload = {
          ...updatedPayload,
          latlng: focusedLatlng.latlng,
          title: updatedTitle,
        }
    }

    // Take the payload and add in the marker id (for when creating marker)
    // todo: finish with the payload bullshit from the rest of the 'editMarkers' callbacks lol
    const newStep = editMarkers(action, history, step, updatedPayload)

    if (newStep !== false) {
      let targetHistory
      if (step === history.length - 1) {
        targetHistory = history.slice()
      } else {
        targetHistory = history.slice(0, step + 1)
      }

      setHistory([...targetHistory, newStep])
      setStep(step + 1)

      if (action === 'create') {
        //setMarkerId(markerId + 1)
        setMarkerLabel('')
      }

      handleMapReset()

      if (payload.layer === 'circle' || payload.layer === 'rectangle' || payload.layer === 'line' || payload.layer === 'polygon' || payload.layer === 'ellipse') {
        setFocusedShape(updatedPayload)
        //setActiveDialog('editShape')
        setState({
          ...state,
          dialog: {
            anchor: null,
            name: 'editShape',
          },
        })
        setActiveTool(null)
      }

      if (payload.layer === 'threat') {
        setFocusedMarker(updatedPayload)
        //setActiveDialog('editMarker')
        setState({
          ...state,
          dialog: {
            anchor: null,
            name: 'editMarker',
          },
        })
        setActiveTool(null)
      }
    }
  } else {
    console.error(`Unsupported action ${action}. Could not modify Markers`)
    toast('There was an error performing that action', 'error')
  }
}

export default handleMarkerEdit