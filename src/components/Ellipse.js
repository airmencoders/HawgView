import React from 'react'
import L from 'leaflet'
import 'leaflet-ellipse'

export default (props) => {
  const [center,] = React.useState(props.center)
  const [radii,] = React.useState(props.radii)
  const [tilt,] = React.useState(props.tilt)
  const [options,] = React.useState(props.options)

  React.useEffect(() => {
    if (center !== null && radii !== null && tilt !== null && options !== null) {
      L.ellipse(center, radii, tilt, options).addTo(props.layer)
    }
  }, [center, radii, tilt, options])

  return (
    null
  )
}

/*export default (props) => {

  return (
    <svg>
      <ellipse
        cx='100'
        cy='50'
        rx='100'
        ry='50'
      />
    </svg>
  )
}*/