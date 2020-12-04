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
  Menu,
  MenuItem,
} from '@material-ui/core'
import { 
  makeStyles,
} from '@material-ui/core/styles'
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
  PhotoSizeSelectActual as PhotoSizeSelectActualIcon,
  PhotoSizeSelectLarge as PhotoSizeSelectLargeIcon,
  Redo as RedoIcon,
  Save as SaveIcon,
  Style as StyleIcon,
  Undo as UndoIcon,
  ViewList as ViewListIcon,
} from '@material-ui/icons'

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
  maxMarkerSize,
  minMarkerSize,
} from '../../handlers/handleMarkerSizeChange'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}))

//----------------------------------------------------------------//
// Mobile Menu Component
//----------------------------------------------------------------//
const MobileMenu = (props) => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // Click Handlers
  //----------------------------------------------------------------//
  const handleClearMarkersClick = () => {
    props.setActiveDialog(null)
    props.handleClearMarkers()
  }

  const handleColorToggleClick = () => {
    props.setActiveDialog(null)
    handleColorChange(props.mapColor, props.setMapColor)
  }

  const handleMarkerSizeDecreaseClick = () => {
    //props.setActiveDialog(null)
    handleMarkerSizeDecrease(props.markerSize, props.setMarkerSize)
  }

  const handleMarkerSizeIncreaseClick = () => {
    //props.setActiveDialog(null)
    handleMarkerSizeIncrease(props.markerSize, props.setMarkerSize)
  }

  const handleRedoClick = () => {
    //props.setActiveDialog(null)
    props.handleRedo()
  }

  const handleUndoClick = () => {
    //props.setActiveDialog(null)
    props.handleUndo()
  }

  const handleToggleTooltipsClick = () => {
    props.setActiveDialog(null)
    props.toggleTooltips()
  }

  const handleBrightnessIncreaseClick = () => {
    //props.setActiveDialog(null)
    handleBrightnessIncrease(props.brightness, props.setBrightness)
  }

  const handleBrightnessDecreaseClick = () => {
    //props.setActiveDialog(null)
    handleBrightnessDecrease(props.brightness, props.setBrightness)
  }

  //----------------------------------------------------------------//
  // Component
  //----------------------------------------------------------------//
  return (
    <Menu
      anchorEl={props.anchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      onClose={() => props.setActiveDialog(null)}
      open={props.open}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={() => props.setActiveDialog('addMarker')}>
        <AddPhotoAlternateIcon className={classes.icon} />
        Add Marker
      </MenuItem>
      <MenuItem
        disabled={props.step === 0}
        onClick={props.step === 0 ? undefined : handleUndoClick}
      >
        <UndoIcon className={classes.icon} />
        Undo {props.step === 0 ? '' : props.history[props.step].action}
      </MenuItem>
      <MenuItem
        disabled={props.step === props.history.length - 1}
        onClick={props.step === props.history.length - 1 ? undefined : handleRedoClick}
      >
        <RedoIcon className={classes.icon} />
        Redo {props.step === props.history.length - 1 ? '' : props.history[props.step + 1].action}
      </MenuItem>
      <MenuItem onClick={handleClearMarkersClick}>
        <ClearIcon className={classes.icon} />
        Clear all markers
      </MenuItem>
      <MenuItem 
        disabled={props.markerSize === maxMarkerSize}
        onClick={handleMarkerSizeIncreaseClick}
      >
        <PhotoSizeSelectActualIcon className={classes.icon} />
        Increase marker size
      </MenuItem>
      <MenuItem
        disabled={props.markerSize === minMarkerSize}
        onClick={handleMarkerSizeDecreaseClick}
      >
        <PhotoSizeSelectLargeIcon className={classes.icon} />
        Decrease marker size
      </MenuItem>
      <MenuItem
        disabled={props.brightness === minBrightness}
        onClick={handleBrightnessDecreaseClick}
      >
        <BrightnessLowIcon className={classes.icon} />
        Decrease brightness
      </MenuItem>
      <MenuItem 
        disabled={props.brightness === maxBrightness}
        onClick={handleBrightnessIncreaseClick}
      >
        <BrightnessHighIcon className={classes.icon} />
        Increase brightness
      </MenuItem>
      <MenuItem onClick={handleColorToggleClick}>
        {props.mapColor ? 
          <InvertColorsIcon className={classes.icon} /> 
          : <InvertColorsOffIcon className={classes.icon} />
        }
        Toggle map color
      </MenuItem>
      {/*<MenuItem onClick={props.handleMinMenuClose} disabled>
        <DescriptionIcon className={classes.icon} />
        CONOP tools
  </MenuItem>*/}
      <MenuItem onClick={() => props.setActiveDialog('markerList')}>
        <ViewListIcon className={classes.icon} />
        View marker list
      </MenuItem>
      <MenuItem onClick={handleToggleTooltipsClick}>
        {props.tooltipsActive ? 
          <LabelOffIcon className={classes.icon} /> 
          : <LabelIcon className={classes.icon} />
        }
        Toggle marker labels
      </MenuItem>
      <MenuItem onClick={() => props.setActiveDialog('save')}>
        <SaveIcon className={classes.icon} />
        Save scenario
      </MenuItem>
      <MenuItem onClick={() => props.setActiveDialog('load')}>
        <FolderOpenIcon className={classes.icon} />
        Load scenario
      </MenuItem>
      <MenuItem onClick={() => props.setActiveDialog('style')}>
        <StyleIcon className={classes.icon} />
        Styles
      </MenuItem>
      {/*<MenuItem disabled onClick={props.handleMinMenuClose}>
        <GetAppIcon className={classes.icon} />
        Download products
  </MenuItem>*/}
    </Menu>
  )
}

export default MobileMenu