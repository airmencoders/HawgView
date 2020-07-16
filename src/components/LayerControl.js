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
  TileLayer,
  Tooltip,
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
export default (props) => {

  const handleEditMarker = marker => {
    props.setFocusedMarker(marker)
    props.toggleEditMarkerDialog()
    /*switch(marker.sovereignty) {
      case 'friendly':
        props.toggleEditMarkerDialog()
        break
      default:
        console.error(`Error: Could not edit marker (${marker.title}). Unhandled sovereignty (${marker.sovereignty})`)
    }*/
  }

  return (
    <LayersControl position='topright'>
      <BaseLayer checked name='ESRI Imagery Firefly'>
        <TileLayer
          className='leaflet-layer-imagery'
          url='https://fly.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}'
          attribution={`Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community`}
          keepMounted
        />
      </BaseLayer>
      <BaseLayer name='ESRI Imagery Clarity'>
        <TileLayer
          className='leaflet-layer-imagery'
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
          {props.friendlyMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
              })}
              id={marker.id}
              key={`friendly-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <br />
                <Button color='primary' onClick={() => handleEditMarker(marker)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(marker)}>Delete</Button>
              </Popup>
              {(props.tooltipsActive) ?
                <Tooltip
                  direction='top'
                  offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
                  opacity='1'
                  permanent
                >
                  {marker.title}
                </Tooltip>
                : undefined
              }
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Hostile Markers'>
        <LayerGroup>
          {props.hostileMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`hostile-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <br />
                {
                  (marker.data !== null) ?
                    <table>
                      <tbody>
                        <tr>
                          <td>Label</td>
                          <td>{marker.data.label}</td>
                        </tr>
                        <tr>
                          <td>Type/Method</td>
                          <td>{marker.data.typeMethod}</td>
                        </tr>
                        <tr>
                          <td>IP / Hdg / Distance</td>
                          <td>{marker.data.ipHdgDistance}</td>
                        </tr>
                        <tr>
                          <td>Elevation</td>
                          <td>{marker.data.elevation}</td>
                        </tr>
                        <tr>
                          <td>Description</td>
                          <td>{marker.data.description}</td>
                        </tr>
                        <tr>
                          <td>Location</td>
                          <td>{marker.data.location}</td>
                        </tr>
                        <tr>
                          <td>Mark</td>
                          <td>{marker.data.mark}</td>
                        </tr>
                        <tr>
                          <td>Friendlies</td>
                          <td>{marker.data.friendlies}</td>
                        </tr>
                        <tr>
                          <td>Egress</td>
                          <td>{marker.data.egress}</td>
                        </tr>
                        <tr>
                          <td>Remarks/Restrictions</td>
                          <td>{marker.data.remarks}</td>
                        </tr>
                      </tbody>
                    </table>
                    : null
                }
                <Button color='primary' onClick={() => handleEditMarker(marker)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(marker)}>Delete</Button>
              </Popup>
              {(props.tooltipsActive) ?
                <Tooltip
                  direction='top'
                  offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
                  opacity='1'
                  permanent
                >
                  {marker.title}
                </Tooltip>
                : undefined
              }
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Threat Markers'>
        <LayerGroup>
          {props.threatMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`threat-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <br />
                <Button color='primary' onClick={() => handleEditMarker(marker)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(marker)}>Delete</Button>
              </Popup>
              {(props.tooltipsActive) ?
                <Tooltip
                  direction='top'
                  offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
                  opacity='1'
                  permanent
                >
                  {marker.title}
                </Tooltip>
                : undefined
              }
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Survivors'>
        <LayerGroup>
          {props.survivors.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`survivor-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <br />
                <Button color='primary' onClick={() => handleEditMarker(marker)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(marker)}>Delete</Button>
              </Popup>
              {(props.tooltipsActive) ?
                <Tooltip
                  direction='top'
                  offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
                  opacity='1'
                  permanent
                >
                  {marker.title}
                </Tooltip>
                : undefined
              }
            </Marker>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='IPs'>
        <LayerGroup>
          {props.initialPoints.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                type: marker.iconType,
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`ip-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup>
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <br />
                <Button color='primary' onClick={() => handleEditMarker(marker)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(marker)}>Delete</Button>
              </Popup>
              {(props.tooltipsActive) ?
                <Tooltip
                  direction='top'
                  offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
                  opacity='1'
                  permanent
                >
                  {marker.title}
                </Tooltip>
                : undefined
              }
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