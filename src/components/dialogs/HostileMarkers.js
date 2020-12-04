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
  Tooltip,
} from '@material-ui/core'
import {
  makeStyles,
} from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Hawg View Marker Icons
//----------------------------------------------------------------//
import airborne from '../../markers/hostile/airborne.svg'
import airborneInfantry from '../../markers/hostile/airborne-infantry.svg'
import airDefense from '../../markers/hostile/air-defense.svg'
import antiArmor from '../../markers/hostile/anti-armor.svg'
import armor from '../../markers/hostile/armor.svg'
import artillery from '../../markers/hostile/artillery.svg'
import aviation from '../../markers/hostile/aviation.svg'
import cbrne from '../../markers/hostile/cbrne.svg'
import counterBatteryRadar from '../../markers/hostile/counterbattery-radar.svg'
import engineer from '../../markers/hostile/engineer.svg'
import infantry from '../../markers/hostile/infantry.svg'
import lightArmor from '../../markers/hostile/light-armor.svg'
import maintenance from '../../markers/hostile/maintenance.svg'
import mechInfantry from '../../markers/hostile/mech-infantry.svg'
import medical from '../../markers/hostile/medical.svg'
import missile from '../../markers/hostile/missile.svg'
import mlrs from '../../markers/hostile/mlrs.svg'
import recce from '../../markers/hostile/recce.svg'
import sparty from '../../markers/hostile/self-propelled-artillery.svg'
import signals from '../../markers/hostile/signals.svg'
import specialForces from '../../markers/hostile/special-forces.svg'
import supply from '../../markers/hostile/supply.svg'
import unit from '../../markers/hostile/unit.svg'
import wheeledArmor from '../../markers/hostile/wheeled-armor.svg'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  image: {
    margin: theme.spacing(1),
    width: '30px',
  },
}))

//----------------------------------------------------------------//
// Hostile Markers Component
//----------------------------------------------------------------//
// TODO Props here?
const HostileMarkers = ({ handleAddMarker, handleMarkerDrawerToggle }) => {
  const classes = useStyles()

  const handleMarkerClick = (iconUrl, title) => {
    let payload = {
      arty: {
        arty: false,
        display: false,
      },
      data: null,
      elevation: 0,   // TODO: Pull the elevation of the latlng from API
      iconType: 'img',
      iconUrl,
      layer: 'hostile',
      title,
    }

    if (title === 'Artillery' || title === 'MLRS') {
      payload = {
        ...payload,
        arty: {
          arty: true,
          display: true,
        }
      }
    }
    handleMarkerDrawerToggle()
    handleAddMarker(payload)
  }

  return (
    <React.Fragment>
      <Tooltip title='Airborne'>
        <img
          alt='Hostile Airborne'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Airborne')}
          src={airborne}
        />
      </Tooltip>
      <Tooltip title='Airborne Infantry'>
        <img
          alt='Hostile Airborne Infantry'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Airborne Infantry')}
          src={airborneInfantry}
        />
      </Tooltip>
      <Tooltip title='Air Defense'>
        <img
          alt='Hostile Air Defense'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Air Defense')}
          src={airDefense}
        />
      </Tooltip>
      <Tooltip title='Anti Armor'>
        <img
          alt='Hostile Anti Armor'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Anti Armor')}
          src={antiArmor}
        />
      </Tooltip>
      <Tooltip title='Armor'>
        <img
          alt='Hostile Armor'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Armor')}
          src={armor}
        />
      </Tooltip>
      <Tooltip title='Artillery'>
        <img
          alt='Hostile Artillery'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Artillery')}
          src={artillery}
        />
      </Tooltip>
      <Tooltip title='Aviation'>
        <img
          alt='Hostile Aviation'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Aviation')}
          src={aviation}
        />
      </Tooltip>
      <Tooltip title='CBRNE'>
        <img
          alt='Hostile CBRNE'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'CBRNE')}
          src={cbrne}
        />
      </Tooltip>
      <Tooltip title='Counterbattery Radar'>
        <img
          alt='Hostile Counterbattery Radar'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Counterbattery Radar')}
          src={counterBatteryRadar}
        />
      </Tooltip>
      <Tooltip title='Engineer'>
        <img
          alt='Hostile Engineer'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Engineer')}
          src={engineer}
        />
      </Tooltip>
      <Tooltip title='Infantry'>
        <img
          alt='Hostile Infantry'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Infantry')}
          src={infantry}
        />
      </Tooltip>
      <Tooltip title='Light Armor'>
        <img
          alt='Hostile Light Armor'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Light Armor')}
          src={lightArmor}
        />
      </Tooltip>
      <Tooltip title='Maintenance'>
        <img
          alt='Hostile Maintenance'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Maintenance')}
          src={maintenance}
        />
      </Tooltip>
      <Tooltip title='Mech Infantry'>
        <img
          alt='Hostile Mech Infantry'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Mech Infantry')}
          src={mechInfantry}
        />
      </Tooltip>
      <Tooltip title='Medical'>
        <img
          alt='Hostile Medical'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Medical')}
          src={medical}
        />
      </Tooltip>
      <Tooltip title='Missile'>
        <img
          alt='Hostile Missile'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Missile')}
          src={missile}
        />
      </Tooltip>
      <Tooltip title='MLRS'>
        <img
          alt='Hostile MRLS'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'MLRS')}
          src={mlrs}
        />
      </Tooltip>
      <Tooltip title='Recce'>
        <img
          alt='Hostile Recce'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Recce')}
          src={recce}
        />
      </Tooltip>
      <Tooltip title='Self-Propelled Artillery'>
        <img
          alt='Hostile Self-Propelled Artillery'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Self-Propelled Artillery')}
          src={sparty}
        />
      </Tooltip>
      <Tooltip title='Signals'>
        <img
          alt='Hostile Signals'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Signals')}
          src={signals}
        />
      </Tooltip>
      <Tooltip title='Special Forces'>
        <img
          alt='Hostile Special Forces'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Special Forces')}
          src={specialForces}
        />
      </Tooltip>
      <Tooltip title='Supply'>
        <img
          alt='Hostile Supply'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Supply')}
          src={supply}
        />
      </Tooltip>
      <Tooltip title='Unit'>
        <img
          alt='Hostile Unit'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Unit')}
          src={unit}
        />
      </Tooltip>
      <Tooltip title='Wheeled Armor'>
        <img
          alt='Hostile Wheeled Armor'
          className={classes.image}
          onClick={event => handleMarkerClick(event.target.src, 'Wheeled Armor')}
          src={wheeledArmor}
        />
      </Tooltip>
    </React.Fragment>
  )
}

export default HostileMarkers