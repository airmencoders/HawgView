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
import '@fontsource/roboto'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  IconButton,
  Tooltip,
} from '@material-ui/core'

import {
  AddPhotoAlternate as AddPhotoAlternateIcon,
  BrightnessHigh as BrightnessHighIcon,
  BrightnessLow as BrightnessLowIcon,
  Clear as ClearIcon,
  FolderOpen as FolderOpenIcon,
  GetApp as GetAppIcon,
  InvertColors as InvertColorsIcon,
  InvertColorsOff as InvertColorsOffIcon,
  Label as LabelIcon,
  LabelOff as LabelOffIcon,
  PhotoSizeSelectActual as PhotoSizeSelectActualIcon,
  PhotoSizeSelectLarge as PhotoSizeSelectLargeIcon,
  Redo as RedoIcon,
  Save as SaveIcon,
  Style as StyleIcon,
  Undo as UndoIcon,
  ViewList as ViewListIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import generateKML from '../../functions/generateKML'

//----------------------------------------------------------------//
// Hawg View Handlers
//----------------------------------------------------------------//
import handleColorChange from '../../handlers/handleColorChange'

import {
  handleBrightnessDecrease,
  handleBrightnessIncrease,
  maxBrightness,
  minBrightness,
} from '../../handlers/handleBrightnessChange'

import {
  handleMarkerSizeDecrease,
  handleMarkerSizeIncrease,
  minMarkerSize,
  maxMarkerSize,
} from '../../handlers/handleMarkerSizeChange'

import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// CAS Tools Component
//----------------------------------------------------------------//
const CASTools = props => {

  return (
    <React.Fragment>
      <Tooltip title='Add marker'>
        <IconButton
          color='inherit'
          onClick={() => props.setState({
              ...props.state,
              dialog: {
                anchor: null,
                name: 'addMarker',
              },
            })
          }
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={`Undo ${props.state.step === 0 ? '' : props.state.history[props.state.step].action}`}>
        <span>
          <IconButton
            color='inherit'
            disabled={props.state.step === 0}
            onClick={() => props.setState({
                ...props.state,
                step: props.state.step - 1,
              })
            }
          >
            <UndoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={`Redo ${props.state.step === props.state.history.length - 1 ? '' : props.state.history[props.state.step + 1].action}`}>
        <span>
          <IconButton
            color='inherit'
            disabled={props.state.step === props.state.history.length - 1}
            onClick={() => props.setState({
                ...props.state,
                step: props.state.step + 1,
              })
            }
          >
            <RedoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Clear all markers'>
        <IconButton
          color='inherit'
          onClick={() => handleMarkerEdit('clear', {}, props.state, props.setState)}
        >
          <ClearIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Increase marker size'>
        <span>
          <IconButton
            color='inherit'
            disabled={props.state.markerSize === maxMarkerSize}
            onClick={() => handleMarkerSizeIncrease(props.state, props.setState)}
          >
            <PhotoSizeSelectActualIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Decrease marker size'>
        <span>
          <IconButton
            color='inherit'
            disabled={props.state.markerSize === minMarkerSize}
            onClick={() => handleMarkerSizeDecrease(props.state, props.setState)}
          >
            <PhotoSizeSelectLargeIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Decrease brightness'>
        <span>
          <IconButton
            color='inherit'
            disabled={props.state.map.brightness === minBrightness}
            onClick={() => handleBrightnessDecrease(props.state, props.setState)}
          >
            <BrightnessLowIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Increase brightness'>
        <span>
          <IconButton
            color='inherit'
            disabled={props.state.map.brightness === maxBrightness}
            onClick={() => handleBrightnessIncrease(props.state, props.setState)}
          >
            <BrightnessHighIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Toggle map color'>
        <IconButton
          color='inherit'
          onClick={() => handleColorChange(props.state, props.setState)}
        >
          {props.state.map.color ? <InvertColorsIcon /> : <InvertColorsOffIcon />}
        </IconButton>
      </Tooltip>
      {/*<Tooltip title='CONOP tools'>
        <span>
          <IconButton color='inherit' disabled>
            <DescriptionIcon />
          </IconButton>
        </span>
  </Tooltip>*/}
      <Tooltip title='View marker list'>
        <IconButton
          color='inherit'
          onClick={() => props.setState({
              ...props.state,
              dialog: {
                anchor: null,
                name: 'markerList',
              },
            })
          }
        >
          <ViewListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Toggle marker labels'>
        <span>
          <IconButton
            color='inherit'
            onClick={() => props.setState({
                ...props.state,
                tooltips: !props.state.tooltips,
              })
            }
          >
            {props.state.tooltips ? <LabelOffIcon /> : <LabelIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Save scenario'>
        <IconButton
          color='inherit'
          onClick={() => props.setState({
              ...props.state,
              dialog: {
                anchor: null,
                name: 'save',
              },
            })
          }
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Load scenario'>
        <IconButton
          color='inherit'
          onClick={() => props.setState({
            ...props.state,
            dialog: {
              anchor: null,
              name: 'load',
            },
          })}
        >
          <FolderOpenIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Styles'>
        <IconButton
          color='inherit'
          onClick={() => props.setState({
            ...props.state,
            dialog: {
              anchor: null,
              name: 'style',
            },
          })}
        >
          <StyleIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Download products'>
        <span>
          <IconButton
            color='inherit'
            onClick={() => generateKML(props.state.history[props.state.step])}
          >
            <GetAppIcon />
          </IconButton>
        </span>
      </Tooltip>
    </React.Fragment>
  )
}

export default CASTools