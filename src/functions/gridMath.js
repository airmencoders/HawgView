/**
 * ${SUMMARY}
 * 
 * ${DESCRIPTION}
 * 
 * @author  chris-m92
 * 
 * MIT License
 * 
 * Copyright (c) 2020 Airmen Coders
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */
import L from 'leaflet'

/**
 * UTM zones are grouped, and assigned to one of a group of 6
 * sets.
 *
 * {int} @private
 */
var NUM_100K_SETS = 6;

/**
 * The column letters (for easting) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_COLUMN_LETTERS = 'AJSAJS';

/**
 * The row letters (for northing) of the lower left value, per
 * set.
 *
 * {string} @private
 */
var SET_ORIGIN_ROW_LETTERS = 'AFAFAF';

var A = 65; // A
var I = 73; // I
var O = 79; // O
var V = 86; // V
var Z = 90; // Z
var gridMath = {
  forward: forward,
  inverse: inverse,
  toPoint: toPoint,
  LLtoUTM: LLtoUTM,
  UTMtoLL: UTMtoLL,
  lineIntersect: lineIntersect,
  getGARSCellLabel: getGARSCellLabel,
};
/**
 * Conversion of lat/lon to MGRS.
 *
 * @param {object} ll Object literal with lat and lon properties on a
 *     WGS84 ellipsoid.
 * @param {int} accuracy Accuracy in digits (5 for 1 m, 4 for 10 m, 3 for
 *      100 m, 2 for 1000 m or 1 for 10000 m). Optional, default is 5.
 * @return {string} the MGRS string for the given location and accuracy.
 */
function forward(ll, accuracy) {

  if (accuracy == null || accuracy === undefined) {
    accuracy = 5;
  }
  var ret = encode(LLtoUTM({
    lat: ll[1],
    lng: ll[0]
  }), accuracy);
  if (accuracy === 0) {
    ret = ret.substring(0, 6);
  }
  return ret;
}

/**
 * Conversion of MGRS to lat/lon.
 *
 * @param {string} mgrs MGRS string.
 * @return {array} An array with left (longitude), bottom (latitude), right
 *     (longitude) and top (latitude) values in WGS84, representing the
 *     bounding box for the provided MGRS reference.
 */
function inverse(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat, bbox.lon, bbox.lat];
  }
  return [bbox.left, bbox.bottom, bbox.right, bbox.top];
}

function toPoint(mgrs) {
  var bbox = UTMtoLL(decode(mgrs.toUpperCase()));
  if (bbox.lat && bbox.lon) {
    return [bbox.lon, bbox.lat];
  }
  return [(bbox.left + bbox.right) / 2, (bbox.top + bbox.bottom) / 2];
}
/**
 * Conversion from degrees to radians.
 *
 * @private
 * @param {number} deg the angle in degrees.
 * @return {number} the angle in radians.
 */
function degToRad(deg) {
  return (deg * (Math.PI / 180.0));
}

/**
 * Conversion from radians to degrees.
 *
 * @private
 * @param {number} rad the angle in radians.
 * @return {number} the angle in degrees.
 */
function radToDeg(rad) {
  return (180.0 * (rad / Math.PI));
}

/**
 * Converts a set of Longitude and Latitude co-ordinates to UTM
 * using the WGS84 ellipsoid.
 *
 * @private
 * @param {object} ll Object literal with lat and lon properties
 *     representing the WGS84 coordinate to be converted.
 * @return {object} Object literal containing the UTM value with easting,
 *     northing, zoneNumber and zoneLetter properties, and an optional
 *     accuracy property in digits. Returns null if the conversion failed.
 */
