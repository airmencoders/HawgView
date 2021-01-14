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

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
//import { airspace } from '../../constants/airspace'

//import faaSUA from '../../constants/faaSUA.json'

//----------------------------------------------------------------//
// Map Control Component
//----------------------------------------------------------------//
const LayerControl = props => {

  const { BaseLayer, Overlay } = LayersControl

  const airspaceTypes = [
    // LLZ
    'LLZ',        // SOUTH KOREA
    // LOW MOA/MOA/LANTA
    'LOW',
    'MOA',
    'MOA-DIVISION',
    // Advisory/Warning/Alert
    'ADA',        // CANADA
    'A',
    'W',
    // Danger/Restricted/Prohibited
    'D',          // CANADA
    'R',
    'P',
  ]

  const layers = React.useMemo(() => (
    <LayersControl position='topright'>
      <BaseLayer
        checked
        name='ESRI Imagery Firefly'
      >
        <TileLayer
          className='leaflet-layer-imagery'
          url='https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}'
          attribution={`Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community`}
          maxNativeZoom={17}
          opacity={props.state.map.brightness > 1 ? 2 - props.state.map.brightness : props.state.map.brightness}
          keepMounted
        />
      </BaseLayer>
      <BaseLayer name='ESRI Imagery Clarity'>
        <TileLayer
          className='leaflet-layer-imagery'
          url='https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          attribution={`Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community`}
          maxNativeZoom={17}
          keepMounted
          opacity={props.state.map.brightness > 1 ? 2 - props.state.map.brightness : props.state.map.brightness}
        />
      </BaseLayer>
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
      <Overlay checked name='Geo Labels'>
        <TileLayer
          url='https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
          maxNativeZoom={17}
        />
      </Overlay>
      <Overlay name='Road Labels'>
        <TileLayer
          url='https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'
          maxNativeZoom={17}
        />
      </Overlay>
      <Overlay checked name='Airspace'>
        <LayerGroup>
          {airspaceTypes.map(type => (
            <AirspaceGeoJSON
              key={type}
              type={type}
            />
          ))}
        </LayerGroup>
      </Overlay>
      {/*<Overlay checked name='AARs'>
        <RLPolygon
          clickable={false}
          color='#070080'
          fill={false}
          positions={airspace.aars}
          weight={2}
        />
      </Overlay>
      <Overlay checked name='ATCAAs'>
        <RLPolygon
          clickable={false}
          color='#ffff00'
          fill={false}
          positions={airspace.atcaas}
          weight={2}
        />
          </Overlay>*/}
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
    </LayersControl>
  ), [props.state.history, props.state.step, props.state.history[props.state.step].anchor, props.state.markerSize, props.state.map, props.state.tooltips])

  return layers
}

export default LayerControl