import React from 'react'

import { LatLon } from 'geodesy/mgrs'

import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
  },
}))

const Edit9LineDialog = (props) => {
  const classes = useStyles()

  const [label, setLabel] = React.useState(props.marker.data === null ? '' : props.marker.data.label)
  const [typeMethod, setTypeMethod] = React.useState(props.marker.data === null ? '' : props.marker.data.typeMethod)
  const [ipHdgDistance, setIpHdgDistance] = React.useState(props.marker.data === null ? 'N/A' : props.marker.data.ipHdgDistance)
  const [elevation, setElevation] = React.useState(props.marker.data === null ? props.marker.elevation : props.marker.data.elevation)
  const [description, setDescription] = React.useState(props.marker.data === null ? props.marker.title : props.marker.data.description)
  const [location, setLocation] = React.useState(props.marker.data === null ? LatLon.parse(props.marker.latlng.lat, props.marker.latlng.lng).toUtm().toMgrs().toString() : props.marker.data.location)
  const [mark, setMark] = React.useState(props.marker.data === null ? 'None' : props.marker.data.mark)
  const [friendlies, setFriendlies] = React.useState(props.marker.data === null ? '' : props.marker.data.friendlies)
  const [egress, setEgress] = React.useState(props.marker.data === null ? '' : props.marker.data.egress)
  const [remarks, setRemarks] = React.useState(props.marker.data === null ? '' : props.marker.data.remarks)

  const handleSubmit = () => {
    const data = {
      type: '9line',
      label: label,
      typeMethod: typeMethod,
      ipHdgDistance: ipHdgDistance,
      elevation: elevation,
      description: description,
      location: location,
      mark: mark,
      friendlies: friendlies,
      egress: egress,
      remarks: remarks
    }

    props.submit({
      marker: props.marker,
      data: data,
    })
  }

  return (
    <Dialog
      className={classes.dialog}
      open={props.open}
      onClose={props.toggle}
    >
      <DialogTitle>Edit {props.marker.title} 9-line</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus={true}
          margin='dense'
          label='Label'
          onChange={event => setLabel(event.target.value)}
          fullWidth
          value={label}
          variant='outlined'
        />
        <TextField
          margin='dense'
          label='Type / Method'
          onChange={event => setTypeMethod(event.target.value)}
          fullWidth
          value={typeMethod}
          variant='outlined'
        />
        <TextField
          margin='dense'
          label='IP / HDG / Distance'
          onChange={event => setIpHdgDistance(event.target.value)}
          fullWidth
          value={ipHdgDistance}
          variant='outlined'
        />
        <TextField
          margin='dense'
          label='Elevation'
          onChange={event => setElevation(event.target.value)}
          fullWidth
          value={elevation}
          variant='outlined'
        />
        <TextField
          margin='dense'
          label='Description'
          onChange={event => setDescription(event.target.value)}
          fullWidth
          value={description}
          variant='outlined'
        />
        <TextField
          margin='dense'
          label='Location'
          onChange={event => setLocation(event.target.value)}
          fullWidth
          value={location}
          variant='outlined'
        />
        <TextField
          margin='dense'
          label='Mark'
          onChange={event => setMark(event.target.value)}
          fullWidth
          value={mark}
          variant='outlined'
        />
        <TextField
          margin='dense'
          label='Friendlies'
          onChange={event => setFriendlies(event.target.value)}
          fullWidth
          value={friendlies}
          variant='outlined'
        />
        <TextField
          margin='dense'  
          label='Egress'
          onChange={event => setEgress(event.target.value)}
          fullWidth
          value={egress}
          variant='outlined'
        />
        <TextField
          margin='dense'
          label='Remarks &amp; Restrictions'
          onChange={event => setRemarks(event.target.value)}
          fullWidth
          value={remarks}
          variant='outlined'
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color='primary'>Save changes</Button>
        <Button onClick={props.toggle}>Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default Edit9LineDialog