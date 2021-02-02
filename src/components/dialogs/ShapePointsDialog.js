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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import generateMapPopup from '../../functions/generateMapPopup'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  table: {
    minWidth: 650,
  },
}))

//----------------------------------------------------------------//
// Shape Points Dialog
//----------------------------------------------------------------//
const ShapePointsDialog = props => {

  const classes = useStyles()

  const handleClose = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: 'editShape',
      },
    })
  }

  if (
    props.state.focusedShape !== null &&
    (props.state.focusedShape.layer === 'line' ||
      props.state.focusedShape.layer === 'polygon' ||
      props.state.focusedShape.layer === 'rectangle')
    ) {
    let points
    if (props.state.focusedShape.layer === 'line' || props.state.focusedShape.layer === 'polygon') {
      points = props.state.focusedShape.positions
    } else if (props.state.focusedShape.layer === 'rectangle') {
      points = props.state.focusedShape.bounds
    }

    return (
      <Dialog
        open={props.state.dialog.name === 'shapePoints'}
        onClose={handleClose}
        maxWidth='lg'
      >
        <DialogTitle>
          {`${props.state.focusedShape.title} ${props.state.focusedShape.layer === 'rectangle' ? 'Bounds' : 'Points'}`}
        </DialogTitle>
        <DialogContent>
          <TableContainer
            component={Paper}
          >
            <Table
              className={classes.table}
              size='small'
            >
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>Lat/Lng</TableCell>
                  <TableCell>MGRS</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {points.map((point, index) => {
                  let data = generateMapPopup(point, props.state.history[props.state.step].anchor)

                  return (
                    <TableRow key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{data.dm}</TableCell>
                      <TableCell>{data.mgrs}</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button
            color='primary'
            onClick={handleClose}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
  } else {
    return null
  }
}

export default ShapePointsDialog