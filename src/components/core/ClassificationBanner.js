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
import 'fontsource-roboto'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  AppBar,
  Typography,
} from '@material-ui/core'

//----------------------------------------------------------------//
// Classification Banner Component
//----------------------------------------------------------------//
const ClassificationBanner = ({ classification = 'unclassified' }) => {

  /**
   * SF-710 WHITE ON GREEN:     #007A33 / #FFFFFF
   * SF-708 WHITE ON BLUE:      #0033A0 / #FFFFFF
   * SF-707 WHITE ON RED:       #C8102E / #FFFFFF
   * SF-706 WHITE ON ORANGE:    #FF671F / #FFFFFF
   * SF-712 BLACK ON YELLOW:    #F7EA48 / #000000
   * SF-709 BLACK ON LAVENDER:  #C1A7E2 / #000000 
   */

  /*const [bannerColor, setBannerColor] = React.useState('green')
  const [textColor, setTextColor] = React.useState('black')*/

  return (
    <AppBar
      position='static'
      style={{ backgroundColor: 'green' }}
    >
      <Typography
        align='center'
        style={{ color: 'black' }}
        variant='subtitle2'
      >
        {`// ${classification.toUpperCase()} //`}
      </Typography>
    </AppBar>
  )
}

export default ClassificationBanner