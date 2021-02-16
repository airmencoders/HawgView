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
// React Leaflet Components
//----------------------------------------------------------------//
import {
  LayersControl,
  LayerGroup,
  TileLayer,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  AirspaceGeoJSON,
  Bullseye,
  Circle,
  Ellipse,
  GARSCells,
  Line,
  Marker,
  MGRSGrids,
  Polygon,
  Rectangle,
  Threat,
} from '../layers'

import esriLayers from '../../constants/esriLayers'

//----------------------------------------------------------------//
// Map Control Component
//----------------------------------------------------------------//
const LayerControl = props => {

  const { BaseLayer, Overlay } = LayersControl

  const airspaceTypes = [
    { short: 'LLZ', long: 'LLZ' },
    { short: 'MOA', long: 'MOA' },
    { short: 'W', long: 'Alert / Warning' }, // Combined ADA/A/W
    { short: 'R', long: 'Restricted / Prohibited' }, //Combined D/R/P/NFL
    { short: 'AAR', long: 'AAR' },
    { short: 'ATCAA', long: 'ATCAA' }
  ]

  const layers = React.useMemo(() => (
    <LayersControl position='topright' >
      {esriLayers.baselayers.map(baselayer => {
        if (baselayer.use) {
          return (
            <BaseLayer
              checked={baselayer.name === props.state.map.baselayer}
              key={baselayer.name}
              name={baselayer.name}
            >
              <TileLayer
                attribution={baselayer.attribution}
                className='leaflet-layer-imagery'
                keepMounted
                maxNativeZoom={baselayer.maxZoom}
                opacity={props.state.map.brightness > 1 ? 2 - props.state.map.brightness : props.state.map.brightness}
                subdomains={baselayer.subdomains}
                url={baselayer.url}
              />
            </BaseLayer>
          )
        }
      })}
      <Overlay name='MGRS Lines'>
        <MGRSGrids
          map={props.map}
          state={props.state}
        />
      </Overlay>
      <Overlay name='GARS Cells'>
        <GARSCells
          map={props.map}
          state={props.state}
        />
      </Overlay>
      {airspaceTypes.map(type => (
        <Overlay checked key={type.short} name={`Airspace (${type.long})`}>
          <LayerGroup>
            {type.short === 'MOA' ?
              <React.Fragment>
                <AirspaceGeoJSON type='LOW' />
                <AirspaceGeoJSON type='MOA' />
              </React.Fragment>
              :
              type.short === 'W' ?
                <React.Fragment>
                  <AirspaceGeoJSON type='ADA' />
                  <AirspaceGeoJSON type='A' />
                  <AirspaceGeoJSON type='W' />
                </React.Fragment>
                :
                type.short === 'R' ?
                  <React.Fragment>
                    <AirspaceGeoJSON type='D' />
                    <AirspaceGeoJSON type='R' />
                    <AirspaceGeoJSON type='P' />
                    <AirspaceGeoJSON type='NFL' />
                    <AirspaceGeoJSON type='NFL-BUFFER' />
                  </React.Fragment>
                  :
                  <AirspaceGeoJSON type={type.short} />
            }
          </LayerGroup>
        </Overlay>
      ))}
      <Overlay checked name='Bullseyes'>
        <LayerGroup>
          {props.state.history[props.state.step].bullseyes.map(bullseye => (
            <Bullseye
              bullseye={bullseye}
              key={`${bullseye.layer}-${bullseye.title}-${bullseye.id}`}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Friendly Markers'>
        <LayerGroup>
          {props.state.history[props.state.step].friendlyMarkers.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Hostile Markers'>
        <LayerGroup>
          {props.state.history[props.state.step].hostileMarkers.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Unknown Markers'>
        <LayerGroup>
          {props.state.history[props.state.step].unknownMarkers.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Neutral Markers'>
        <LayerGroup>
          {props.state.history[props.state.step].neutralMarkers.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Threat Markers'>
        <LayerGroup>
          {props.state.history[props.state.step].threatMarkers.map(marker => (
            <Threat
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Survivors'>
        <LayerGroup>
          {props.state.history[props.state.step].survivors.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='IPs/CPs'>
        <LayerGroup>
          {props.state.history[props.state.step].initialPoints.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Building Labels'>
        <LayerGroup>
          {props.state.history[props.state.step].buildingLabels.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Kinetic Points'>
        <LayerGroup>
          {props.state.history[props.state.step].kineticPoints.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Map Labels'>
        <LayerGroup>
          {props.state.history[props.state.step].mapLabels.map(marker => (
            <Marker
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              marker={marker}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Ellipses'>
        <LayerGroup>
          {props.state.history[props.state.step].ellipses.map(ellipse => (
            <Ellipse
              ellipse={ellipse}
              key={`ellipse-${ellipse.id}-${ellipse.title}`}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Lines'>
        <LayerGroup>
          {props.state.history[props.state.step].lines.map((line, index) => (
            <Line
              key={`line-${index}`}
              line={line}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Polygons'>
        <LayerGroup>
          {props.state.history[props.state.step].polygons.map((polygon, index) => (
            <Polygon
              key={`polygon-${index}`}
              polygon={polygon}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Rectangles'>
        <LayerGroup>
          {props.state.history[props.state.step].rectangles.map(rectangle => (
            <Rectangle
              key={`rectangle-${rectangle.id}-${rectangle.title}`}
              rectangle={rectangle}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Circles'>
        <LayerGroup>
          {props.state.history[props.state.step].circles.map(circle => (
            <Circle
              circle={circle}
              key={`circle-${circle.id}-${circle.title}`}
              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      {esriLayers.overlays.map(overlay => {
        if (overlay.baselayers.includes(props.state.map.baselayer)) {
          return (
            <Overlay
              checked={
                props.state.map.baselayer !== 'Topographic' &&
                ((overlay.name === 'Imagery Labels' && props.state.map.overlays.imagery) ||
                  (overlay.name === 'Transportation Labels' && props.state.map.overlays.transportation))
              }
              key={overlay.name}
              name={overlay.name}
            >
              <TileLayer
                maxNativeZoom={overlay.maxZoom}
                subdomains={overlay.subdomains}
                url={overlay.url}
              />
            </Overlay>
          )
        }
      })}
    </LayersControl>
  ), [props.state.history, props.state.step, props.state.history[props.state.step].anchor, props.state.history[props.state.step].sardot, props.state.tool, props.state.markerSize, props.state.map, props.state.tooltips])

  return layers
}

export default LayerControl