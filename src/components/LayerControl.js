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
  Circle,
  LayersControl,
  LayerGroup,
  Marker,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip,
} from 'react-leaflet'
import L from 'leaflet'
import { LatLon } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
import { airspace } from '../constants/airspace'
import Ellipse from './Ellipse'
import MGRSGrids from './MGRSGrids'
import GARSCells from './GARSCells'
import { render9line, render15line } from '../functions/renderData'

//----------------------------------------------------------------//
// React-Leaflet Layers
//----------------------------------------------------------------//
const { BaseLayer, Overlay } = LayersControl

//----------------------------------------------------------------//
// Map Control Component
//----------------------------------------------------------------//
export default (props) => {

  const useStyles = makeStyles(() => ({
    hostileThreat: {
      alignItems: 'center',
      color: 'red',
      display: 'flex',
      fontSize: props.markerSize * props.mapZoom,
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${props.markerSize * props.mapZoom}px`,
      wordWrap: 'break-word',
    },
    suspectThreat: {
      alignItems: 'center',
      color: 'yellow',
      display: 'flex',
      fontSize: props.markerSize * props.mapZoom,
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${props.markerSize * props.mapZoom}px`,
      wordWrap: 'break-word',
    },
    unknownThreat: {
      alignItems: 'center',
      color: 'white',
      display: 'flex',
      fontSize: props.markerSize * props.mapZoom,
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${props.markerSize * props.mapZoom}px`,
      wordWrap: 'break-word',
    },
    friendlyThreat: {
      alignItems: 'center',
      color: 'lime',
      display: 'flex',
      fontSize: props.markerSize * props.mapZoom,
      justifyContent: 'center',
      margin: '0',
      textAlign: 'center',
      lineHeight: `${props.markerSize * props.mapZoom}px`,
      wordWrap: 'break-word',
    },
  }))

  const classes = useStyles()

  const handleEditMarker = marker => {
    props.setFocusedMarker(marker)
    props.toggleEditMarkerDialog()
  }

  const handlePopupClose = () => {
    props.setFocusedMarker(null)
    props.setClickedLatLng(null)
  }

  const handleEditThreat = marker => {
    props.setFocusedMarker(marker)
    props.toggleEditThreatDialog()
  }

  const handleEditShape = marker => {
    props.setFocusedMarker(marker)
    props.setShapeDrawerOpen(true)
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
      <Overlay name='MGRS Lines'>
        <MGRSGrids
          map={props.map}
          zoom={props.mapZoom}
        />
      </Overlay>
      <Overlay name='GARS Cells'>
        <GARSCells
          map={props.map}
          zoom={props.mapZoom}
        />
      </Overlay>
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
          {props.interactive && props.step.friendlyMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
              })}
              id={marker.id}
              key={`friendly-${marker.id}-${marker.title}`}
              onClick={() => props.setFocusedMarker(marker)}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup
                onClose={handlePopupClose}
              >
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <br />
                {(marker.elevation !== 'Pending' && marker.elevation !== 'Elevation not found') ?
                  `${marker.elevation} feet`
                  : 'No elevation'
                }
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
          {!props.interactive && props.step.friendlyMarkers.map(marker => (
            <Marker
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
              })}
              id={marker.id}
              interactive={false}
              key={`friendly-${marker.id}-${marker.title}`}
              position={marker.latlng}
              title={marker.title}
            >
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
          {props.interactive && props.step.hostileMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`hostile-${marker.id}-${marker.title}`}
              onClick={() => props.setFocusedMarker(marker)}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup
                onClose={handlePopupClose}
              >
                {(marker.data !== null) ?
                  render9line(marker.data)
                  :
                  <React.Fragment>
                    {marker.title}
                    <br />
                    {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                    <br />
                    {(marker.elevation !== 'Pending' && marker.elevation !== 'Elevation not found') ?
                      `${marker.elevation} feet`
                      : 'No elevation'
                    }
                    <br />
                  </React.Fragment>
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
          {!props.interactive && props.step.hostileMarkers.map(marker => (
            <Marker
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              interactive={false}
              key={`hostile-${marker.id}-${marker.title}`}
              position={marker.latlng}
              title={marker.title}
            >
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
          {props.interactive && props.step.threatMarkers.map(marker => (
            <React.Fragment key={`threat-${marker.id}`}>
              <Marker
                autoPan={true}
                draggable={true}
                icon={L.divIcon({
                  className: marker.sovereignty === 'Hostile' ? classes.hostileThreat : marker.sovereignty === 'Suspect' ? classes.suspectThreat : marker.sovereignty === 'Unknown' ? classes.unknownThreat : classes.friendlyThreat,
                  html: marker.label,
                  iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
                })}
                id={marker.id}
                onClick={() => props.setFocusedMarker(marker)}
                onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
                position={marker.latlng}
                riseOnHover={true}
                title={marker.title}
              >
                <Popup
                  onClose={handlePopupClose}
                >
                  {(marker.data !== null) ?
                    render9line(marker.data)
                    :
                    <React.Fragment>
                      {marker.title}
                      <br />
                      {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                      <br />
                      {(marker.elevation !== 'Pending' && marker.elevation !== 'Elevation not found') ?
                        `${marker.elevation} feet`
                        : 'No elevation'
                      }
                      <br />
                    </React.Fragment>
                  }
                  <Button color='primary' onClick={() => handleEditThreat(marker)}>Edit</Button>
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
              <Circle
                center={marker.latlng}
                color={marker.sovereignty === 'Hostile' ? 'red' : marker.sovereignty === 'Suspect' ? 'yellow' : marker.sovereignty === 'Unknown' ? 'White' : 'Lime'}
                dashArray='12, 12'
                fill={marker.fill}
                radius={marker.unit === 'm' ? Number.parseInt(marker.range) : marker.unit === 'km' ? marker.range * 1000 : marker.range * 1852}
              >
                <Popup
                  maxWidth={1000}
                >
                  {(marker.data !== null) ?
                    render9line(marker.data)
                    :
                    <React.Fragment>
                      {marker.title}
                      <br />
                      {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                      <br />
                    </React.Fragment>
                  }
                  <Button color='primary' onClick={() => handleEditThreat(marker)}>Edit</Button>
                  <Button color='secondary' onClick={() => props.handleDeleteMarker(marker)}>Delete</Button>
                </Popup>
              </Circle>
            </React.Fragment>
          ))}
          {!props.interactive && props.step.threatMarkers.map(marker => (
            <React.Fragment key={`threat-${marker.id}`}>
              <Marker
                icon={L.divIcon({
                  className: marker.sovereignty === 'Hostile' ? classes.hostileThreat : marker.sovereignty === 'Suspect' ? classes.suspectThreat : marker.sovereignty === 'Unknown' ? classes.unknownThreat : classes.friendlyThreat,
                  html: marker.label,
                  iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
                })}
                id={marker.id}
                position={marker.latlng}
                title={marker.title}
              >
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
              <Circle
                center={marker.latlng}
                color={marker.sovereignty === 'Hostile' ? 'red' : marker.sovereignty === 'Suspect' ? 'yellow' : marker.sovereignty === 'Unknown' ? 'White' : 'Lime'}
                dashArray='12, 12'
                fill={marker.fill}
                radius={marker.unit === 'm' ? Number.parseInt(marker.range) : marker.unit === 'km' ? marker.range * 1000 : marker.range * 1852}
              >
              </Circle>
            </React.Fragment>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Survivors'>
        <LayerGroup>
          {props.interactive && props.step.survivors.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`survivor-${marker.id}-${marker.title}`}
              onClick={() => props.setFocusedMarker(marker)}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup
                maxWidth={1000}
                onClose={handlePopupClose}
              >

                {
                  (marker.data !== null) ?
                    render15line(marker.data)
                    :
                    <React.Fragment>
                      {marker.title}
                      <br />
                      {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                      <br />
                      {(marker.elevation !== 'Pending' && marker.elevation !== 'Elevation not found') ?
                        `${marker.elevation} feet`
                        : 'No elevation'
                      }
                      <br />
                    </React.Fragment>
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
          {!props.interactive && props.step.survivors.map(marker => (
            <Marker
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`survivor-${marker.id}-${marker.title}`}
              position={marker.latlng}
              title={marker.title}
            >
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
          {props.interactive && props.step.initialPoints.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`ip-${marker.id}-${marker.title}`}
              onClick={() => props.setFocusedMarker(marker)}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
              title={marker.title}
            >
              <Popup
                onClose={handlePopupClose}
              >
                {marker.title}
                <br />
                {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                <br />
                {(marker.elevation !== 'Pending' && marker.elevation !== 'Elevation not found') ?
                  `${marker.elevation} feet`
                  : 'No elevation'
                }
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
          {!props.interactive && props.step.initialPoints.map(marker => (
            <Marker
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              key={`ip-${marker.id}-${marker.title}`}
              position={marker.latlng}
              title={marker.title}
            >
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
          {props.step.buildingLabels.map(label => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.divIcon({
                className: '',
                html: label.title,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
              })}
              id={label.id}
              key={`building-label-${label.id}-${label.title}`}
              onClick={() => props.setFocusedMarker(label)}
              onDragend={event => props.handleMarkerDrag(label, event.target.getLatLng())}
              position={label.latlng}
              riseOnHover={true}
              title={label.title}
            >
              <Popup
                onClose={handlePopupClose}
              >
                {label.title}
                <br />
                {LatLon.parse(label.latlng.lat, label.latlng.lng).toUtm().toMgrs().toString()}
                <br />
                {(label.elevation !== 'Pending' && label.elevation !== 'Elevation not found') ?
                  `${label.elevation} feet`
                  : 'No elevation'
                }
                <br />
                <Button color='primary'>Edit</Button>
                <Button color='secondary'>Delete</Button>
              </Popup>
            </Marker>
          ))}
          {!props.step.buildingLabels.map(label => (
            <Marker
              icon={L.divIcon({
                className: '',
                html: label.title,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
              })}
              id={label.id}
              key={`building-label-${label.id}-${label.title}`}
              position={label.latlng}
              title={label.title}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Ellipses'>
        <LayerGroup>
          {props.interactive && props.step.ellipses.map(ellipse => (
            <Ellipse
              center={ellipse.center}
              length={ellipse.length}
              width={ellipse.width}
              tilt={ellipse.tilt}
              key={`ellipse-${ellipse.id}-${ellipse.title}`}
              options={{
                color: ellipse.color,
                dashArray: ellipse.dashArray,
                fill: ellipse.fillColor === null ? false : true,
                fillColor: ellipse.fillColor,
                weight: 4,
              }}
            >
              <Popup
                onClose={handlePopupClose}
              >
                {ellipse.title}
                <br />
                <Button color='primary' onClick={() => handleEditShape(ellipse)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(ellipse)}>Delete</Button>
              </Popup>
            </Ellipse>
          ))}
          {!props.interactive && props.step.ellipses.map(ellipse => (
            <Ellipse
              center={ellipse.center}
              length={ellipse.length}
              width={ellipse.width}
              tilt={ellipse.tilt}
              key={`ellipse-${ellipse.id}-${ellipse.title}`}
              options={{
                color: ellipse.color,
                dashArray: ellipse.dashArray,
                fill: ellipse.fillColor === null ? false : true,
                fillColor: ellipse.fillColor,
                weight: 4,
              }}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Lines'>
        <LayerGroup>
          {props.interactive && props.step.lines.map((line, index) => (
            <Polyline
              positions={line.positions}
              color={line.color}
              dashArray={line.dashArray}
              key={`line-${index}`}
              weight={4}
            >
              <Popup
                onClose={handlePopupClose}
              >
                <React.Fragment>
                  {line.title}
                  <br />
                </React.Fragment>
                <Button color='primary' onClick={() => handleEditShape(line)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(line)}>Delete</Button>
              </Popup>
            </Polyline>
          ))}
          {!props.interactive && props.step.lines.map((line, index) => (
            <Polyline
              positions={line.positions}
              color={line.color}
              dashArray={line.dashArray}
              key={`line-${index}`}
              weight={4}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Polygons'>
        <LayerGroup>
          {props.interactive && props.step.polygons.map((polygon, index) => (
            <Polygon
              positions={polygon.positions}
              color={polygon.color}
              dashArray={polygon.dashArray}
              fill={polygon.fillColor === null ? false : true}
              fillColor={polygon.fillColor}
              key={`polygon-${index}`}
              weight={4}
            >
              <Popup
                onClose={handlePopupClose}
              >
                <React.Fragment>
                  {polygon.title}
                  <br />
                </React.Fragment>
                <Button color='primary' onClick={() => handleEditShape(polygon)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(polygon)}>Delete</Button>
              </Popup>
            </Polygon>
          ))}
          {!props.interactive && props.step.polygons.map((polygon, index) => (
            <Polygon
              positions={polygon.positions}
              color={polygon.color}
              dashArray={polygon.dashArray}
              fill={polygon.fillColor === null ? false : true}
              fillColor={polygon.fillColor}
              key={`polygon-${index}`}
              weight={4}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Rectangles'>
        <LayerGroup>
          {props.interactive && props.step.rectangles.map(rectangle => (
            <Rectangle
              bounds={rectangle.bounds}
              color={rectangle.color}
              dashArray={rectangle.dashArray}
              fill={rectangle.fillColor === null ? false : true}
              fillColor={rectangle.fillColor === null ? undefined : rectangle.fillColor}
              key={`rectangle-${rectangle.id}-${rectangle.title}`}
              weight={4}
            >
              <Popup
                onClose={handlePopupClose}
              >
                <React.Fragment>
                  {rectangle.title}
                  <br />
                </React.Fragment>
                <Button color='primary' onClick={() => handleEditShape(rectangle)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(rectangle)}>Delete</Button>
              </Popup>
            </Rectangle>
          ))}
          {!props.interactive && props.step.rectangles.map(rectangle => (
            <Rectangle
              bounds={rectangle.bounds}
              color={rectangle.color}
              dashArray={rectangle.dashArray}
              fill={rectangle.fillColor === null ? false : true}
              fillColor={rectangle.fillColor === null ? undefined : rectangle.fillColor}
              key={`rectangle-${rectangle.id}-${rectangle.title}`}
              weight={4}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Circles'>
        <LayerGroup>
          {props.interactive && props.step.circles.map(circle => (
            <Circle
              center={circle.latlng}
              color={circle.color}
              dashArray={circle.dashArray}
              fill={circle.fillColor === null ? false : true}
              fillColor={circle.fillColor === null ? undefined : circle.fillColor}
              key={`circle-${circle.id}-${circle.title}`}
              radius={circle.unit === 'm' ? circle.radius : circle.unit === 'km' ? circle.radius * 1000 : circle.radius * 1852}
              weight={4}
            >
              <Popup
                onClose={handlePopupClose}
              >
                <React.Fragment>
                  {circle.title}
                  <br />
                  {LatLon.parse(circle.latlng.lat, circle.latlng.lng).toUtm().toMgrs().toString()}
                  <br />
                </React.Fragment>
                <Button color='primary' onClick={() => handleEditShape(circle)}>Edit</Button>
                <Button color='secondary' onClick={() => props.handleDeleteMarker(circle)}>Delete</Button>
              </Popup>
              {(props.tooltipsActive) ?
                <Tooltip
                  direction='top'
                  offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
                  opacity='1'
                  permanent
                >
                  {circle.title}
                </Tooltip>
                : undefined
              }
            </Circle>
          ))}
          {!props.interactive && props.step.circles.map(circle => (
            <Circle
              center={circle.latlng}
              color={circle.color}
              dashArray={circle.dashArray}
              fill={circle.fillColor === null ? false : true}
              fillColor={circle.fillColor === null ? undefined : circle.fillColor}
              key={`circle-${circle.id}-${circle.title}`}
              radius={circle.radius}
              weight={4}
            >
              {(props.tooltipsActive) ?
                <Tooltip
                  direction='top'
                  offset={L.point(0, -1 * props.markerSize * props.mapZoom)}
                  opacity='1'
                  permanent
                >
                  {circle.title}
                </Tooltip>
                : undefined
              }
            </Circle>
          ))}
        </LayerGroup>
      </Overlay>
    </LayersControl>
  )
}