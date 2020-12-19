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
  maxMarkerSize,
  minMarkerSize,
} from '../../handlers/handleMarkerSizeChange'

import handleMarkerEdit from '../../handlers/handleMarkerEdit'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  mobileMenuIcon: {
    marginRight: theme.spacing(1),
  },
}))

//----------------------------------------------------------------//
// Mobile Menu Component
//----------------------------------------------------------------//
const MobileMenu = props => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // Click Handlers
  //----------------------------------------------------------------//
  const handleToggleTooltipsClick = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
      tooltips: !props.state.tooltips,
    })
  }

  const handleDownloadClick = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
    generateKML(props.state.history[props.state.step])
  }

  //----------------------------------------------------------------//
  // Component
  //----------------------------------------------------------------//
  return (
    <Menu
      anchorEl={props.state.dialog.anchor}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      onClose={() => props.setState({
        ...props.state,
        dialog: {
          anchor: null,
          name: null,
        },
      })}
      open={props.state.dialog.name === 'mobileMenu'}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem 
        onClick={() => props.setState({
          ...props.state,
          dialog: {
            anchor: null,
            name: 'addMarker',
          },
        })}
      >
        <AddPhotoAlternateIcon className={classes.mobileMenuIcon} />
        Add Marker
      </MenuItem>
      <MenuItem
        disabled={props.state.step === 0}
        onClick={props.state.step === 0 ? undefined : () => props.setState({
          ...props.state,
          step: props.state.step - 1,
        })}
      >
        <UndoIcon className={classes.mobileMenuIcon} />
        Undo {props.state.step === 0 ? '' : props.state.history[props.state.step].action}
      </MenuItem>
      <MenuItem
        disabled={props.state.step === props.state.history.length - 1}
        onClick={props.state.step === props.state.history.length - 1 ? undefined : () => props.setState({
          ...props.state,
          step: props.state.step + 1,
        })}
      >
        <RedoIcon className={classes.mobileMenuIcon} />
        Redo {props.state.step === props.state.history.length - 1 ? '' : props.state.history[props.state.step + 1].action}
      </MenuItem>
      <MenuItem onClick={() => handleMarkerEdit('clear', {}, props.state, props.setState)}>
        <ClearIcon className={classes.mobileMenuIcon} />
        Clear all markers
      </MenuItem>
      <MenuItem
        disabled={props.state.markerSize === maxMarkerSize}
        onClick={() => handleMarkerSizeIncrease(props.state, props.setState)}
      >
        <PhotoSizeSelectActualIcon className={classes.mobileMenuIcon} />
        Increase marker size
      </MenuItem>
      <MenuItem
        disabled={props.state.markerSize === minMarkerSize}
        onClick={() => handleMarkerSizeDecrease(props.state, props.setState)}
      >
        <PhotoSizeSelectLargeIcon className={classes.mobileMenuIcon} />
        Decrease marker size
      </MenuItem>
      <MenuItem
        disabled={props.state.brightness === minBrightness}
        onClick={() => handleBrightnessDecrease(props.state, props.setState)}
      >
        <BrightnessLowIcon className={classes.mobileMenuIcon} />
        Decrease brightness
      </MenuItem>
      <MenuItem
        disabled={props.state.brightness === maxBrightness}
        onClick={() => handleBrightnessIncrease(props.state, props.setState)}
      >
        <BrightnessHighIcon className={classes.mobileMenuIcon} />
        Increase brightness
      </MenuItem>
      <MenuItem onClick={() => handleColorChange(props.state, props.setState)}>
        {props.state.map.color ?
          <InvertColorsIcon className={classes.mobileMenuIcon} />
          : <InvertColorsOffIcon className={classes.mobileMenuIcon} />
        }
        Toggle map color
      </MenuItem>
      {/*<MenuItem onClick={props.handleMinMenuClose} disabled>
        <DescriptionIcon className={classes.mobileMenuIcon} />
        CONOP tools
  </MenuItem>*/}
      <MenuItem 
        onClick={() => props.setState({
          ...props.state,
          dialog: {
            anchor: null,
            name: 'markerList',
          },
        })}
      >
        <ViewListIcon className={classes.mobileMenuIcon} />
        View marker list
      </MenuItem>
      <MenuItem onClick={handleToggleTooltipsClick}>
        {props.state.tooltips ?
          <LabelOffIcon className={classes.mobileMenuIcon} />
          : <LabelIcon className={classes.mobileMenuIcon} />
        }
        Toggle marker labels
      </MenuItem>
      <MenuItem 
        onClick={() => props.setState({
          ...props.state,
          dialog: {
            anchor: null,
            name: 'save',
          },
        })}
      >
        <SaveIcon className={classes.mobileMenuIcon} />
        Save scenario
      </MenuItem>
      <MenuItem 
        onClick={() => props.setState({
          ...props.state,
          dialog: {
            anchor: null,
            name: 'load',
          },
        })}
      >
        <FolderOpenIcon className={classes.mobileMenuIcon} />
        Load scenario
      </MenuItem>
      <MenuItem 
        onClick={() => props.setState({
          ...props.state,
          dialog: {
            anchor: null,
            name: 'style',
          },
        })}
      >
        <StyleIcon className={classes.mobileMenuIcon} />
        Styles
      </MenuItem>
      <MenuItem onClick={handleDownloadClick}>
        <GetAppIcon className={classes.mobileMenuIcon} />
        Download products
      </MenuItem>
    </Menu>
  )
}

export default MobileMenu