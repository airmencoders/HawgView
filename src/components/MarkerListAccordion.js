import React from 'react'

import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

import { LatLon } from 'geodesy/mgrs'

import AttachFileIcon from '@material-ui/icons/AttachFile'

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

export default (props) => {

  const classes = useStyles()

  const render9line = data => (
    <table>
      <tbody>
        <tr>
          <td>Label</td>
          <td>{data.label}</td>
        </tr>
        <tr>
          <td>Type/Method</td>
          <td>{data.typeMethod}</td>
        </tr>
        <tr>
          <td>IP / Hdg / Distance</td>
          <td>{data.ipHdgDistance}</td>
        </tr>
        <tr>
          <td>Elevation</td>
          <td>{data.elevation}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{data.description}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{data.location}</td>
        </tr>
        <tr>
          <td>Mark</td>
          <td>{data.mark}</td>
        </tr>
        <tr>
          <td>Friendlies</td>
          <td>{data.friendlies}</td>
        </tr>
        <tr>
          <td>Egress</td>
          <td>{data.egress}</td>
        </tr>
        <tr>
          <td>Remarks/Restrictions</td>
          <td>{data.remarks}</td>
        </tr>
      </tbody>
    </table>
  )

  const render15line = data => (
    <table style={{ width: '500px' }}>
      <tbody>
        <tr>
          <td>Callsign/Freq/PLS/HHRID</td>
          <td>{data.callsign} / {data.frequency} / {data.plsHhrid}</td>
        </tr>
        <tr>
          <td>Number of Objectives</td>
          <td>{data.numObjectives}</td>
        </tr>
        <tr>
          <td>Location/Elevation/Date/Time(z)/Source</td>
          <td>{data.location} / {data.elevation} / {data.dateTime} / {data.source}</td>
        </tr>
        <tr>
          <td>Condition</td>
          <td>{data.condition}</td>
        </tr>
        <tr>
          <td>Equipment</td>
          <td>{data.equipment}</td>
        </tr>
        <tr>
          <td>Authentication</td>
          <td>{data.authentication}</td>
        </tr>
        <tr>
          <td>Threats</td>
          <td>{data.threats}</td>
        </tr>
        <tr>
          <td>PZ Description</td>
          <td>{data.pzDescription}</td>
        </tr>
        <tr>
          <td>OSC/frequency</td>
          <td>{data.oscFreq}</td>
        </tr>
        <tr>
          <td>IP/Heading</td>
          <td>{data.ipHdg}</td>
        </tr>
        <tr>
          <td>Rescort</td>
          <td>{data.rescort}</td>
        </tr>
        <tr>
          <td>Terminal Area Gameplan</td>
          <td>{data.gameplan}</td>
        </tr>
        <tr>
          <td>Signal</td>
          <td>{data.signal}</td>
        </tr>
        <tr>
          <td>Egress Hdg</td>
          <td>{data.egress}</td>
        </tr>
      </tbody>
    </table>
  )

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