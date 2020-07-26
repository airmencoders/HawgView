import React from 'react'
import {
  FeatureGroup,
  Rectangle,
} from 'react-leaflet'

export default (props) => {

  const [startLatlng, setStartLatlng] = React.useState(null)

  React.useEffect(() => {
    document.addEventListener('keydown', handleEsc, false)
    setStartLatlng(null)

    return () => {
      document.removeEventListener('keydown', handleEsc, false)
      setStartLatlng(null)
    }
  }, [props.active])

  React.useEffect(() => {
    if (props.active && startLatlng === null) {
      setStartLatlng(props.latlng)
    }

    if (props.active && startLatlng !== null) {
      props.submit('create', {
        bounds: [startLatlng, props.latlng],
        color: '#4A90E2',
        dashArray: null,
        fillColor: null,
        layer: 'rectangle',
        title: '',
      })
    }
  }, [props.latlng])

  const handleEsc = event => {
    if (props.active && event.key === 'Escape') {
      setStartLatlng(null)
      props.toggle()
    }
  }

  if (props.active && startLatlng !== null & props.mouseCoords !== null) {
    return (
      <FeatureGroup>
        <Rectangle
          bounds={[startLatlng, props.mouseCoords]}
          color='#4A90E2'
          fill={null}
          weight={4}
        />
      </FeatureGroup>
    )
  } else {
    return null
  }
}