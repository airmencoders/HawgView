import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Box from '@material-ui/core/Box'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'

import AttachFileIcon from '@material-ui/icons/AttachFile'
import PrintIcon from '@material-ui/icons/Print'

import { makeStyles } from '@material-ui/core/styles'

import MarkerListAccordion from './MarkerListAccordion'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
  },
}))

export default (props) => {

  const classes = useStyles()

  const [expanded, setExpanded] = React.useState(false)

  const handleChange = panel=> (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth='xl'
      open={props.open}
      onClose={props.onClose}
    >
      <DialogTitle>
        <Grid
          container
          direction='row'
          justify='space-between'
        >
          <Typography variant='h5'>
            Markers
        </Typography>
          <IconButton disabled>
            <PrintIcon />
          </IconButton>
        </Grid>
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