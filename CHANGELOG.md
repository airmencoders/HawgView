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

## Tasks to be Completed
- [x] Add `handleAddMarker` functionality to all remaining `markers` - (`2.1.0-alpha`)
- [x] Add `clearAllMarkers` functionality to map - (`2.1.0-alpha`)
- [x] Add `Marker Label` functionality to `markerDrawer` - (`2.4.0-alpha`)
- [x] Add `Threat` Dialog - (`2.10.0-alpha`)
- [ ] Add `Combat Air Patrol (CAP)` Dialog
- [ ] Add `Building Label` functionality to `markerDrawer`
- [x] Add `9-Line` functionality to `hostile markers` - (`2.7.0-alpha`)
- [ ] Add `15-Line` functionality to `survivor markers`
- [x] Add `MGRS` or `Lat/Lon` input to map - (`2.4.0-alpha`)
- [x] Add Edit marker functionality - (`2.5.0-alpha`)
- [x] Add Delete marker functionality - (`2.5.0-alpha`)
- [x] Add option to have 'fill' in threats - (`2.11.0-alpha`)
- [x] Add 'stackable' option such that it disables the `onClick` for the markers, allowing users to click map to stack chits - (`2.12.0-alpha`)
~~Add `onClick` to threat rings that also manage the edit function~~ (Would require to render the popup multiple times (already doing this with the markers though))

## Farther off Tasks
- [ ] Add `MGRS Gridlines` to map
- [ ] Add `Drawing` capabilities to map
- [x] Add `Ruler` control to map - (`2.2.0-alpha`)
- [ ] Add `Concept of Operations (CONOP)` functionality to site
- [ ] Add `IP Run card` functionality to site
- [ ] Add `Download Products` functionality to site
- [x] Add `Save Scenario` functionality to site - (`2.8.0-alpha`)
- [x] Add `Load Scenario` functionality to site - (`2.9.0-alpha`)
- [ ] Add `Overwrite Scenario` functionality to site
- [ ] Testing
- [ ] Add entirety of back end handling to site
- [ ] Incorporate Platform One SSO Login to site
- [ ] Add `NGA Maps` to site
- [ ] Add `TAK Maps` to site
- [ ] Fix ruler touch events
~~Research into using React's `context` API for passing props to children~~ (Not required at this time)