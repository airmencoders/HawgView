import React from 'react'

export default () => {

  const [data, setData] = React.useState(null)
  const [declination, setDeclination] = React.useState(0)

  React.useEffect(() => {
    fetch('https://www.ngdc.noaa.gov/geomag-web/calculators/calculateDeclination?lat1=30.9694&lon1=-83.2020&resultFormat=json')
      .then(response => response.json())
      .then(json => setData(json))
  }, [])

  React.useEffect(() => {
    if (data !== null) {
      setDeclination(data.result[0].declination)
    }
  }, [data])

  return (
    <div>
      <p>{declination}</p>
    </div>
  )
}