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
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

//----------------------------------------------------------------//
// Notifications Dialog Component
//----------------------------------------------------------------//
const NotificationsDialog = props => {

  const handleClose = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
  }

  return (
    <Dialog
      maxWidth='lg'
      open={props.state.dialog.name === 'notifications'}
      onClose={handleClose}
    >
      <DialogTitle>
        What's New With Hawg View
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Users can now designate a Bullseye as a SARDOT. This will also show the distance and direction "Walking to the DOT" in the Mouse Coordinates Container, Map Popups, and Marker Popups. The Marker list will also display whether or not the bullseye is designated as the Anchor or SARDOT.
        </DialogContentText>
        <DialogContentText>
          Users can now edit, delete, and center the map on any marker using the Marker List.
        </DialogContentText>
        <DialogContentText>
          Be sure to check the wiki to keep up to date on new features and tips on Hawg View, to include keyboard shortcuts and alternate ways to create shapes.
        </DialogContentText>
        <DialogContentText>
          Please let me know at <a href='mailto:hawg.ops@gmail.com'>hawg.ops@gmail.com</a> any feedback or requests you may have for Hawg View.
        </DialogContentText>
        <DialogContentText>
          Porkins
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default NotificationsDialog