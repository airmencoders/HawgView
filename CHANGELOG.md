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

### Tasks to be Completed
- [ ] Add `handleAddMarker` functionality to all remaining `markers`
- [ ] Add `clearAllMarkers` functionality to map
- [ ] Add `Marker Label` functionality to `markerDrawer`
- [ ] Add `Threat` Dialog
- [ ] Add `Combat Air Patrol (CAP)` Dialog
- [ ] Add `Building Label` functionality to `markerDrawer`
- [ ] Add `9-Line` functionality to `hostile markers`
- [ ] Add `15-Line` functionality to `survivor markers`
- [ ] Add `MGRS` or `Lat/Lon` input to map

### Farther off Tasks
- [ ] Add `MGRS Gridlines` to map
- [ ] Add `Drawing` capabilities to map
- [ ] Add `Ruler` control to map
- [ ] Add `Concept of Operations (CONOP)` functionality to site
- [ ] Add `IP Runcard` functionality to site
- [ ] Add `Download Products` functionality to site
- [ ] Add `Save Scenario` functionality to site
- [ ] Add `Load Scenario` functionality to site
- [ ] Add `Overwrite Scenario` functionality to site
- [ ] Testing
- [ ] Add entirety of back end handling to site
- [ ] Incorporate Platform One SSO Login to site
- [ ] Add `NGA Maps` to site
- [ ] Add `TAK Maps` to site