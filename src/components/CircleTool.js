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

    return () => {
      document.removeEventListener('keydown', handleEsc, false)
    }
  }, [props.active])

  React.useEffect(() => {
    if (props.latlng !== null && props.mouseCoords !== null) {
      setRadius(distanceAndHeading(props.latlng, props.mouseCoords, 0).meters)
    }
  }, [props.mouseCoords])

  React.useEffect(() => {
    if (center === null) {
      setCenter(props.latlng)
    }

    if (center !== null && props.latlng !== null && props.latlng !== center) {
      setCenter(null)
      setRadius(0)
      props.submit(center, radius)
    }
  }, [center, props.latlng])

  const handleEsc = event => {
    if (props.active && event.key === 'Escape') {
      props.toggle()
      setRadius(0)
      setCenter(null)
    }
  }

  if (center !== null && props.active) {
    return (
      <FeatureGroup>
        <Circle
          center={center}
          color={props.color}
          radius={radius}
        />
      </FeatureGroup>
    )
  } else {
    return null
  }
}