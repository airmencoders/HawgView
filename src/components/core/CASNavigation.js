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
  NavLink
} from 'react-router-dom'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  ClassificationBanner
 } from '../core'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import useStyles from '../../constants/useStyles'

//----------------------------------------------------------------//
// CAS Navigation Component
//----------------------------------------------------------------//
const CASNavigation = props => {
  const classes = useStyles()

  let packageJson = require('../../../package.json')

  return (
    <div className={classes.grow}>
      <AppBar
        className={classes.appBar}
        position='static'
      >
        <ClassificationBanner
          classification='unclassified'
        />
        <Toolbar>
          <NavLink
            className={classes.title}
            style={{ textDecoration: 'none' }}
            to='/'
          >
            <Tooltip title={packageJson.version}>
              <Typography
                style={{ color: 'white' }}
                variant='h6'
              >
                Hawg View
              </Typography>
            </Tooltip>
          </NavLink>
          {props.children}
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default CASNavigation