function LLtoUTM(ll) {
  var Lat = ll.lat;
  var Long = ll.lng;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var k0 = 0.9996;
  var LongOrigin;
  var eccPrimeSquared;
  var N, T, C, A, M;
  var LatRad = degToRad(Lat);
  var LongRad = degToRad(Long);
  var LongOriginRad;
  var ZoneNumber;
  // (int)
  ZoneNumber = Math.floor((Long + 180) / 6) + 1;

  //Make sure the longitude 180.00 is in Zone 60
  if (Long === 180) {
    ZoneNumber = 60;
  }

  // Special zone for Norway
  if (Lat >= 56.0 && Lat < 64.0 && Long >= 3.0 && Long < 12.0) {
    ZoneNumber = 32;
  }

  // Special zones for Svalbard
  if (Lat >= 72.0 && Lat < 84.0) {
    if (Long >= 0.0 && Long < 9.0) {
      ZoneNumber = 31;
    }
    else if (Long >= 9.0 && Long < 21.0) {
      ZoneNumber = 33;
    }
    else if (Long >= 21.0 && Long < 33.0) {
      ZoneNumber = 35;
    }
    else if (Long >= 33.0 && Long < 42.0) {
      ZoneNumber = 37;
    }
  }

  LongOrigin = (ZoneNumber - 1) * 6 - 180 + 3; //+3 puts origin
  // in middle of
  // zone
  LongOriginRad = degToRad(LongOrigin);

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  N = a / Math.sqrt(1 - eccSquared * Math.sin(LatRad) * Math.sin(LatRad));
  T = Math.tan(LatRad) * Math.tan(LatRad);
  C = eccPrimeSquared * Math.cos(LatRad) * Math.cos(LatRad);
  A = Math.cos(LatRad) * (LongRad - LongOriginRad);

  M = a * ((1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256) * LatRad - (3 * eccSquared / 8 + 3 * eccSquared * eccSquared / 32 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(2 * LatRad) + (15 * eccSquared * eccSquared / 256 + 45 * eccSquared * eccSquared * eccSquared / 1024) * Math.sin(4 * LatRad) - (35 * eccSquared * eccSquared * eccSquared / 3072) * Math.sin(6 * LatRad));

  var UTMEasting = (k0 * N * (A + (1 - T + C) * A * A * A / 6.0 + (5 - 18 * T + T * T + 72 * C - 58 * eccPrimeSquared) * A * A * A * A * A / 120.0) + 500000.0);

  var UTMNorthing = (k0 * (M + N * Math.tan(LatRad) * (A * A / 2 + (5 - T + 9 * C + 4 * C * C) * A * A * A * A / 24.0 + (61 - 58 * T + T * T + 600 * C - 330 * eccPrimeSquared) * A * A * A * A * A * A / 720.0)));
  if (Lat < 0.0) {
    UTMNorthing += 10000000.0; //10000000 meter offset for
    // southern hemisphere
  }

  return {
    northing: Math.trunc(UTMNorthing),
    easting: Math.trunc(UTMEasting),
    zoneNumber: ZoneNumber,
    zoneLetter: getLetterDesignator(Lat)
  };
}

/**
 * Converts UTM coords to lat/long, using the WGS84 ellipsoid. This is a convenience
 * class where the Zone can be specified as a single string eg."60N" which
 * is then broken down into the ZoneNumber and ZoneLetter.
 *
 * @private
 * @param {object} utm An object literal with northing, easting, zoneNumber
 *     and zoneLetter properties. If an optional accuracy property is
 *     provided (in meters), a bounding box will be returned instead of
 *     latitude and longitude.
 * @return {object} An object literal containing either lat and lon values
 *     (if no accuracy was provided), or top, right, bottom and left values
 *     for the bounding box calculated according to the provided accuracy.
 *     Returns null if the conversion failed.
 */
function UTMtoLL(utm) {

  var UTMNorthing = utm.northing;
  var UTMEasting = utm.easting;
  var zoneLetter = utm.zoneLetter;
  var zoneNumber = utm.zoneNumber;
  // check the ZoneNummber is valid
  if (zoneNumber < 0 || zoneNumber > 60) {
    return null;
  }

  var k0 = 0.9996;
  var a = 6378137.0; //ellip.radius;
  var eccSquared = 0.00669438; //ellip.eccsq;
  var eccPrimeSquared;
  var e1 = (1 - Math.sqrt(1 - eccSquared)) / (1 + Math.sqrt(1 - eccSquared));
  var N1, T1, C1, R1, D, M;
  var LongOrigin;
  var mu, phi1Rad;

  // remove 500,000 meter offset for longitude
  var x = UTMEasting - 500000.0;
  var y = UTMNorthing;

  // We must know somehow if we are in the Northern or Southern
  // hemisphere, this is the only time we use the letter So even
  // if the Zone letter isn't exactly correct it should indicate
  // the hemisphere correctly
  if (zoneLetter < 'N') {
    y -= 10000000.0; // remove 10,000,000 meter offset used
    // for southern hemisphere
  }

  // There are 60 zones with zone 1 being at West -180 to -174
  LongOrigin = (zoneNumber - 1) * 6 - 180 + 3; // +3 puts origin
  // in middle of
  // zone

  eccPrimeSquared = (eccSquared) / (1 - eccSquared);

  M = y / k0;
  mu = M / (a * (1 - eccSquared / 4 - 3 * eccSquared * eccSquared / 64 - 5 * eccSquared * eccSquared * eccSquared / 256));

  phi1Rad = mu + (3 * e1 / 2 - 27 * e1 * e1 * e1 / 32) * Math.sin(2 * mu) + (21 * e1 * e1 / 16 - 55 * e1 * e1 * e1 * e1 / 32) * Math.sin(4 * mu) + (151 * e1 * e1 * e1 / 96) * Math.sin(6 * mu);
  // double phi1 = ProjMath.radToDeg(phi1Rad);

  N1 = a / Math.sqrt(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad));
  T1 = Math.tan(phi1Rad) * Math.tan(phi1Rad);
  C1 = eccPrimeSquared * Math.cos(phi1Rad) * Math.cos(phi1Rad);
  R1 = a * (1 - eccSquared) / Math.pow(1 - eccSquared * Math.sin(phi1Rad) * Math.sin(phi1Rad), 1.5);
  D = x / (N1 * k0);

  var lat = phi1Rad - (N1 * Math.tan(phi1Rad) / R1) * (D * D / 2 - (5 + 3 * T1 + 10 * C1 - 4 * C1 * C1 - 9 * eccPrimeSquared) * D * D * D * D / 24 + (61 + 90 * T1 + 298 * C1 + 45 * T1 * T1 - 252 * eccPrimeSquared - 3 * C1 * C1) * D * D * D * D * D * D / 720);
  lat = radToDeg(lat);

  var lon = (D - (1 + 2 * T1 + C1) * D * D * D / 6 + (5 - 2 * C1 + 28 * T1 - 3 * C1 * C1 + 8 * eccPrimeSquared + 24 * T1 * T1) * D * D * D * D * D / 120) / Math.cos(phi1Rad);
  lon = LongOrigin + radToDeg(lon);

  var result;
  if (utm.accuracy) {
    var topRight = UTMtoLL({
      northing: utm.northing + utm.accuracy,
      easting: utm.easting + utm.accuracy,
      zoneLetter: utm.zoneLetter,
      zoneNumber: utm.zoneNumber
    });
    result = {
      top: topRight.lat,
      right: topRight.lon,
      bottom: lat,
      left: lon
    };
  }
  else {
    result = {
      lat: lat,
      lng: lon
    };
  }
  return result;
}

/**
 * Calculates the MGRS letter designator for the given latitude.
 *
 * @private
 * @param {number} lat The latitude in WGS84 to get the letter designator
 *     for.
 * @return {char} The letter designator.
 */
function getLetterDesignator(lat) {
  //This is here as an error flag to show that the Latitude is
  //outside MGRS limits
  var LetterDesignator = 'Z';

  if ((84 >= lat) && (lat >= 72)) {
    LetterDesignator = 'X';
  }
  else if ((72 > lat) && (lat >= 64)) {
    LetterDesignator = 'W';
  }
  else if ((64 > lat) && (lat >= 56)) {
    LetterDesignator = 'V';
  }
  else if ((56 > lat) && (lat >= 48)) {
    LetterDesignator = 'U';
  }
  else if ((48 > lat) && (lat >= 40)) {
    LetterDesignator = 'T';
  }
  else if ((40 > lat) && (lat >= 32)) {
    LetterDesignator = 'S';
  }
  else if ((32 > lat) && (lat >= 24)) {
    LetterDesignator = 'R';
  }
  else if ((24 > lat) && (lat >= 16)) {
    LetterDesignator = 'Q';
  }
  else if ((16 > lat) && (lat >= 8)) {
    LetterDesignator = 'P';
  }
  else if ((8 > lat) && (lat >= 0)) {
    LetterDesignator = 'N';
  }
  else if ((0 > lat) && (lat >= -8)) {
    LetterDesignator = 'M';
  }
  else if ((-8 > lat) && (lat >= -16)) {
    LetterDesignator = 'L';
  }
  else if ((-16 > lat) && (lat >= -24)) {
    LetterDesignator = 'K';
  }
  else if ((-24 > lat) && (lat >= -32)) {
    LetterDesignator = 'J';
  }
  else if ((-32 > lat) && (lat >= -40)) {
    LetterDesignator = 'H';
  }
  else if ((-40 > lat) && (lat >= -48)) {
    LetterDesignator = 'G';
  }
  else if ((-48 > lat) && (lat >= -56)) {
    LetterDesignator = 'F';
  }
  else if ((-56 > lat) && (lat >= -64)) {
    LetterDesignator = 'E';
  }
  else if ((-64 > lat) && (lat >= -72)) {
    LetterDesignator = 'D';
  }
  else if ((-72 > lat) && (lat >= -80)) {
    LetterDesignator = 'C';
  }
  return LetterDesignator;
}

