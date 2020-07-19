import React from 'react'

import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

//----------------------------------------------------------------//
// Custom Class Styling
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  button: {
    maxHeight: '44px',
    maxWidth: '44px',
    minWidth: '0px',
    padding: '2px',
    width: 'auto',
  },
  icon: {
    fontSize: '30px',
  },
}))

export default (props) => {
  const classes = useStyles()

  return (
    <Tooltip
      placement='left'
      title={props.title}
    >
      <Button
        color={props.active ? 'primary' : undefined}
        onClick={() => props.handleClick()}
      >
        {props.children}
      </Button>
    </Tooltip>
  )
}