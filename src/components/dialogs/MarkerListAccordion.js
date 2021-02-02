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
import ms from 'milsymbol'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

import {
  AttachFile as AttachFileIcon,
  MyLocation as MyLocationIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import {
  echelons,
} from '../../constants/sidcCodes'

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
    flexBasis: '40%',
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
const MarkerListAccordion = props => {

  const classes = useStyles()

  const getFullEchelon = sidc => {
    if (sidc.echelon === '-') {
      return 'Unit'
    } else {
      let result = echelons.filter(echelon => echelon.value === sidc.echelon)
      return `${result[0].name}`
    }
  }

  const centerMap = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
      focusedLatlng: {
        latlng: props.marker.latlng,
        source: 'marker',
      },
      map: {
        ...props.state.map,
        center: props.marker.latlng,
      },
    })
  }

  return (
    <Accordion
      expanded={(props.marker.data === null || props.marker.data === undefined) ? false : props.variant !== undefined && props.variant === 'print' ? true : undefined}
    >
      <AccordionSummary
        expandIcon={(props.marker.data === null || props.marker.data === undefined || props.variant === 'print') ? undefined : <AttachFileIcon />}
      >
        <Grid
          container
          direction='row'
          justify='space-between'
          alignItems='center'
        >
          <Grid item>
            {(props.marker.iconType === 'img' || props.marker.iconType === 'sidc') && (
              <img
                alt={props.marker.title}
                src={props.marker.iconType === 'img' ? props.marker.iconUrl :
                  new ms.Symbol(`${props.marker.sidc.scheme}${props.marker.sidc.affiliation}${props.marker.sidc.dimension}${props.marker.sidc.status}${props.marker.sidc.id}${props.marker.sidc.modifier}${props.marker.sidc.echelon}`, { size: 30 }).toDataURL()
                }
              />
            )}
            <Typography className={classes.heading}>
              {props.marker.title}
              <em>{props.marker.iconType === 'sidc' ? ` (${getFullEchelon(props.marker.sidc)})` : props.marker.layer === 'threat' ? ` (${props.marker.sovereignty} ${props.marker.label})` : ''}</em>
              {props.marker.layer === 'threat' ?
                ` - Range: ${props.marker.range} ${props.marker.unit}`
                : null
              }
            </Typography>
          </Grid>
          <Grid item>
            <Typography className={classes.secondaryHeading}>
              {`
                ${LatLon.parse(props.marker.latlng.lat, props.marker.latlng.lng).toUtm().toMgrs().toString()} // 
                ${props.marker.latlng.lat.toFixed(4)}, ${props.marker.latlng.lng.toFixed(4)}
                ${props.marker.elevation !== undefined ? ` // ${props.marker.elevation}` : ''}${props.marker.elevation === undefined || props.marker.elevation === 'Elevation not found' || props.marker.elevation === 'Pending' ? '' : ' feet'}
              `}
            </Typography>
          </Grid>
          {(props.variant === undefined && (
            <Grid item>
              <Tooltip title='Center Map'>
                <IconButton
                  onClick={centerMap}
                >
                  <MyLocationIcon />
                </IconButton>
              </Tooltip>
            </Grid>
          ))}
        </Grid>
      </AccordionSummary>
      {(props.marker.data !== null && props.marker.data !== undefined) && (
        <AccordionDetails>
          {props.marker.data.type === '9line' ? render9line(props.marker.data) : render15line(props.marker.data)}
        </AccordionDetails>
      )}
    </Accordion>
  )
}

export default MarkerListAccordion