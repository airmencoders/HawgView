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
      maxWidth='lg'
    >
      <DialogTitle>
        Hawg View Version 2 Beta
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          In order to continue expanding and improving Hawg Ops, I have been working to make Hawg View version 2. Please read the <a href='https://wiki.hawg-ops.com' target='_blank' rel='noopener noreferrer'>wiki</a> if you have questions. 
        </DialogContentText>
        <DialogContentText>
          Hawg View v2 will eventually replace <a href='https://v1.hawg-ops.com' target='_blank' rel='noopener noreferrer'>Hawg Ops v1</a>. What this means for current users is that accounts and saved scenarios will be removed. I appreciate the feedback and use over the past couple years. Hopefully this move will provide a better user experience for my users. If you have any questions regarding the transition, please contact me. Additionally, there is now a version 2 translator that will download your version 1 scenario as a file recognized by version 2.
        </DialogContentText>
        <DialogContentText>
          Transition Timeline:
          <br/>
          01 December 2020 - Users will not be able to save version 1 scenarios
          <br/>
          14 December 2020 - Users will only be able to download scenarios as version 2
          <br/>
          01 January 2021 - Version 1 will be removed
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