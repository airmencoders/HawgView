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
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate'
import ClearIcon from '@material-ui/icons/Clear'
import ColorLensIcon from '@material-ui/icons/ColorLens'
import GetAppIcon from '@material-ui/icons/GetApp'
import ListAltIcon from '@material-ui/icons/ListAlt'
import MessageIcon from '@material-ui/icons/Message'
import PhotoSizeSelectActualIcon from '@material-ui/icons/PhotoSizeSelectActual'
import PhotoSizeSelectLargeIcon from '@material-ui/icons/PhotoSizeSelectLarge'
import RedoIcon from '@material-ui/icons/Redo'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import SaveIcon from '@material-ui/icons/Save'
import UndoIcon from '@material-ui/icons/Undo'
import ViewListIcon from '@material-ui/icons/ViewList'

//----------------------------------------------------------------//
// Minimized Menu Component
//----------------------------------------------------------------//
export default (props) => {

  const handleAddMarkerClick = () => {
    props.handleMinMenuClose()
    props.handleMarkerDrawerToggle()
  }

  const handleClearMarkersClick = () => {
    props.handleMinMenuClose()
    props.handleClearMarkers()
  }

  const handleColorToggleClick = () => {
    props.handleMinMenuClose()
    props.handleColorToggle()
  }

  const handleMarkerSizeDecreaseClick = () => {
    props.handleMinMenuClose()
    props.handleMarkerSizeDecrease()
  }

  const handleMarkerSizeIncreaseClick = () => {
    props.handleMinMenuClose()
    props.handleMarkerSizeIncrease()
  }

  const handleRedoClick = () => {
    props.handleMinMenuClose()
    props.handleRedo()
  }

  const handleUndoClick = () => {
    props.handleMinMenuClose()
    props.handleUndo()
  }

  const handleSaveScenarioClick = () => {
    props.handleMinMenuClose()
    props.toggleSaveScenarioDialog()
  }

  const handleLoadScenarioClick = () => {
    props.handleMinMenuClose()
    props.toggleLoadScenarioDialog()
  }

  const handleToggleTooltipsClick = () => {
    props.handleMinMenuClose()
    props.toggleTooltips()
  }

  return (
    <Menu
      anchorEl={props.minMenuAnchorElement}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      onClose={props.handleMinMenuClose}
      open={props.minimizedMenuOpen}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={handleAddMarkerClick}>
        <IconButton color='inherit'>
          <AddPhotoAlternateIcon />
          <Typography variant='body1'>
            Add marker
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={!props.undoDisabled ? handleUndoClick : undefined}>
        <IconButton
          color='inherit'
          disabled={props.undoDisabled}
        >
          <UndoIcon />
          <Typography variant='body1'>
            Undo {props.undoAction}
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={!props.redoDisabled ? handleRedoClick : undefined}>
        <IconButton
          color='inherit'
          disabled={props.redoDisabled}
        >
          <RedoIcon />
          <Typography variant='body1'>
            Redo {props.redoACtion}
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleClearMarkersClick}>
        <IconButton color='inherit'>
          <ClearIcon />
          <Typography variant='body1'>
            Clear all markers
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMarkerSizeIncreaseClick}>
        <IconButton color='inherit'>
          <PhotoSizeSelectActualIcon />
          <Typography variant='body1'>
            Increase marker size
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMarkerSizeDecreaseClick}>
        <IconButton color='inherit'>
          <PhotoSizeSelectLargeIcon />
          <Typography variant='body1'>
            Decrease marker size
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleColorToggleClick}>
        <IconButton color='inherit'>
          <ColorLensIcon />
          <Typography variant='body1'>
            Toggle color
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={props.handleMinMenuClose}>
        <IconButton color='inherit' disabled>
          <ListAltIcon />
          <Typography variant='body1'>
            CONOP tools
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={props.handleMinMenuClose}>
        <IconButton color='inherit' disabled>
          <ViewListIcon />
          <Typography variant='body1'>
            View marker list
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleToggleTooltipsClick}>
        <IconButton color='inherit'>
          <MessageIcon />
          <Typography variant='body1'>
            Toggle marker labels
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleSaveScenarioClick}>
        <IconButton color='inherit'>
          <SaveIcon />
          <Typography variant='body1'>
            Save scenario
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleLoadScenarioClick}>
        <IconButton color='inherit'>
          <SaveAltIcon />
          <Typography variant='body1'>
            Load scenario
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={props.handleMinMenuClose}>
        <IconButton color='inherit' disabled>
          <GetAppIcon />
          <Typography variant='body1'>
            Download products
          </Typography>
        </IconButton>
      </MenuItem>
    </Menu>
  )
}