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
import { NavLink } from 'react-router-dom'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import AppBar from '@material-ui/core/AppBar'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
import MoreVertIcon from '@material-ui/icons/MoreVert'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import AuthenticatedUserMenu from './AuthenticatedUserMenu'
import CASTools from './CASTools'
import ClassificationBanner from './ClassificationBanner'
import MGRSInput from './MGRSInput'
import MinimizedMenu from './MinimizedMenu'
import UnauthenticatedUserMenu from './UnauthenticatedUserMenu'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  grow: {
    flexGrow: 1,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
}))

//----------------------------------------------------------------//
// CAS Navigation Component
//----------------------------------------------------------------//
export default ({ handleMarkerDrawerToggle, handleMarkerSizeDecrease, handleMarkerSizeIncrease, handleClearMarkers, handleColorToggle, handleRedo, handleUndo, redoDisabled, state, undoDisabled }) => {
  const classes = useStyles()

  const [menuAnchorElement, setMenuAnchorElement] = React.useState(null)
  const [minMenuAnchorElement, setMinMenuAnchorElement] = React.useState(null)

  const menuOpen = Boolean(menuAnchorElement)
  const minimizedMenuOpen = Boolean(minMenuAnchorElement)

  const handleMenuOpen = event => {
    setMenuAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorElement(null)
  }

  const handleMinMenuOpen = event => {
    setMinMenuAnchorElement(event.currentTarget)
  }

  const handleMinMenuClose = () => {
    setMinMenuAnchorElement(null)
  }

  return (
    <div className={classes.grow}>
      <AppBar
        className={classes.appBar}
        position='static'
      >
        <ClassificationBanner
          classification={state.classification}
        />
        <Toolbar>
          <NavLink
            className={classes.title}
            style={{ textDecoration: 'none' }}
            to='/'
          >
            <Typography
              style={{ color: 'white' }}
              variant='h6'
            >
              Hawg View
            </Typography>
          </NavLink>
          <MGRSInput />
          <div className={classes.sectionDesktop}>
            <CASTools
              handleMarkerDrawerToggle={handleMarkerDrawerToggle}
              handleMarkerSizeDecrease={handleMarkerSizeDecrease}
              handleMarkerSizeIncrease={handleMarkerSizeIncrease}
              handleClearMarkers={handleClearMarkers}
              handleColorToggle={handleColorToggle}
              handleRedo={handleRedo}
              handleUndo={handleUndo}
              redoDisabled={redoDisabled}
              undoDisabled={undoDisabled}
            />
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              color='inherit'
              onClick={handleMinMenuOpen}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <div className={classes.grow} />
          {state.isAuthenticated && (
            <AuthenticatedUserMenu
              handleMenuClose={handleMenuClose}
              handleMenuOpen={handleMenuOpen}
              menuAnchorElement={menuAnchorElement}
              menuOpen={menuOpen}
            />
          )}
          {!state.isAuthenticated && (
            <UnauthenticatedUserMenu />
          )}
        </Toolbar>
      </AppBar>
      {
        <MinimizedMenu
          handleMarkerDrawerToggle={handleMarkerDrawerToggle}
          handleMarkerSizeDecrease={handleMarkerSizeDecrease}
          handleMarkerSizeIncrease={handleMarkerSizeIncrease}
          handleClearMarkers={handleClearMarkers}
          handleColorToggle={handleColorToggle}
          handleMinMenuClose={handleMinMenuClose}
          handleRedo={handleRedo}
          handleUndo={handleUndo}
          minimizedMenuOpen={minimizedMenuOpen}
          minMenuAnchorElement={minMenuAnchorElement}
          redoDisabled={redoDisabled}
          undoDisabled={undoDisabled}
        />
      }
    </div>
  )
}