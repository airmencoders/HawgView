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
  input: {
    display: 'none',
  }
}))

//----------------------------------------------------------------//
// Load Scenario Dialog Component
//----------------------------------------------------------------//
const LoadScenarioDialog = (props) => {
  const classes = useStyles()

  const handleChange = files => {
    const file = files.item(0)
    const reader = new FileReader()

    reader.onload = () => {
      handleClose()
      props.submit(reader.result)
    }

    reader.readAsText(file)
  }

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
      open={props.state.dialog.name === 'load'}
      onClose={handleClose}
      maxWidth='xs'
    >
      <DialogTitle>Load Scenario</DialogTitle>
      <DialogContent>
        <input
          accept='text/plain'
          className={classes.input}
          id='file-button'
          onChange={e => handleChange(e.target.files)}
          type='file'
        />
        <label
          htmlFor='file-button'
        >
          <Button
            color='primary'
            component='span'
            variant='contained'
          >
            Select File
          </Button>
        </label>
      </DialogContent>
      <DialogActions>
        <Button 
          onClick={() => props.setState({
            ...props.state,
            dialog: {
              anchor: null,
              name: null,
            },
          })}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default LoadScenarioDialog