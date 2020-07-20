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

//----------------------------------------------------------------//
// React-Leaflet Layers
//----------------------------------------------------------------//
const { BaseLayer, Overlay } = LayersControl

//----------------------------------------------------------------//
// Map Control Component
//----------------------------------------------------------------//
export default (props) => {

  const interactive = props.mouseClickActive

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

  const handleEditThreat = marker => {
    props.setFocusedMarker(marker)
    props.toggleEditThreatDialog()
  }

  const render9line = data => (
    <table>
      <tbody>
        <tr>
          <td>Label</td>
          <td>{data.label}</td>
        </tr>
        <tr>
          <td>Type/Method</td>
          <td>{data.typeMethod}</td>
        </tr>
        <tr>
          <td>IP / Hdg / Distance</td>
          <td>{data.ipHdgDistance}</td>
        </tr>
        <tr>
          <td>Elevation</td>
          <td>{data.elevation}</td>
        </tr>
        <tr>
          <td>Description</td>
          <td>{data.description}</td>
        </tr>
        <tr>
          <td>Location</td>
          <td>{data.location}</td>
        </tr>
        <tr>
          <td>Mark</td>
          <td>{data.mark}</td>
        </tr>
        <tr>
          <td>Friendlies</td>
          <td>{data.friendlies}</td>
        </tr>
        <tr>
          <td>Egress</td>
          <td>{data.egress}</td>
        </tr>
        <tr>
          <td>Remarks/Restrictions</td>
          <td>{data.remarks}</td>
        </tr>
      </tbody>
    </table>
  )

  const render15line = data => (
    <table style={{ width: '500px' }}>
      <tbody>
        <tr>
          <td>Callsign/Freq/PLS/HHRID</td>
          <td>{data.callsign} / {data.frequency} / {data.plsHhrid}</td>
        </tr>
        <tr>
          <td>Number of Objectives</td>
          <td>{data.numObjectives}</td>
        </tr>
        <tr>
          <td>Location/Elevation/Date/Time(z)/Source</td>
          <td>{data.location} / {data.elevation} / {data.dateTime} / {data.source}</td>
        </tr>
        <tr>
          <td>Condition</td>
          <td>{data.condition}</td>
        </tr>
        <tr>
          <td>Equipment</td>
          <td>{data.equipment}</td>
        </tr>
        <tr>
          <td>Authentication</td>
          <td>{data.authentication}</td>
        </tr>
        <tr>
          <td>Threats</td>
          <td>{data.threats}</td>
        </tr>
        <tr>
          <td>PZ Description</td>
          <td>{data.pzDescription}</td>
        </tr>
        <tr>
          <td>OSC/frequency</td>
          <td>{data.oscFreq}</td>
        </tr>
        <tr>
          <td>IP/Heading</td>
          <td>{data.ipHdg}</td>
        </tr>
        <tr>
          <td>Rescort</td>
          <td>{data.rescort}</td>
        </tr>
        <tr>
          <td>Terminal Area Gameplan</td>
          <td>{data.gameplan}</td>
        </tr>
        <tr>
          <td>Signal</td>
          <td>{data.signal}</td>
        </tr>
        <tr>
          <td>Egress Hdg</td>
          <td>{data.egress}</td>
        </tr>
      </tbody>
    </table>
  )

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
          {interactive && props.friendlyMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
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
          {!interactive && props.friendlyMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
              })}
              id={marker.id}
              interactive={false}
              key={`friendly-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
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
          {interactive && props.hostileMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
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
          {!interactive && props.hostileMarkers.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              interactive={false}
              key={`hostile-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
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
          {interactive && props.threatMarkers.map(marker => (
            <React.Fragment key={`threat-${marker.id}`}>
              <Marker
                autoPan={true}
                className={classes.hostileThreat}
                draggable={true}
                icon={L.divIcon({
                  className: marker.sovereignty === 'Hostile' ? classes.hostileThreat : marker.sovereignty === 'Suspect' ? classes.suspectThreat : marker.sovereignty === 'Unknown' ? classes.unknownThreat : classes.friendlyThreat,
                  html: marker.label,
                  iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
                })}
                id={marker.id}
                onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
                position={marker.latlng}
                riseOnHover={true}
                title={marker.title}
              >
                <Popup>
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
          {!interactive && props.threatMarkers.map(marker => (
            <React.Fragment key={`threat-${marker.id}`}>
              <Marker
                autoPan={true}
                className={classes.hostileThreat}
                draggable={true}
                icon={L.divIcon({
                  className: marker.sovereignty === 'Hostile' ? classes.hostileThreat : marker.sovereignty === 'Suspect' ? classes.suspectThreat : marker.sovereignty === 'Unknown' ? classes.unknownThreat : classes.friendlyThreat,
                  html: marker.label,
                  iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom],
                })}
                id={marker.id}
                interactive={false}
                onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
                position={marker.latlng}
                riseOnHover={true}
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
                interactive={false}
                radius={marker.unit === 'm' ? Number.parseInt(marker.range) : marker.unit === 'km' ? marker.range * 1000 : marker.range * 1852}
              />
            </React.Fragment>
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Survivors'>
        <LayerGroup>
          {interactive && props.survivors.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
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
              <Popup
                maxWidth={1000}
              >

                {
                  (marker.data !== null) ?
                    render15line(marker.data)
                    :
                    <React.Fragment>
                      {marker.title}
                      < br />
                      {LatLon.parse(marker.latlng.lat, marker.latlng.lng).toUtm().toMgrs().toString()}
                      < br />
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
          {!interactive && props.survivors.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              interactive={false}
              key={`survivor-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
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
          {interactive && props.initialPoints.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
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
          {!interactive && props.initialPoints.map(marker => (
            <Marker
              autoPan={true}
              draggable={true}
              icon={L.icon({
                iconUrl: marker.iconUrl,
                iconSize: [props.markerSize * props.mapZoom, props.markerSize * props.mapZoom]
              })}
              id={marker.id}
              interactive={false}
              key={`ip-${marker.id}-${marker.title}`}
              onDragend={event => props.handleMarkerDrag(marker, event.target.getLatLng())}
              position={marker.latlng}
              riseOnHover={true}
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
      <Overlay checked name='Circles'>
        <LayerGroup>
          {props.circles.map((circle, index) => (
            <Circle
              center={circle.center}
              color={circle.color}
              key={`circle-${index}`}
              radius={circle.radius}
            />
          ))}
        </LayerGroup>
      </Overlay>
    </LayersControl>
  )
}