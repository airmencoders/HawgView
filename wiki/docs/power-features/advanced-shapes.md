# Advanced Shape Creation

In addition to the standard way of creating shapes, that is, by clicking on the map, users can employ the coordinate search bar to set the position of the shape.

## Instructions
1. First, activate the tool by clicking on it in the `Utility Tools`
1. Enter the coordinate in the `Coordinate Input`
1. If a valid `Lat/Lng` or `MGRS` coordinate is entered, it will be utilized for the shape

## Lines & Polygons
Each point entered in the `Coordinate Input` search will be used as the next point in the shape

## Circles & Ellipses
The first point entered will set the center of the circle or the ellipse. For circles, the second coordinate will set the radius of the circle.

## Rectangles
The first point entered will set one corner of the rectangle. For the second point, ensure that the second point is the opposite corner

!!! tip "Shape Feedback"
    In the case of each of these shapes, the tooltip provides information such as the circle's radius, the length of the line, etc... This is not the case when utilizing the `Coordinate Input` as it will automataically set the next point in the shape, not providing any feedback.