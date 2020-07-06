# Hawg View
Hawg View as written by Porkins and Airmen Coders is a personal project since 2018 to recreate and improve on the previous Hawg View as written by Neo.
Since the previous Hawg View was taken down from the web, I have since created Hawg Ops (Written in a `LAMP` stack).
In order to take advantage of emerging technology as well as have greater tools for operators, it is being remade with a `MERN` stack for hosting by Platform One.

Ultimately, Hawg View is an in depth CAS Scenario Mission Planner for use for the CAF. Pilots, Intel, and Tactical Air Control Parties can create scenarios, Grid Reference Graphics (GRGs), Concept of Operations (CONOPs), IP Run cards, and more. Additionally, users can easily share and collaborate on mission planning, greatly shortening the amount of time needed to plan out any sortie, from CT to a full increased threat upgrade.

View the Wiki (Incomplete) for instructions and tips on how to navigate and use the application.

## Building and Running development environment
### Requirements
Ensure the latest version of `npm` and `Node.js` is installed

### Steps
Clone the Repository
```bash
git clone https://github.com/airmencoders/hawgview.git
```

Run the build script
```bash
npm build
```

`package.json` specifies the `PORT` as `3100`
```bash
cd /projectLocation
npm start
```

Navigate to `http://${SERVER_IP}:3100`

## Dependencies
|Package|Min. Version|Usage|
|:--|:--|:--|
|`@material-ui/core`|`4.10.1`|Material UI Stylized Components|
|`@material-ui/icons`|`4.9.1`|Material UI Icons|
|`@material-ui/lab`|`4.0.0-alpha.55`|Material UI Components (Under Development)|
|`@testing-library/jest-dom`|`4.2.4`|Testing Library (Create React App)|
|`@testing-library/react`|`9.5.0`|Testing Library (Create React App)|
|`@testing-library/user-event`|`7.2.1`|Testing Library (Create React App)|
|`fontsource-roboto`|`2.1.4`|Google Roboto Fonts|
|`geodesy`|`2.2.1`|Geographic Coordination Math Functions|
|`leaflet`|`1.6.0`|Core Map Controls|
|`react`|`16.13.1`|Core Site Engine|
|`react-dom`|`16.13.1`|Core Site Engine|
|`react-leaflet`|`2.7.0`|Core Map Controls|
|`react-router-dom`|`5.2.0`|Site Navigation|
|`react-scripts`|`3.4.1`|Core Site Engine|

## License
MIT