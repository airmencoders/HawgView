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
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

//----------------------------------------------------------------//
// Authenticated User Menu Component
//----------------------------------------------------------------//
export default ({ handleMenuClose, handleMenuOpen, menuAnchorElement, menuOpen }) => {

  return (
    <div>
      <Button
        aria-controls='account-menu'
        aria-haspopup='true'
        aria-label='user account'
        color='inherit'
        onClick={handleMenuOpen}
      >
        <Avatar>CM</Avatar>
      </Button>
      <Menu
        anchorEl={menuAnchorElement}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        id='account-menu'
        keepMounted
        onClose={handleMenuClose}
        open={menuOpen}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuItem
          onClick={handleMenuClose}
        >
          <NavLink
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={`/my-scenarios`}
          >
            My Scenarios
          </NavLink>
        </MenuItem>
        <MenuItem
          onClick={handleMenuClose}
        >
          <NavLink
            style={{ textDecoration: 'none', color: 'inherit' }}
            to={`/u/id`}
          >
            Account Settings
        </NavLink>
        </MenuItem>
        <MenuItem>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  )
}