/**
 * Encodes a UTM location as MGRS string.
 *
 * @private
 * @param {object} utm An object literal with easting, northing,
 *     zoneLetter, zoneNumber
 * @param {number} accuracy Accuracy in digits (1-5).
 * @return {string} MGRS string for the given UTM location.
 */
function encode(utm, accuracy) {
  // prepend with leading zeroes
  var seasting = "00000" + utm.easting,
    snorthing = "00000" + utm.northing;

  return utm.zoneNumber + utm.zoneLetter + " " + get100kID(utm.easting, utm.northing, utm.zoneNumber) + " " + seasting.substr(seasting.length - 5, accuracy) + " " + snorthing.substr(snorthing.length - 5, accuracy); // PORKINS
}

/**
 * Get the two letter 100k designator for a given UTM easting,
 * northing and zone number value.
 *
 * @private
 * @param {number} easting
 * @param {number} northing
 * @param {number} zoneNumber
 * @return {string} the two letter 100k designator for the given UTM location.
 */
function get100kID(easting, northing, zoneNumber) {
  var setParm = get100kSetForZone(zoneNumber);
  var setColumn = Math.floor(easting / 100000);
  var setRow = Math.floor(northing / 100000) % 20;
  return getLetter100kID(setColumn, setRow, setParm);
}

/**
 * Given a UTM zone number, figure out the MGRS 100K set it is in.
 *
 * @private
 * @param {number} i An UTM zone number.
 * @return {number} the 100k set the UTM zone is in.
 */
function get100kSetForZone(i) {
  var setParm = i % NUM_100K_SETS;
  if (setParm === 0) {
    setParm = NUM_100K_SETS;
  }

  return setParm;
}

/**
 * Get the two-letter MGRS 100k designator given information
 * translated from the UTM northing, easting and zone number.
 *
 * @private
 * @param {number} column the column index as it relates to the MGRS
 *        100k set spreadsheet, created from the UTM easting.
 *        Values are 1-8.
 * @param {number} row the row index as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM northing value. Values
 *        are from 0-19.
 * @param {number} parm the set block, as it relates to the MGRS 100k set
 *        spreadsheet, created from the UTM zone. Values are from
 *        1-60.
 * @return {string} two letter MGRS 100k code.
 */
function getLetter100kID(column, row, parm) {
  // colOrigin and rowOrigin are the letters at the origin of the set
  var index = parm - 1;
  var colOrigin = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(index);
  var rowOrigin = SET_ORIGIN_ROW_LETTERS.charCodeAt(index);

  // colInt and rowInt are the letters to build to return
  var colInt = colOrigin + column - 1;
  var rowInt = rowOrigin + row;
  var rollover = false;

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
    rollover = true;
  }

  if (colInt === I || (colOrigin < I && colInt > I) || ((colInt > I || colOrigin < I) && rollover)) {
    colInt++;
  }

  if (colInt === O || (colOrigin < O && colInt > O) || ((colInt > O || colOrigin < O) && rollover)) {
    colInt++;

    if (colInt === I) {
      colInt++;
    }
  }

  if (colInt > Z) {
    colInt = colInt - Z + A - 1;
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
    rollover = true;
  }
  else {
    rollover = false;
  }

  if (((rowInt === I) || ((rowOrigin < I) && (rowInt > I))) || (((rowInt > I) || (rowOrigin < I)) && rollover)) {
    rowInt++;
  }

  if (((rowInt === O) || ((rowOrigin < O) && (rowInt > O))) || (((rowInt > O) || (rowOrigin < O)) && rollover)) {
    rowInt++;

    if (rowInt === I) {
      rowInt++;
    }
  }

  if (rowInt > V) {
    rowInt = rowInt - V + A - 1;
  }

  var twoLetter = String.fromCharCode(colInt) + String.fromCharCode(rowInt);
  return twoLetter;
}

/**
 * Decode the UTM parameters from a MGRS string.
 *
 * @private
 * @param {string} mgrsString an UPPERCASE coordinate string is expected.
 * @return {object} An object literal with easting, northing, zoneLetter,
 *     zoneNumber and accuracy (in meters) properties.
 */
function decode(mgrsString) {

  if (mgrsString && mgrsString.length === 0) {
    throw new Error("MGRSPoint coverting from nothing");
  }

  var length = mgrsString.length;

  var hunK = null;
  var sb = "";
  var testChar;
  var i = 0;

  // get Zone number
  while (!(/[A-Z]/).test(testChar = mgrsString.charAt(i))) {
    if (i >= 2) {
      throw new Error("MGRSPoint bad conversion from: " + mgrsString);
    }
    sb += testChar;
    i++;
  }

  var zoneNumber = parseInt(sb, 10);

  if (i === 0 || i + 3 > length) {
    // A good MGRS string has to be 4-5 digits long,
    // ##AAA/#AAA at least.
    throw new Error("MGRSPoint bad conversion from: " + mgrsString);
  }

  var zoneLetter = mgrsString.charAt(i++);

  // Should we check the zone letter here? Why not.
  if (zoneLetter <= 'A' || zoneLetter === 'B' || zoneLetter === 'Y' || zoneLetter >= 'Z' || zoneLetter === 'I' || zoneLetter === 'O') {
    throw new Error("MGRSPoint zone letter " + zoneLetter + " not handled: " + mgrsString);
  }

  hunK = mgrsString.substring(i, i += 2);

  var set = get100kSetForZone(zoneNumber);

  var east100k = getEastingFromChar(hunK.charAt(0), set);
  var north100k = getNorthingFromChar(hunK.charAt(1), set);

  // We have a bug where the northing may be 2000000 too low.
  // How
  // do we know when to roll over?

  while (north100k < getMinNorthing(zoneLetter)) {
    north100k += 2000000;
  }

  // calculate the char index for easting/northing separator
  var remainder = length - i;

  if (remainder % 2 !== 0) {
    throw new Error("MGRSPoint has to have an even number \nof digits after the zone letter and two 100km letters - front \nhalf for easting meters, second half for \nnorthing meters" + mgrsString);
  }

  var sep = remainder / 2;

  var sepEasting = 0.0;
  var sepNorthing = 0.0;
  var accuracyBonus, sepEastingString, sepNorthingString, easting, northing;
  if (sep > 0) {
    accuracyBonus = 100000.0 / Math.pow(10, sep);
    sepEastingString = mgrsString.substring(i, i + sep);
    sepEasting = parseFloat(sepEastingString) * accuracyBonus;
    sepNorthingString = mgrsString.substring(i + sep);
    sepNorthing = parseFloat(sepNorthingString) * accuracyBonus;
  }

  easting = sepEasting + east100k;
  northing = sepNorthing + north100k;

  return {
    easting: easting,
    northing: northing,
    zoneLetter: zoneLetter,
    zoneNumber: zoneNumber,
    accuracy: accuracyBonus
  };
}

