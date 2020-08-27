import React from 'react'

import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

import { LatLon } from 'geodesy/mgrs'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    }
  },
  drawerPaper: {
    width: drawerWidth,
  },
  marginsMd: {
    margin: theme.spacing(2),
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  firstTextField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
}))

export default (props) => {
  const classes = useStyles()

  const container = props.window !== undefined ? () => window().document.body : undefined

  // Every Marker has these
  const [position, setPosition] = React.useState('')
  const [title, setTitle] = React.useState('')

  // Control the switch for 9-Lines and 15-Lines
  const [_9Line, set9Line] = React.useState(false)
  const [_15Line, set15Line] = React.useState(false)

  // Control 9-Line TextFields
  const [_9LineLabel, set9LineLabel] = React.useState('')
  const [_9LineTypeMethod, set9LineTypeMethod] = React.useState('')
  const [_9LineIpHdgDistance, set9LineIpHdgDistance] = React.useState('')
  const [_9LineElevation, set9LineElevation] = React.useState('')
  const [_9LineDescription, set9LineDescription] = React.useState('')
  const [_9LineLocation, set9LineLocation] = React.useState('')
  const [_9LineMark, set9LineMark] = React.useState('')
  const [_9LineFriendlies, set9LineFriendlies] = React.useState('')
  const [_9LineEgress, set9LineEgress] = React.useState('')
  const [_9LineRemarks, set9LineRemarks] = React.useState('')

  React.useEffect(() => {
    if (props.marker !== null) {
      setTitle(props.marker.title)
      setPosition(LatLon.parse(props.marker.latlng).toUtm().toMgrs().toString())

      if (props.marker.layer === 'hostile' || props.marker.layer === 'threat') {
        if (props.marker.data === null) {
          set9LineIpHdgDistance('N/A')
          set9LineElevation(props.marker.elevation)
          set9LineDescription(props.marker.title)
          set9LineLocation(LatLon.parse(props.marker.latlng).toUtm().toMgrs().toString())
          set9LineMark('None')
        } else {
          set9LineLabel(props.marker.data.label)
          set9LineTypeMethod(props.marker.data.typeMethod)
          set9LineIpHdgDistance(props.marker.data.ipHdgDistance)
          set9LineElevation(props.marker.data.elevation)
          set9LineDescription(props.marker.data.description)
          set9LineLocation(props.marker.data.location)
          set9LineMark(props.marker.data.mark)
          set9LineFriendlies(props.marker.data.friendlies)
          set9LineEgress(props.marker.data.egress)
          set9LineRemarks(props.marker.data.remarks)
        }
      }

    }
  }, [props.marker])

  return (
    <nav
      className={classes.drawer}
    >
      <Drawer
        container={container}
        variant='temporary'
        anchor='left'
        open={props.open}
        onClose={props.onClose}
        classes={{ paper: classes.drawerPaper, }}
        ModalProps={{ keepMounted: true, }}
      >
        <TextField
          className={classes.firstTextField}
          label='Marker title'
          onChange={event => setTitle(event.target.value)}
          variant='outlined'
          value={title}
        />
        <TextField
          className={classes.textField}
          label='Position'
          onChange={event => setPosition(event.target.value)}
          variant='outlined'
          value={position}
        />
        {(props.marker !== null && (props.marker.layer === 'hostile' || props.marker.layer === 'threat')) ?
          (
            <Grid
              container
              direction='row'
              justify='center'
            >
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={_9Line}
                      color='primary'
                      name='9 Line'
                      onChange={() => set9Line(!_9Line)}
                    />
                  }
                  label='9 Line'
                />
              </FormGroup>
            </Grid>
          )
          : null
        }
        {(props.marker !== null && _9Line) ?
          (
            <React.Fragment>
              <TextField
                className={classes.firstTextField}
                label='Label'
                onChange={event => set9LineLabel(event.target.value)}
                variant='outlined'
                value={_9LineLabel}
              />
              <TextField
                className={classes.textField}
                label='Type / Method'
                onChange={event => set9LineTypeMethod(event.target.value)}
                variant='outlined'
                value={_9LineTypeMethod}
              />
              <TextField
                className={classes.textField}
                label='IP / HDG / Distance'
                onChange={event => set9LineIpHdgDistance(event.target.value)}
                variant='outlined'
                value={_9LineIpHdgDistance}
              />
              <TextField
                className={classes.textField}
                label='Elevation'
                onChange={event => set9LineElevation(event.target.value)}
                variant='outlined'
                value={_9LineElevation}
              />
              <TextField
                className={classes.textField}
                label='Description'
                onChange={event => set9LineDescription(event.target.value)}
                variant='outlined'
                value={_9LineDescription}
              />
              <TextField
                className={classes.textField}
                label='Location'
                onChange={event => set9LineLocation(event.target.value)}
                variant='outlined'
                value={_9LineLocation}
              />
              <TextField
                className={classes.textField}
                label='Mark'
                onChange={event => set9LineMark(event.target.value)}
                variant='outlined'
                value={_9LineMark}
              />
              <TextField
                className={classes.textField}
                label='Friendlies'
                onChange={event => set9LineFriendlies(event.target.value)}
                variant='outlined'
                value={_9LineFriendlies}
              />
              <TextField
                className={classes.textField}
                label='Egress'
                onChange={event => set9LineEgress(event.target.value)}
                variant='outlined'
                value={_9LineEgress}
              />
              <TextField
                className={classes.textField}
                label='Remarks &amp; Restrictions'
                onChange={event => set9LineRemarks(event.target.value)}
                variant='outlined'
                value={_9LineRemarks}
              />
            </React.Fragment>
          )
          : null
        }
        <Grid
          container
          direction='row'
          justify='center'
        >
          <Button
            className={classes.marginsMd}
            color='primary'
            onClick={undefined}
            variant='contained'
          >
            Save Changes
        </Button>
        </Grid>
      </Drawer>
    </nav>
  )
}