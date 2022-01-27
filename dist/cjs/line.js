var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => Line,
  line: () => line
});
var import_leaflet = __toModule(require("leaflet"));
class EventedLayerGroup {
  constructor(...args) {
  }
}
import_leaflet.default.Util.extend(EventedLayerGroup.prototype, import_leaflet.default.LayerGroup.prototype);
import_leaflet.default.Util.extend(EventedLayerGroup.prototype, import_leaflet.default.Evented.prototype);
class Line extends import_leaflet.default.LayerGroup {
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
    return import_leaflet.default.latLngBounds(this.route.coordinates);
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
      routeCoordinates = import_leaflet.default.latLng(this.route.coordinates[waypointIndices[currentIndex]]);
      if (waypointLatLng.distanceTo(routeCoordinates) > missingRouteTolerance) {
        this.addSegment([waypointLatLng, routeCoordinates], missingRouteStyles);
      }
    }
  }
  addSegment(coords, styles, mouselistener) {
    for (const style of styles) {
      const polyline = import_leaflet.default.polyline(coords, style);
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
    import_leaflet.default.DomEvent.stop(e);
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
