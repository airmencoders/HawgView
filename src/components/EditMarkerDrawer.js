import React from 'react'

import Drawer from '@material-ui/core/Drawer'
import TextField from '@material-ui/core/TextField'
import { makeStyles } from '@material-ui/core/styles'

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
  textField: {
    margin: theme.spacing(2),
  },
}))

export default (props) => {
  const classes = useStyles()

  const container = props.window !== undefined ? () => window().document.body : undefined

  const [position, setPosition] = React.useState('')
  const [title, setTitle] = React.useState('')

  return (
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
        className={classes.textField}
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
    </Drawer>
  )
}