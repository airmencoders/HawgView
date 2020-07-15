import React from 'react'

import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import { makeStyles } from '@material-ui/core/styles'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'

import { sovereignties } from '../constants/threats'
import { threats } from '../constants/threats'
import { units } from '../constants/threats'

const useStyles = makeStyles(theme => ({
  dialog: {
    padding: theme.spacing(2),
  },
  flex: {
    display: 'flex',
  },
  formControl: {
    marginLeft: theme.spacing(1),
    marginTop: '3px',
  },
  fullWidthFormControl : {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  grow: {
    flexGrow: 1,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}))

export default (props) => {
  const classes = useStyles()

  const [threat, setThreat] = React.useState('Custom')
  const [label, setLabel] = React.useState('')
  const [range, setRange] = React.useState('3')
  const [unit, setUnit] = React.useState('NM')
  const [sovereignty, setSovereignty] = React.useState('Hostile')

  return (
    <Dialog
      className={classes.dialog}
      open={props.open}
      onClose={props.toggle}
    >
      <DialogTitle>Edit Threat</DialogTitle>
      <DialogContent>
        <FormControl
          className={classes.flex}
          variant='outlined'
        >
          <InputLabel>Mission Threat</InputLabel>
          <Select
            className={classes.grow}
            label='Mission Threat'
            margin='dense'
            onChange={event => setThreat(event.target.value)}
            value={threat}
          >
            {threats.map(threat => (
              <MenuItem
                key={threat.title}
                value={threat.title}
              >
                {threat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          margin='dense'
          label='Label'
          onChange={event => setLabel(event.target.value)}
          fullWidth
          value={label}
          variant='outlined'
        />
        <Box
          display='flex'
          flexDirection='row'
          alignItems='center'
        >
          <TextField
            className={classes.grow}
            margin='dense'
            label='Range'
            onChange={event => setRange(event.target.value)}
            value={range}
            variant='outlined'
          />
          <FormControl
            className={classes.formControl}
            variant='outlined'
          >
            <InputLabel>Unit</InputLabel>
            <Select
              label='Unit'
              margin='dense'
              onChange={event => setUnit(event.target.value)}
              value={unit}
            >
              {units.map(unit => (
                <MenuItem
                  key={unit}
                  value={unit}
                >
                  {unit}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <FormControl
          className={classes.fullWidthFormControl}
          variant='outlined'
        >
          <InputLabel>Sovereignty</InputLabel>
          <Select
            className={classes.grow}
            label='Sovereignty'
            margin='dense'
            onChange={event => setSovereignty(event.target.value)}
            value={sovereignty}
          >
            {sovereignties.map(sovereignty => (
              <MenuItem
                key={sovereignty}
                value={sovereignty}
              >
                {sovereignty}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
    <DialogActions>
      <Button color='primary'>Edit 9-Line</Button>
      <Button color='secondary'>Delete 9-Line</Button>
    </DialogActions>
    <DialogActions>
      <Button onClick={props.toggle} color='primary'>Create Threat</Button>
      <Button onClick={props.toggle}>Cancel</Button>
    </DialogActions>
    </Dialog >
  )
}