/**
 * ${SUMMARY}
 * 
 * Based on the leaflet.js plugin leaflet-ruler. A bearing and range analysis tool.
 * Improvements include modularization for use with React and the ability to use
 * magnetic declination for magnetic rather than true headings.
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
import React from 'react'
import Control from 'react-leaflet-control'

//----------------------------------------------------------------//
// Material-UI Core Components
//----------------------------------------------------------------//
import {
  Button,
  ButtonGroup,
  Tooltip,
} from '@material-ui/core'

import {
  makeStyles,
} from '@material-ui/core/styles'

import {
  Apartment as ApartmentIcon,
  FiberManualRecord as FiberManualRecordIcon,
  FontDownload as FontDownloadIcon,
  Stop as StopIcon,
  SquareFoot as SquareFootIcon,
  Timeline as TimelineIcon,
} from '@material-ui/icons'

//----------------------------------------------------------------//
// Hawg View Components
//----------------------------------------------------------------//
import {
  Tools
} from '../tools'

//----------------------------------------------------------------//
// Iconify Icons
//----------------------------------------------------------------//
import { Icon } from '@iconify/react'
import clipboardTextOutlineIcon from '@iconify/icons-mdi/clipboard-text-outline'
import pentagonIcon from '@iconify/icons-mdi/pentagon'
import ellipseIcon from '@iconify/icons-mdi/ellipse'

//----------------------------------------------------------------//
// Styles
//----------------------------------------------------------------//
const useStyles = makeStyles(theme => ({
  utilityToolIcon: {
    fontSize: '25px',
  },
}))

//----------------------------------------------------------------//
// Tool Control Component
//----------------------------------------------------------------//
const ToolControls = props => {
  const classes = useStyles()

  /**
   * 
   * @param {*} tool 
   */
  const changeTools = tool => {
    props.setState({
      ...props.state,
      focusedLatlng: {
        latlng: null,
        source: null,
      },
      focusedMarker: null,
      tool: tool === props.state.tool ? null : tool,
    })
  }

  return (
    <Control position='topright'>
      <ButtonGroup
        orientation='vertical'
        size='small'
        variant='contained'
      >
        <Tooltip placement='left' title='Analysis tool: Press ESC to finish, twice to exit'>
          <Button
            color={props.state.tool === 'analysis' ? 'primary' : undefined}
            onClick={() => changeTools('analysis')}
          >
            <SquareFootIcon className={classes.utilityToolIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Building label: Increments with each click'>
          <Button
            color={props.state.tool === 'buildingLabel' ? 'primary' : undefined}
            onClick={() => changeTools('buildingLabel')}
          >
            <ApartmentIcon className={classes.utilityToolIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Kinetic points: Increments with each click'>
          <Button
            color={props.state.tool === 'kineticPoint' ? 'primary' : undefined}
            onClick={() => changeTools('kineticPoint')}
          >
            <FontDownloadIcon className={classes.utilityToolIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw line: Press ESC to exit'>
          <Button
            color={props.state.tool === 'line' ? 'primary' : undefined}
            onClick={() => changeTools('line')}
          >
            <TimelineIcon className={classes.utilityToolIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw circle: Click to set circle, again to set radius'>
          <Button
            color={props.state.tool === 'circle' ? 'primary' : undefined}
            onClick={() => changeTools('circle')}
          >
            <FiberManualRecordIcon className={classes.utilityToolIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw rectangle: Click to set each corner'>
          <Button
            color={props.state.tool === 'rectangle' ? 'primary' : undefined}
            onClick={() => changeTools('rectangle')}
          >
            <StopIcon className={classes.utilityToolIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw polygon: Press ESC to exit'>
          <Button
            color={props.state.tool === 'polygon' ? 'primary' : undefined}
            onClick={() => changeTools('polygon')}
          >
            <Icon className={classes.utilityToolIcon} icon={pentagonIcon} />
          </Button>
        </Tooltip>
        <Tooltip placement='left' title='Draw ellipse: Click map to select center'>
          <Button
            color={props.state.tool === 'ellipse' ? 'primary' : undefined}
            onClick={() => changeTools('ellipse')}
          >
            <Icon className={classes.utilityToolIcon} icon={ellipseIcon} />
          </Button>
        </Tooltip>
      </ButtonGroup>
      <Tools
        setState={props.setState}
        state={props.state}
      />
    </Control>
  )
}

export default ToolControls