/**
 * Given the first letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the easting value that
 * should be added to the other, secondary easting value.
 *
 * @private
 * @param {char} e The first letter from a two-letter MGRS 100´k zone.
 * @param {number} set The MGRS table set for the zone number.
 * @return {number} The easting value for the given letter and set.
 */
function getEastingFromChar(e, set) {
  // colOrigin is the letter at the origin of the set for the
  // column
  var curCol = SET_ORIGIN_COLUMN_LETTERS.charCodeAt(set - 1);
  var eastingValue = 100000.0;
  var rewindMarker = false;

  while (curCol !== e.charCodeAt(0)) {
    curCol++;
    if (curCol === I) {
      curCol++;
    }
    if (curCol === O) {
      curCol++;
    }
    if (curCol > Z) {
      if (rewindMarker) {
        throw new Error("Bad character: " + e);
      }
      curCol = A;
      rewindMarker = true;
    }
    eastingValue += 100000.0;
  }

  return eastingValue;
}

/**
 * Given the second letter from a two-letter MGRS 100k zone, and given the
 * MGRS table set for the zone number, figure out the northing value that
 * should be added to the other, secondary northing value. You have to
 * remember that Northings are determined from the equator, and the vertical
 * cycle of letters mean a 2000000 additional northing meters. This happens
 * approx. every 18 degrees of latitude. This method does *NOT* count any
 * additional northings. You have to figure out how many 2000000 meters need
 * to be added for the zone letter of the MGRS coordinate.
 *
 * @private
 * @param {char} n Second letter of the MGRS 100k zone
 * @param {number} set The MGRS table set number, which is dependent on the
 *     UTM zone number.
 * @return {number} The northing value for the given letter and set.
 */
function getNorthingFromChar(n, set) {

  if (n > 'V') {
    throw new Error("MGRSPoint given invalid Northing " + n);
  }

  // rowOrigin is the letter at the origin of the set for the
  // column
  var curRow = SET_ORIGIN_ROW_LETTERS.charCodeAt(set - 1);
  var northingValue = 0.0;
  var rewindMarker = false;

  while (curRow !== n.charCodeAt(0)) {
    curRow++;
    if (curRow === I) {
      curRow++;
    }
    if (curRow === O) {
      curRow++;
    }
    // fixing a bug making whole application hang in this loop
    // when 'n' is a wrong character
    if (curRow > V) {
      if (rewindMarker) { // making sure that this loop ends
        throw new Error("Bad character: " + n);
      }
      curRow = A;
      rewindMarker = true;
    }
    northingValue += 100000.0;
  }

  return northingValue;
}

/**
 * The function getMinNorthing returns the minimum northing value of a MGRS
 * zone.
 *
 * Ported from Geotrans' c Lattitude_Band_Value structure table.
 *
 * @private
 * @param {char} zoneLetter The MGRS zone to get the min northing for.
 * @return {number}
 */
function getMinNorthing(zoneLetter) {
  var northing;
  switch (zoneLetter) {
    case 'C':
      northing = 1100000.0;
      break;
    case 'D':
      northing = 2000000.0;
      break;
    case 'E':
      northing = 2800000.0;
      break;
    case 'F':
      northing = 3700000.0;
      break;
    case 'G':
      northing = 4600000.0;
      break;
    case 'H':
      northing = 5500000.0;
      break;
    case 'J':
      northing = 6400000.0;
      break;
    case 'K':
      northing = 7300000.0;
      break;
    case 'L':
      northing = 8200000.0;
      break;
    case 'M':
      northing = 9100000.0;
      break;
    case 'N':
      northing = 0.0;
      break;
    case 'P':
      northing = 800000.0;
      break;
    case 'Q':
      northing = 1700000.0;
      break;
    case 'R':
      northing = 2600000.0;
      break;
    case 'S':
      northing = 3500000.0;
      break;
    case 'T':
      northing = 4400000.0;
      break;
    case 'U':
      northing = 5300000.0;
      break;
    case 'V':
      northing = 6200000.0;
      break;
    case 'W':
      northing = 7000000.0;
      break;
    case 'X':
      northing = 7900000.0;
      break;
    default:
      northing = -1.0;
  }
  if (northing >= 0.0) {
    return northing;
  }
  else {
    throw new Error("Invalid zone letter: " + zoneLetter);
  }

}

/* Find the intersection point of two lines
     * based on line equations
     */
function lineIntersect(line1, line2) {
  // Get the first and last point of the two given segments
  //var line1Pts = line1.getLatLngs();
  //var line2Pts = line2.getLatLngs();
  var pt1 = line1[0];
  var pt2 = line1[line1.length - 1];
  var pt3 = line2[0];
  var pt4 = line2[line2.length - 1];
  var x1 = pt1.lng;
  var y1 = pt1.lat;
  var x2 = pt2.lng;
  var y2 = pt2.lat;
  var x3 = pt3.lng;
  var y3 = pt3.lat;
  var x4 = pt4.lng;
  var y4 = pt4.lat;

  // Lines equation 
  var slope1 = (y2 - y1) / (x2 - x1);
  var b1 = y1 - slope1 * x1;
  var slope2 = (y4 - y3) / (x4 - x3);
  var b2 = y3 - slope2 * x3;

  // Intersection point of 2 lines
  if (slope1 !== slope2) {
    var x = (b2 - b1) / (slope1 - slope2);
  } else {
    return false; // Lines are parallels
  }

  var y = slope1 * x + b1;

  // line1 and line2 are segments not lines so :
  // (x,y) must belong to the x-domain of the two segments
  if (x > Math.min(x1, x2) && x < Math.max(x1, x2) && x > Math.min(x3, x4) && x < Math.max(x3, x4)) {
    return L.latLng(y, x);
  } else {
    return false; // segments do not intersect
  }
}

function getGARSCellLabel(point) {

  return getGARSNumbers(point.lng) + '' + getGARSLetters(point.lat)
}

