import React from 'react'

import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import PrintIcon from '@material-ui/icons/Print'

import MarkerListAccordion from './MarkerListAccordion'

export default (props) => {

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xl'
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
            displayPrint='none'
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
        <Grid
          container
          spacing={2}
        >
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Friendlies</Typography>
            {props.survivors.map((marker, index) => (
              <MarkerListAccordion
                key={`survivor-marker-${index}`}
                marker={marker}
              />
            ))}
            {props.friendlies.map((marker, index) => (
              <MarkerListAccordion
                key={`friendly-marker-${index}`}
                marker={marker}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Hostiles</Typography>
            {props.hostiles.map((marker, index) => (
              <MarkerListAccordion
                key={`hostile-marker-${index}`}
                marker={marker}
              />
            ))}
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography variant='h6'>Threats</Typography>
            {props.threats.map((marker, index) => (
              <MarkerListAccordion
                key={`threat-marker-${index}`}
                marker={marker}
              />
            ))}
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  )
}