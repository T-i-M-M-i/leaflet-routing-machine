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
class Waypoint extends L.Class {
  constructor(latLng, name, options) {
    super();
    this.options = {
      allowUTurn: false
    };
    this.options = __spreadValues(__spreadValues({}, this.options), options);
    this.latLng = latLng ? L.latLng(latLng) : null;
    this.name = name;
  }
}
function waypoint(latLng, name, options) {
  return new Waypoint(latLng, name, options);
}
export {
  Waypoint as default,
  waypoint
};
