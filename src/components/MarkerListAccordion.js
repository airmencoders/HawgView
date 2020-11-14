import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { LatLon } from 'geodesy/mgrs'

import AttachFileIcon from '@material-ui/icons/AttachFile'
import { render9line, render15line } from '../functions/renderData'

const useStyles = makeStyles(theme => ({
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}))

const MarkerListAccordion = (props) => {

  const classes = useStyles()

  return (
    <Accordion
      expanded={(props.marker.data === null || props.marker.data === undefined) ? false : undefined}
    >
      <AccordionSummary
        expandIcon={(props.marker.data === null || props.marker.data === undefined) ? undefined : <AttachFileIcon />}
      >
        <Typography className={classes.heading}>
          {props.marker.layer === 'threat' ?
            `(${props.marker.sovereignty} ${props.marker.threatType.title}) ${props.marker.title}`
            :
            props.marker.title
          }
        </Typography>
        <Typography className={classes.secondaryHeading}>
          {LatLon.parse(props.marker.latlng.lat, props.marker.latlng.lng).toUtm().toMgrs().toString()}
        </Typography>
      </AccordionSummary>
      {(props.marker.data !== null && props.marker.data !== undefined) ?
        <AccordionDetails>
          {props.marker.data.type === '9line' ? render9line(props.marker.data) : render15line(props.marker.data)}
        </AccordionDetails>
        : null
      }
    </Accordion>
  )
}

export default MarkerListAccordion