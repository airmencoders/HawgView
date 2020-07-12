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
import {
  LayersControl,
  LayerGroup,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer
} from 'react-leaflet'
import L from 'leaflet'
import { LatLon } from 'geodesy/mgrs'

import Divider from '@material-ui/core/Divider'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import { airspace } from '../constants/airspace'

//----------------------------------------------------------------//
// React-Leaflet Layers
//----------------------------------------------------------------//
const { BaseLayer, Overlay } = LayersControl

//----------------------------------------------------------------//
// Map Control Component
//----------------------------------------------------------------//
export default ({ friendlyMarkers, handleMarkerDrag, hostileMarkers, initialPoints, mapZoom, markerSize, survivors, threatMarkers }) => {

  return (
    <LayersControl position='topright'>
      <BaseLayer checked name='ESRI Imagery Firefly'>
        <TileLayer
          url='https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}'
          attribution={`Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community`}
          keepMounted
        />
      </BaseLayer>
      <BaseLayer name='ESRI Imagery Clarity'>
        <TileLayer
          url='https://clarity.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
          attribution={`Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community`}
          keepMounted
        />
      </BaseLayer>
      <Overlay checked name='Map Labels'>
        <TileLayer
          url='https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
        />
      </Overlay>
      <Overlay name='Road Labels'>
        <TileLayer
          url='https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'
        />
      </Overlay>
      <Overlay checked name='Airspace'>
        <LayerGroup>
          <Polygon
            clickable={false}
            color='#ff00ff'
            fill={false}
            positions={airspace.llzs}
            weight={2}
          />
          <Polygon
            clickable={false}
            color='#00ff00'
            fill={false}
            positions={airspace.lowMoas}
            weight={2}
          />
          <Polygon
            clickable={false}
            color='#00ffff'
            fill={false}
            positions={airspace.moas}
            weight={2}
          />
          <Polygon
            clickable={false}
            color='#ff9000'
            fill={false}
            positions={airspace.warningAreas}
            weight={2}
          />
          <Polygon
            clickable={false}
            color='#ff0000'
            fill={false}
            positions={airspace.restrictedAreas}
            weight={2}
          />
          <Polyline
            clickable={false}
            color='#ff0000'
            positions={airspace.p518}
            weight={2}
          />
          <Polyline
            clickable={false}
            color='#000000'
            dashArray='20, 10, 10, 10'
            positions={airspace.koreaNfl}
            weight={2}
          />
          <Polyline
            clickable={false}
            color='#ff0000'
            dashArray='20, 10, 10, 10'
            positions={airspace.koreaNflBuffer}
            weight={2}
          />
        </LayerGroup>
      </Overlay>
      <Overlay checked name='AARs'>
        <Polygon
          clickable={false}
          color='#070080'
          fill={false}
          positions={airspace.aars}
          weight={2}
        />
      </Overlay>
      <Overlay checked name='ATCAAs'>
        <Polygon
          clickable={false}
          color='#ffff00'
          fill={false}
          positions={airspace.atcaas}
          weight={2}
        />
      </Overlay>
      <Overlay checked name='Friendly Markers'>
        <LayerGroup>
          {friendlyMarkers.map(marker => (
            <Marker
              autoPan={marker.autoPan}
              draggable={marker.draggable}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [markerSize * mapZoom, markerSize * mapZoom]
              })}
              id={marker.id}
              key={`friendly-${marker.id}-${marker.title}`}
              onDragend={event => handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={marker.riseOnHover}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <Divider />
                <Button color='primary'>Edit</Button>
                <Button color='secondary'>Delete</Button>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Hostile Markers'>
        <LayerGroup>
          {hostileMarkers.map(marker => (
            <Marker
              autoPan={marker.autoPan}
              draggable={marker.draggable}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [markerSize * mapZoom, markerSize * mapZoom]
              })}
              id={marker.id}
              key={`hostile-${marker.id}-${marker.title}`}
              onDragend={event => handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={marker.riseOnHover}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <Divider />
                <Button color='primary'>Edit</Button>
                <Button color='secondary'>Delete</Button>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Threat Markers'>
        <LayerGroup>
          {threatMarkers.map(marker => (
            <Marker
              autoPan={marker.autoPan}
              draggable={marker.draggable}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [markerSize * mapZoom, markerSize * mapZoom]
              })}
              id={marker.id}
              key={`threat-${marker.id}-${marker.title}`}
              onDragend={event => handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={marker.riseOnHover}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <Divider />
                <Button color='primary'>Edit</Button>
                <Button color='secondary'>Delete</Button>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Survivors'>
        <LayerGroup>
          {survivors.map(marker => (
            <Marker
              autoPan={marker.autoPan}
              draggable={marker.draggable}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [markerSize * mapZoom, markerSize * mapZoom]
              })}
              id={marker.id}
              key={`survivor-${marker.id}-${marker.title}`}
              onDragend={event => handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={marker.riseOnHover}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <Divider />
                <Button color='primary'>Edit</Button>
                <Button color='secondary'>Delete</Button>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='IPs'>
        <LayerGroup>
          {initialPoints.map(marker => (
            <Marker
              autoPan={marker.autoPan}
              draggable={marker.draggable}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [markerSize * mapZoom, markerSize * mapZoom]
              })}
              id={marker.id}
              key={`ip-${marker.id}-${marker.title}`}
              onDragend={event => handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={marker.riseOnHover}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <Divider />
                <Button color='primary'>Edit</Button>
                <Button color='secondary'>Delete</Button>
              </Popup>
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Building Labels'>
        <LayerGroup>

        </LayerGroup>
      </Overlay>
      <Overlay checked name='CAPs'>
        <LayerGroup>

        </LayerGroup>
      </Overlay>
      <Overlay checked name='Lines'>
        <LayerGroup>

        </LayerGroup>
      </Overlay>
      <Overlay checked name='Polygons'>
        <LayerGroup>

        </LayerGroup>
      </Overlay>
      <Overlay checked name='Engagement Areas'>
        <LayerGroup>

        </LayerGroup>
      </Overlay>
      <Overlay checked name='ROZs'>
        <LayerGroup>

        </LayerGroup>
      </Overlay>
    </LayersControl>
  )
}