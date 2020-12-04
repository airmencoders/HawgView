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
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles'
import {
  AttachFile as AttachFileIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import { 
  render9line,
  render15line, 
} from '../../functions/renderData'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
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

//----------------------------------------------------------------//
// Marker List Accordion Component
//----------------------------------------------------------------//
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
            `(${props.marker.sovereignty} ${props.marker.label}) ${props.marker.title}`
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