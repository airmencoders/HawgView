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
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

//----------------------------------------------------------------//
// Notifications Dialog Component
//----------------------------------------------------------------//
const NotificationsDialog = props => {

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        Hawg View Version 2 Beta
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          In order to continue expanding and improving Hawg Ops, I have been working to make Hawg View version 2. Please read the wiki if you have questions. 
        </DialogContentText>
        <DialogContentText>
          At this time, there are no accounts for Hawg View. If you want to utilize your account or saved scenarios, click on the Version 1 in the navigation or visit <a href='https://v1.hawg-ops.com'>https://v1.hawg-ops.com</a>
        </DialogContentText>
        <DialogContentText>
          Please let me know at hawg.ops@gmail.com any feedback or requests you may have for Hawg View.
        </DialogContentText>
        <DialogContentText>
          Porkins
        </DialogContentText>
      </DialogContent>
    </Dialog>
  )
}

export default NotificationsDialog