function getGARSLetters(lat) {
  if (lat >= -90 && lat < -89.5) {
    return 'AA'
  } else if (lat >= -89.5 && lat < -89) {
    return 'AB'
  } else if (lat >= -89 && lat < -88.5) {
    return 'AC'
  } else if (lat >= -88.5 && lat < -88) {
    return 'AD'
  } else if (lat >= -88 && lat < -87.5) {
    return 'AE'
  } else if (lat >= -87.5 && lat < -87) {
    return 'AF'
  } else if (lat >= -87 && lat < -86.5) {
    return 'AG'
  } else if (lat >= -86.5 && lat < -86) {
    return 'AH'
  } else if (lat >= -86 && lat < -85.5) {
    return 'AJ'
  } else if (lat >= -85.5 && lat < -85) {
    return 'AK'
  } else if (lat >= -85 && lat < -84.5) {
    return 'AL'
  } else if (lat >= -84.5 && lat < -84) {
    return 'AM'
  } else if (lat >= -84 && lat < -83.5) {
    return 'AN'
  } else if (lat >= -83.5 && lat < -83) {
    return 'AP'
  } else if (lat >= -83 && lat < -82.5) {
    return 'AQ'
  } else if (lat >= -82.5 && lat < -82) {
    return 'AR'
  } else if (lat >= -82 && lat < -81.5) {
    return 'AS'
  } else if (lat >= -81.5 && lat < -81) {
    return 'AT'
  } else if (lat >= -81 && lat < -80.5) {
    return 'AU'
  } else if (lat >= -80.5 && lat < -80) {
    return 'AV'
  } else if (lat >= -80 && lat < -79.5) {
    return 'AW'
  } else if (lat >= -79.5 && lat < -79) {
    return 'AX'
  } else if (lat >= -79 && lat < -78.5) {
    return 'AY'
  } else if (lat >= -78.5 && lat < -78) {
    return 'AZ'
  } else if (lat >= -78 && lat < -77.5) {
    return 'BA'
  } else if (lat >= -77.5 && lat < -77) {
    return 'BB'
  } else if (lat >= -77 && lat < -76.5) {
    return 'BC'
  } else if (lat >= -76.5 && lat < -76) {
    return 'BD'
  } else if (lat >= -76 && lat < -75.5) {
    return 'BE'
  } else if (lat >= -75.5 && lat < -75) {
    return 'BF'
  } else if (lat >= -75 && lat < -74.5) {
    return 'BG'
  } else if (lat >= -74.5 && lat < -74) {
    return 'BH'
  } else if (lat >= -74 && lat < -73.5) {
    return 'BJ'
  } else if (lat >= -73.5 && lat < -73) {
    return 'BK'
  } else if (lat >= -73 && lat < -72.5) {
    return 'BL'
  } else if (lat >= -72.5 && lat < -72) {
    return 'BM'
  } else if (lat >= -72 && lat < -71.5) {
    return 'BN'
  } else if (lat >= -71.5 && lat < -71) {
    return 'BP'
  } else if (lat >= -71 && lat < -70.5) {
    return 'BQ'
  } else if (lat >= -70.5 && lat < -70) {
    return 'BR'
  } else if (lat >= -70 && lat < -69.5) {
    return 'BS'
  } else if (lat >= -69.5 && lat < -69) {
    return 'BT'
  } else if (lat >= -69 && lat < -68.5) {
    return 'BU'
  } else if (lat >= -68.5 && lat < -68) {
    return 'BV'
  } else if (lat >= -68 && lat < -67.5) {
    return 'BW'
  } else if (lat >= -67.5 && lat < -67) {
    return 'BX'
  } else if (lat >= -67 && lat < -66.5) {
    return 'BY'
  } else if (lat >= -66.5 && lat < -66) {
    return 'BZ'
  } else if (lat >= -66 && lat < -65.5) {
    return 'CA'
  } else if (lat >= -65.5 && lat < -65) {
    return 'CB'
  } else if (lat >= -65 && lat < -64.5) {
    return 'CC'
  } else if (lat >= -64.5 && lat < -64) {
    return 'CD'
  } else if (lat >= -64 && lat < -63.5) {
    return 'CE'
  } else if (lat >= -63.5 && lat < -63) {
    return 'CF'
  } else if (lat >= -63 && lat < -62.5) {
    return 'CG'
  } else if (lat >= -62.5 && lat < -62) {
    return 'CH'
  } else if (lat >= -62 && lat < -61.5) {
    return 'CJ'
  } else if (lat >= -61.5 && lat < -61) {
    return 'CK'
  } else if (lat >= -61 && lat < -60.5) {
    return 'CL'
  } else if (lat >= -60.5 && lat < -60) {
    return 'CM'
  } else if (lat >= -60 && lat < -59.5) {
    return 'CN'
  } else if (lat >= -59.5 && lat < -59) {
    return 'CP'
  } else if (lat >= -59 && lat < -58.5) {
    return 'CQ'
  } else if (lat >= -58.5 && lat < -58) {
    return 'CR'
  } else if (lat >= -58 && lat < -57.5) {
    return 'CS'
  } else if (lat >= -57.5 && lat < -57) {
    return 'CT'
  } else if (lat >= -57 && lat < -56.5) {
    return 'CU'
  } else if (lat >= -56.5 && lat < -56) {
    return 'CV'
  } else if (lat >= -56 && lat < -55.5) {
    return 'CW'
  } else if (lat >= -55.5 && lat < -55) {
    return 'CX'
  } else if (lat >= -55 && lat < -54.5) {
    return 'CY'
  } else if (lat >= -54.5 && lat < -54) {
    return 'CZ'
  } else if (lat >= -54 && lat < -53.5) {
    return 'DA'
  } else if (lat >= -53.5 && lat < -53) {
    return 'DB'
  } else if (lat >= -53 && lat < -52.5) {
    return 'DC'
  } else if (lat >= -52.5 && lat < -52) {
    return 'DD'
  } else if (lat >= -52 && lat < -51.5) {
    return 'DE'
  } else if (lat >= -51.5 && lat < -51) {
    return 'DF'
  } else if (lat >= -51 && lat < -50.5) {
    return 'DG'
  } else if (lat >= -50.5 && lat < -50) {
    return 'DH'
  } else if (lat >= -50 && lat < -49.5) {
    return 'DJ'
  } else if (lat >= -49.5 && lat < -49) {
    return 'DK'
  } else if (lat >= -49 && lat < -48.5) {
    return 'DL'
  } else if (lat >= -48.5 && lat < -48) {
    return 'DM'
  } else if (lat >= -48 && lat < -47.5) {
    return 'DN'
  } else if (lat >= -47.5 && lat < -47) {
    return 'DP'
  } else if (lat >= -47 && lat < -46.5) {
    return 'DQ'
  } else if (lat >= -46.5 && lat < -46) {
    return 'DR'
  } else if (lat >= -46 && lat < -45.5) {
    return 'DS'
  } else if (lat >= -45.5 && lat < -45) {
    return 'DT'
  } else if (lat >= -45 && lat < -44.5) {
    return 'DU'
  } else if (lat >= -44.5 && lat < -44) {
    return 'DV'
  } else if (lat >= -44 && lat < -43.5) {
    return 'DW'
  } else if (lat >= -43.5 && lat < -43) {
    return 'DX'
  } else if (lat >= -43 && lat < -42.5) {
    return 'DY'
  } else if (lat >= -42.5 && lat < -42) {
    return 'DZ'
  } else if (lat >= -42 && lat < -41.5) {
    return 'EA'
  } else if (lat >= -41.5 && lat < -41) {
    return 'EB'
  } else if (lat >= -41 && lat < -40.5) {
    return 'EC'
  } else if (lat >= -40.5 && lat < -40) {
    return 'ED'
  } else if (lat >= -40 && lat < -39.5) {
    return 'EE'
  } else if (lat >= -39.5 && lat < -39) {
    return 'EF'
  } else if (lat >= -39 && lat < -38.5) {
    return 'EG'
  } else if (lat >= -38.5 && lat < -38) {
    return 'EH'
  } else if (lat >= -38 && lat < -37.5) {
    return 'EJ'
  } else if (lat >= -37.5 && lat < -37) {
    return 'EK'
  } else if (lat >= -37 && lat < -36.5) {
    return 'EL'
  } else if (lat >= -36.5 && lat < -36) {
    return 'EM'
  } else if (lat >= -36 && lat < -35.5) {
    return 'EN'
  } else if (lat >= -35.5 && lat < -35) {
    return 'EP'
  } else if (lat >= -35 && lat < -34.5) {
    return 'EQ'
  } else if (lat >= -34.5 && lat < -34) {
    return 'ER'
  } else if (lat >= -34 && lat < -33.5) {
    return 'ES'
  } else if (lat >= -33.5 && lat < -33) {
    return 'ET'
  } else if (lat >= -33 && lat < -32.5) {
    return 'EU'
  } else if (lat >= -32.5 && lat < -32) {
    return 'EV'
  } else if (lat >= -32 && lat < -31.5) {
    return 'EW'
  } else if (lat >= -31.5 && lat < -31) {
    return 'EX'
  } else if (lat >= -31 && lat < -30.5) {
    return 'EY'
  } else if (lat >= -30.5 && lat < -30) {
    return 'EZ'
  } else if (lat >= -30 && lat < -29.5) {
    return 'FA'
  } else if (lat >= -29.5 && lat < -29) {
    return 'FB'
  } else if (lat >= -29 && lat < -28.5) {
    return 'FC'
  } else if (lat >= -28.5 && lat < -28) {
    return 'FD'
  } else if (lat >= -28 && lat < -27.5) {
    return 'FE'
  } else if (lat >= -27.5 && lat < -27) {
    return 'FF'
  } else if (lat >= -27 && lat < -26.5) {
    return 'FG'
  } else if (lat >= -26.5 && lat < -26) {
    return 'FH'
  } else if (lat >= -26 && lat < -25.5) {
    return 'FJ'
  } else if (lat >= -25.5 && lat < -25) {
    return 'FK'
  } else if (lat >= -25 && lat < -24.5) {
    return 'FL'
  } else if (lat >= -24.5 && lat < -24) {
    return 'FM'
  } else if (lat >= -24 && lat < -23.5) {
    return 'FN'
  } else if (lat >= -23.5 && lat < -23) {
    return 'FP'
  } else if (lat >= -23 && lat < -22.5) {
    return 'FQ'
  } else if (lat >= -22.5 && lat < -22) {
    return 'FR'
  } else if (lat >= -22 && lat < -21.5) {
    return 'FS'
  } else if (lat >= -21.5 && lat < -21) {
    return 'FT'
  } else if (lat >= -21 && lat < -20.5) {
    return 'FU'
  } else if (lat >= -20.5 && lat < -20) {
    return 'FV'
  } else if (lat >= -20 && lat < -19.5) {
    return 'FW'
  } else if (lat >= -19.5 && lat < -19) {
    return 'FX'
  } else if (lat >= -19 && lat < -18.5) {
    return 'FY'
  } else if (lat >= -18.5 && lat < -18) {
    return 'FZ'
  } else if (lat >= -18 && lat < -17.5) {
    return 'GA'
  } else if (lat >= -17.5 && lat < -17) {
    return 'GB'
  } else if (lat >= -17 && lat < -16.5) {
    return 'GC'
  } else if (lat >= -16.5 && lat < -16) {
    return 'GD'
  } else if (lat >= -16 && lat < -15.5) {
    return 'GE'
  } else if (lat >= -15.5 && lat < -15) {
    return 'GF'
  } else if (lat >= -15 && lat < -14.5) {
    return 'GG'
  } else if (lat >= -14.5 && lat < -14) {
    return 'GH'
  } else if (lat >= -14 && lat < -13.5) {
    return 'GJ'
  } else if (lat >= -13.5 && lat < -13) {
    return 'GK'
  } else if (lat >= -13 && lat < -12.5) {
    return 'GL'
  } else if (lat >= -12.5 && lat < -12) {
    return 'GM'
  } else if (lat >= -12 && lat < -11.5) {
    return 'GN'
  } else if (lat >= -11.5 && lat < -11) {
    return 'GP'
  } else if (lat >= -11 && lat < -10.5) {
    return 'GQ'
  } else if (lat >= -10.5 && lat < -10) {
    return 'GR'
  } else if (lat >= -10 && lat < -9.5) {
    return 'GS'
  } else if (lat >= -9.5 && lat < -9) {
    return 'GT'
  } else if (lat >= -9 && lat < -8.5) {
    return 'GU'
  } else if (lat >= -8.5 && lat < -8) {
    return 'GV'
  } else if (lat >= -8 && lat < -7.5) {
    return 'GW'
  } else if (lat >= -7.5 && lat < -7) {
    return 'GX'
  } else if (lat >= -7 && lat < -6.5) {
    return 'GY'
  } else if (lat >= -6.5 && lat < -6) {
    return 'GZ'
  } else if (lat >= -6 && lat < -5.5) {
    return 'HA'
  } else if (lat >= -5.5 && lat < -5) {
    return 'HB'
  } else if (lat >= -5 && lat < -4.5) {
    return 'HC'
  } else if (lat >= -4.5 && lat < -4) {
    return 'HD'
  } else if (lat >= -4 && lat < -3.5) {
    return 'HE'
  } else if (lat >= -3.5 && lat < -3) {
    return 'HF'
  } else if (lat >= -3 && lat < -2.5) {
    return 'HG'
  } else if (lat >= -2.5 && lat < -2) {
    return 'HH'
  } else if (lat >= -2 && lat < -1.5) {
    return 'HJ'
  } else if (lat >= -1.5 && lat < -1) {
    return 'HK'
  } else if (lat >= -1 && lat < -0.5) {
    return 'HL'
  } else if (lat >= -0.5 && lat < 0) {
    return 'HM'
  } else if (lat >= 0 && lat < 0.5) {
    return 'HN'
  } else if (lat >= 0.5 && lat < 1) {
    return 'HP'
  } else if (lat >= 1 && lat < 1.5) {
    return 'HQ'
  } else if (lat >= 1.5 && lat < 2) {
    return 'HR'
  } else if (lat >= 2 && lat < 2.5) {
    return 'HS'
  } else if (lat >= 2.5 && lat < 3) {
    return 'HT'
  } else if (lat >= 3 && lat < 3.5) {
    return 'HU'
  } else if (lat >= 3.5 && lat < 4) {
    return 'HV'
  } else if (lat >= 4 && lat < 4.5) {
    return 'HW'
  } else if (lat >= 4.5 && lat < 5) {
    return 'HX'
  } else if (lat >= 5 && lat < 5.5) {
    return 'HY'
  } else if (lat >= 5.5 && lat < 6) {
    return 'HZ'
  } else if (lat >= 6 && lat < 6.5) {
    return 'JA'
  } else if (lat >= 6.5 && lat < 7) {
    return 'JB'
  } else if (lat >= 7 && lat < 7.5) {
    return 'JC'
  } else if (lat >= 7.5 && lat < 8) {
    return 'JD'
  } else if (lat >= 8 && lat < 8.5) {
    return 'JE'
  } else if (lat >= 8.5 && lat < 9) {
    return 'JF'
  } else if (lat >= 9 && lat < 9.5) {
    return 'JG'
  } else if (lat >= 9.5 && lat < 10) {
    return 'JH'
  } else if (lat >= 10 && lat < 10.5) {
    return 'JJ'
  } else if (lat >= 10.5 && lat < 11) {
    return 'JK'
  } else if (lat >= 11 && lat < 11.5) {
    return 'JL'
  } else if (lat >= 11.5 && lat < 12) {
    return 'JM'
  } else if (lat >= 12 && lat < 12.5) {
    return 'JN'
  } else if (lat >= 12.5 && lat < 13) {
    return 'JP'
  } else if (lat >= 13 && lat < 13.5) {
    return 'JQ'
  } else if (lat >= 13.5 && lat < 14) {
    return 'JR'
  } else if (lat >= 14 && lat < 14.5) {
    return 'JS'
  } else if (lat >= 14.5 && lat < 15) {
    return 'JT'
  } else if (lat >= 15 && lat < 15.5) {
    return 'JU'
  } else if (lat >= 15.5 && lat < 16) {
    return 'JV'
  } else if (lat >= 16 && lat < 16.5) {
    return 'JW'
  } else if (lat >= 16.5 && lat < 17) {
    return 'JX'
  } else if (lat >= 17 && lat < 17.5) {
    return 'JY'
  } else if (lat >= 17.5 && lat < 18) {
    return 'JZ'
  } else if (lat >= 18 && lat < 18.5) {
    return 'KA'
  } else if (lat >= 18.5 && lat < 19) {
    return 'KB'
  } else if (lat >= 19 && lat < 19.5) {
    return 'KC'
  } else if (lat >= 19.5 && lat < 20) {
    return 'KD'
  } else if (lat >= 20 && lat < 20.5) {
    return 'KE'
  } else if (lat >= 20.5 && lat < 21) {
    return 'KF'
  } else if (lat >= 21 && lat < 21.5) {
    return 'KG'
  } else if (lat >= 21.5 && lat < 22) {
    return 'KH'
  } else if (lat >= 22 && lat < 22.5) {
    return 'KJ'
  } else if (lat >= 22.5 && lat < 23) {
    return 'KK'
  } else if (lat >= 23 && lat < 23.5) {
    return 'KL'
  } else if (lat >= 23.5 && lat < 24) {
    return 'KM'
  } else if (lat >= 24 && lat < 24.5) {
    return 'KN'
  } else if (lat >= 24.5 && lat < 25) {
    return 'KP'
  } else if (lat >= 25 && lat < 25.5) {
    return 'KQ'
  } else if (lat >= 25.5 && lat < 26) {
    return 'KR'
  } else if (lat >= 26 && lat < 26.5) {
    return 'KS'
  } else if (lat >= 26.5 && lat < 27) {
    return 'KT'
  } else if (lat >= 27 && lat < 27.5) {
    return 'KU'
  } else if (lat >= 27.5 && lat < 28) {
    return 'KV'
  } else if (lat >= 28 && lat < 28.5) {
    return 'KW'
  } else if (lat >= 28.5 && lat < 29) {
    return 'KX'
  } else if (lat >= 29 && lat < 29.5) {
    return 'KY'
  } else if (lat >= 29.5 && lat < 30) {
    return 'KZ'
  } else if (lat >= 30 && lat < 30.5) {
    return 'LA'
  } else if (lat >= 30.5 && lat < 31) {
    return 'LB'
  } else if (lat >= 31 && lat < 31.5) {
    return 'LC'
  } else if (lat >= 31.5 && lat < 32) {
    return 'LD'
  } else if (lat >= 32 && lat < 32.5) {
    return 'LE'
  } else if (lat >= 32.5 && lat < 33) {
    return 'LF'
  } else if (lat >= 33 && lat < 33.5) {
    return 'LG'
  } else if (lat >= 33.5 && lat < 34) {
    return 'LH'
  } else if (lat >= 34 && lat < 34.5) {
    return 'LJ'
  } else if (lat >= 34.5 && lat < 35) {
    return 'LK'
  } else if (lat >= 35 && lat < 35.5) {
    return 'LL'
  } else if (lat >= 35.5 && lat < 36) {
    return 'LM'
  } else if (lat >= 36 && lat < 36.5) {
    return 'LN'
  } else if (lat >= 36.5 && lat < 37) {
    return 'LP'
  } else if (lat >= 37 && lat < 37.5) {
    return 'LQ'
  } else if (lat >= 37.5 && lat < 38) {
    return 'LR'
  } else if (lat >= 38 && lat < 38.5) {
    return 'LS'
  } else if (lat >= 38.5 && lat < 39) {
    return 'LT'
  } else if (lat >= 39 && lat < 39.5) {
    return 'LU'
  } else if (lat >= 39.5 && lat < 40) {
    return 'LV'
  } else if (lat >= 40 && lat < 40.5) {
    return 'LW'
  } else if (lat >= 40.5 && lat < 41) {
    return 'LX'
  } else if (lat >= 41 && lat < 41.5) {
    return 'LY'
  } else if (lat >= 41.5 && lat < 42) {
    return 'LZ'
  } else if (lat >= 42 && lat < 42.5) {
    return 'MA'
  } else if (lat >= 42.5 && lat < 43) {
    return 'MB'
  } else if (lat >= 43 && lat < 43.5) {
    return 'MC'
  } else if (lat >= 43.5 && lat < 44) {
    return 'MD'
  } else if (lat >= 44 && lat < 44.5) {
    return 'ME'
  } else if (lat >= 44.5 && lat < 45) {
    return 'MF'
  } else if (lat >= 45 && lat < 45.5) {
    return 'MG'
  } else if (lat >= 45.5 && lat < 46) {
    return 'MH'
  } else if (lat >= 46 && lat < 46.5) {
    return 'MJ'
  } else if (lat >= 46.5 && lat < 47) {
    return 'MK'
  } else if (lat >= 47 && lat < 47.5) {
    return 'ML'
  } else if (lat >= 47.5 && lat < 48) {
    return 'MM'
  } else if (lat >= 48 && lat < 48.5) {
    return 'MN'
  } else if (lat >= 48.5 && lat < 49) {
    return 'MP'
  } else if (lat >= 49 && lat < 49.5) {
    return 'MQ'
  } else if (lat >= 49.5 && lat < 50) {
    return 'MR'
  } else if (lat >= 50 && lat < 50.5) {
    return 'MS'
  } else if (lat >= 50.5 && lat < 51) {
    return 'MT'
  } else if (lat >= 51 && lat < 51.5) {
    return 'MU'
  } else if (lat >= 51.5 && lat < 52) {
    return 'MV'
  } else if (lat >= 52 && lat < 52.5) {
    return 'MW'
  } else if (lat >= 52.5 && lat < 53) {
    return 'MX'
  } else if (lat >= 53 && lat < 53.5) {
    return 'MY'
  } else if (lat >= 53.5 && lat < 54) {
    return 'MZ'
  } else if (lat >= 54 && lat < 54.5) {
    return 'NA'
  } else if (lat >= 54.5 && lat < 55) {
    return 'NB'
  } else if (lat >= 55 && lat < 55.5) {
    return 'NC'
  } else if (lat >= 55.5 && lat < 56) {
    return 'ND'
  } else if (lat >= 56 && lat < 56.5) {
    return 'NE'
  } else if (lat >= 56.5 && lat < 57) {
    return 'NF'
  } else if (lat >= 57 && lat < 57.5) {
    return 'NG'
  } else if (lat >= 57.5 && lat < 58) {
    return 'NH'
  } else if (lat >= 58 && lat < 58.5) {
    return 'NJ'
  } else if (lat >= 58.5 && lat < 59) {
    return 'NK'
  } else if (lat >= 59 && lat < 59.5) {
    return 'NL'
  } else if (lat >= 59.5 && lat < 60) {
    return 'NM'
  } else if (lat >= 60 && lat < 60.5) {
    return 'NN'
  } else if (lat >= 60.5 && lat < 61) {
    return 'NP'
  } else if (lat >= 61 && lat < 61.5) {
    return 'NQ'
  } else if (lat >= 61.5 && lat < 62) {
    return 'NR'
  } else if (lat >= 62 && lat < 62.5) {
    return 'NS'
  } else if (lat >= 62.5 && lat < 63) {
    return 'NT'
  } else if (lat >= 63 && lat < 63.5) {
    return 'NU'
  } else if (lat >= 63.5 && lat < 64) {
    return 'NV'
  } else if (lat >= 64 && lat < 64.5) {
    return 'NW'
  } else if (lat >= 64.5 && lat < 65) {
    return 'NX'
  } else if (lat >= 65 && lat < 65.5) {
    return 'NY'
  } else if (lat >= 65.5 && lat < 66) {
    return 'NZ'
  } else if (lat >= 66 && lat < 66.5) {
    return 'PA'
  } else if (lat >= 66.5 && lat < 67) {
    return 'PB'
  } else if (lat >= 67 && lat < 67.5) {
    return 'PC'
  } else if (lat >= 67.5 && lat < 68) {
    return 'PD'
  } else if (lat >= 68 && lat < 68.5) {
    return 'PE'
  } else if (lat >= 68.5 && lat < 69) {
    return 'PF'
  } else if (lat >= 69 && lat < 69.5) {
    return 'PG'
  } else if (lat >= 69.5 && lat < 70) {
    return 'PH'
  } else if (lat >= 70 && lat < 70.5) {
    return 'PJ'
  } else if (lat >= 70.5 && lat < 71) {
    return 'PK'
  } else if (lat >= 71 && lat < 71.5) {
    return 'PL'
  } else if (lat >= 71.5 && lat < 72) {
    return 'PM'
  } else if (lat >= 72 && lat < 72.5) {
    return 'PN'
  } else if (lat >= 72.5 && lat < 73) {
    return 'PP'
  } else if (lat >= 73 && lat < 73.5) {
    return 'PQ'
  } else if (lat >= 73.5 && lat < 74) {
    return 'PR'
  } else if (lat >= 74 && lat < 74.5) {
    return 'PS'
  } else if (lat >= 74.5 && lat < 75) {
    return 'PT'
  } else if (lat >= 75 && lat < 75.5) {
    return 'PU'
  } else if (lat >= 75.5 && lat < 76) {
    return 'PV'
  } else if (lat >= 76 && lat < 76.5) {
    return 'PW'
  } else if (lat >= 76.5 && lat < 77) {
    return 'PX'
  } else if (lat >= 77 && lat < 77.5) {
    return 'PY'
  } else if (lat >= 77.5 && lat < 78) {
    return 'PZ'
  } else if (lat >= 78 && lat < 78.5) {
    return 'QA'
  } else if (lat >= 78.5 && lat < 79) {
    return 'QB'
  } else if (lat >= 79 && lat < 79.5) {
    return 'QC'
  } else if (lat >= 79.5 && lat < 80) {
    return 'QD'
  } else if (lat >= 80 && lat < 80.5) {
    return 'QE'
  } else if (lat >= 80.5 && lat < 81) {
    return 'QF'
  } else if (lat >= 81 && lat < 81.5) {
    return 'QG'
  } else if (lat >= 81.5 && lat < 82) {
    return 'QH'
  } else if (lat >= 82 && lat < 82.5) {
    return 'QJ'
  } else if (lat >= 82.5 && lat < 83) {
    return 'QK'
  } else if (lat >= 83 && lat < 83.5) {
    return 'QL'
  } else if (lat >= 83.5 && lat < 84) {
    return 'QM'
  } else if (lat >= 84 && lat < 84.5) {
    return 'QN'
  } else if (lat >= 84.5 && lat < 85) {
    return 'QP'
  } else if (lat >= 85 && lat < 85.5) {
    return 'QQ'
  } else if (lat >= 85.5 && lat < 86) {
    return 'QR'
  } else if (lat >= 86 && lat < 86.5) {
    return 'QS'
  } else if (lat >= 86.5 && lat < 87) {
    return 'QT'
  } else if (lat >= 87 && lat < 87.5) {
    return 'QU'
  } else if (lat >= 87.5 && lat < 88) {
    return 'QV'
  } else if (lat >= 88 && lat < 88.5) {
    return 'QW'
  } else if (lat >= 88.5 && lat < 89) {
    return 'QX'
  } else if (lat >= 89 && lat < 89.5) {
    return 'QY'
  } else if (lat >= 89.5 && lat < 90) {
    return 'QZ'
  } else {
    console.log('lat', lat)
    return 'ZZ'
  }
}

function getGARSNumbers(lng) {
  let count = 0
  while (lng > -180) {
    lng -= 0.5
    count++
  }

  count += ''

  while(count.length < 3) {
    count = '0' + count
  }
  return count
}
export default gridMath