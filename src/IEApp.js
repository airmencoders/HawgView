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
import React from 'react';
import {
  StaticRouter as Router,
  Route,
  Switch,
} from 'react-router-dom'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import CssBaseline from '@material-ui/core/CssBaseline'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//


//----------------------------------------------------------------//
// Custom Pages
//----------------------------------------------------------------//
import IENavigation from './components/IENavigation'

//----------------------------------------------------------------//
// App Component
//----------------------------------------------------------------//
class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      classification: 'unclassified',
      isAuthenticated: false,
      user: null,
    }
  }

  //----------------------------------------------------------------//
  // Render the Router
  //----------------------------------------------------------------//
  render() {
    return (
      <div className='App'>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path='/'>
              <IENavigation
                state={this.state}
              />
              <Grid
                container
                direction='row'
                justify='center'
              >
                <Typography variant='h4'>Internet Explorer is not supported. Please use Chrome, Firefox, or Microsoft Edge.</Typography>
              </Grid>              
            </Route>
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App



