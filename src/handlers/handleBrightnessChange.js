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
const minBrightness = 0
const maxBrightness = 2

const handleBrightnessDecrease = (state, setState) => {
  if (state.map.brightness > minBrightness) {
    setState({
      ...state,
      map: {
        ...state.map,
        brightness: Number.parseFloat((state.map.brightness - 0.1).toFixed(1)),
      },
    })
  }
}

const handleBrightnessIncrease = (state, setState) => {
  if (state.map.brightness < maxBrightness) {
    setState({
      ...state,
      map: {
        ...state.map,
        brightness: Number.parseFloat((state.map.brightness + 0.1).toFixed(1)),
      },
    })
  }
}

export { handleBrightnessDecrease, handleBrightnessIncrease, maxBrightness, minBrightness }