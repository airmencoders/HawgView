# Hawg View
<em>Hawg View</em> as written by Porkins and Airmen Coders has been a personal project since 2018 to recreate and improve on the previous Hawg View as written by Neo.
Since the previous <em>Hawg View</em> was taken down from the web, I have since created Hawg Ops (Written in a `LAMP` stack).
In order to take advantage of emerging technology as well as have greater tools for operators, it is being remade with a `MERN` stack for hosting by Platform One.

Ultimately, <em>Hawg View</em> is an in depth CAS Scenario Mission Planner for use for the CAF. Pilots, Intel, and Tactical Air Control Parties can create scenarios, Grid Reference Graphics (GRGs), Concept of Operations (CONOPs), IP Run cards, and more. Additionally, users can easily share and collaborate on mission planning, greatly shortening the amount of time needed to plan out any sortie, from CT to a full increased threat upgrade.

View the [https://wiki.hawg-ops.com](https://wiki.hawg-ops.com) for instructions and tips on how to navigate and use the application.

## Building and Running development environment
### Requirements
Ensure the latest version of `npm` and `Node.js` is installed

### Steps
Clone the Repository
```bash
git clone https://github.com/airmencoders/hawgview.git
```

Run the install script
```bash
npm install
```

NOTE: Depending on the last time of compiling code and updating dependencies, NPM may warn you of required fixes
```bash
npm audit fix
```

#### Linux
`package.json` specifies the `PORT` as `3100`
```bash
cd /projectLocation
npm run start
```

#### Windows
Edit the start script in `package.json` to the following
```json
"scripts": {
  "start": "set PORT=3100 && react-scripts start",
}
```

Navigate to `http://${SERVER_IP}:3100`

## License
MIT