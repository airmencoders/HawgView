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
// Material-UI Core Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

//----------------------------------------------------------------//
// Custom Marker Icons
//----------------------------------------------------------------//
import ada from '../markers/persistent/ada.svg'
import cap from '../markers/persistent/cap.svg'
import ip from '../markers/persistent/ip.svg'
import missile from '../markers/persistent/missile.svg'
import survivor from '../markers/persistent/srv.svg'
import target from '../markers/persistent/tgt.svg'
import threat from '../markers/persistent/threat-ring.svg'

//----------------------------------------------------------------//
// Custom Class Styling
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
export default ({ handleAddMarker, handleMarkerDrawerToggle }) => {
  const classes = useStyles()

  const handleMarkerClick = (src, sovereignty) => {
    handleMarkerDrawerToggle()
    handleAddMarker(src, sovereignty)
  }

  return (
    <React.Fragment>
      <div>
        <Tooltip title='ADA'>
          <img
            alt='ADA'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'threat')}
            src={ada}
          />
        </Tooltip>
        <Tooltip title='Missile'>
          <img
            alt='Missile'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'threat')}
            src={missile}
          />
        </Tooltip>
        <Tooltip title='Target'>
          <img
            alt='Target'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'hostile')}
            src={target}
          />
        </Tooltip>
        <Tooltip title='IP'>
          <img
            alt='IP'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'ip')}
            src={ip}
          />
        </Tooltip>
        <Tooltip title='Threat Ring'>
          <img
            alt='Threat Ring'
            className={classes.image}
            src={threat}
          />
        </Tooltip>
        <Tooltip title='CAP'>
          <img
            alt='CAP'
            className={classes.image}
            src={cap}
          />
        </Tooltip>
        <Tooltip title='Survivor'>
          <img
            alt='Survivor'
            className={classes.image}
            onClick={event => handleMarkerClick(event.target.src, 'survivor')}
            src={survivor}
          />
        </Tooltip>
      </div>
      <Tooltip title='Building Label'>
        <Button
          className={classes.button}
          color='primary'
        >
          BLDG LABEL
        </Button>
      </Tooltip>
    </React.Fragment >
  )
}