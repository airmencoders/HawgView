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
    margin: theme.spacing(1),
    width: '30px',
  },
}))

//----------------------------------------------------------------//
// Friendly Markers Component
//----------------------------------------------------------------//
// TODO Props here?
export default ({ handleAddMarker, handleMarkerDrawerToggle }) => {
  const classes = useStyles()

  const handleMarkerClick = (iconUrl, title) => {
    const payload = {
      color: null,
      data: null,
      elevation: 0,   // TODO: Pull the elevation of the latlng from API
      iconType: 'img',
      iconUrl,
      layer: 'friendly',
      sovereignty: null,
      title,
    }
    handleMarkerDrawerToggle()
    handleAddMarker(payload)
  }

  return (
    <React.Fragment>
      <Tooltip title='Airborne'>
        <img
          alt='Friendly Airborne'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Airborne')}
          src={airborne}
        />
      </Tooltip>
      <Tooltip title='Airborne Infantry'>
        <img
          alt='Friendly Airborne Infantry'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Airborne Infantry')}
          src={airborneInfantry}
        />
      </Tooltip>
      <Tooltip title='Air Defense'>
        <img
          alt='Friendly Air Defense'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Air Defense')}
          src={airDefense}
        />
      </Tooltip>
      <Tooltip title='Anti Armor'>
        <img
          alt='Friendly Anti Armor'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Anti Armor')}
          src={antiArmor}
        />
      </Tooltip>
      <Tooltip title='Armor'>
        <img
          alt='Friendly Armor'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Armor')}
          src={armor}
        />
      </Tooltip>
      <Tooltip title='Artillery'>
        <img
          alt='Friendly Artillery'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Artillery')}
          src={artillery}
        />
      </Tooltip>
      <Tooltip title='Aviation'>
        <img
          alt='Friendly Aviation'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Aviation')}
          src={aviation}
        />
      </Tooltip>
      <Tooltip title='CBRNE'>
        <img
          alt='Friendly CBRNE'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'CBRNE')}
          src={cbrne}
        />
      </Tooltip>
      <Tooltip title='Engineer'>
        <img
          alt='Friendly Engineer'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Engineer')}
          src={engineer}
        />
      </Tooltip>
      <Tooltip title='Infantry'>
        <img
          alt='Friendly Infantry'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Infantry')}
          src={infantry}
        />
      </Tooltip>
      <Tooltip title='Maintenance'>
        <img
          alt='Friendly Maintenance'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Maintenance')}
          src={maintenance}
        />
      </Tooltip>
      <Tooltip title='Mech Infantry'>
        <img
          alt='Friendly Mech Infantry'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Mech Infantry')}
          src={mechInfantry}
        />
      </Tooltip>
      <Tooltip title='Medical'>
        <img
          alt='Friendly Medical'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Medical')}
          src={medical}
        />
      </Tooltip>
      <Tooltip title='Missile'>
        <img
          alt='Friendly Missile'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Missile')}
          src={missile}
        />
      </Tooltip>
      <Tooltip title='Recce'>
        <img
          alt='Friendly Recce'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Recce')}
          src={recce}
        />
      </Tooltip>
      <Tooltip title='Self-Propelled Artillery'>
        <img
          alt='Friendly Self-Propelled Artillery'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Self-Propelled Artillery')}
          src={sparty}
        />
      </Tooltip>
      <Tooltip title='Signals'>
        <img
          alt='Friendly Signals'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Signals')}
          src={signals}
        />
      </Tooltip>
      <Tooltip title='Supply'>
        <img
          alt='Friendly Supply'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Supply')}
          src={supply}
        />
      </Tooltip>
      <Tooltip title='Unit'>
        <img
          alt='Friendly Unit'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Unit')}
          src={unit}
        />
      </Tooltip>
    </React.Fragment>
  )
}