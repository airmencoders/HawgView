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
import React from 'react'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  InputBase,
} from '@material-ui/core'

import {
  Room as RoomIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Hawg View Constants
//----------------------------------------------------------------//
import useStyles from '../../constants/useStyles'

//----------------------------------------------------------------//
// Hawg View Functions
//----------------------------------------------------------------//
import { 
  submitCoordInput 
} from '../../functions/submitCoordInput'

//----------------------------------------------------------------//
// MGRS Input Component
//----------------------------------------------------------------//
const CoordInput = props => {
  const classes = useStyles()

  let inputRef = React.useRef('')
  const [inputValue, setInputValue] = React.useState('')

  const handleSubmit = () => {
    inputRef.blur()
    const latlng = submitCoordInput(inputValue.toUpperCase())

    if (latlng === false) {
      console.error(`Error: Invalid coordinates {${inputValue}}`)
      props.submit(false)
    } else {
      props.map.flyTo([latlng.lat, latlng.lon], 10)
      props.submit({ lat: latlng.lat, lng: latlng.lon })
      setInputValue('')
    }
  }

  return (
    <div className={classes.search}>
      <div className={classes.searchIcon}>
        <RoomIcon />
      </div>
      <InputBase
        classes={{
          input: classes.inputInput,
          root: classes.inputRoot,
        }}
        inputRef={input => inputRef = input}
        onChange={input => setInputValue(input.target.value)}
        onKeyDown={event => (event.key === 'Enter') ? handleSubmit() : null}
        placeholder='MGRS or Lat Long'
        value={inputValue}
      />
    </div>
  )
}

export default CoordInput