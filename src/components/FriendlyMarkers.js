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
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

//----------------------------------------------------------------//
// Custom Marker Icons
//----------------------------------------------------------------//
import airborne from '../markers/friendly/airborne.svg'
import airborneInfantry from '../markers/friendly/airborne-infantry.svg'
import airDefense from '../markers/friendly/air-defense.svg'
import antiArmor from '../markers/friendly/anti-armor.svg'
import armor from '../markers/friendly/armor.svg'
import artillery from '../markers/friendly/artillery.svg'
import aviation from '../markers/friendly/aviation.svg'
import cbrne from '../markers/friendly/cbrne.svg'
import engineer from '../markers/friendly/engineer.svg'
import infantry from '../markers/friendly/infantry.svg'
import maintenance from '../markers/friendly/maintenance.svg'
import mechInfantry from '../markers/friendly/mech-infantry.svg'
import medical from '../markers/friendly/medical.svg'
import missile from '../markers/friendly/missile.svg'
import recce from '../markers/friendly/recce.svg'
import sparty from '../markers/friendly/self-propelled-artillery.svg'
import signals from '../markers/friendly/signals.svg'
import supply from '../markers/friendly/supply.svg'
import unit from '../markers/friendly/unit.svg'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  image: {
    width: '30px',
  },
}))

//----------------------------------------------------------------//
// Friendly Markers Component
//----------------------------------------------------------------//
export default ({ handleAddMarker, handleMarkerDrawerToggle }) => {
  const classes = useStyles()

  const handleMarkerClick = event => {
    handleMarkerDrawerToggle()
    handleAddMarker(event.target.src)
  }

  return (
    <React.Fragment>
      <Tooltip title='Airborne'>
        <img
          alt='Friendly Airborne'
          className={classes.image}
          data-sovereignty='friendly'
          onClick={handleMarkerClick}
          src={airborne}
        />
      </Tooltip>
      <Tooltip title='Airborne Infantry'>
        <IconButton>
          <img
            alt='Friendly Airborne Infantry'
            className={classes.image}
            data-sovereignty='friendly'
            src={airborneInfantry}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Air Defense'>
        <IconButton>
          <img
            alt='Friendly Air Defense'
            className={classes.image}
            data-sovereignty='friendly'
            src={airDefense}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Anti Armor'>
        <IconButton>
          <img
            alt='Friendly Anti Armor'
            className={classes.image}
            data-sovereignty='friendly'
            src={antiArmor}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Armor'>
        <IconButton>
          <img
            alt='Friendly Armor'
            className={classes.image}
            data-sovereignty='friendly'
            src={armor}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Artillery'>
        <IconButton>
          <img
            alt='Friendly Artillery'
            className={classes.image}
            data-sovereignty='friendly'
            src={artillery}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Aviation'>
        <IconButton>
          <img
            alt='Friendly Aviation'
            className={classes.image}
            data-sovereignty='friendly'
            src={aviation}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='CBRNE'>
        <IconButton>
          <img
            alt='Friendly CBRNE'
            className={classes.image}
            data-sovereignty='friendly'
            src={cbrne}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Engineer'>
        <IconButton>
          <img
            alt='Friendly Engineer'
            className={classes.image}
            data-sovereignty='friendly'
            src={engineer}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Infantry'>
        <IconButton>
          <img
            alt='Friendly Infantry'
            className={classes.image}
            data-sovereignty='friendly'
            src={infantry}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Maintenance'>
        <IconButton>
          <img
            alt='Friendly Maintenance'
            className={classes.image}
            data-sovereignty='friendly'
            src={maintenance}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Mech Infantry'>
        <IconButton>
          <img
            alt='Friendly Mech Infantry'
            className={classes.image}
            data-sovereignty='friendly'
            src={mechInfantry}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Medical'>
        <IconButton>
          <img
            alt='Friendly Medical'
            className={classes.image}
            data-sovereignty='friendly'
            src={medical}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Missile'>
        <IconButton>
          <img
            alt='Friendly Missile'
            className={classes.image}
            data-sovereignty='friendly'
            src={missile}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Recce'>
        <IconButton>
          <img
            alt='Friendly Recce'
            className={classes.image}
            data-sovereignty='friendly'
            src={recce}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Self-Propelled Artillery'>
        <IconButton>
          <img
            alt='Friendly Self-Propelled Artillery'
            className={classes.image}
            data-sovereignty='friendly'
            src={sparty}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Signals'>
        <IconButton>
          <img
            alt='Friendly Signals'
            className={classes.image}
            data-sovereignty='friendly'
            src={signals}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Supply'>
        <IconButton>
          <img
            alt='Friendly Supply'
            className={classes.image}
            data-sovereignty='friendly'
            src={supply}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Unit'>
        <IconButton>
          <img
            alt='Friendly Unit'
            className={classes.image}
            data-sovereignty='friendly'
            src={unit}
          />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  )
}