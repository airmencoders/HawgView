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
 * 
 * Pulled from Esri/esri-leaflet repository on Github
 * https://github.com/Esri/esri-leaflet/blob/master/src/Layers/BasemapLayer.js
 */
const esriLayers = {
  baselayers: [
    {
      attribution: 'USGS, NOAA',
      attributionUrl: 'https://static.arcgis.com/attribution/World_Street_Map',
      maxZoom: 19,
      minZoom: 1,
      name: 'Streets',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'USGS, NOAA',
      attributionUrl: 'https://static.arcgis.com/attribution/World_Topo_Map',
      maxZoom: 19,
      minZoom: 1,
      name: 'Topographic',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
      use: true,
    },
    {
      attribution: 'USGS, NOAA',
      attributionUrl: 'https://static.arcgis.com/attribution/Ocean_Basemap',
      maxZoom: 16,
      minZoom: 1,
      name: 'Oceans',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'National Geographic, DeLorme, HERE, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, increment P Corp.',
      attributionUrl: '',
      maxZoom: 16,
      minZoom: 1,
      name: 'National Geographic',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors',
      attributionUrl: '',
      maxZoom: 16,
      minZoom: 1,
      name: 'Dark Gray',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'HERE, DeLorme, MapmyIndia, &copy; OpenStreetMap contributors',
      attributionUrl: '',
      maxZoom: 16,
      minZoom: 1,
      name: 'Gray',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'DigitalGlobe, GeoEye, i-cubed, USDA, USGS, AEX, Getmapping, Aerogrid, IGN, IGP, swisstopo, and the GIS User Community',
      attributionUrl: 'https://static.arcgis.com/attribution/World_Imagery',
      maxZoom: 19,
      minZoom: 1,
      name: 'World Imagery',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      use: true,
    },
    {
      attribution: 'USGS',
      attributionUrl: '',
      maxZoom: 13,
      minZoom: 1,
      name: 'Shaded Relief',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'USGS, NOAA',
      attributionUrl: '',
      maxZoom: 13,
      minZoom: 1,
      name: 'Terrain',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'USGS, National Geographic Society, i-cubed',
      attributionUrl: '',
      maxZoom: 15,
      minZoom: 1,
      name: 'USA Topographic',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/USA_Topo_Maps/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
      attributionUrl: '',
      maxZoom: 19,
      minZoom: 1,
      name: 'Imagery Clarity',
      subdomains: ['clarity'],
      url: 'https://{s}.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      use: true,
    },
    {
      attribution: 'U.S. National Park Service',
      attributionUrl: '',
      maxZoom: 8,
      minZoom: 1,
      name: 'Physical',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/arcgis/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
      use: false,
    },
    {
      attribution: 'Esri, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
      attributionUrl: 'https://static.arcgis.com/attribution/World_Imagery',
      maxZoom: 19,
      minZoom: 1,
      name: 'Imagery Firefly',
      subdomains: ['fly'],
      url: 'https://{s}.maptiles.arcgis.com/arcgis/rest/services/World_Imagery_Firefly/MapServer/tile/{z}/{y}/{x}',
      use: true,
    },
  ],
  overlays: [
    {
      baselayers: ['Oceans'],
      maxZoom: 16,
      minZoom: 1,
      name: 'Oceans Labels',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Ocean/World_Ocean_Reference/MapServer/tile/{z}/{y}/{x}',
    },
    {
      baselayers: ['Dark Gray'],
      maxZoom: 16,
      minZoom: 1,
      name: 'Dark Gray Labels',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    },
    {
      baselayers: ['Gray'],
      maxZoom: 16,
      minZoom: 1,
      name: 'Gray Labels',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Reference/MapServer/tile/{z}/{y}/{x}',
    },
    {
      baselayers: ['World Imagery', 'Imagery Clarity', 'Imagery Firefly'],
      maxZoom: 19,
      minZoom: 1,
      name: 'Imagery Labels',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places/MapServer/tile/{z}/{y}/{x}',
    },
    {
      baselayers: ['World Imagery', 'Imagery Clarity', 'Imagery Firefly'],
      maxZoom: 19,
      minZoom: 1,
      name: 'Transportation Labels',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Transportation/MapServer/tile/{z}/{y}/{x}',
    },
    {
      baselayers: ['Shaded Relief'],
      maxZoom: 12,
      minZoom: 1,
      name: 'Shaded Relief Labels',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Boundaries_and_Places_Alternate/MapServer/tile/{z}/{y}/{x}',
    },
    {
      baselayers: ['Terrain', 'Physical'],
      maxZoom: 13,
      minZoom: 1,
      name: 'Terrain Labels',
      subdomains: ['server', 'services'],
      url: 'https://{s}.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer/tile/{z}/{y}/{x}',
    }
  ],
}

export default esriLayers