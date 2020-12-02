/**
 * ${SUMMARY}
 * 
 * ${DESCRIPTION}
 * 
 * @author  chris-m92
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Airmen Coders
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
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
  const heading = bearing - ((declination === null) ? 0 : declination)

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