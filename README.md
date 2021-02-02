# Hawg View
Hawg View started out as a product by an A-10 pilot named Neo. It had become the de-facto mission planning product for A-10 drivers across the world.
However, the project died when Google changed how it charged for the Google Maps API.

Since then, Hawg Ops was created by Porkins in 2018 as a way to recreate and improve on Neo's project.
Merging with Airmen Coders in 2020, I changed from PHP to React as the primary language for the site.

Ultimately, Hawg View is an in depth CAS Scenario Mission Planner for use for the CAF. Pilots, Intel, and Tactical Air Control Parties can create scenarios, Grid Reference Graphics (GRGs), Concept of Operations (CONOPs), IP Run cards, and more. 
Users can easily share and collaborate on mission planning, greatly shortening the amount of time needed to plan out any sortie, from CT to a full increased threat upgrade.

## Wiki
View the wiki at [https://wiki.hawg-ops.com](https://wiki.hawg-ops.com) for instructions and tips on how to navigate and use the application.

## Building and Running development environment
### Requirements
Ensure the latest version of `npm` and `Node.js` is installed
`package.json` specifies the `PORT` as `3100`

Clone the Repository
```bash
git clone https://github.com/airmencoders/hawgview.git
npm install
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