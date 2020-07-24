import React from 'react'
import {
  Circle,
  FeatureGroup
} from 'react-leaflet'
import { distanceAndHeading } from '../functions/mathFunctions'

export default (props) => {

  const [radius, setRadius] = React.useState(0)
  const [center, setCenter] = React.useState(null)

  React.useEffect(() => {
    document.addEventListener('keydown', handleEsc, false)
    setCenter(null)
    setRadius(0)

    return () => {
      document.removeEventListener('keydown', handleEsc, false)
      setCenter(null)
      setRadius(0)
    }
  }, [props.active])

  React.useEffect(() => {
    if (props.active && props.latlng !== null && props.mouseCoords !== null) {
      setRadius(distanceAndHeading(props.latlng, props.mouseCoords, 0).meters)
    }
  }, [props.active, props.latlng, props.mouseCoords])

  React.useEffect(() => {
    if (props.active && center === null) {
      setCenter(props.latlng)
    }

    if (props.active && center !== null && radius !== 0) {
      props.submit('create', {
        color: '#4A90E2',
        dashArray: null,
        fillColor: null,
        latlng: center,
        layer: 'circle',
        radius: radius,
        title: '',
      })
    }
  }, [props.active, props.latlng])

  const handleEsc = event => {
    if (props.active && event.key === 'Escape') {
      setRadius(0)
      setCenter(null)
      props.toggle()
    }
  }

  if (props.active && center !== null) {
    return (
      <FeatureGroup>
        <Circle
          center={center}
          color='#4A90E2'
          fill={null}
          radius={radius}
        />
      </FeatureGroup>
    )
  } else {
    return null
  }
}