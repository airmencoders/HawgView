
const getElevation = (lat, lng) => {
  let elevation = 0

  fetch(`https://nationalmap.gov/epqs/pqs.php?x=${lng}&y=${lat}&units=Feet&output=json`)
    .then(response => response.json())
    .then(json => (Number.parseInt(json.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation) === -1000000) ? elevation = 0 : elevation = Number.parseInt(json.USGS_Elevation_Point_Query_Service.Elevation_Query.Elevation))

  return elevation
}

export default getElevation