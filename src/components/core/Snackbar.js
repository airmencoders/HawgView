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
import '@fontsource/roboto'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  IconButton,
  Snackbar as MUISnackbar
} from '@material-ui/core'

import {
  Close as CloseIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  Alert
} from '../core'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
const Snackbar = props => {

  //----------------------------------------------------------------//
  // React Effects
  //----------------------------------------------------------------//
  /**
   * Triggers any time the snackbar state changes
   */
  React.useEffect(() => {
    
    // If the pack has a queued message (pack) but there is no active message, pull the most recent message into focus
    if (props.state.snackbar.pack.length && !props.state.snackbar.message) {
      props.setState({
        ...props.state,
        snackbar: {
          ...props.state.snackbar,
          message: { ...props.state.snackbar.pack[0] },
          open: true,
          pack: props.state.snackbar.pack.slice(1),
        }
      })
    }
    // If there is something in the queue but there is an active message, close the active message, which will then trigger the if clause
    else if (props.state.snackbar.pack.length && props.state.snackbar.message && props.state.snackbar.open) {
      props.setState({
        ...props.state,
        snackbar: {
          ...props.state.snackbar,
          open: false,
        },
      })
    }
  }, [props.state.snackbar])

  /**
   * 
   * @param {*} event 
   * @param {*} reason 
   */
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    props.setState({
      ...props.state,
      snackbar: {
        ...props.state.snackbar,
        open: false,
      }
    })
  }

  /**
   * 
   */
  const handleSnackbarExited = () => {
    props.setState({
      ...props.state,
      snackbar: {
        ...props.state.snackbar,
        message: undefined,
      },
    })
  }

  return (
    <MUISnackbar
      action={
        <IconButton
          aria-label='close'
          color='inherit'
          onClick={handleSnackbarClose}
          size='small'
        >
          <CloseIcon fontSize='small' />
        </IconButton>
      }
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      autoHideDuration={5000}
      key={props.state.snackbar.message ? props.state.snackbar.message.key : undefined}
      onClose={handleSnackbarClose}
      onExited={handleSnackbarExited}
      open={props.state.snackbar.open}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity={props.state.snackbar.message ? props.state.snackbar.message.severity : undefined}
      >
        {props.state.snackbar.message ? props.state.snackbar.message.message : undefined}
      </Alert>
    </MUISnackbar>
  )
}

export default Snackbar