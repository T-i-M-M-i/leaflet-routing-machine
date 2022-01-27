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
import Autocomplete from "./autocomplete";
import Localization from "./localization";
class EventedControl {
  constructor(...args) {
  }
}
L.Util.extend(EventedControl.prototype, L.Control.prototype);
L.Util.extend(EventedControl.prototype, L.Evented.prototype);
class GeocoderElement extends EventedControl {
  constructor(waypoint, waypointIndex, numberOfWaypoints, options) {
    super();
    this.defaultOptions = {
      createGeocoder: (_, numberOfWaypoints, options) => {
        const container = L.DomUtil.create("div", "leaflet-routing-geocoder");
        const input = L.DomUtil.create("input", "", container);
        const remove = options.addWaypoints ? L.DomUtil.create("span", "leaflet-routing-remove-waypoint", container) : void 0;
        input.disabled = !options.addWaypoints;
        return {
          container,
          input,
          closeButton: remove
        };
      },
      geocoderPlaceholder: (waypointIndex, numberWaypoints, geocoderElement2) => {
        const l = new Localization(geocoderElement2.options.locale).localize("ui");
        if (waypointIndex === 0) {
          return l.startPlaceholder;
        }
        if (waypointIndex < numberWaypoints - 1) {
          return L.Util.template(l.viaPlaceholder, { viaNumber: waypointIndex });
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
    L.DomEvent.addListener(geocoderInput, "click", (e) => {
      this.selectInputText(e.currentTarget);
    }, this);
    if (closeButton) {
      L.DomEvent.addListener(closeButton, "click", () => {
        this.fire("delete", { waypoint: this.waypoint });
      }, this);
    }
    new Autocomplete(geocoderInput, (r) => {
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
export {
  GeocoderElement as default,
  geocoderElement
};
