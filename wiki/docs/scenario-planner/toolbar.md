# Toolbar
![Toolbar](/images/scenario-planner/screen-layout/toolbar.png){: .shadowImage }

The toolbar provides various functions to manipulate the scenario.
Hovering over any of the buttons will display a tooltip describing what the button does.

## Coordinate Search
![Coordinate Search](/images/scenario-planner/toolbar/coordinate_search.png){: .shadowImage }

Use the search container to enter either MGRS coordinates or Lat/Lng. Press ++enter++ to submit the search

!!! example "MGRS"
    Spaces are not required. The input muse be a properly formed MGRS coordinate, to include the Grid Zone designator and the 100km Grid Square ID in order to search and fly to the coordinates. Any level of precision (i.e. 10km, 1km, 100m, 10m, 1m) is acceptable.
    
    Example: `52S DG 88729 03528`

!!! example "Lat/Lng"
    Any type of Lat/Lng coordinate can be used (i.e. degrees, degrees minutes, degrees minutes seconds). Commas are not required, but a properly formed coordinate is required in order to search and fly to the coordinates. Negative numbers can be used for `south` or `west`. Optionally, users can use `N/S` and `E/W`.

## Add marker
![Add Marker Icon](/images/scenario-planner/toolbar/add_marker.png){: .shadowImage }

Markers can be added to the map when a user has designated a coordinate to place it. This can be done in three different ways:

1. Clicking on the map
1. Using the coordinate search bar
1. Clicking an existing marker will allow the user to stack markers on top of eachother

!!! tip "Further reading"
    See the [Marker Drawer](/scenario-planner/drawers/marker-drawer) for further details

## Undo & Redo
![Undo and Redo Icons](/images/scenario-planner/toolbar/undo_redo.png){: .shadowImage }

Click the button to move back or forward one step. Buttons are enabled and colored white when there is a step to move in that direction. Buttons are disabled when there is no step in that direction

!!! info "Undo behavior"
    Like many undo buttons, when undoing a step and performing a new step, the history is overwritten, losing any "future" steps and becoming the newest step in the history. Hovering over the button will display the action that will be undone or redone.

## Clear markers
![Clear Markers Icon](/images/scenario-planner/toolbar/clear_markers.png){: .shadowImage }

Click the button to clear all markers and shapes from the map

!!! info "Undo behavior"
    The action of clearing markers and shapes can be undone with the `Undo` button

## Resize markers
![Marker Resize Icons](/images/scenario-planner/toolbar/resize_markers.png){: .shadowImage }

Click either button to increase or decrease the size of the markers on the map.

!!! info "Marker sizes"
    There are `10` marker sizes. The default is `3`

## Map brightness
![Map Brightness Icons](/images/scenario-planner/toolbar/change_map_brightness.png){: .shadowImage }

Click either button to increase or decrease the brightness of the map imagery

!!! info "Brightness levels"
    The default brightness is `100%`. Either button increases and decreases the brightness by `10%` to a minimum of `0%` or maximum of `200%`.

## Toggle color
![Toggle Color Icon](/images/scenario-planner/toolbar/toggle_color.png){: .shadowImage }

Click to toggle the basemap imagery color. This does not affect overlay colors

## Marker List
![Toggle Marker List Icon](/images/scenario-planner/toolbar/marker_list.png){: .shadowImage }

Click to view a list of all markers present on the map and any attached data

## Marker Labels
![Toggle Marker Labels Icon](/images/scenario-planner/toolbar/toggle_labels.png){: .shadowImage }

Click to toggle tooltips on all markers and shapes on the map. This is useful for screenshots of the map with labels of which marker is which.

## Save Scenario
![Save Scenario Icon](/images/scenario-planner/toolbar/save.png){: .shadowImage }

Click to open the save scenario dialog

## Load Scenario
![Load Scenario Icon](/images/scenario-planner/toolbar/load.png){: .shadowImage }

Click to open the load scenario dialog

## Styles
![Styles Icon](/images/scenario-planner/toolbar/styles.png){: .shadowImage }

Click to open the styles dialog

## Download
![Download Icon](/images/scenario-planner/toolbar/download.png){: .shadowImage }

Click to download the scenario as a Google Earth `.kml` file