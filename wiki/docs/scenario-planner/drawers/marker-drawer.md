# Marker Drawer
![Marker Drawer](/images/scenario-planner/drawers/marker-drawer/marker_drawer.png){: .shadowImage }

Once the user has designated a coordinate to place a marker, click on the marker to add it to the map.

## Hostile switch
![Hostile Switch](/images/scenario-planner/drawers/marker-drawer/hostile_switch.png){: .shadowImage }

Toggle the switch to change the markers from friendly to hostile

## Marker label
![Marker Label Field](/images/scenario-planner/drawers/marker-drawer/marker_label.png){: .shadowImage }

Input a label to be added to the marker. If nothing is added, then the default label will be used (the type of marker that it is).

## Persistent markers
![Persistent Markers](/images/scenario-planner/drawers/marker-drawer/persistent_markers.png){: .shadowImage }

These markers will always be able to be added to the map whether the user has selected friendly or hostile. Adding a `Threat` will create a default custom threat and the [Threat Drawer](/scenario-planner/drawers/threat-drawer) in order to modify the threat properties.

Adding a `Map Label` will add the label to the map at the desired location.

!!! info "Map label behavior"
    If a label is not input into the `Marker Label` field prior to clicking the ++"Map Label"++ button, then the default will be `Label`. This can then be modified at a later time.

## Friendly & Hostile Markers
![Friendly Markers](/images/scenario-planner/drawers/marker-drawer/friendly_markers.png){: .shadowImage }
![Hostile Markers](/images/scenario-planner/drawers/marker-drawer/hostile_markers.png){: .shadowImage .ml-2 }

These markers change based on the state of the `Hostile Switch`. Click one to add it to the map

## Marker Data
Hostile markers, Threats, and Survivors are capable of holding data values for 9-line and 15-line information.

## Special Markers
### Bullseye
![Bullseye Marker](/images/scenario-planner/drawers/marker-drawer/bullseye.png){: .shadowImage }

Adding the bullseye marker will create a bullseye with default properties at the given position. Users can modify bullseye properties by editing the marker. Users can also disable the `Show Data` attribte which will prevent the radial/DME tooltips from being rendered.

!!! tip "Default bullseye properties"
    The Default values for the bullseye are:
    
    Number of rings: 5

    Miles between rings: 20NM

    Angle between radials: 45 degrees

### Artillery
![Artillery Marker](/images/scenario-planner/drawers/marker-drawer/artillery.png){: .shadowImage }

Both friendly and hostile artillery markers will, by default, render a 2km x 2km dashed PAA container around the marker. It will be colored appropriate to the sovereignty of the marker. Users can disable the `Display PAA` property by editing the marker.

!!! tip "Artillery markers"
    Artillery, Self-Propelled Artillery, and MLRS markers are all capable of displaying the PAA container