import React from 'react'
import L from 'leaflet'
import 'leaflet-ellipse'

export default (props) => {
  const [center, setCenter] = React.useState(props.center)
  const [radii, setRadii] = React.useState(props.radii)
  const [tilt, setTilt] = React.useState(props.tilt)
  const [options, setOptions] = React.useState(props.options)

  React.useEffect(() => {
    if (center !== null && radii !== null && tilt !== null && options !== null) {
      L.ellipse(center, radii, tilt, options).addTo(props.map)
    }
  }, [center, radii, tilt, options])

  return (
    null
  )
}