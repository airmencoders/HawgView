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
  AnalysisTool,
  BuildingLabelTool,
  KineticPointTool,
  LineTool,
  CircleTool,
  RectangleTool,
  EllipseTool,
} from '../tools'

//----------------------------------------------------------------//
// Tools Component
//----------------------------------------------------------------//
const Tools = props => {

  return (
    <React.Fragment>
      <AnalysisTool
        active={props.activeTool === 'analysis'}
        //clearLatlng={() => props.setFocusedLatlng(null)}
        clearMouse={() => props.setMouseCoords(null)}
        mouseCoords={props.mouseCoords}
        toggle={() => props.toggle('analysis')}
        latlng={props.focusedLatlng.latlng}
        setFocusedLatlng={latlng => props.setFocusedLatlng(latlng)}
      />
      <BuildingLabelTool
        active={props.activeTool === 'buildingLabel'}
        index={props.history[props.step].data.buildingLabel}
        latlng={props.focusedLatlng.latlng}
        submit={(action, payload) => props.editMarker(action, payload)}
        toggle={() => props.toggle('buildingLabel')}
      />
      <KineticPointTool
        active={props.activeTool === 'kineticPoint'}
        firstLetter={props.history[props.step].data.firstLetter}
        latlng={props.focusedLatlng.latlng}
        secondLetter={props.history[props.step].data.secondLetter}
        submit={(action, payload) => props.editMarker(action, payload)}
        toggle={() => props.toggle('kineticPoint')}
      />
      <LineTool
        active={props.activeTool === 'line'}
        latlng={props.focusedLatlng.latlng}
        mouseCoords={props.mouseCoords}
        submit={(action, payload) => props.editMarker(action, payload)}
        toggle={() => props.toggle('line')}
        tool={props.activeTool}
      />
      <CircleTool
        active={props.activeTool === 'circle'}
        latlng={props.focusedLatlng.latlng}
        mouseCoords={props.mouseCoords}
        submit={(action, payload) => props.editMarker(action, payload)}
        toggle={() => props.toggle('circle')}
      />
      <RectangleTool
        active={props.activeTool === 'rectangle'}
        latlng={props.focusedLatlng.latlng}
        mouseCoords={props.mouseCoords}
        submit={(action, payload) => props.editMarker(action, payload)}
        toggle={() => props.toggle('rectangle')}
      />
      <LineTool
        active={props.activeTool === 'polygon'}
        latlng={props.focusedLatlng.latlng}
        mouseCoords={props.mouseCoords}
        submit={(action, payload) => props.editMarker(action, payload)}
        toggle={() => props.toggle('polygon')}
        tool={props.activeTool}
      />
      <EllipseTool
        active={props.activeTool === 'ellipse'}
        latlng={props.focusedLatlng.latlng}
        submit={(action, payload) => props.editMarker(action, payload)}
        toggle={() => props.toggle('ellipse')}
      />
    </React.Fragment>
  )
}

export default Tools