import React from 'react'
import Control from 'react-leaflet-control'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

export default (props) => {

  return (
    <Control position='topright'>
      <ButtonGroup
        color='primary'
        orientation='vertical'
        size='small'
        variant='contained'
      >
        {props.children}
      </ButtonGroup>
    </Control>
  )
}