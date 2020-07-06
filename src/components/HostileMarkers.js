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
import airborne from '../markers/hostile/airborne.svg'
import airborneInfantry from '../markers/hostile/airborne-infantry.svg'
import airDefense from '../markers/hostile/air-defense.svg'
import antiArmor from '../markers/hostile/anti-armor.svg'
import armor from '../markers/hostile/armor.svg'
import artillery from '../markers/hostile/artillery.svg'
import aviation from '../markers/hostile/aviation.svg'
import cbrne from '../markers/hostile/cbrne.svg'
import engineer from '../markers/hostile/engineer.svg'
import infantry from '../markers/hostile/infantry.svg'
import maintenance from '../markers/hostile/maintenance.svg'
import mechInfantry from '../markers/hostile/mech-infantry.svg'
import medical from '../markers/hostile/medical.svg'
import missile from '../markers/hostile/missile.svg'
import recce from '../markers/hostile/recce.svg'
import sparty from '../markers/hostile/self-propelled-artillery.svg'
import signals from '../markers/hostile/signals.svg'
import supply from '../markers/hostile/supply.svg'
import unit from '../markers/hostile/unit.svg'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  imageRoot: {
    width: '100%',
  },
  image: {
    width: '30px',
  },
}))

//----------------------------------------------------------------//
// Hostile Markers Component
//----------------------------------------------------------------//
export default () => {
  const classes = useStyles()

  return (
    <React.Fragment>
      <Tooltip title='Airborne'>
        <IconButton>
          <img
            alt='Hostile Airborne'
            className={classes.image}
            data-sovereignty='hostile'
            src={airborne}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Airborne Infantry'>
        <IconButton>
          <img
            alt='Hostile Airborne Infantry'
            className={classes.image}
            data-sovereignty='hostile'
            src={airborneInfantry}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Air Defense'>
        <IconButton>
          <img
            alt='Hostile Air Defense'
            className={classes.image}
            data-sovereignty='hostile'
            src={airDefense}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Anti Armor'>
        <IconButton>
          <img
            alt='Hostile Anti Armor'
            className={classes.image}
            data-sovereignty='hostile'
            src={antiArmor}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Armor'>
        <IconButton>
          <img
            alt='Hostile Armor'
            className={classes.image}
            data-sovereignty='hostile'
            src={armor}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Artillery'>
        <IconButton>
          <img
            alt='Hostile Artillery'
            className={classes.image}
            data-sovereignty='hostile'
            src={artillery}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Aviation'>
        <IconButton>
          <img
            alt='Hostile Aviation'
            className={classes.image}
            data-sovereignty='hostile'
            src={aviation}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='CBRNE'>
        <IconButton>
          <img
            alt='Hostile CBRNE'
            className={classes.image}
            data-sovereignty='hostile'
            src={cbrne}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Engineer'>
        <IconButton>
          <img
            alt='Hostile Engineer'
            className={classes.image}
            data-sovereignty='hostile'
            src={engineer}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Infantry'>
        <IconButton>
          <img
            alt='Hostile Infantry'
            className={classes.image}
            data-sovereignty='hostile'
            src={infantry}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Maintenance'>
        <IconButton>
          <img
            alt='Hostile Maintenance'
            className={classes.image}
            data-sovereignty='hostile'
            src={maintenance}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Mech Infantry'>
        <IconButton>
          <img
            alt='Hostile Mech Infantry'
            className={classes.image}
            data-sovereignty='hostile'
            src={mechInfantry}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Medical'>
        <IconButton>
          <img
            alt='Hostile Medical'
            className={classes.image}
            data-sovereignty='hostile'
            src={medical}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Missile'>
        <IconButton>
          <img
            alt='Hostile Missile'
            className={classes.image}
            data-sovereignty='hostile'
            src={missile}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Recce'>
        <IconButton>
          <img
            alt='Hostile Recce'
            className={classes.image}
            data-sovereignty='hostile'
            src={recce}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Self-Propelled Artillery'>
        <IconButton>
          <img
            alt='Hostile Self-Propelled Artillery'
            className={classes.image}
            data-sovereignty='hostile'
            src={sparty}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Signals'>
        <IconButton>
          <img
            alt='Hostile Signals'
            className={classes.image}
            data-sovereignty='hostile'
            src={signals}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Supply'>
        <IconButton>
          <img
            alt='Hostile Supply'
            className={classes.image}
            data-sovereignty='hostile'
            src={supply}
          />
        </IconButton>
      </Tooltip>
      <Tooltip title='Unit'>
        <IconButton>
          <img
            alt='Hostile Unit'
            className={classes.image}
            data-sovereignty='hostile'
            src={unit}
          />
        </IconButton>
      </Tooltip>
    </React.Fragment>
  )
}