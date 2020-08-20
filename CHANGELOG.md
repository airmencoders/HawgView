## 2.33.1-alpha
### Changes
* GARS Cells are now purple instead of orange
* GARS Quadrants are now orange instead of purple

### Fixes
* Rectangles now properly delete when clicking `Delete`

## 2.33.0-alpha
### Changes
* Added elevation from the US National Map
* Added `Pending` and `Elevation not found` states to allow for user notification of the status of the API call

## 2.32.1-alpha
### Fixes
* Fixed math error when converting from True to Mag

## 2.32.0-alpha
### Changes
* `CircleTool` now shows a radius where the mouse is with NM and meters
* `ShapeDrawer` now shows the radius and units for the circle and appropriately edits the shape
* `editMarker` function now appropriately sets the properties for the radius/unit for Circles

## 2.31.0-alpha
### Changes
* Added labels to GARS Cells
* Increased GARS label size to accomodate appropriately

## 2.30.0-alpha
### Changes
* Line and Polygon tool now have circle markers the user clicks to finish the shape
* Line and Polygon tool now exit when user presses the `Escape` key
* Line and Polygon tool now do nothing when user presses the `Enter` key
* Line and Polygon tool now include `NM` and `meter` distances
* Analysis tool now includes mil measurements
* Created GARS Cells

### Fixes
* MGRS line optimization (Using `northBound` and `southBound` when able to shorten the line being drawn)

### Tasks
- [ ] Finish the GARS Labels (Cell and quadrant only?)

## 2.29.2-alpha
### Fixes
* Fixed crashes when zooming out too far caused by the MGRS grid generation

## 2.29.1-alpha
### Changes
* Gridlines are white now

### Fixes
* Gridlabels properly positioned on lines while maintaining proper coordinates

## 2.29.0-alpha
### Changes
* `MGRSGrids` component complete. Some nuances but they look good

## 2.28.2-alpha
### Changes
* MGRSGrids component now uses the mapBounds in order to not crash the browser by trying to make too many lines
* Started work on the 100K lines, looking good

## 2.28.1-alpha
### Fixes
* Fix bug blocking `ShapeDrawer` from closing properly

## 2.28.0-alpha
### Changes
* Added black background to map
* More closely ported `leaflet-grids` resulting in a better outcome for MGRS Gridzones

### Fixes
* Map popup no longer auto pans, fixing map jump issues

### Tasks
- [ ] Change attribution to be a link, reducing space required
- [ ] Finish the gridlines
- [ ] add `try/catch` for the MGRS translation to catch errors when clicking outside the world wrap when zoomed out

## 2.27.1-alpha
### Fixes
* Persistent markers only add color and data as required for specific layers fixing `react-color` failures
* Added `key` to building label fixing `react` warnings

## 2.27.0-alpha
### Changes
* Removed the `Toggle Mouse Click` Button from the toolbar
* Activating a tool now disables the mouse clicks automatically
* Added the `interactive` property to the rest of the shapes
* Clicking on a marker will now set the `clickedLatLng` state to the marker's latlng property for stacking chits exactly
* Updated the `mapPopup` component to not display when there is a `focusedMarker`
* Thanks SHAA for the idea about the clicked latlng
* Shapes now come with a default title

### Tasks
- [ ] Add tooltips to all the shapes

## 2.26.0-alpha
### Changes
* Removed `CAP` image from markers folder
* Grid zone breaks are now working in the MGRS gridlines component

### Tasks
- [ ] Finish the rest of the closer in grids
- [ ] Label all the gridlines
- [ ] Change color of the gridlines

### Fixes
* Fixed margins of the Ellipse options in `ShapeDrawer`

## 2.25.0-alpha
### Changes
* Finally got the ellipse working to make it dynamic and work with the React components
* Added scenario name to the `saveDialog`
* Document title now changes to the loaded scenario's name

## 2.24.0-alpha
### Changes
* Still figuring out how to work with porting over `leaflet-ellipse` to make it dynamic

