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
  Menu,
  MenuItem,
} from '@material-ui/core'

import {
  HelpOutline as HelpOutlineIcon,
  History as HistoryIcon,
  NotificationImportant as NotificationImportantIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import useStyles from '../../constants/useStyles'

//----------------------------------------------------------------//
// Site Menu Component
//----------------------------------------------------------------//
const SiteMenu = (props) => {
  const classes = useStyles()

  const [invisible, setInvisible] = React.useState(false)

  const handleNotificationClick = () => {
    setInvisible(true)
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: 'notifications',
      },
    })
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
      open={props.state.dialog.name === 'siteMenu'}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <MenuItem onClick={handleNotificationClick}>
        <Badge
          color='secondary'
          variant='dot'
          invisible={invisible}
        >
          <NotificationImportantIcon className={classes.mobileMenuIcon} />
          Notifications
        </Badge>
      </MenuItem>
      <MenuItem>
        <HistoryIcon className={classes.mobileMenuIcon} />
        <a
          href='https://v1.hawg-ops.com'
          style={{ color: 'inherit', textDecoration: 'none' }}
          target='_blank'
          rel='noopener noreferrer'
        >
          Version 1
        </a>
      </MenuItem>
      <MenuItem>
        <HelpOutlineIcon className={classes.mobileMenuIcon} />
        <a
          href='https://wiki.hawg-ops.com'
          style={{ color: 'inherit', textDecoration: 'none' }}
          target='_blank'
          rel='noopener noreferrer'
        >
          Wiki
        </a>
      </MenuItem>
    </Menu>
  )
}

export default SiteMenu