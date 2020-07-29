import React from 'react'

export default (props) => {

  /**
   * Since the Leaflet Ellipse plugin isn't dynamic, we're kinda hacking it here.
   * Create an ellipse with the default values that the user can then change through the drawer
   */ 
  React.useEffect(() => {
    if(props.active && props.latlng !== null) {
      props.submit('create', {
        center: props.latlng,
        color: '#4A90E2',
        dashArray: null,
        fillColor: null,
        layer: 'ellipse',
        length: 9260,
        tilt: 90,
        title: '',
        width: 4630,
      })
    }
  }, [props.active, props.latlng])

  return null
}