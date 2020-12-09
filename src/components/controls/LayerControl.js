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
import L from 'leaflet'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  Button
} from '@material-ui/core'

//----------------------------------------------------------------//
// React Leaflet Components
//----------------------------------------------------------------//
import {
  Circle,
  LayersControl,
  LayerGroup,
  Polygon,
  Polyline,
  Popup,
  Rectangle,
  TileLayer,
  Tooltip,
} from 'react-leaflet'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  Bullseye,
  Marker,
  MGRSGrids,
  GARSCells,
  Threat,
} from '../layers'
import {
  Ellipse,
} from '../tools'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import { airspace } from '../../constants/airspace'

//----------------------------------------------------------------//
// Geodesy Functions
//----------------------------------------------------------------//
import { LatLon as LL } from 'geodesy/mgrs'

//----------------------------------------------------------------//
// Map Control Component
//----------------------------------------------------------------//
const LayerControl = props => {

  const { BaseLayer, Overlay } = LayersControl

  const handleEditShape = shape => {
    props.setFocusedShape(shape)
    //props.setActiveDialog('editShape')

    props.setState({
      ...props.state,
      dialog: {
        anchor: null,
        name: 'editShape',
      },
    })
  }

  // Only for Circle || Ellipse || Bullseye
  const generateShapePopupText = shape => {
    let position
    let center

    if (shape.layer === 'ellipse') {
      center = shape.center
    } else {
      center = shape.latlng
    }
    try {
      position = LL.parse(center.lat, center.lng).toUtm().toMgrs().toString()
    } catch (e) {
      position = `${center.lat.toFixed(4)}, ${center.lng.toFixed(4)}`
    }
    return (
      <React.Fragment>
        {shape.title}
        <br />
        {position}
      </React.Fragment>
    )
  }

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
          opacity={props.brightness > 1 ? 2 - props.brightness : props.brightness}
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
          opacity={props.brightness > 1 ? 2 - props.brightness : props.brightness}
        />
      </BaseLayer>
      <Overlay name='MGRS Lines'>
        <MGRSGrids
          center={props.mapCenter}
          map={props.map}
          style={props.step.styles.mgrs}
          zoom={props.mapZoom}
        />
      </Overlay>
      <Overlay name='GARS Cells'>
        <GARSCells
          center={props.mapCenter}
          map={props.map}
          style={props.step.styles.gars}
          zoom={props.mapZoom}
        />
      </Overlay>
      <Overlay checked name='Geo Labels'>
        <TileLayer
          url='https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}'
          maxNativeZoom={19}
        />
      </Overlay>
      <Overlay name='Road Labels'>
        <TileLayer
          url='https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}'
          maxNativeZoom={19}
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
      <Overlay checked name='Bullseyes'>
        <LayerGroup>
          {props.step.bullseyes.map(bullseye => (
            <Bullseye
              bullseye={bullseye}  
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              interactive={props.interactive}
              key={`${bullseye.layer}-${bullseye.title}-${bullseye.id}`}
              markerSize={props.markerSize}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedShape={shape => props.setFocusedShape(shape)}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Friendly Markers'>
        <LayerGroup>
          {props.step.friendlyMarkers.map(marker => (
            <Marker
              anchor={props.anchor}
              interactive={props.interactive}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              markerSize={props.markerSize}
              marker={marker}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedMarker={marker => props.setFocusedMarker(marker)}
              setFocusedShape={shape => props.setFocusedShape(shape)}
              //toggleEditMarkerDialog={() => props.toggleEditMarkerDialog()}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Hostile Markers'>
        <LayerGroup>
          {props.step.hostileMarkers.map(marker => (
            <Marker
              anchor={props.anchor}
              interactive={props.interactive}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              markerSize={props.markerSize}
              marker={marker}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedMarker={marker => props.setFocusedMarker(marker)}
              setFocusedShape={shape => props.setFocusedShape(shape)}
              //toggleEditMarkerDialog={() => props.toggleEditMarkerDialog()}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Threat Markers'>
        <LayerGroup>
          {props.step.threatMarkers.map(marker => (
            <Threat
              anchor={props.anchor}
              interactive={props.interactive}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              markerSize={props.markerSize}
              marker={marker}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedLatlng={latlng => props.setFocusedLatlng(latlng)}
              setFocusedMarker={marker => props.setFocusedMarker(marker)}
              setFocusedShape={shape => props.setFocusedShape(shape)}
              //toggleEditMarkerDialog={() => props.toggleEditMarkerDialog()}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Survivors'>
        <LayerGroup>
          {props.step.survivors.map(marker => (
            <Marker
              anchor={props.anchor}
              interactive={props.interactive}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              markerSize={props.markerSize}
              marker={marker}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedMarker={marker => props.setFocusedMarker(marker)}
              //toggleEditMarkerDialog={() => props.toggleEditMarkerDialog()}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='IPs/CPs'>
        <LayerGroup>
          {props.step.initialPoints.map(marker => (
            <Marker
              anchor={props.anchor}
              interactive={props.interactive}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              markerSize={props.markerSize}
              marker={marker}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedMarker={marker => props.setFocusedMarker(marker)}
              setFocusedShape={shape => props.setFocusedShape(shape)}
              //toggleEditMarkerDialog={() => props.toggleEditMarkerDialog()}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Building Labels'>
        <LayerGroup>
          {props.step.buildingLabels.map(marker => (
            <Marker
              anchor={props.anchor}
              color={props.step.styles.buildingLabel.color}
              interactive={props.interactive}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              markerSize={props.markerSize}
              marker={marker}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedMarker={marker => props.setFocusedMarker(marker)}
              setFocusedShape={shape => props.setFocusedShape(shape)}
              //toggleEditMarkerDialog={() => props.toggleEditMarkerDialog()}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Kinetic Points'>
        <LayerGroup>
          {props.step.kineticPoints.map(marker => (
            <Marker
              anchor={props.anchor}
              interactive={props.interactive}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              markerSize={props.markerSize}
              marker={marker}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedMarker={marker => props.setFocusedMarker(marker)}
              setFocusedShape={shape => props.setFocusedShape(shape)}
              //toggleEditMarkerDialog={() => props.toggleEditMarkerDialog()}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
            />
          ))}
        </LayerGroup>
      </Overlay>
      <Overlay checked name='Map Labels'>
        <LayerGroup>
          {props.step.mapLabels.map(marker => (
            <Marker
              anchor={props.anchor}
              interactive={props.interactive}
              handleMarkerDrag={(marker, latlng) => props.handleMarkerDrag(marker, latlng)}
              handleDeleteMarker={marker => props.handleDeleteMarker(marker)}
              key={`${marker.layer}-${marker.title}-${marker.id}`}
              markerSize={props.markerSize}
              marker={marker}
              mapZoom={props.mapZoom}
              //setActiveDialog={dialog => props.setActiveDialog(dialog)}
              setFocusedMarker={marker => props.setFocusedMarker(marker)}
              setFocusedShape={shape => props.setFocusedShape(shape)}
              //toggleEditMarkerDialog={() => props.toggleEditMarkerDialog()}
              tooltipsActive={props.tooltipsActive}

              setState={props.setState}
              state={props.state}
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
                autoPan={false}
              >
                {generateShapePopupText(ellipse)}
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
                autoPan={false}
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
                autoPan={false}
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
                autoPan={false}
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
                autoPan={false}
              >
                {generateShapePopupText(circle)}
                <br />
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
              radius={circle.unit === 'm' ? circle.radius : circle.unit === 'km' ? circle.radius * 1000 : circle.radius * 1852}
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
  ), [props.step, props.anchor, props.interactive, props.mapZoom, props.markerSize, props.tooltipsActive, props.brightness])

 return layers
}

export default LayerControl