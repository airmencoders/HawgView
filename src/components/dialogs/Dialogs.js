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
import React from 'react'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  AddMarkerDrawer,
  EditMarkerDrawer,
  EditShapeDrawer,
  LoadScenarioDialog,
  MarkerListDialog,
  NotificationsDialog,
  SaveScenarioDialog,
  StyleDrawer,
} from '../dialogs'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleLoadScenario from '../../handlers/handleLoadScenario'

//----------------------------------------------------------------//
// Dialogs Component
//----------------------------------------------------------------//
const Dialogs = props => {

  return (
    <React.Fragment>
      <NotificationsDialog
        open={props.activeDialog === 'notifications'}
        onClose={() => props.handleMapReset()}
      />
      <StyleDrawer
        open={props.activeDialog === 'style'}
        onClose={() => props.handleMapReset()}
        submit={(action, payload) => props.handleEditMarker(action, payload)}
      />
      <AddMarkerDrawer
        anchor={props.history[props.step].anchor}
        open={props.activeDialog === 'addMarker'}
        markerLabel={props.markerLabel}
        onClose={() => props.handleMapReset()}
        handleAddMarker={payload => props.handleEditMarker('create', payload)}
        setMarkerLabel={props.setMarkerLabel}
      />
      <EditMarkerDrawer
        marker={props.focusedMarker}
        open={props.activeDialog === 'editMarker'}
        onClose={() => props.handleMapReset()}
        submit={(action, payload) => props.handleEditMarker(action, payload)}
      />
      <EditShapeDrawer
        shape={props.focusedShape}
        onClose={() => props.handleMapReset()}
        open={props.activeDialog === 'editShape'}
        submit={(action, payload) => props.handleEditMarker(action, payload)}
      />
      <MarkerListDialog
        open={props.activeDialog === 'markerList'}
        onClose={() => props.handleMapReset()}
        step={props.history[props.step]}
      />
      <SaveScenarioDialog
        data={props.history[props.step]}
        open={props.activeDialog === 'save'}
        setActiveDialog={dialog => props.setActiveDialog(dialog)}
        toast={(message, severity) => props.toast(message, severity)}
      />
      <LoadScenarioDialog
        open={props.activeDialog === 'load'}
        setActiveDialog={dialog => props.setActiveDialog(dialog)}
        submit={data => handleLoadScenario(data, props.history, props.step, props.toast, props.setHistory, props.setStep)}
      />
    </React.Fragment>
  )
}

export default Dialogs