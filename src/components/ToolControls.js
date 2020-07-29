import React from 'react'
import Control from 'react-leaflet-control'

import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'
import StopIcon from '@material-ui/icons/Stop'
import SquareFootIcon from '@material-ui/icons/SquareFoot'
import TimelineIcon from '@material-ui/icons/Timeline'

import { Icon } from '@iconify/react'

import pentagonIcon from '@iconify/icons-mdi/pentagon'
import ellipseIcon from '@iconify/icons-mdi/ellipse'

const useStyles = makeStyles(theme => ({
  icon: {
    fontSize: '25px',
  },
}))

export default (props) => {
  const classes = useStyles()

  return (
    <Control position='topright'>
      <ButtonGroup
        orientation='vertical'
        size='small'
        variant='contained'
      >
        <Tooltip placement='left' title='Analysis tool: Press ESC to finish, twice to exit'>
          <Button
            color={props.activeTool === 'analysis' ? 'primary' : undefined}
            onClick={() => props.toggle('analysis')}
          >
            <SquareFootIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw line: Press Enter to finish'>
          <Button
            color={props.activeTool === 'line' ? 'primary' : undefined}
            onClick={() => props.toggle('line')}
          >
            <TimelineIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw circle: Click to set circle, again to set radius'>
          <Button
            color={props.activeTool === 'circle' ? 'primary' : undefined}
            onClick={() => props.toggle('circle')}
          >
            <FiberManualRecordIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw rectangle: Click to set each corner'>
          <Button
            color={props.activeTool === 'rectangle' ? 'primary' : undefined}
            onClick={() => props.toggle('rectangle')}
          >
            <StopIcon className={classes.icon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw polygon: Press Enter to finish'>
          <Button
            color={props.activeTool === 'polygon' ? 'primary' : undefined}
            onClick={() => props.toggle('polygon')}
          >
            <Icon className={classes.icon} icon={pentagonIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw Ellipse: Click map to select center'>
          <Button
            color={props.activeTool === 'ellipse' ? 'primary' : undefined}
            onClick={() => props.toggle('ellipse')}
          >
            <Icon className={classes.icon} icon={ellipseIcon} />
          </Button>
        </Tooltip>
      </ButtonGroup>
    </Control>
  )
}