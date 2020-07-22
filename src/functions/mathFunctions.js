export const distanceAndHeading = (point1, point2, declination) => {
  const f1 = point1.lat
  const l1 = point1.lng
  const f2 = point2.lat
  const l2 = point2.lng

  const toRadian = Math.PI / 180
  const toDegrees = 180 / Math.PI
  const metersR = 6371 * 1000
  const nmR = 6371 * 0.539956803

  const y = Math.sin((l2 - l1) * toRadian) * Math.cos(f2 * toRadian)
  const x = Math.cos(f1 * toRadian) * Math.sin(f2 * toRadian) - Math.sin(f1 * toRadian) * Math.cos(f2 * toRadian) * Math.cos((l2 - l1) * toRadian)
  const bearing = Math.atan2(y, x) * toDegrees
  const heading = bearing + ((declination === null) ? 0 : declination)

  const deltaF = (f2 - f1) * toRadian
  const deltaL = (l2 - l1) * toRadian
  const a = Math.sin(deltaF / 2) * Math.sin(deltaF / 2) + Math.cos(f1 * toRadian) * Math.cos(f2 * toRadian) * Math.sin(deltaL / 2) * Math.sin(deltaL / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return {
    heading: heading + ((heading < 0) ? 360 : 0),
    meters: c * metersR,
    nm: c * nmR
  }
}