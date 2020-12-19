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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
  },
}))

//----------------------------------------------------------------//
// Update Scenario Dialog Component
//----------------------------------------------------------------//
const UpdateScenarioDialog = props => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // State
  //----------------------------------------------------------------//
  const [scenario, setScenario] = React.useState('')

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
      className={classes.dialog}
      fullWidth={true}
      open={props.state.dialog.name === 'update'}
      onClose={handleClose}
      maxWidth='xl'
    >
      <DialogTitle>Load Scenario</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          fullWidth
          label='v1 Scenario Data'
          multiline
          onChange={event => setScenario(event.target.value)}
          value={scenario}
          variant='outlined'
        />
      </DialogContent>
      <DialogActions>
      <Button color='primary' onClick={() => props.submit(scenario)}>Load Scenario</Button>
        <Button onClick={props.toggle}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default UpdateScenarioDialog