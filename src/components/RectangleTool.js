import React from 'react'
import {
  FeatureGroup,
  Rectangle,
} from 'react-leaflet'

export default (props) => {

  const [startLatlng, setStartLatlng] = React.useState(null)
  const [endLatlng, setEndLatlng] = React.useState(null)

  React.useEffect(() => {
    document.addEventListener('keydown', handleEsc, false)
    setStartLatlng(null)
    setEndLatlng(null)

    return () => {
      document.removeEventListener('keydown', handleEsc, false)
      setStartLatlng(null)
      setEndLatlng(null)
    }
  }, [props.active])

  React.useEffect(() => {
    if (startLatlng === null) {
      setStartLatlng(props.latlng)
    }

    if (props.active && startLatlng !== null) {
      props.submit({bounds: [startLatlng, props.latlng]})
    }
  }, [props.latlng])

  const handleEsc = event => {
    if (props.active && event.key === 'Escape') {
      setStartLatlng(null)
      setEndLatlng(null)
      props.toggle()
    }
  }


  if (props.active && startLatlng !== null & props.mouseCoords !== null) {
    return (
      <FeatureGroup>
        <Rectangle
          bounds={[startLatlng, props.mouseCoords]}
          color={props.color}
        />
      </FeatureGroup>
    )
  } else {
    return null
  }
}