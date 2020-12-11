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
        onClose={() => props.handleMapReset()}

        setState={props.setState}
        state={props.state}
      />
      <StyleDrawer
        onClose={() => props.handleMapReset()}
        submit={(action, payload) => props.handleEditMarker(action, payload)}

        setState={props.setState}
        state={props.state}
      />
      <AddMarkerDrawer
        anchor={props.history[props.state.step].anchor}
        markerLabel={props.markerLabel}
        onClose={() => props.handleMapReset()}
        handleAddMarker={payload => props.handleEditMarker('create', payload)}
        setMarkerLabel={props.setMarkerLabel}

        setState={props.setState}
        state={props.state}
      />
      <EditMarkerDrawer
        onClose={() => props.handleMapReset()}
        submit={(action, payload) => props.handleEditMarker(action, payload)}

        setState={props.setState}
        state={props.state}
      />
      <EditShapeDrawer
        onClose={() => props.handleMapReset()}
        submit={(action, payload) => props.handleEditMarker(action, payload)}

        setState={props.setState}
        state={props.state}
      />
      <MarkerListDialog
        onClose={() => props.handleMapReset()}
        step={props.history[props.state.step]}

        setState={props.setState}
        state={props.state}
      />
      <SaveScenarioDialog
        data={props.history[props.state.step]}
        setActiveDialog={dialog => props.setActiveDialog(dialog)}
        toast={(message, severity) => props.toast(message, severity)}

        setState={props.setState}
        state={props.state}
      />
      <LoadScenarioDialog
        setActiveDialog={dialog => props.setActiveDialog(dialog)}
        submit={data => handleLoadScenario(data, props.history, props.state, props.setState, props.toast, props.setHistory)}

        setState={props.setState}
        state={props.state}
      />
    </React.Fragment>
  )
}

export default Dialogs