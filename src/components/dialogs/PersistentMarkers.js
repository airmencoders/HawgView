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
  Tooltip,
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Hawg View Marker Icons
//----------------------------------------------------------------//
import ada from '../../markers/persistent/ada.svg'
import blank from '../../markers/persistent/blank.svg'
import bullseye from '../../markers/persistent/bullseye.svg'
import cp from '../../markers/persistent/cp.svg'
import ip from '../../markers/persistent/ip.svg'
import missile from '../../markers/persistent/missile.svg'
import noStrike from '../../markers/persistent/no-strike.svg'
import survivor from '../../markers/persistent/srv.svg'
import target from '../../markers/persistent/tgt.svg'
import threat from '../../markers/persistent/threat-ring.svg'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  image: {
    margin: theme.spacing(1),
    width: '30px',
  },
}))

//----------------------------------------------------------------//
// Persistent Markers Component
//----------------------------------------------------------------//
// TODO Props here?
const PersistentMarkers = props => { //{ handleAddMarker, handleMarkerDrawerToggle}) => {
  const classes = useStyles()

  const handleMarkerClick = (iconUrl, iconType, title, layer) => {

    let payload = {
      arty: {
        arty: false,
        display: false,
      },
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
        anchor: props.anchor.id === null ? true : false,
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

    if (layer === 'hostile' || layer === 'threat' || layer === 'survivor') {
      payload = {
        ...payload,
        data: null
      }
    }
    props.handleAddMarker(payload)
  }

  return (
    <React.Fragment>
      <div>
        <Tooltip title='ADA'>
          <img
            alt='ADA'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'img', 'ADA', 'hostile')}
            src={ada}
          />
        </Tooltip>
        <Tooltip title='Missile'>
          <img
            alt='Missile'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'img', 'Missile', 'hostile')}
            src={missile}
          />
        </Tooltip>
        <Tooltip title='Target'>
          <img
            alt='Target'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'img', 'Target', 'hostile')}
            src={target}
          />
        </Tooltip>
        <Tooltip title='IP'>
          <img
            alt='IP'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'img', 'IP', 'ip')}
            src={ip}
          />
        </Tooltip>
        <Tooltip title='CP'>
          <img
            alt='CP'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'img', 'CP', 'ip')}
            src={cp}
          />
        </Tooltip>
        <Tooltip title='Threat Ring'>
          <img
            alt='Threat Ring'
            className={classes.image}
            onClick={() => handleMarkerClick(null, 'div', '', 'threat')}
            src={threat}
          />
        </Tooltip>
        <Tooltip title='No Strike'>
          <img
            alt='No Strike'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'img', 'No Strike', 'ip')}
            src={noStrike}
          />
        </Tooltip>
        <Tooltip title='Survivor'>
          <img
            alt='Survivor'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'img', 'Survivor', 'survivor')}
            src={survivor}
          />
        </Tooltip>
        <Tooltip title='Bullseye'>
          <img
            alt='Bullseye'
            className={classes.image}
            onClick={() => handleMarkerClick(blank, 'img', 'Bullseye', 'bullseye')}
            src={bullseye}
          />
        </Tooltip>
      </div>
      <Tooltip title='Map Label'>
        <Button
          className={classes.button}
          color='primary'
          onClick={() => handleMarkerClick(null, 'div', 'Label', 'mapLabel')}
        >
          MAP LABEL
        </Button>
      </Tooltip>

    </React.Fragment >
  )
}

export default PersistentMarkers