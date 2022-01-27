var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import L from "leaflet";
class EventedLayerGroup {
  constructor(...args) {
  }
}
L.Util.extend(EventedLayerGroup.prototype, L.LayerGroup.prototype);
L.Util.extend(EventedLayerGroup.prototype, L.Evented.prototype);
class Line extends L.LayerGroup {
  constructor(route, options) {
    super();
    this.defaultOptions = {
      styles: [
        { color: "black", opacity: 0.15, weight: 9 },
        { color: "white", opacity: 0.8, weight: 6 },
        { color: "red", opacity: 1, weight: 2 }
      ],
      missingRouteStyles: [
        { color: "black", opacity: 0.15, weight: 7 },
        { color: "white", opacity: 0.6, weight: 4 },
        { color: "gray", opacity: 0.8, weight: 2, dashArray: "7,12" }
      ],
      addWaypoints: true,
      extendToWaypoints: true,
      missingRouteTolerance: 10
    };
    this.waypointIndices = [];
    var _a;
    this.options = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    this.route = route;
    if (this.options.extendToWaypoints) {
      this.extendToWaypoints();
    }
    this.addSegment(route.coordinates, (_a = this.options.styles) != null ? _a : this.defaultOptions.styles, this.options.addWaypoints);
  }
  getBounds() {
    return L.latLngBounds(this.route.coordinates);
  }
  findWaypointIndices() {
    return this.route.inputWaypoints.filter((waypoint) => waypoint.latLng).map((waypoint) => this.findClosestRoutePoint(waypoint.latLng));
  }
  findClosestRoutePoint(latlng) {
    let minDist = Number.MAX_VALUE;
    let minIndex = 0;
    let distance;
    for (const coordinate of this.route.coordinates.reverse()) {
      distance = latlng.distanceTo(coordinate);
      if (distance < minDist) {
        minIndex = this.route.coordinates.indexOf(coordinate);
        minDist = distance;
      }
    }
    return minIndex;
  }
  extendToWaypoints() {
    const waypointIndices = this.getWaypointIndices();
    let waypointLatLng;
    let routeCoordinates;
    const {
      missingRouteTolerance = this.defaultOptions.missingRouteTolerance,
      missingRouteStyles = this.defaultOptions.missingRouteStyles
    } = this.options;
    for (const waypoint of this.route.inputWaypoints.filter((waypoint2) => waypoint2.latLng)) {
      waypointLatLng = waypoint.latLng;
      const currentIndex = this.route.inputWaypoints.indexOf(waypoint);
      routeCoordinates = L.latLng(this.route.coordinates[waypointIndices[currentIndex]]);
      if (waypointLatLng.distanceTo(routeCoordinates) > missingRouteTolerance) {
        this.addSegment([waypointLatLng, routeCoordinates], missingRouteStyles);
      }
    }
  }
  addSegment(coords, styles, mouselistener) {
    for (const style of styles) {
      const polyline = L.polyline(coords, style);
      this.addLayer(polyline);
      if (mouselistener) {
        polyline.on("mousedown", this.onLineTouched, this);
      }
    }
  }
  findNearestWaypointBefore(index) {
    const waypointIndices = this.getWaypointIndices();
    let j = waypointIndices.length - 1;
    while (j >= 0 && waypointIndices[j] > index) {
      j--;
    }
    return j;
  }
  onLineTouched(e) {
    const afterIndex = this.findNearestWaypointBefore(this.findClosestRoutePoint(e.latlng));
    this.fire("linetouched", {
      afterIndex,
      latlng: e.latlng
    });
    L.DomEvent.stop(e);
  }
  getWaypointIndices() {
    if (!this.waypointIndices.length) {
      this.waypointIndices = this.route.waypointIndices || this.findWaypointIndices();
    }
    return this.waypointIndices;
  }
}
function line(route, options) {
  return new Line(route, options);
}
export {
  Line as default,
  line
};
