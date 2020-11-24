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
// Material-UI Components
//----------------------------------------------------------------//
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Material-UI Icons
//----------------------------------------------------------------//
import PrintIcon from '@material-ui/icons/Print'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import MarkerListAccordion from './MarkerListAccordion'

//----------------------------------------------------------------//
// Marker List Dialog Component
//----------------------------------------------------------------//
const MarkerListDialog = (props) => {

  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        <Box
          displayPrint='none'
        >
          <Grid
            container
            direction='row'
            justify='space-between'
          >
            <Grid
              item
            >
              <Typography variant='h5'>
                Markers
              </Typography>
            </Grid>
            <Grid
              item
            >
              <Grid
                container
                direction='row'
              >
                <IconButton onClick={() => window.print()}>
                  <PrintIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box
          displayPrint='none'
        >
          <Grid
            container
            spacing={2}
          >
            <Grid item xs>
              <Typography variant='h6'>Friendlies</Typography>
              {props.step.survivors.map(marker => (
                <MarkerListAccordion
                  key={`survivor-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
              {props.step.friendlyMarkers.map(marker => (
                <MarkerListAccordion
                  key={`friendly-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>IP/CPs</Typography>
              {props.step.initialPoints.map(marker => (
                <MarkerListAccordion
                  key={`initial-contact-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Bullseyes</Typography>
              {props.step.bullseyes.map(marker => (
                <MarkerListAccordion
                  key={`bullseye-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Hostiles</Typography>
              {props.step.hostileMarkers.map(marker => (
                <MarkerListAccordion
                  key={`hostile-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Threats</Typography>
              {props.step.threatMarkers.map(marker => (
                <MarkerListAccordion
                  key={`threat-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Buildings</Typography>
              {props.step.buildingLabels.map(marker => (
                <MarkerListAccordion
                  key={`building-label-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Kinetic Points</Typography>
              {props.step.kineticPoints.map(marker => (
                <MarkerListAccordion
                  key={`kinetic-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
        <Box
          display='none'
          displayPrint='block'
        >
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant='h6'>Friendlies</Typography>
              {props.step.survivors.map(marker => (
                <MarkerListAccordion
                  key={`survivor-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
              {props.step.friendlyMarkers.map(marker => (
                <MarkerListAccordion
                  key={`friendly-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>IP/CPs</Typography>
              {props.step.initialPoints.map(marker => (
                <MarkerListAccordion
                  key={`initial-contact-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Bullseyes</Typography>
              {props.step.bullseyes.map(marker => (
                <MarkerListAccordion
                  key={`bullseye-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Hostiles</Typography>
              {props.step.hostileMarkers.map(marker => (
                <MarkerListAccordion
                  key={`hostile-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Threats</Typography>
              {props.step.threatMarkers.map(marker => (
                <MarkerListAccordion
                  key={`threat-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Buildings</Typography>
              {props.step.buildingLabels.map(marker => (
                <MarkerListAccordion
                  key={`building-label-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Kinetic Points</Typography>
              {props.step.kineticPoints.map(marker => (
                <MarkerListAccordion
                  key={`kinetic-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default MarkerListDialog