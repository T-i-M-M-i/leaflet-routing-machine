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
  default: () => GeocoderElement,
  geocoderElement: () => geocoderElement
});
var import_leaflet = __toModule(require("leaflet"));
var import_autocomplete = __toModule(require("./autocomplete"));
var import_localization = __toModule(require("./localization"));
class EventedControl {
  constructor(...args) {
  }
}
import_leaflet.default.Util.extend(EventedControl.prototype, import_leaflet.default.Control.prototype);
import_leaflet.default.Util.extend(EventedControl.prototype, import_leaflet.default.Evented.prototype);
class GeocoderElement extends EventedControl {
  constructor(waypoint, waypointIndex, numberOfWaypoints, options) {
    super();
    this.defaultOptions = {
      createGeocoder: (_, numberOfWaypoints, options) => {
        const container = import_leaflet.default.DomUtil.create("div", "leaflet-routing-geocoder");
        const input = import_leaflet.default.DomUtil.create("input", "", container);
        const remove = options.addWaypoints ? import_leaflet.default.DomUtil.create("span", "leaflet-routing-remove-waypoint", container) : void 0;
        input.disabled = !options.addWaypoints;
        return {
          container,
          input,
          closeButton: remove
        };
      },
      geocoderPlaceholder: (waypointIndex, numberWaypoints, geocoderElement2) => {
        const l = new import_localization.default(geocoderElement2.options.locale).localize("ui");
        if (waypointIndex === 0) {
          return l.startPlaceholder;
        }
        if (waypointIndex < numberWaypoints - 1) {
          return import_leaflet.default.Util.template(l.viaPlaceholder, { viaNumber: waypointIndex });
        }
        return l.endPlaceholder;
      },
      geocoderClass: () => {
        return "";
      },
      waypointNameFallback: (latLng) => {
        const ns = latLng.lat < 0 ? "S" : "N";
        const ew = latLng.lng < 0 ? "W" : "E";
        const lat = (Math.round(Math.abs(latLng.lat) * 1e4) / 1e4).toString();
        const lng = (Math.round(Math.abs(latLng.lng) * 1e4) / 1e4).toString();
        return ns + lat + ", " + ew + lng;
      },
      maxGeocoderTolerance: 200,
      autocompleteOptions: {},
      language: "en"
    };
    var _a, _b, _c;
    this.options = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    const {
      createGeocoder = this.defaultOptions.createGeocoder,
      geocoderPlaceholder = this.defaultOptions.geocoderPlaceholder,
      geocoderClass = this.defaultOptions.geocoderClass
    } = this.options;
    const geocoder = createGeocoder(waypointIndex, numberOfWaypoints, this.options);
    const closeButton = geocoder.closeButton;
    const geocoderInput = geocoder.input;
    geocoderInput.setAttribute("placeholder", geocoderPlaceholder(waypointIndex, numberOfWaypoints, this));
    geocoderInput.className = geocoderClass(waypointIndex, numberOfWaypoints);
    this.element = geocoder;
    this.waypoint = waypoint;
    this.update();
    geocoderInput.value = (_a = waypoint.name) != null ? _a : "";
    import_leaflet.default.DomEvent.addListener(geocoderInput, "click", (e) => {
      this.selectInputText(e.currentTarget);
    }, this);
    if (closeButton) {
      import_leaflet.default.DomEvent.addListener(closeButton, "click", () => {
        this.fire("delete", { waypoint: this.waypoint });
      }, this);
    }
    new import_autocomplete.default(geocoderInput, (r) => {
      geocoderInput.value = r.name;
      this.waypoint.name = r.name;
      this.waypoint.latLng = r.center;
      this.fire("geocoded", { waypoint: this.waypoint, value: r });
    }, __spreadValues(__spreadValues({}, {
      resultFn: (_b = this.options.geocoder) == null ? void 0 : _b.geocode,
      autocompleteFn: (_c = this.options.geocoder) == null ? void 0 : _c.suggest
    }), this.options.autocompleteOptions));
  }
  getContainer() {
    return this.element.container;
  }
  setValue(value) {
    this.element.input.value = value;
  }
  update(force = false) {
    var _a;
    const { name, latLng } = this.waypoint;
    if (latLng && (force || !name)) {
      const {
        waypointNameFallback = this.defaultOptions.waypointNameFallback,
        maxGeocoderTolerance = this.defaultOptions.maxGeocoderTolerance
      } = this.options;
      const waypointCoordinates = waypointNameFallback(latLng);
      if ((_a = this.options.geocoder) == null ? void 0 : _a.reverse) {
        this.options.geocoder.reverse(latLng, 67108864, (result) => {
          if (result.length > 0 && result[0].center.distanceTo(latLng) < maxGeocoderTolerance) {
            this.waypoint.name = result[0].name;
          } else {
            this.waypoint.name = waypointCoordinates;
          }
          this.setReverseGeocodeResult();
        });
      } else {
        this.waypoint.name = waypointCoordinates;
        this.setReverseGeocodeResult();
      }
    }
  }
  focus() {
    const { input } = this.element;
    input.focus();
    this.selectInputText(input);
  }
  setReverseGeocodeResult() {
    var _a, _b;
    const value = (_b = (_a = this.waypoint) == null ? void 0 : _a.name) != null ? _b : "";
    this.setValue(value);
    this.fire("reversegeocoded", { waypoint: this.waypoint, value });
  }
  selectInputText(input) {
    if (input.setSelectionRange) {
      input.setSelectionRange(0, 9999);
    } else {
      input.select();
    }
  }
}
function geocoderElement(waypoint, waypointIndex, numberOfWaypoints, options) {
  return new GeocoderElement(waypoint, waypointIndex, numberOfWaypoints, options);
}
