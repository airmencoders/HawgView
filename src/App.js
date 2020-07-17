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
  BrowserRouter as Router,
  Route,
  Switch,
  //Redirect
} from 'react-router-dom'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import CssBaseline from '@material-ui/core/CssBaseline'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//


//----------------------------------------------------------------//
// Custom Pages
//----------------------------------------------------------------//
import CASPlanner from './pages/CASPlanner'
/*import Login from './pages/Login'

const MyScenarios = () => {
  return (
    <h1>My Scenarios</h1>
  )
}*/

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
            <Route exact path='/'>
              <CASPlanner
                state={this.state}
              />
            </Route>
            {/*<Route path='/login' >
              <Login
                state={this.state}
              />
            </Route >
            <Route path='/my-scenarios'>
              {(this.state.isAuthenticated) ?
                <MyScenarios />
                :
                <Redirect to='/login?error=0x000001' />
              }
            </Route>*/}
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App



