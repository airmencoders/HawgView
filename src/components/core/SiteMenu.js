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
  makeStyles,
} from '@material-ui/core/styles'
import {
  HelpOutline as HelpOutlineIcon,
  History as HistoryIcon,
  NotificationImportant as NotificationImportantIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(1),
  },
}))

//----------------------------------------------------------------//
// Site Menu Component
//----------------------------------------------------------------//
const SiteMenu = (props) => {
  const classes = useStyles()

  const [invisible, setInvisible] = React.useState(false)

  const handleNotificationClick = () => {
    setInvisible(true)
    props.setActiveDialog('notifications')
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
      <MenuItem onClick={handleNotificationClick}>
        <Badge
          color='secondary'
          variant='dot'
          invisible={invisible}
        >
          <NotificationImportantIcon className={classes.icon} />
          Notifications
        </Badge>
      </MenuItem>
      <MenuItem>
        <HistoryIcon className={classes.icon} />
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
        <HelpOutlineIcon className={classes.icon} />
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