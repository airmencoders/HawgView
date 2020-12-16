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

import {
  fade,
  makeStyles,
} from '@material-ui/core/styles'

const drawerWidth = 240
const wideDrawerWidth = 750

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  button: {
    margin: theme.spacing(1),
  },
  cellLabel: props => ({
    backgroundColor: 'black',
    color: props.cellColor,
    fontSize: '0.9rem',
    lineHeight: '20px',
    textAlign: 'center',
  }),
  descriptionField: {
    margin: theme.spacing(2),
  },
  dialog: {
    padding: theme.spacing(2),
  },
  divIcon: props => ({
    alignItems: 'center',
    color: props.color,
    display: 'flex',
    fontSize: props.computedSize,
    fontWeight: 'bold',
    justifyContent: 'center',
    margin: '0',
    textAlign: 'center',
    lineHeight: `${props.computedSize}px`,
    wordWrap: 'break-word',
  }),
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
  firstTextField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  flex: {
    display: 'flex',
  },
  formControl: {
    display: 'flex',
    margin: theme.spacing(2),
  },
  grow: {
    flexGrow: 1,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  input: {
    display: 'none',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  kineticPoint: props => ({
    alignItems: 'center',
    backgroundColor: '#ffff00',
    border: 'solid #000000 2px',
    color: 'black',
    display: 'flex',
    fontSize: props.computedSize / 2,
    fontWeight: 'bold',
    justifyContent: 'center',
    margin: '0',
    textAlign: 'center',
    lineHeight: `${props.computedSize / 2}px`,
    wordWrap: 'break-word',
  }),
  leafletMap: {
    backgroundColor: '#000000',
    height: '100%',
    width: '100%',
  },
  markerImage: {
    margin: theme.spacing(1),
    width: '30px',
  },
  marginsMd: {
    margin: theme.spacing(2),
  },
  marginsSm: {
    margin: theme.spacing(1),
  },
  mobileMenuIcon: {
    marginRight: theme.spacing(1),
  },
  mouseCoordinateControlRoot: {
    backgroundColor: '#000000',
    color: '#ffffff',
    fontSize: '15px',
    opacity: 0.5,
    textAlign: 'right',
  },
  movingTooltip: {
    backgroundColor: 'rgba(255, 255, 255, .7)',
    backgroundClip: 'padding-box',
    opacity: '0.5',
    border: 'dotted',
    borderColor: 'red',
  },
  popupCell: {
    border: '1px solid black',
    borderCollapse: 'collapse',
    padding: '5px',
  },
  popupTable: {
    border: '1px solid black',
    borderCollapse: 'collapse',
  },
  resultTooltip: {
    backgroundColor: 'white',
    borderWidth: 'medium',
    borderColor: '#de0000',
  },
  search: {
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    borderRadius: theme.shape.borderRadius,
    marginLeft: 0,
    marginRight: theme.spacing(2),
    position: 'relative',
    width: '50%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    padding: theme.spacing(0, 2),
    pointerEvents: 'none',
    position: 'absolute',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
  wideDrawerPaper: {
    width: wideDrawerWidth
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  tooltip: {
    backgroundColor: '#000000',
    color: '#ffffff',
    border: 'none',
    '&:before': {
      border: 'none',
    }
  },
  utilityToolIcon: {
    fontSize: '25px',
  },
  zoneLabel: props => ({
    backgroundColor: 'black',
    color: props.gridzoneColor,
    fontSize: '0.9rem',
    lineHeight: '20px',
    textAlign: 'center',
  })
}))

export default useStyles