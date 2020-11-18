import React from 'react'

const render9line = (data) => (
  <table>
    <tbody>
      <tr>
        <td>Label</td>
        <td>{data.label}</td>
      </tr>
      <tr>
        <td>Type/Method</td>
        <td>{data.typeMethod}</td>
      </tr>
      <tr>
        <td>IP / Hdg / Distance</td>
        <td>{`${data.ip}/${data.hdg}/${data.distance}`}</td>
      </tr>
      <tr>
        <td>Elevation</td>
        <td>{data.elevation}</td>
      </tr>
      <tr>
        <td>Description</td>
        <td>{data.description}</td>
      </tr>
      <tr>
        <td>Location</td>
        <td>{data.location}</td>
      </tr>
      <tr>
        <td>Mark</td>
        <td>{data.mark}</td>
      </tr>
      <tr>
        <td>Friendlies</td>
        <td>{data.friendlies}</td>
      </tr>
      <tr>
        <td>Egress</td>
        <td>{data.egress}</td>
      </tr>
      <tr>
        <td>Remarks/Restrictions</td>
        <td>{data.remarks}</td>
      </tr>
      <tr>
        <td>Fighter-to-Fighter</td>
        <td>{data.f2f}</td>
      </tr>
    </tbody>
  </table>
)

const render15line = (data) => (
  <table>
    <tbody>
      <tr>
        <td>Callsign</td>
        <td>{data.callsign}</td>
      </tr>
      <tr>
        <td>Frequency</td>
        <td>{data.frequency}</td>
      </tr>
      <tr>
        <td>PLS/HHRID</td>
        <td>{data.plsHhrid}</td>
      </tr>
      <tr>
        <td>Number of Objectives</td>
        <td>{data.numObjectives}</td>
      </tr>
      <tr>
        <td>Location</td>
        <td>{data.location}</td>
      </tr>
      <tr>
        <td>Elevation</td>
        <td>{data.elevation}</td>
      </tr>
      <tr>
        <td>Date/Time(z)</td>
        <td>{data.dateTime}</td>
      </tr>
      <tr>
        <td>Source</td>
        <td>{data.source}</td>
      </tr>
      <tr>
        <td>Condition</td>
        <td>{data.condition}</td>
      </tr>
      <tr>
        <td>Equipment</td>
        <td>{data.equipment}</td>
      </tr>
      <tr>
        <td>Authentication</td>
        <td>{data.authentication}</td>
      </tr>
      <tr>
        <td>Threats</td>
        <td>{data.threats}</td>
      </tr>
      <tr>
        <td>PZ Description</td>
        <td>{data.pzDescription}</td>
      </tr>
      <tr>
        <td>OSC/frequency</td>
        <td>{data.oscFreq}</td>
      </tr>
      <tr>
        <td>IP/Heading</td>
        <td>{data.ipHdg}</td>
      </tr>
      <tr>
        <td>Rescort</td>
        <td>{data.rescort}</td>
      </tr>
      <tr>
        <td>Terminal Area Gameplan</td>
        <td>{data.gameplan}</td>
      </tr>
      <tr>
        <td>Signal</td>
        <td>{data.signal}</td>
      </tr>
      <tr>
        <td>Egress Hdg</td>
        <td>{data.egress}</td>
      </tr>
    </tbody>
  </table>
)

export { render9line, render15line }