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
import { 
  NavLink,
} from 'react-router-dom'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles'
/*import AppBar from '@material-ui/core/AppBar'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'*/

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
//import AuthenticatedUserMenu from './AuthenticatedUserMenu'
import ClassificationBanner from './ClassificationBanner'
//import UnauthenticatedUserMenu from './UnauthenticatedUserMenu'

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
  title: {
    flexGrow: 1,
  },
}))

//----------------------------------------------------------------//
// Site Navigation Component
//----------------------------------------------------------------//
const SiteNavigation = ({ state }) => {
  const classes = useStyles()

  const [menuAnchorElement, setMenuAnchorElement] = React.useState(null)
  const menuOpen = Boolean(menuAnchorElement)

  const handleMenuOpen = event => {
    setMenuAnchorElement(event.currentTarget)
  }

  const handleMenuClose = () => {
    setMenuAnchorElement(null)
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
    </div>
  )
}

export default SiteNavigation