/**
 * Renders user login dialog
 * 
 * @author  chris-m92
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Airmen Coders
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the 'Software'), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
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

//----------------------------------------------------------------//
// Material UI Core Components
//----------------------------------------------------------------//
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

//----------------------------------------------------------------//
// Images
//----------------------------------------------------------------//
import cac from '../images/cac.png'

//----------------------------------------------------------------//
// Custom Components
//----------------------------------------------------------------//
//import Navigation from '../components/Navigation'
import SiteNavigation from '../components/SiteNavigation'

//----------------------------------------------------------------//
// Custom Class Styles
//----------------------------------------------------------------//
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  card: {
    //width: 400,
    padding: theme.spacing(1),
    margin: theme.spacing(5),
  },
  item: {
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(1.5),
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flex: '0 0 100%',
    padding: theme.spacing(3),
  },
  cacImage: {
    border: '2px solid gray',
    borderRadius: 5,
  },
}))

//----------------------------------------------------------------//
// Login Component
//----------------------------------------------------------------//
export default ({ handleLoginClick, state }) => {
  const classes = useStyles()

  //----------------------------------------------------------------//
  // Render The Component
  //----------------------------------------------------------------//
  return (
    <React.Fragment>
      <SiteNavigation
        state={state}
      />
      <Grid
        container
        direction='row'
        justify='center'
      >
        <Card
          className={classes.card}
          variant='outlined'
        >
          <CardContent>
            <Typography
              align='center'
              variant='h5'
            >
              Log into Hawg View
              </Typography>
          </CardContent>
          <Divider />
          <CardActions>
            <Grid
              container
              direction='column'
            >
              <Grid
                item
              >
                <TextField
                  className={classes.item}
                  fullWidth
                  label='Email Address'
                  variant='outlined'
                />
              </Grid>
              <Grid
                item
              >
                <TextField
                  className={classes.item}
                  fullWidth
                  label='Password'
                  type='password'
                  variant='outlined'
                />
              </Grid>
              <Grid
                item
              >
                <Grid
                  container
                  direction='row'
                  justify='space-between'
                >
                  <div />
                  <Button
                    className={classes.item}
                    color='primary'
                    variant='contained'
                  >
                    Log In
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </CardActions>
          <Divider />
          <CardActions>
            <Grid
              alignItems='flex-end'
              container
              direction='row'
              justify='space-between'
            >
              <Grid
                className={classes.item}
                item
                xs={3}
              >
                <CardMedia
                  alt='Login with CAC'
                  className={classes.cacImage}
                  component='img'
                  src={cac}
                  title='CAC'
                />
              </Grid>
              <Grid item>
                <Button
                  variant='contained'
                  onClick={handleLoginClick}
                  color='primary'
                >
                  Log In with CAC
                </Button>
              </Grid>
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </React.Fragment>
  )
}