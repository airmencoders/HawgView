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
// Material-UI Components
//----------------------------------------------------------------//
import {
  Badge,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core'
import {
  AddPhotoAlternate as AddPhotoAlternateIcon,
  BrightnessHigh as BrightnessHighIcon,
  BrightnessLow as BrightnessLowIcon,
  Clear as ClearIcon,
  FolderOpen as FolderOpenIcon,
  InvertColors as InvertColorsIcon,
  InvertColorsOff as InvertColorsOffIcon,
  Label as LabelIcon,
  LabelOff as LabelOffIcon,
  NotificationImportant as NotificationImportantIcon,
  PhotoSizeSelectActual as PhotoSizeSelectActualIcon,
  PhotoSizeSelectLarge as PhotoSizeSelectLargeIcon,
  Redo as RedoIcon,
  Save as SaveIcon,
  Style as StyleIcon,
  Undo as UndoIcon,
  ViewList as ViewListIcon,
} from '@material-ui/icons'
/*import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'*/

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
/*import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import BrightnessHighIcon from '@material-ui/icons/BrightnessHigh'
import BrightnessLowIcon from '@material-ui/icons/BrightnessLow'
import ClearIcon from '@material-ui/icons/Clear'
//import DescriptionIcon from '@material-ui/icons/Description'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
//import GetAppIcon from '@material-ui/icons/GetApp'
import InvertColorsIcon from '@material-ui/icons/InvertColors'
import InvertColorsOffIcon from '@material-ui/icons/InvertColorsOff'
import LabelIcon from '@material-ui/icons/Label'
import LabelOffIcon from '@material-ui/icons/LabelOff'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge'
import RedoIcon from '@material-ui/icons/Redo'
import SaveIcon from '@material-ui/icons/Save'
import StyleIcon from '@material-ui/icons/Style'
import UndoIcon from '@material-ui/icons/Undo'
import ViewListIcon from '@material-ui/icons/ViewList'*/

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

//----------------------------------------------------------------//
// CAS Tools Component
//----------------------------------------------------------------//
const CASTools = props => {

  return (
    <React.Fragment>
      <Tooltip title='Add marker'>
        <IconButton
          color='inherit'
          onClick={() => props.setActiveDialog('addMarker')}
        >
          <AddPhotoAlternateIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title={`Undo ${props.step === 0 ? '' : props.history[props.step].action}`}>
        <span>
          <IconButton
            color='inherit'
            disabled={props.step === 0}
            onClick={props.handleUndo}
          >
            <UndoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title={`Redo ${props.step === props.history.length - 1 ? '' : props.history[props.step + 1].action}`}>
        <span>
          <IconButton
            color='inherit'
            disabled={props.step === props.history.length - 1}
            onClick={props.handleRedo}
          >
            <RedoIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Clear all markers'>
        <IconButton
          color='inherit'
          onClick={props.handleClearMarkers}
        >
          <ClearIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Increase marker size'>
        <span>
          <IconButton
            color='inherit'
            disabled={props.markerSize === maxMarkerSize}
            onClick={() => handleMarkerSizeIncrease(props.markerSize, props.setMarkerSize)}
          >
            <PhotoSizeSelectActualIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Decrease marker size'>
        <span>
          <IconButton
            color='inherit'
            disabled={props.markerSize === minMarkerSize}
            onClick={() => handleMarkerSizeDecrease(props.markerSize, props.setMarkerSize)}
          >
            <PhotoSizeSelectLargeIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Decrease brightness'>
        <span>
          <IconButton
            color='inherit'
            disabled={props.brightness === minBrightness}
            onClick={() => handleBrightnessDecrease(props.brightness, props.setBrightness)}
          >
            <BrightnessLowIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Increase brightness'>
        <span>
          <IconButton
            color='inherit'
            disabled={props.brightness === maxBrightness}
            onClick={() => handleBrightnessIncrease(props.brightness, props.setBrightness)}
          >
            <BrightnessHighIcon />
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Toggle map color'>
        <IconButton
          color='inherit'
          onClick={() => handleColorChange(props.mapColor, props.setMapColor)}
        >
          {props.mapColor ? <InvertColorsIcon /> : <InvertColorsOffIcon />}
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
          onClick={() => props.setActiveDialog('markerList')}
        >
          <ViewListIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Toggle marker labels'>
        <span>
          <IconButton
            color='inherit'
            onClick={props.toggleTooltips}
          >
            {props.tooltipsActive ? <LabelOffIcon /> : <LabelIcon />}
          </IconButton>
        </span>
      </Tooltip>
      <Tooltip title='Save scenario'>
        <IconButton
          color='inherit'
          onClick={() => props.setActiveDialog('save')}
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Load scenario'>
        <IconButton
          color='inherit'
          onClick={() => props.setActiveDialog('load')}
        >
          <FolderOpenIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='Styles'>
        <IconButton
          color='inherit'
          onClick={() => props.setActiveDialog('style')}
        >
          <StyleIcon />
        </IconButton>
      </Tooltip>
      {/*<Tooltip title='Download products'>
        <span>
          <IconButton color='inherit' disabled>
            <GetAppIcon />
          </IconButton>
        </span>
</Tooltip>*/}
    </React.Fragment>
  )
}

export default CASTools