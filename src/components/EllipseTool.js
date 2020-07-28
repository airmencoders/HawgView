import React from 'react'
import L from 'leaflet'
import 'leaflet-ellipse'

import {
  LayerGroup,
} from 'react-leaflet'

export default (props) => {

  const [center, setCenter] = React.useState([36.2794, -86.1328])
  const [radii, setRadii] = React.useState([500, 200])
  const [tilt, setTilt] = React.useState(0)
  const [options, setOptions] = React.useState({color: '#4A90E2', fill: false})

  console.log('ellipse', L.ellipse(center, radii, tilt, options))
  return (
    <LayerGroup>
      
    </LayerGroup>
  )
}