## 2.23.0-alpha
### Changes
* Lines now function like circles and rectangles with options
* Line/Polygon now use `Enter` key to finish instead of escape
* `ShapeDrawer` now does not show a fill when shape is a line
* Added a `save` button to the `ShapeDrawer` to avoid unnecessary history changes when closing the shape drawer if nothing was changed/saved
* Started work to port over `leaflet-ellipse` to something dynamic that I can use with `Path`
* Building labels now are added onto the map

### Tasks
- [ ] Figure way to dynamically change color of text styling with the divIcon

### Fixes
* Lat/Lng input now also recognizes commas and spaces as delimiters between lat and long

## 2.22.0-alpha
### Changes
* Rectangle now functions like circles with options

## 2.21.0-alpha
### Changes
* Shape drawer opens when editing and creating Circle (need to finish implementing for all shapes)
* Creating a shape now creates a marker in the object array with requisite information
* Creating a shape also sets it automatically as the focused marker
* Can now edit/delete a shape
* Closing the shape drawer saves the changes and resets the values

### Fixes
* Fixed bug using old labelling convention

## 2.20.0-alpha
### Changes
* Added packages
* Updated `Dependencies` section of `README.md`
* Renamed `DrawOptionsDrawer` to `ShapeDrawer`
* Added content to `ShapeDrawer`

### Tasks
- [x] Set drawer to open when user finishes drawing a shape - (`2.21.0-alpha`)
- [x] Set drawer to open when editing shape - (`2.21.0-alpha`)

## 2.19.0-alpha
### Changes
* Pass the history as an object to `LayerControl` rather than each individual subset 
* Basic shape tools are completed
* Added task in task list

## 2.18.4-alpha
### Fixes
* `MinimizedMenu` no longer uses `Button` or `IconButton` but just the baseline `MenuItem` which removes the double shaded button and ripple effect

## 2.18.3-alpha
### Fixes
* Circle and Rectangle tool now properly work with new state variables
* Circle and Rectangle tool now properly only set latlng when active

## 2.18.2-alpha
### Fixes
* Ruler now properly closes when swapping tools

## 2.18.1-alpha
### Fixes
* Fixed heading issue with ruler

### Tasks
* Need to fix ruler issue with toggling, maybe take a look at how intricate the drawing was and refactor.

## 2.18.0-alpha
### Changes
* Finished Rectangle Tool
* Potential to change and use the create marker tool which will make the marker with popup (invisible marker) and the data required to make the shape

## 2.17.2-alpha
### Fixes
* Fixed map issue when adding the `CircleTool` defaulted the map popup to false

## 2.17.1-alpha
### Fixes
* Using the analysis tool no longer adds circles to the map.

## 2.17.0-alpha
### Changes
* Users can now add circles to the map
* Added tasks to to-do list

## 2.16.0-alpha
### Changes
* Moved tools to all one button group

## 2.15.0-alpha
### Changes
* Added placeholder controls for remaining draw tools
* Added items to to-do list

## 2.14.0-alpha
### Changes
* Added `15LineDialog`
* Added functionality to save and edit 15 lines
* When a marker has data, displays the data instead of the title/location/data (repetitive information)

## 2.13.0-alpha
### Changes
* Threat circles can edit the threat object

### Fixes
* Fixed bug in `EditThreatDialog` where the wrong data was passed to pre-populate the label `TextField`

## 2.12.0-alpha
### Changes
* Changed from `ColorLensIcon` to `InvertColorsIcon` for the map tools and minimized map
* Changed from `Messages` to `LabelIcon` for the tooltips
* `LabelIcon` and `InvertColorsIcon` now display an off icon when active to display to user options
* Changed from using iconify icon for analysis tool to a Material-UI icon `SquareFoot`
* Added the ability to render markers that do not interact with the user (user cannot click the marker for details - used for stacking markers or for when the analysis tool is active)

### Fixes
* `MinimizedMenu` now closes when the window is resized

## 2.11.0-alpha
### Changes
* Added 'fill' option to `EditThreatDialog`
* Threat markers now open the `EditThreatDialog` instead of the standard `EditMarkerDialog`
* Any non-friendly threat can have 9-line data attached to it
* Changed text to go from `Create threat` to `Edit threat` as appropriate and button now displays `Save Changes`
* Updated `LayerControl` to display 9-line data appropriately for threats

