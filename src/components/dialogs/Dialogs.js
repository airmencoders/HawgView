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
      />
      <AddMarkerDrawer
        setState={props.setState}
        state={props.state}
      />
      <EditMarkerDrawer
        setState={props.setState}
        state={props.state}
      />
      <EditShapeDrawer
        setState={props.setState}
        state={props.state}
      />
      <MarkerListDialog
        setState={props.setState}
        state={props.state}
      />
      <SaveScenarioDialog
        setState={props.setState}
        state={props.state}
        toast={(message, severity) => props.toast(message, severity)}
      />
      <LoadScenarioDialog
        setState={props.setState}
        state={props.state}
        toast={(message, severity) => props.toast(message, severity)}
      />
    </React.Fragment>
  )
}

export default Dialogs