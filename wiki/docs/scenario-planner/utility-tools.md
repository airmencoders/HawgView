# Utility Tools
![Utility Tools](/images/scenario-planner/screen-layout/utility_tools.png){: .shadowImage align=right }

!!! warning "Touchscreen compatibility"
    Currently, touch screens are unable to properly create shapes and use tools

!!! tip "Advanced Instructions"
    There is an additional method to creating shapes that does not involve clicking on the map. To learn how to accomplish this, [view the instructions here](/power-features/advanced-shapes)

## Editing Shapes
When creating a shape, the `Shape Drawer` will automatically open, allowing users to modify shape properties:

1. Title
1. Location (`Circle` and `Ellipse`)
1. Properties (e.g. `Radius`, `Length`, `Width`, and `Tilt`)
1. Color
1. Fill
1. Dashed

## Viewing Points
![Points Dialog](/images/scenario-planner/utility-tools/points.png){: .shadowImage }

When editing `Lines`, `Polygons`, and `Rectangles`, the user can view a list of the points and bounds of the shape.

## Exiting Tools
Each of the tools can be exited by three methods

1. Pressing the ++esc++ key (With the exception of the `Analysis Tool` which requires two presses)
1. Clicking on the tool again
1. Clicking on any other tool

## Analysis Tool
![Analysis Tool](/images/scenario-planner/utility-tools/analysis_tool.png){: .shadowImage }

### Usage
![Analysis Tool Tooltip](/images/scenario-planner/utility-tools/analysis_tooltip.png){: .shadowImage }

Click on the `Analysis Tool` to enable. Click on the map to start the line. Moving the mouse will display a line with the following information:

!!! example "Heading (True | Mag)"
    Defaults to `True`. Uses the NOAA NGDC Worldwide Magnetic Model to determine the magnetic declination of the clicked point on the map

!!! example "Milliradians (mils)"
    Uses the mathematical formula `degrees * 17.78 = mils` to determien the mils

!!! example "Nautical Miles (NM)"
    Displays the total nautical miles of the line. When adding an additional segment, also display the length of the new segment

!!! example "Meters (m)"
    Displays the total meters of the line. When adding an additional segment, also displays the length of the new segment

Press the ++esc++ key to complete the line. This allows you to start a new measurement.

## Builing Label Tool
![Building Label Tool](/images/scenario-planner/utility-tools/building_label_tool.png){: .shadowImage }

### Usage
Click on the map to add the building label. The tool will automatically increment to the next number. Colors are changed using the `Styles` drawer. Sizes are changed using `Increase/Decrease Marker Size`.

## Kinetic Point Tool
![Kinetic Point Tool](/images/scenario-planner/utility-tools/kinetic_point_tool.png){: .shadowImage }

### Usage
Click on the map to add the kinetic point. The tool will automatically increment to the next characters. Sizes are changed using `Increase/Decrease Marker Size`.

## Line Tool
![Line Tool](/images/scenario-planner/utility-tools/line_tool.png){: .shadowImage }

### Usage
![Line Tool Usage](/images/scenario-planner/utility-tools/line_tooltip.png){: .shadowImage }

Click on the `Line Tool` to enable. Click on the map to start a line. Clicking again will add a new point.

### Completing the line
Click on the last point to finish the line

### Cancelling the line
Pressing the ++esc++ key will cancel the line and disable the tool

## Circle Tool
![Circle Tool](/images/scenario-planner/utility-tools/circle_tool.png){: .shadowImage }

### Usage
![Circle](/images/scenario-planner/utility-tools/circle_tooltip.png){: .shadowImage }

Click on the `Circle Tool` to enable. Click on the map to set the center of the circle. Moving the mouse will set the radius of the circle and display the radius value. Click again to create the circle.

### Cancelling Circle
Pressing the ++esc++ key will cancel the circle and disable the tool

## Rectangle Tool
![Rectangle Tool](/images/scenario-planner/utility-tools/rectangle_tool.png){: .shadowImage }

### Usage
![Rectangle](/images/scenario-planner/utility-tools/rectangle_usage.png){: .shadowImage }

Click on the `Rectangle Tool` to enable. Click on the map to set a corner of the rectangle. Moving the mouse will set the opposing corner of the rectangle. Click again to create the rectangle.

### Cancelling Rectangle
Pressing the ++esc++ key will cancel the rectangle and disable the tool.

## Polygon Tool
![Polygon Tool](/images/scenario-planner/utility-tools/polygon_tool.png){: .shadowImage }

### Usage
![Polygon](/images/scenario-planner/utility-tools/polygon_tooltip.png){: .shadowImage }

Click on the `Polygon Tool` to enable. Click on the map to start the shape. Moving the mouse will start the next segment.

### Completing Polygon
Click on the first point of the shape to complete the polygon.

### Cancelling Polygon
Pressing the ++esc++ key will cancel the polygon and disable the tool.

## Ellipse Tool
![Ellipse Tool](/images/scenario-planner/utility-tools/ellipse_tool.png){: .shadowImage }

### Usage
Click on the `Ellipse Tool` to enable. Click on the map to select the center of the ellipse and create the shape.

### Cancelling Ellipse
Pressing the ++esc++ key will cancel the ellipse and disable the tool.

## Fullscreen Tool
![Fullscreen](/images/scenario-planner/utility-tools/fullscreen_control.png){: .shadowImage }

Click on the `Fullscreen Tool` to enter fullscreen. While fullscreen, the Navigation is removed from the screen as well as the browser navigation.

### Exiting Fullscreen
Press ++esc++ or click the tool again to exit fullscreen

!!! tip "Fullscreen Behavior"
    If a user press ++f11++ to enter fullscreen, then the behavior is dependent on the Operating System and the navigation will not be removed from the screen and ther user cannot exit via the ++esc++ key