### Fixes
* Fixed weird bug dealing with `Array.map` `key` value when changing the label to blank causing render issues with threats

## 2.10.0-alpha
### Changes
* Completed `EditThreatDialog`
* Removed 'friendly' threats (Potential for re-add if requested.)
* Added tasks to to-do list

### Fixes
* Fixed ruler bug - erroneously passing the active NM as the total NM

## 2.9.0-alpha
### Changes
* Added load scenario functionality
* Added Tooltip toggling
* Added Toasts for Save/Load functions
* Changed UX elements to use sentence case
* Removed the Log In button from the navigation for now (Re-add later)
* Removed the switch case from `classification-banner` for now (Potential to re-add later)
* Commented out the `Login` route for now (re-add later)

## 2.8.0-alpha
### Changes
* Finished updating the editMarkers functions to use an Object Payload versus multiple parameters for simplicity
* Continued updating components to use props versus deconstructing props
* Disabled toolbar options that are currently not supported
* Added the Save functionality
* Need to update save functionality (save to account - default? Overwrite?)

## 2.7.1-alpha
### Fixes
* Toggle color works consistently (Changing map baselayers changed the order of things)

## 2.7.0-alpha
### Changes
* Added the 9-line Dialog
* Modified marker dialog to be reusable between all markers (Friendly, IP, Hostile, Threat, Survivor)
* Added the ability to save, edit, and delete a 9-line

## 2.6.0-alpha
### Changes
* Pulled components out into More modularized Composed Components
* Pulled functions for add/delete/drag/clear markers into own function file

## 2.5.0-alpha
### Changes
* Added basic edit dialogs for friendly markers, hostile markers, and threats.
* Added delete marker functionality
* Added tasks to the to-do list

## 2.4.0-alpha
### Changes
* Added MGRS/LatLon search functionality to navbar
* Added Fly-to functionality when searching for MGRS/LatLon
* Added marker label functionality to `MarkerDrawer` input
* Added default titles to all markers
* Added tasks to the to-do list

## 2.3.0-alpha
### Changes
* Created multiple components to handle the map ruler
* Ruler now includes Magnetic variation
* Installed the `@iconify/react` and `@iconify/icons-mdi` packages
* Updated `README.md` for new dependencies

### Fixes
* Fixed `README.md` installation instructions
* Fixed `NPM` vulnerabilities with `npm audit fix`

## 2.2.0-alpha
### Changes
* Added `Birmingham 1` MOA to airspace (created `alabama.js` in `/src/constants/airspace/moas`)
* Modified `/src/constants/airspace/moas.js` to utilize new `alabama.js` file
* Renamed custom component `MapControl.js` to `LayerControl.js`

## 2.1.0-alpha
### Changes
* Completed the logic for handling the addition and dragging of all sovereignty of chits
* Added `clearAllMarkers` functionality
* Added functionality to increase or decrease the baseline size of chits / labels
* Added margins to all `markers` in the `markerDrawer`

## 2.0.1-alpha
### Bug Fixes
* Fixed bug where navigating away from the map would result in an error if any overlays did not have children

## 2.0.0-alpha
### Changes
* Initial Commit
* Migrated from `PHP` to `React` for front-end code
* Migrated from `Bootstrap` to `Material-UI` stylized components
* Migrated from `esri-leaflet` package to using the `TileMap` server from ESRI
* Integrated to `react-leaflet` for easier use of Leaflet components
* Changed lexicon from `chit` to `marker` to align with `Leaflet` API
* Removed sidebar menu for map functions to a temporary side drawer
* Changed to show only friendly OR hostile markers to allow for more room for growth of markers **(ASOS Request)**
* Added ability for markers to be dragged on the map **(Multiple requests)**
* Integrated Undo/Redo functions for map history **(Multiple requests)**
* Fine tuned grayscale styling to not grayscale map labels
* Map Popup now shows more variations of `lat/lon` in addition to `MGRS` coordinates
* Created reusable classification banner component to easily scale to various `IL` servers
* Sub-Divided airspace into smaller files for ease of future additions/modifications
* Removed `Old BMGR` and `New BMGR` Airspace and included only the new boundaries in `Restricted Areas`
* Changed name to Hawg View **(Multiple Requests)**