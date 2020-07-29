// https://www.manongdao.com/article-2180787.html

import React from 'react'
import L from 'leaflet'
import 'leaflet-ellipse'
import { Path, withLeaflet } from 'react-leaflet'

class Ellipse extends Path {

  createLeafletElement(props) {
    return new L.ellipse(props.center, [props.length, props.width], props.tilt, props.options)
  }

  updateLeafletElement(fromProps, toProps) {
    if (toProps.center !== fromProps.center) {
      this.leafletElement.setLatLng(toProps.center)
    }

    if (toProps.tilt !== fromProps.tilt) {
      this.leafletElement.setTilt(toProps.tilt)
    }

    if (toProps.options !== fromProps.options) {
      this.leafletElement.setStyle(toProps.options)
    }

    if (toProps.length !== fromProps.length || toProps.width !== fromProps.width) {
      this.leafletElement.setRadius([toProps.length, toProps.width])
    }
  }
}

export default withLeaflet(Ellipse);