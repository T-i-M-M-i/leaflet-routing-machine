var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
  Autocomplete: () => import_autocomplete.default,
  ErrorControl: () => import_error_control.default,
  Formatter: () => import_formatter.default,
  GeocoderElement: () => import_geocoder_element.default,
  ItineraryBuilder: () => import_itinerary_builder.default,
  Line: () => import_line.default,
  Localization: () => import_localization.default,
  Mapbox: () => import_mapbox.default,
  OSRMv1: () => import_osrm_v1.default,
  Plan: () => import_plan.default,
  RoutingControl: () => import_control.default,
  Waypoint: () => import_waypoint.default,
  autocomplete: () => import_autocomplete.autocomplete,
  errorControl: () => import_error_control.errorControl,
  formatter: () => import_formatter.formatter,
  geocoderElement: () => import_geocoder_element.geocoderElement,
  itineraryBuilder: () => import_itinerary_builder.itineraryBuilder,
  line: () => import_line.line,
  localization: () => import_localization.localization,
  mapbox: () => import_mapbox.mapbox,
  osrmv1: () => import_osrm_v1.osrmv1,
  plan: () => import_plan.plan,
  routingControl: () => import_control.routingControl,
  waypoint: () => import_waypoint.waypoint
});
var L = __toModule(require("leaflet"));
var import_control = __toModule(require("./control"));
var import_line = __toModule(require("./line"));
var import_osrm_v1 = __toModule(require("./osrm-v1"));
var import_plan = __toModule(require("./plan"));
var import_waypoint = __toModule(require("./waypoint"));
var import_autocomplete = __toModule(require("./autocomplete"));
var import_formatter = __toModule(require("./formatter"));
var import_geocoder_element = __toModule(require("./geocoder-element"));
var import_localization = __toModule(require("./localization"));
var import_itinerary_builder = __toModule(require("./itinerary-builder"));
var import_error_control = __toModule(require("./error-control"));
var import_mapbox = __toModule(require("./mapbox"));
const Routing = {
  Control: import_control.default,
  Line: import_line.default,
  OSRMv1: import_osrm_v1.default,
  Plan: import_plan.default,
  Waypoint: import_waypoint.default,
  Autocomplete: import_autocomplete.default,
  Formatter: import_formatter.default,
  GeocoderElement: import_geocoder_element.default,
  Localization: import_localization.default,
  ItineraryBuilder: import_itinerary_builder.default,
  Mapbox: import_mapbox.default,
  control: import_control.routingControl,
  line: import_line.line,
  plan: import_plan.plan,
  waypoint: import_waypoint.waypoint,
  osrmv1: import_osrm_v1.osrmv1,
  localization: import_localization.localization,
  formatter: import_formatter.formatter,
  geocoderElement: import_geocoder_element.geocoderElement,
  itineraryBuilder: import_itinerary_builder.itineraryBuilder,
  mapbox: import_mapbox.mapbox,
  errorControl: import_error_control.errorControl,
  autocomplete: import_autocomplete.autocomplete
};
if (typeof window !== "undefined" && window.L) {
  window.L.Routing = Routing;
}
const Leaflet = L;
Leaflet.Routing = Routing;
