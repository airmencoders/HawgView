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
import SwipeableViews from 'react-swipeable-views'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  AppBar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

import {
  Print as PrintIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  MarkerListAccordion
} from '../dialogs'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
  }
}))

//----------------------------------------------------------------//
// Private Tab Component
//----------------------------------------------------------------//
const TabPanel = props => {
  const { children, value, index, ...other } = props
  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`marker-tabpanel-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  )
}

//----------------------------------------------------------------//
// Marker List Dialog Component
//----------------------------------------------------------------//
const MarkerListDialog = (props) => {

  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  const handleChangeIndex = index => {
    setValue(index)
  }

  const handleClose = () => {
    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: null,
      },
    })
  }

  return (
    <Dialog
      fullWidth={true}
      maxWidth={false}
      open={props.state.dialog.name === 'markerList'}
      onClose={handleClose}
    >
      <DialogTitle>
        <Box displayPrint='none'>
          <Grid
            container
            direction='row'
            justify='space-between'
          >
            <Grid item />
            <Grid item>
              <Grid
                container
                direction='row'
              >
                <IconButton onClick={() => window.print()}>
                  <PrintIcon />
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box displayPrint='none'>
          <AppBar
            color='default'
            position='static'
          >
            <Tabs
              indicatorColor='primary'
              onChange={handleChange}
              textColor='primary'
              value={value}
              variant='fullWidth'
            >
              <Tab label={`Combat Units (${props.state.history[props.state.step].friendlyMarkers.length})`} />
              <Tab label={`Hostile Units (${props.state.history[props.state.step].hostileMarkers.length})`} />
              <Tab label={`Unknown Units (${props.state.history[props.state.step].unknownMarkers.length})`} />
              <Tab label={`Neutral Units (${props.state.history[props.state.step].neutralMarkers.length})`} />
              <Tab label={`Survivors (${props.state.history[props.state.step].survivors.length})`} />
              <Tab label={`Threats (${props.state.history[props.state.step].threatMarkers.length})`} />
              <Tab label={`IP/CP/No Strikes (${props.state.history[props.state.step].initialPoints.length})`} />
              <Tab label={`Bullseyes (${props.state.history[props.state.step].bullseyes.length})`}/>
              <Tab label={`Building Labels (${props.state.history[props.state.step].buildingLabels.length})`} />
              <Tab label={`Kinetic Points (${props.state.history[props.state.step].kineticPoints.length})`} />
            </Tabs>
          </AppBar>
          <SwipeableViews
            axis='x'
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel
              value={value}
              index={0}
            >
              {props.state.history[props.state.step].friendlyMarkers.map(marker => (
                <MarkerListAccordion
                  key={`friendly-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
            >
              {props.state.history[props.state.step].hostileMarkers.map(marker => (
                <MarkerListAccordion
                  key={`hostile-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
            >
              {props.state.history[props.state.step].unknownMarkers.map(marker => (
                <MarkerListAccordion
                  key={`unknown-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={3}
            >
              {props.state.history[props.state.step].neutralMarkers.map(marker => (
                <MarkerListAccordion
                  key={`neutral-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={4}
            >
              {props.state.history[props.state.step].survivors.map(marker => (
                <MarkerListAccordion
                  key={`survivor-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={5}
            >
              {props.state.history[props.state.step].threatMarkers.map(marker => (
                <MarkerListAccordion
                  key={`threat-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={6}
            >
              {props.state.history[props.state.step].initialPoints.map(marker => (
                <MarkerListAccordion
                  key={`ip-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={7}
            >
              {props.state.history[props.state.step].bullseyes.map(marker => (
                <MarkerListAccordion
                  key={`bullseye-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={8}
            >
              {props.state.history[props.state.step].buildingLabels.map(marker => (
                <MarkerListAccordion
                  key={`building-label-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
            <TabPanel
              value={value}
              index={9}
            >
              {props.state.history[props.state.step].kineticPoints.map(marker => (
                <MarkerListAccordion
                  key={`kinetic-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </TabPanel>
          </SwipeableViews>
        </Box>
        <Box
          display='none'
          displayPrint='block'
        >
          <Grid
            container
            spacing={2}
          >
            <Grid item xs={12}>
              <Typography variant='h6'>Friendlies</Typography>
              {props.state.history[props.state.step].survivors.map(marker => (
                <MarkerListAccordion
                  key={`survivor-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
              {props.state.history[props.state.step].friendlyMarkers.map(marker => (
                <MarkerListAccordion
                  key={`friendly-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>IP/CPs</Typography>
              {props.state.history[props.state.step].initialPoints.map(marker => (
                <MarkerListAccordion
                  key={`initial-contact-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Bullseyes</Typography>
              {props.state.history[props.state.step].bullseyes.map(marker => (
                <MarkerListAccordion
                  key={`bullseye-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Hostiles</Typography>
              {props.state.history[props.state.step].hostileMarkers.map(marker => (
                <MarkerListAccordion
                  key={`hostile-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Threats</Typography>
              {props.state.history[props.state.step].threatMarkers.map(marker => (
                <MarkerListAccordion
                  key={`threat-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Buildings</Typography>
              {props.state.history[props.state.step].buildingLabels.map(marker => (
                <MarkerListAccordion
                  key={`building-label-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='h6'>Kinetic Points</Typography>
              {props.state.history[props.state.step].kineticPoints.map(marker => (
                <MarkerListAccordion
                  key={`kinetic-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export default MarkerListDialog


/*
<Grid
            container
            spacing={2}
          >
            <Grid item xs>
              <Typography variant='h6'>Units</Typography>
              {props.state.history[props.state.step].survivors.map(marker => (
                <MarkerListAccordion
                  key={`survivor-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
              {props.state.history[props.state.step].friendlyMarkers.map(marker => (
                <MarkerListAccordion
                  key={`friendly-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
              {props.state.history[props.state.step].hostileMarkers.map(marker => (
                <MarkerListAccordion
                  key={`hostile-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
              {props.state.history[props.state.step].unknownMarkers.map(marker => (
                <MarkerListAccordion
                  key={`unknown-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
              {props.state.history[props.state.step].neutralMarkers.map(marker => (
                <MarkerListAccordion
                  key={`neutral-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>IP/CPs</Typography>
              {props.state.history[props.state.step].initialPoints.map(marker => (
                <MarkerListAccordion
                  key={`initial-contact-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Bullseyes</Typography>
              {props.state.history[props.state.step].bullseyes.map(marker => (
                <MarkerListAccordion
                  key={`bullseye-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Threats</Typography>
              {props.state.history[props.state.step].threatMarkers.map(marker => (
                <MarkerListAccordion
                  key={`threat-marker-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Buildings</Typography>
              {props.state.history[props.state.step].buildingLabels.map(marker => (
                <MarkerListAccordion
                  key={`building-label-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
            <Grid item xs>
              <Typography variant='h6'>Kinetic Points</Typography>
              {props.state.history[props.state.step].kineticPoints.map(marker => (
                <MarkerListAccordion
                  key={`kinetic-point-${marker.id}`}
                  marker={marker}
                />
              ))}
            </Grid>
          </Grid>*/