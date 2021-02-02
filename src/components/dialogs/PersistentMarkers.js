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
  Tooltip,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Hawg View Marker Icons
//----------------------------------------------------------------//
import blank from '../../markers/persistent/blank.svg'
import bullseye from '../../markers/persistent/bullseye.svg'
import cp from '../../markers/persistent/cp.svg'
import ip from '../../markers/persistent/ip.svg'
import noStrike from '../../markers/persistent/no-strike.svg'
import survivor from '../../markers/persistent/srv.svg'
import threat from '../../markers/persistent/threat-ring.svg'
import tgt from '../../markers/persistent/tgt.svg'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  markerImage: {
    margin: theme.spacing(1),
    width: '30px',
  },
}))

//----------------------------------------------------------------//
// Persistent Markers Component
//----------------------------------------------------------------//
const PersistentMarkers = props => {
  const classes = useStyles()

  const handleMarkerClick = (iconUrl, iconType, title, layer) => {

    let payload = {
      arty: {
        arty: false,
        display: false,
      },
      data: null,
      iconType,
      layer,
      title,
    }

    if (layer !== 'threat') {
      payload = {
        ...payload,
        iconUrl,
      }
    }

    if (layer !== 'bullseye') {
      payload = {
        ...payload,
        elevation: 0,   // TODO: Pull the elevation of the latlng from API
      }
    } else {
      payload = {
        ...payload,
        anchor: props.state.history[props.state.step].anchor.id === null ? true : false,
        rings: 5,
        distance: 20,
        angle: 45,
        color: '#ff0000',
        declination: 0,
        showData: true,
      }
    }

    if (layer === 'threat') {
      payload = {
        ...payload,
        dashed: true,
        threatType: 0,
        range: '3',
        unit: 'NM',
        sovereignty: 'Hostile',
        color: '#ff0000',
        fill: false,
        fillColor: '#ff0000',
        label: 'Threat'
      }
    }

    if (layer === 'mapLabel') {
      payload = {
        ...payload,
        color: '#ff0000',
        fontSize: '30',
        lineHeight: '30px',
      }
    }
    
    props.handleAddMarker(payload)
  }

  const markers = [
    {
      iconType: 'img',
      layer: 'hostile',
      src: tgt,
      title: 'TGT',
    },
    {
      iconType: 'img',
      layer: 'ip',
      src: ip,
      title: 'IP',
    },
    {
      iconType: 'img',
      layer: 'ip',
      src: cp,
      title: 'CP',
    },
    {
      iconType: 'div',
      layer: 'threat',
      src: threat,
      title: '',
    },
    {
      iconType: 'img',
      layer: 'ip',
      src: noStrike,
      title: 'No Strike',
    },
    {
      iconType: 'img',
      layer: 'survivor',
      src: survivor,
      title: 'Survivor',
    },
    {
      iconType: 'img',
      layer: 'bullseye',
      src: bullseye,
      title: 'Bullseye'
    }
  ]

  // layer === 'threat' ? null : layer === 'bullseye' ? blank : event.target.src

  return (
    <React.Fragment>
      <div>
        {markers.map(marker => (
          <Tooltip key={marker.title} title={marker.title}>
            <img
              alt={marker.title}
              className={classes.markerImage}
              onClick={() => handleMarkerClick(
                marker.layer === 'threat' ?
                  null
                  : marker.layer === 'bullseye' ?
                  blank
                  : marker.src,
                  marker.iconType,
                  marker.title,
                  marker.layer
              )}
              src={marker.src}
            />
          </Tooltip>
        ))}
      </div>
      <Tooltip title='Map Label'>
        <Button
          className={classes.button}
          color='primary'
          onClick={() => handleMarkerClick(null, 'div', 'Label', 'mapLabel')}
          variant='contained'
        >
          MAP LABEL
        </Button>
      </Tooltip>

    </React.Fragment >
  )
}

export default PersistentMarkers