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
  GeoJSON,
} from 'react-leaflet'

import faaSUA from '../../constants/faaSUA.json'
import customGermanAirspace from '../../constants/customAirspace/customGermanAirspace.json'
import customSouthKoreanAirspace from '../../constants/customAirspace/customSouthKoreanAirspace.json'
import customThailandAirspace from '../../constants/customAirspace/customThailandAirspace.json'
import customUnitedStatesAirspace from '../../constants/customAirspace/customUnitedStatesAirspace.json'

const AirspaceGeoJSON = props => {

  let airspaceData = {
    type: 'FeatureCollection',
    name: 'Hawg View Airspace',
    features: [
      ...faaSUA.features,
      ...customGermanAirspace.features,
      ...customSouthKoreanAirspace.features,
      ...customThailandAirspace.features,
      ...customUnitedStatesAirspace.features,
    ]
  }

  let data = airspaceData.features.filter(feature => feature.properties.TYPE_CODE === props.type)

  let lowMoas, moas
  if (props.type === 'MOA') {
    lowMoas = data.filter(feature => (feature.properties.NAME.includes('LOW') || feature.properties.NAME.includes('MOODY 2')))
    moas = data.filter(feature => !(feature.properties.NAME.includes('LOW') || feature.properties.NAME.includes('MOODY 2')))
  }

  if (props.type === 'MOA') {
    return (
      <React.Fragment>
        <GeoJSON
          data={lowMoas}
          style={{
            color: '#00ff00',
            fill: false,
            weight: 2,
          }}
        />
        <GeoJSON
          data={moas}
          style={{
            color: '#00ffff',
            fill: false,
            weight: 2,
          }}
        />
      </React.Fragment>
    )
  } else {
    return (
      <GeoJSON
        data={data}
        style={feature => {
          switch (feature.properties.TYPE_CODE) {
            case 'LLZ':
              return {
                color: '#ff00ff',
                fill: false,
                weight: 2,
              }
            case 'LOW':
              return {
                color: '#00ff00',
                fill: false,
                weight:2,
              }
            case 'ADA':
            case 'A':
            case 'W':
              return {
                color: '#ff9000',
                fill: false,
                weight: 2,
              }
            case 'D':
            case 'R':
            case 'P':
              return {
                color: '#ff0000',
                fill: false,
                weight: 2,
              }
            case 'AAR':
              return {
                color: '#070080',
                fill: false,
                weight: 2,
              }
            case 'ATCAA':
              return {
                color: '#ffff00',
                fill: false,
                weight: 2,
              }
            case 'NFL':
              return {
                color: '#000000',
                dashArray: '20,10,10,10',
                weight: 2,
              }
            case 'NFL-BUFFER':
              return {
                color: '#ff0000',
                dashArray: '20,10,10,10',
                weight: 2,
              }
          }
        }}
      />
    )
  }
}

export default AirspaceGeoJSON