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
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import ClassificationBanner from './ClassificationBanner'

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
// IE Navigation Component
//----------------------------------------------------------------//
const IENavigation = ({ state }) => {
  const classes = useStyles()

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
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default IENavigation