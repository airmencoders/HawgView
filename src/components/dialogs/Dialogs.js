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
        setState={props.setState}
        state={props.state}
      />
      <StyleDrawer
        setState={props.setState}
        state={props.state}
        submit={(action, payload) => props.handleEditMarker(action, payload)}
      />
      <AddMarkerDrawer
        anchor={props.history[props.state.step].anchor}
        markerLabel={props.markerLabel}
        handleAddMarker={payload => props.handleEditMarker('create', payload)}
        setMarkerLabel={props.setMarkerLabel}

        setState={props.setState}
        state={props.state}
      />
      <EditMarkerDrawer
        setState={props.setState}
        state={props.state}
        submit={(action, payload) => props.handleEditMarker(action, payload)}
      />
      <EditShapeDrawer
        setState={props.setState}
        state={props.state}
        submit={(action, payload) => props.handleEditMarker(action, payload)}
      />
      <MarkerListDialog
        setState={props.setState}
        state={props.state}
        step={props.history[props.state.step]}
      />
      <SaveScenarioDialog
        data={props.history[props.state.step]}
        setState={props.setState}
        state={props.state}
        toast={(message, severity) => props.toast(message, severity)}
      />
      <LoadScenarioDialog
        setState={props.setState}
        state={props.state}
        submit={data => handleLoadScenario(data, props.history, props.state, props.setState, props.toast, props.setHistory)}
      />
    </React.Fragment>
  )
}

export default Dialogs