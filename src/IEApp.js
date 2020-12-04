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
import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom'

//----------------------------------------------------------------//
// Material-UI Components
//----------------------------------------------------------------//
import {
  CssBaseline,
  Grid,
  Typography,
} from '@material-ui/core'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import IENavigation from './components/core/IENavigation'

//----------------------------------------------------------------//
// IE App Component
//----------------------------------------------------------------//
const IEApp = () => {
  return (
    <div className='App'>
      <CssBaseline />
      <Router>
        <Switch>
          <Route exact path='/'>
            <IENavigation />
            <Grid
              container
              direction='row'
              justify='center'
            >
              <Typography variant='h4'>Internet Explorer is not supported. Please use Chrome, Firefox, or Microsoft Edge.</Typography>
            </Grid>              
          </Route>
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    </div>
  )
}

export default IEApp