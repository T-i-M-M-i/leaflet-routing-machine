[Leaflet Routing Machine]((https://www.liedman.net/leaflet-routing-machine/)) [![NPM version](https://img.shields.io/npm/v/leaflet-routing-machine.svg)](https://www.npmjs.com/package/leaflet-routing-machine) ![Leaflet 1.0 compatible!](https://img.shields.io/badge/Leaflet%201.0-%E2%9C%93-1EB300.svg?style=flat) [![Join the chat at https://gitter.im/leaflet-routing-machine/Lobby](https://badges.gitter.im/leaflet-routing-machine/Lobby.svg)](https://gitter.im/leaflet-routing-machine/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
=======================

Find the way from A to B on a Leaflet map. The plugin supports multiple backends:

* [OSRM](http://project-osrm.org/) - builtin and used by default (version 5)
* [Mapbox Directions API](https://www.mapbox.com/developers/api/directions/) - builtin with the class `L.Routing.Mapbox`
* [GraphHopper](https://graphhopper.com/) - through plugin [lrm-graphopper](https://github.com/perliedman/lrm-graphhopper)
* [Mapzen Valhalla](https://mapzen.com/projects/valhalla/) - through plugin [lrm-valhalla](https://github.com/valhalla/lrm-valhalla)
* [TomTom Online Routing API](http://developer.tomtom.com/io-docs) - through plugin [lrm-tomtom](https://github.com/mrohnstock/lrm-tomtom) by [Mathias Rohnstock](https://github.com/mrohnstock)
* Legacy support for OSRM version 4 through plugin [lrm-osrm4](https://github.com/perliedman/lrm-osrm4)
* Esri - through plugin [lrm-esri](https://github.com/jgravois/lrm-esri)

## Features

* Standard Leaflet control, with Leaflet look and feel
* Routing from start to destination, with possibility of via points
* Add, edit and remove waypoints through both address input and using the map
* Multiple language support
* Highly customizable for advanced use
* Customizable look (theming / skins)
* Open Source released under ISC License (more or less equivalent with the MIT license)

__Go to the [Leaflet Routing Machine site](https://www.liedman.net/leaflet-routing-machine/) for more information, demos, tutorials and more.__

## Support and New Features

Leaflet Routing Machine is in many ways already a feature complete routing UI. Most likely, your requirements are already covered and require very little adaptation.

For questions and discussions, you might want to look at [the Leaflet Routing Machine gitter](https://gitter.im/leaflet-routing-machine/Lobby).

## Building

```sh
npm install
```

This requires [Node and npm](http://nodejs.org/).

# Usage
via npm/yarn (the preferred way):

```sh
npm install --save leaflet-routing-machine
```

__Please Note__: If you want to use osrm-text-instructions for routing instructions, you need to add it as a dependency yourself

```sh
npm i --save osrm-text-instructions
```

```typescript
var L = require('leaflet');
require('leaflet-routing-machine');

// or, if you prefer modern ES6 imports
import * as L from 'leaflet';
import 'leaflet-routing-machine';

...
```
___

alternatively, if you do not use a bundler:

Download [latest release](https://github.com/perliedman/leaflet-routing-machine/releases), or obtain the latest release via [unpkg.com](https://unpkg.com/).

```html
<link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.css" />
<script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.js"></script>
```
__Please note__: From v4 this will not include osrm-text-instructions anymore so you need to configure your own language mapping or stay on v3

___

LRM attaches itself onto `L`.

__Go to the [Leaflet Routing Machine site](http://www.liedman.net/leaflet-routing-machine/) for more information, demos, tutorials and more.__
