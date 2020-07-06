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
//----------------------------------------------------------------//
// Top Level Modules
//----------------------------------------------------------------//
import React from 'react'
import 'fontsource-roboto'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import AppBar from '@material-ui/core/AppBar'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Classification Banner Component
//----------------------------------------------------------------//
export default ({ classification = 'unclassified' }) => {

  const [bannerColor, setBannerColor] = React.useState('green')
  const textColor = 'black'

  React.useEffect(() => {
    switch (classification.charAt(0)) {
      case 's':
        setBannerColor('red')
        break
      case 't':
        setBannerColor('yellow')
        break
      default:
        break
    }
  }, [classification])

  return (
    <AppBar
      position='static'
      style={{ backgroundColor: bannerColor }}
    >
      <Typography
        align='center'
        style={{ color: textColor }}
        variant='subtitle2'
      >
        {`// ${classification.toUpperCase()} //`}
      </Typography>
    </AppBar>
  )
}