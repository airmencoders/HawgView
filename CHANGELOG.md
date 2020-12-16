## 2.15.16-beta
### Changes
* Re-added separate `elevation` state due to the asynchronous effect of getting the elevation

### Fixes
* Fixed issue if a user modifies state between initiating function and it resolving reverting to an older version of state

## 2.15.15-beta
### Changes
* Moved `history` to `state

### Tasks
* Finish removing props that rely on `history` or `step` from components (e.g. `anchor={props.state.history[props.state.step].anchor}`)

### Bugs
* Async `getElevation` can cause a bug when resolving the promise by resetting state to what it previously was if the user somehow changes the state in between initiating the function and it resolving (e.g. click the map to immediately opening the `addMarkerDrawer` - When the async function finishes, the drawer closes because it was closed when the function was initially called)

## 2.15.14-beta
### Changes
* Changed `Array.map` to `Array.forEach` for each of the `generateKML` functions

### Fixes
* Fixed syntax/linting errors

## 2.15.13-beta
### Changes
* Moved `mouseCoords` to `state`
* Added clause that prevents elevation from being fetched when `tool` is active
* Added clause that sets `focusedLatlng` to `null` when exiting a tool
* Added key listener to `EllipseTool`

### Fixes
* Fixed bug where mouse coords would jump when using a tool due to elevation fetching
* Fixed bug where exiting a tool via the `Escape` key would keep a `focusedLatlng`
* Fixed bug where `Escape` would not exit the `EllipseTool`

## 2.15.12-beta
### Changes
* Moved `elevation` to `state`

## 2.15.11-beta
### Changes
* Moved `focusedLatlng` to `state`
* Reduced number of state updates to minimize chance of getting out of sync
* Expect that in the future, will further reduce state updates / function calls

### Fixes
* Fixed issues with `focusedShape` and `focusedMarker` being out of sync with rest of state updates

## 2.15.10-beta
### Changes
* Moved `focusedShape` to `state`
* Added `tool: null` to the `handleMarkerEdit`

### Fixes
* Fixed issues when making a shape would not deactivate the tool properly

## 2.15.9-beta
### Changes
* Fixed MGRS issues incorporated in `master` branch version `2.14.9-beta`

### Fixes
* Fixed issue where MGRS labels would not properly display in northern regions where the grid identifier is only two characters long

## 2.15.8-beta
### Changes
* Moved `focusedMarker` to `state`
* Removed setting `focusedMarker` to `null` when resetting the map

## 2.15.7-beta
### Changes
* Moved `step` to `state`

### Fixes
* Fixed bug that would not properly change the history array when loading a scenario

## 2.15.6-beta
### Changes
* Moved `markerSize` to `state`
* Added `state` dependency to React Effect when handling window resize

### Fixes
* Fixed bug that would reset `markerSize` and `map.brightness` when window is resized

## 2.15.5-beta
### Changes
* Moved `tooltips` to `state`
* Changed `Geo Labels` `maxNativeZoom` from `19` to `17` in order to match imagery

## 2.15.4-beta
### Changes
* Moved `zoom` to `state.map`

## 2.15.3-beta
### Changes
* Moved `color` to `state.map`
* Moved `brightness` to `state.map`
* Updated handler functions
* Added `map.center` to `state`
* Added `map.center` to `LayerControl.useMemo`

### Fixes
* Fixed bug where the MGRS gridlines would not re-render when the center of the map changes

## 2.15.2-beta
### Changes
* Moved `brightness` to `state`

## 2.15.1-beta
### Changes
* Moved `tool` to `state`

## 2.15.0-beta
### Changes
* Started work on state cleanup
* Moved `dialog` to `state`

## 2.14.8-beta
### Changes
* Re-added `Download Products` to `MobileMenu`

## 2.14.7-beta
### Changes
* Added shapes (except ellipse) to the KML download

### Fixes
* Fixed bug where a drawer would not reset the map causing user not able to get the map popup

## 2.14.6-beta
### Fixes
* Fixed bug where brightness changes to the map no longer work

## 2.14.5-beta
### Changes
* Added Map Labels to the KML

## 2.14.4-beta
### Changes
* Changed folders in KML to be closed by default

## 2.14.3-beta
### Fixed
* Fixed bug where the bullseye icon would not remap when downloading scenario KML

## 2.14.2-beta
### Changes
* In `generateKML` changed the switch case from `bullseye` to `blank`

### Fixes
* Fixed bug where the bullseye icon would not remap when downloading scenario KML

## 2.14.1-beta
### Changes
* Enabled KML Scenario download
* Unforunately no shapes are downloaded due to KML limitations (particularly with circles/ellipses)

## 2.14.0-beta
### Changes
* Added the ability to download the entire scenario as a KML (minus shapes)
* Fixed broken image links in `handleUpdateScenario` in v1
* Added PAA container to SPARTY (friendly and hostile)

### Fixes
* Fixed broken image links when translating scenario
* Fixed SPARTY PAA

### Tasks
* Add shapes, threats, bullseyes, building labels, and kinetic points to the KML download

## 2.13.1-beta
### Changes
* Modified `handleMapReset` function to no longer reset the `focusedShape` and `focusedMarker`

## 2.13.0-beta
### Changes
* Wrapped `LayerControl` in a `React.useMemo` to assist with the mouse coordinate rendering
* Fixed typo in `LayerControl` preventing `interactive` prop being properly passed
* Re-Added `MouseCoordinateControl`
* Added sorting function to the `editMarkers` function to keep markers in the order that they were created

### Fixes
* Fixed bug preventing threats from being dragged
* Fixed bug that did not allow for mouse coordinates to be displayed
* Fixed issue which caused the `MarkerList` to be out of order once a marker was edited

## 2.12.7-beta
### Changes
* Changed `mapNativeZoom` for both baselayers to `17` which should reduce the amount of non-existing base layers for users

## 2.12.6-beta
### Changes
* Re-added `toggleTooltips` to `CASTools`

### Fixes
* Fixed bug where desktop menu wouldn't toggle tooltips appropriately

## 2.12.5-beta (Code Cleanup)
### Changes
* Finished pulling all the dialogs into `Dialogs` component
* Fixed title in `index.html`

## 2.12.4-beta (Code Cleanup)
### Changes
* Pulled all the dialogs into its own `Dialogs` component to be imported by `CAS`

## 2.12.3-beta (Code Cleanup)
### Changes
* Pulled all the tools into its own `Tools` component to be imported by `ToolControl`
* Pulled `LoadScenario` function to its own file
* Moved `handleMouseMove` into a `React.useCallback` hook within the `Map` component

## 2.12.2-beta (Code Cleanup)
### Changes
* Pulled `generateShapePopup` to its own function (to be updated with mega state?)
* Pulled `Bullseye` to its own component

## 2.12.1-beta (Code Cleanup)
### Changes
* Created imports for Hawg View components to make importing modules easier

## 2.12.0-beta (Code Cleanup)
### Changes
* Cleaned up imports
* Moved Notifications, Wiki, and version 1 links to a menu visible in desktop and mobile modes

## 2.11.2-beta
### Changes
* Removed the constant mouse coordinate tracking due to errors with marker dragging
* Determined that Marker dragging is more important than mouse movement display

### Tasks
* Code cleanup
* Mouse coordinates display
* Mega State

## 2.11.1-beta
### Changes
* Bullseyes are now integers rather than floats (Thanks TRON!)

## 2.11.0-beta
### Changes
* Added control to bottom right of the screen for mouse coordinates (D M.M, MGRS, BULLSEYE)

## 2.10.0-beta
### Changes
* Background color of website defaults to `black` (If zoom in too far, black screen is nicer on eyes over white screen)
* Added `maxZoom` to Leaflet Map and `maxNativeZoom` to tile layers for quality of life

## 2.9.0-beta
### Changes
* Added undefined checking to load scenario
* Added error checking to lat/lng coord input
* `Save Scenario Dialog` now resets the name to `''` whenever closing
* Added an `Anchor` to the scenario
* The first `Bullseye` marker to be added to the scenario defaults as the anchor
* User's can change the anchor point which also de-selects the previous anchor as the anchor
* Map popup and marker popups now also provide an anchor readout
* Threat popup now includes Bullseye readout (as applicable) as well as the sovereignty and label of the threat

### Tasks
* Add a mouse coordinates container in the bottom right for a readout of L/L, MGRS, and B/E
* Shorten the attribution down to a link which opens a dialog?

### Fixes
* Fixed crashes when attempting to load a scenario with something undefined
* Fixed crashes when attempting to fly to an invalid lat/lng
* Fixed bug where bullseyes would not drag
* Fixed crashes when attempting to edit a threat

## 2.8.0-beta
### Changes
* Removed `CONOP Tools` and `Download Products` from the navigation for now until it is implemented
* Added `brightness` and handlers to map state. Imagery layer now has opacity based on the brightness
* Added badge dot to the notifications icon as an additional way to notify user of the notification
* IAW V2 rollout workflow, notifications dialog is no longer defaulted open

### Fixes
* Fixed crashes in certain parts of the world where lat/lng issues would arise, breaking the math functions for the MGRS grids

## 2.7.0-beta
### Changes
* Significant Code Cleanup
* Now only one state for active dialog versus several
* Removed `lineClosed` state and instead uses the length of the `points` array in `AnalysisTool`
* Fixed linting rules in `gridMath`
* Removed several declared functions/variables that were not used
* Fixed various dependency issues for `useEffect`

### Fixes
* Fixed bug where center of circle / ellipse would not properly update

## 2.6.0-beta
### Changes
* Created `async` function `getElevation` to pull code out of `CAS.js`
* Started work to simplify dialogs/drawers

### Fixes
* Fixed bug where once a user selects a marker, the map will no longer display a popup

## 2.5.3-beta
### Changes
* Added additional information to the notification dialog

## 2.5.2-beta
### Fixes
* Fixed bug if a user has a selected marker and then selects a utility tool the tool would use the marker's lat/lng as the starting point

## 2.5.1-beta
### Changes
* Removed `handleLoadScenario` import from `CAS`

## 2.5.0-beta
### Changes
* Removed `rel` from TronView links (Request from TRON)
* Marker list now has a display for on screen (row) and print (columns)
* Marker ID is now a part of the history step, assists with loading and avoiding ID conflicts
* `handleLoadScenario` now updates the history's marker ID
* Creating a marker now increments the history's marker ID

## 2.4.3-beta
### Changes
* Popups no longer auto pan the map

### Fixes
* Fixed crashing when user interacts with the map, firing a popup - causing excessive loop depth and crashes with `MGRSGrids`

## 2.4.2-beta
### Changes
* Changed Save object format to utilize the index of the threat rather than the object
* Started work on a verion 1 scenario translator

### Fixes
* Fixed bug where loading a scenario would default every threat, even pre-determined threats, to a custom threat

## 2.4.1-beta
### Changes
* Added condition in `ShapeDrawer` to properly parse ellipse center latlng

### Fixes
* Fixed issue where ellipse was forced into a latlng situation when editing in the drawer

## 2.4.0-beta
### Changes
* Added A-10 Favicon
* Added `mapCenter` to CAS state
* Added event listener to `map` to update `mapCenter` state
* Removed callbacks from `MGRSLines` and `GARSCells`

### Fixes
* Fixed site stalling when user is zoomed in max zoom and then pans to another part of the map

## 2.3.4-beta
### Changes
* Added .htaccess to the public folder

### Fixes
* Redirect issues

## 2.3.3-beta
### Changes
* Changed `StaticRouter` to `BrowserRouter`

### Fixes
* Fixed Redirect issues

## 2.3.2-beta
### Changes
* Changing threat now also changes the title as appropriate
* Deprecated `Edit9LineDialog` and `EditThreatDialog`

## 2.3.1-beta
### Changes
* Removed `babel-polyfill` due to deprectation and unnecessary

## 2.3.0-beta
### Changes
* Added IP/CP/No Strike, Bullseyes, Buildings, and Kinetic Points to the marker list
* 15 Line data no longer forces a large width and is responsive
* Deprecated `EditThreatDialog`
* Added threat handling to `EditMarkerDrawer`
* Added `babel-polyfill` and `react-app-polyfill` for IE11 support - Directs users to Chrome/Firefox/Edge
* Created `LayerThreats` to handle rendering a threat with the specific colors
* Updated `LayerControl` to utilize the new `LayerThreats` component

### Fixes
* Added `Arty` property to the `Threat` marker, fixing crash
* Fixed bug in `EditMarkerDrawer` where color of Map Labels would not be saved

## 2.2.0-beta
### Changes
* Added default dash arrays to the shape drawer

## 2.1.3-beta
### Fixes
* Base path is now changed to `/*` to not cause 404 issues
* Potential for this to change if app changes to a multi-page-app

## 2.1.2-beta
### Fixes
* Fixed bug where shape drawer would not open when creating a line/polygon

## 2.1.1-beta
### Changes
* Building labels and kinetic point state data now saved within the scenario history

### Fixes
* Building labels and kinetic points now behave properly with undo/redo/clear

## 2.1.0-beta
### Changes
* Made the load scenario dialog load the resulting parsed JSON by defualt
* Made the notifications default (for about a week)

## 2.0.0-beta
### Changes
* Added Notifications dialog
* Shifted HawgView version 2 to be the primary with a notification to inform the user about the swap

## 2.53.0-alpha
### Changes
* Completed the styles
* Changed Save function to automatically save the file versus a copy/paste
* Changed Load function to be a file upload

## 2.52.0-alpha
### Changes
* Added `Styles` to the history step to save styles with the scenario
* Added ability to style MGRS/GARS/Building labels globally with the styles palette

## 2.51.0-alpha
### Changes
* Finished `Building Labels` and `Kinetic Points` Huge shoutout to TRON for helping me figure out some bugs and code cleanup (Requested by JT Simmons)
* Started work on a `Style` drawer to handle styles within the state of the scenario (MGRS line colors, GARS line colors, building labels)

## 2.50.0-alpha
### Changes
* Renamed `Building Labels` to `Map Labels` with the same functions
* Added `Building Labels` to the CAS tools which continue to add as the user clicks
* Added `Kinetic Points` to the CAS tools which continue to add as the user clicks

### Bugs
* `Building Labels` only work while the tool is active, then crashes once the tool deactivates

## 2.49.0-alpha
### Changes
* Linked markers to ViperOps ArcGISMap TGP API (Huge shout out to TRON for making this a reality!!!)

## 2.48.0-alpha
### Changes
* Added Brady MOAs and Yankee/Dixie Range (Requested by OBI/Demon)

## 2.47.0-alpha
### Changes
* Added Germany airspace (Thanks Paul F)

## 2.46.2-alpha
### Changes
* `save` function in `ShapeDrawer` now parses the radius of a circle as an integer

### Fixes
* Fixed bug where creating a circle and immediately using the shape tools again would set the radius to `0` (Thanks PUMA for finding this)

## 2.46.1-alpha
### Changes
* Added `setFocusedShape(null)` to the `toggleTools` method in `CAS`
* Added parameter that `focusedShape` === `null` before app can work through processing clicks

### Fixes
~~* Fixed bug where creating a circle and immediately using the shape tools again would set the radius to `0` (Thanks PUMA for finding this)~~

## 2.46.0-alpha
### Changes
* Updated 9-Line information to separate out `IP`, `HDG`, and `Distance`
* Added `Fighter-to-Fighter` to CAS 9-Line

## 2.45.2-alpha
### Changes
* Selecting a tool now sets the `FocusedMarker` to `null`

### Fixes
* Fixed erroneous behavior when a user clicks a marker, setting `clickedLatLng` which would then interfere with shape tools

## 2.45.1-alpha
### Changes
* Added `arty` property to the save function of `EditMarkerDrawer` component
* Added check for both `props.marker.arty.arty` and `props.marker.arty.display` in `LayerMarkers` component

### Fixes
* Fixed crashing due to edited markers not saving the `arty` property and thus crashing rendering

## 2.45.0-alpha
### Changes
* Removed the `toUpperCase()` from the `onChange` method in the `InputCoord` component
* Added `props.marker.title` to the empty `Tooltips` in the `LayerMarker` component
* Added the `arty` object to markers
* `LayerMarkers` now generates a 2KM by 2KM square around PAA/MLRS

### Fixes
* Fixed bug where cursor would jump to the end of the Input Coord when modifying
* Fixed bug where tooltips would not display when selected

## 2.44.0-alpha
### Fixes
* Error catching when clicking/navigating to a coordinate outside UTM/MGRS limits
* Building Labels can now change color
* If a marker is outside the UTM/MGRS limits, then the position is fixed to lat/lng
* Now using the `LayerMarker` component to reduce some of the codebase in `LayerControl`

### Tasks
- [x] Add switch to the shape drawer to toggle bullseye show data
- [ ] Make a `LayerShape` component to further reduce `LayerControl` codebase
- [x] Add a 2KM by 2KM dashed square around PAA/MLRS (Friendly and Hostile)

## 2.43.0-alpha
### Changes
* Added editing of bullseye
* Added toast when bad inputs are submitted to the coord input container

### Fixes
* Added error correction to bullseye input

## 2.42.0-alpha
### Changes
* Added radial/DME to bullseye
* Added Birmingham 2 MOA and ROZs (Requested by RIP & Dath)

## 2.41.0-alpha
### Changes
* Added Bullseye marker (slight hang due to magnetic declination)
* Added Bullseye array to the step array
* Added Bullseye handlers to the edit function
* Added additional markers to the friendly/hostile markers components (Requested by DePo and Boston Joe)
* Changed MGRS Grid Zoom levels to show the next in grid one zoom layer out (Requested by PUMA)

### Tasks
- [x] Add Bullseye handling to the shape drawer
- [x] Add radial/DME labels to the bullseye
- [ ] See if people think that a separate layer for SARDOTs is necessary/useful

## 2.40.0-alhpa
### Changes
* Added Rose Hill, AL MOA (Requested by Tonto)

## 2.39.3-alpha
### Changes
* Changed how the `EditMarkerDrawer` component saves lat/lng to the marker object

### Fixes
* Fixed crash that can occur when a user edits a marker and tries to load a subsequent scenario

## 2.39.2-alpha
### Changes
* Changed `setFocusedMarker` to `setFocusedShape` in `CAS.js` and `LayerControl.js` components for shape editing

### Fixes
* Fixed crash when user edits a shape

## 2.39.1-alpha
### Changes
* Separated out `focusedMarker` and `focusedShape` to avoid issues with drawers

### Fixes
* Fix bug where app would crash when creating a rectangle
* Thanks TRON!

## 2.39.0-alpha
### Changes
* Rolled out `EditMarkerDrawer`

### Fixes
* Fixed bug where a comma would break the coordinate input system
* Fixed bug where editing a threat would add a new threat rather than editing the current threat

### Tasks
- [ ] Add threats to the `EditMarkerDrawer`

## 2.38.0-alpha
### Changes
* Continued work on `EditMarkerDrawer`

### Fixes
* Fixed bug where 15-Line OSC Freq value was based on PZ Description value

## 2.37.0-alpha
### Changes
* Added printing ability to `MarkerListDialog`
* Enabled the Marker List in the `MinimizedMenu`
* Moved the `render9line` and `render15line` functions to a separate function `renderData` so that way both components that use it use the single point
* Started working towards migrating from the marker dialogs to drawers

## 2.36.0-alpha
### Changes
* Added Windows instructions to `README.md`

### Fixes
* Fixed Linux instructions in `README.md`

## 2.35.0-alpha
### Changes
* Created the marker list dialog and accordion components
* Friendly markers, survivors, threats, and hostiles now populate the marker list
* Markers with attached data (9-line / 15-line) will expand to display the data if the user clicks on the summary

### Tasks
- [x] Enable the button in the `MinimizedMenu` component
- [x] Figure out a good print format for the printing button

## 2.34.0-alpha
### Changes
* Added wiki link to `Navigation`

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