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
import RedoIcon from '@material-ui/icons/Redo'
import SaveIcon from '@material-ui/icons/Save'
import UndoIcon from '@material-ui/icons/Undo'
import ViewListIcon from '@material-ui/icons/ViewList'

//----------------------------------------------------------------//
// Minimized Menu Component
//----------------------------------------------------------------//
export default ({ handleMarkerDrawerToggle, handleColorToggle, handleMinMenuClose, minimizedMenuOpen, minMenuAnchorElement, redoDisabled, undoDisabled }) => {

  const handleAddMarkerClick = () => {
    handleMinMenuClose()
    handleMarkerDrawerToggle()
  }

  const handleColorToggleClick = () => {
    handleMinMenuClose()
    handleColorToggle()
  }

  return (
    <Menu
      anchorEl={minMenuAnchorElement}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      keepMounted
      onClose={handleMinMenuClose}
      open={minimizedMenuOpen}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={handleAddMarkerClick}>
        <IconButton color='inherit'>
          <AddPhotoAlternateIcon />
          <Typography variant='body1'>
            Add Marker
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={!undoDisabled ? handleMinMenuClose : undefined}>
        <IconButton
          color='inherit'
          disabled={undoDisabled}
        >
          <UndoIcon />
          <Typography variant='body1'>
            Undo
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={!redoDisabled ? handleMinMenuClose : undefined}>
        <IconButton
          color='inherit'
          disabled={redoDisabled}
        >
          <RedoIcon />
          <Typography variant='body1'>
            Redo
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMinMenuClose}>
        <IconButton color='inherit'>
          <ClearIcon />
          <Typography variant='body1'>
            Clear All Markers
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleColorToggleClick}>
        <IconButton color='inherit'>
          <ColorLensIcon />
          <Typography variant='body1'>
            Toggle Color
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMinMenuClose}>
        <IconButton color='inherit'>
          <ListAltIcon />
          <Typography variant='body1'>
            COF Tools
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMinMenuClose}>
        <IconButton color='inherit'>
          <ViewListIcon />
          <Typography variant='body1'>
            View Marker List
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMinMenuClose}>
        <IconButton color='inherit'>
          <MessageIcon />
          <Typography variant='body1'>
            Toggle Marker Labels
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMinMenuClose}>
        <IconButton color='inherit'>
          <SaveIcon />
          <Typography variant='body1'>
            Save Scenario
          </Typography>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleMinMenuClose}>
        <IconButton color='inherit'>
          <GetAppIcon />
          <Typography variant='body1'>
            Download Products
          </Typography>
        </IconButton>
      </MenuItem>
    </Menu>
  )
}