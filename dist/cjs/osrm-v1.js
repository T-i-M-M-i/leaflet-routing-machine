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
  default: () => OSRMv1,
  osrmv1: () => osrmv1
});
var import_leaflet = __toModule(require("leaflet"));
var import_polyline_codec = __toModule(require("@googlemaps/polyline-codec"));
var import_waypoint = __toModule(require("./waypoint"));
var import_types = __toModule(require("./common/types"));
class OSRMv1 extends import_leaflet.default.Class {
  constructor(options) {
    super();
    this.defaultOptions = {
      serviceUrl: "https://router.project-osrm.org/route/v1",
      profile: "driving",
      timeout: 30 * 1e3,
      routingOptions: {
        alternatives: true,
        steps: true
      },
      polylinePrecision: 5,
      useHints: true,
      suppressDemoServerWarning: false,
      language: "en"
    };
    var _a, _b;
    this.options = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    this.hints = {
      locations: {}
    };
    if (!this.options.suppressDemoServerWarning && ((_b = (_a = this.options.serviceUrl) == null ? void 0 : _a.indexOf("//router.project-osrm.org")) != null ? _b : 0) >= 0) {
      console.warn("You are using OSRM's demo server. Please note that it is **NOT SUITABLE FOR PRODUCTION USE**.\nRefer to the demo server's usage policy: https://github.com/Project-OSRM/osrm-backend/wiki/Api-usage-policy\n\nTo change, set the serviceUrl option.\n\nPlease do not report issues with this server to neither Leaflet Routing Machine or OSRM - it's for\ndemo only, and will sometimes not be available, or work in unexpected ways.\n\nPlease set up your own OSRM server, or use a paid service provider for production.");
    }
  }
  async route(waypoints, options, abortController) {
    var _a, _b;
    const routingOptions = __spreadValues(__spreadValues({}, this.options.routingOptions), options);
    let url = this.buildRouteUrl(waypoints, routingOptions);
    if (this.options.requestParameters) {
      url += import_leaflet.default.Util.getParamString(this.options.requestParameters, url);
    }
    const wps = [...waypoints];
    const error = {
      message: "",
      status: 0
    };
    const request = fetch(url, {
      signal: abortController == null ? void 0 : abortController.signal
    });
    try {
      const timeout = (_a = this.options.timeout) != null ? _a : this.defaultOptions.timeout;
      const response = await Promise.race([
        request,
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), timeout))
      ]);
      if (response == null ? void 0 : response.ok) {
        try {
          const data = await response.json();
          if (data.code !== "Ok") {
            throw {
              message: data.code,
              status: -1
            };
          }
          try {
            return this.routeDone(data, wps, routingOptions);
          } catch (ex) {
            error.status = -3;
            error.message = ex.toString();
          }
        } catch (ex) {
          error.status = -2;
          error.message = "Error parsing OSRM response: " + ex.toString();
        }
      } else {
        throw {
          target: request
        };
      }
    } catch (err) {
      if (err.name === "AbortError" || err.message === "timeout") {
        throw {
          type: "abort",
          status: -1,
          message: "OSRM request timed out."
        };
      }
      const errorStatus = ((_b = err.target) == null ? void 0 : _b.status) ? ` HTTP ${err.target.status}: ${err.target.statusText}` : "";
      let message = `${err.type}${errorStatus}`;
      if (err.responseText) {
        try {
          const data = JSON.parse(err.responseText);
          if (data.message) {
            message = data.message;
          }
        } catch (ex) {
        }
      }
      error.message = "HTTP request failed: " + message;
      error.url = url;
      error.status = -1;
      error.target = err;
    }
    throw error;
  }
  requiresMoreDetail(route, zoom, bounds) {
    if (!route.properties.isSimplified) {
      return false;
    }
    return route.inputWaypoints.filter((waypoint) => waypoint.latLng).some((waypoint) => !bounds.contains(waypoint.latLng));
  }
  routeDone(response, inputWaypoints, options) {
    const actualWaypoints = this.toWaypoints(inputWaypoints, response.waypoints);
    const alts = response.routes.map((route) => {
      var _a;
      const isSimplified = (_a = !(options == null ? void 0 : options.geometryOnly) || (options == null ? void 0 : options.simplifyGeometry)) != null ? _a : false;
      return this.convertRoute(route, inputWaypoints, actualWaypoints, isSimplified);
    });
    this.saveHintData(response.waypoints, inputWaypoints);
    return alts;
  }
  convertRoute(responseRoute, inputWaypoints, actualWaypoints, isSimplified) {
    const result = {
      name: "",
      coordinates: [],
      instructions: [],
      summary: {
        totalDistance: responseRoute.distance,
        totalTime: responseRoute.duration
      },
      inputWaypoints,
      waypoints: actualWaypoints,
      properties: {
        isSimplified
      },
      waypointIndices: [],
      routesIndex: 0
    };
    const { language = this.defaultOptions.language, stepToText } = this.options;
    const legNames = [];
    const waypointIndices = [];
    const legCount = responseRoute.legs.length;
    const hasSteps = responseRoute.legs[0].steps.length > 0;
    let index = 0;
    for (const leg of responseRoute.legs) {
      if (leg.summary) {
        legNames.push(leg.summary.charAt(0).toUpperCase() + leg.summary.substring(1));
      }
      for (const step of leg.steps) {
        const geometry = this.decodePolyline(step.geometry);
        result.coordinates.push(...geometry);
        const legIndex = leg.steps.indexOf(step);
        const type = this.maneuverToInstructionType(step.maneuver, legIndex === legCount - 1);
        const modifier = this.maneuverToModifier(step.maneuver);
        let text = "";
        if (stepToText) {
          text = stepToText(language, step, { legCount, legIndex });
        }
        if (type) {
          if (legIndex == 0 && step.maneuver.type == "depart" || step.maneuver.type == "arrive") {
            waypointIndices.push(index);
          }
          result.instructions.push({
            type,
            distance: step.distance,
            time: step.duration,
            road: step.name,
            direction: this.bearingToDirection(step.maneuver.bearing_after),
            exit: step.maneuver.exit,
            index,
            mode: step.mode,
            modifier,
            text
          });
        }
        index += geometry.length;
      }
    }
    result.name = legNames.join(", ");
    if (!hasSteps) {
      result.coordinates = this.decodePolyline(responseRoute.geometry);
    } else {
      result.waypointIndices = waypointIndices;
    }
    return result;
  }
  bearingToDirection(bearing) {
    const oct = Math.round(bearing / 45) % 8;
    return [import_types.Direction.N, import_types.Direction.NE, import_types.Direction.E, import_types.Direction.SE, import_types.Direction.S, import_types.Direction.SW, import_types.Direction.W, import_types.Direction.NW][oct];
  }
  maneuverToInstructionType(maneuver, lastLeg) {
    switch (maneuver.type) {
      case "new name":
        return import_types.InstructionType.Continue;
      case "depart":
        return import_types.InstructionType.Head;
      case "arrive":
        return lastLeg ? import_types.InstructionType.DestinationReached : import_types.InstructionType.WaypointReached;
      case "roundabout":
      case "rotary":
        return import_types.InstructionType.Roundabout;
      case "merge":
      case "fork":
      case "on ramp":
      case "off ramp":
      case "end of road":
        return this.camelCase(maneuver.type);
      default:
        return this.camelCase(maneuver.modifier);
    }
  }
  maneuverToModifier(maneuver) {
    let modifier = maneuver.modifier;
    switch (maneuver.type) {
      case "merge":
      case "fork":
      case "on ramp":
      case "off ramp":
      case "end of road":
        modifier = this.leftOrRight(modifier);
    }
    return modifier && this.camelCase(modifier);
  }
  camelCase(s) {
    const words = s.split(" ");
    let result = "";
    for (const word of words) {
      result += `${word.charAt(0).toUpperCase()}${word.substring(1)}`;
    }
    return result;
  }
  leftOrRight(d) {
    return d.indexOf("left") >= 0 ? import_types.InstructionType.Left : import_types.InstructionType.Right;
  }
  decodePolyline(routeGeometry) {
    const line = (0, import_polyline_codec.decode)(routeGeometry, this.options.polylinePrecision);
    return line.map((l) => import_leaflet.default.latLng(l));
  }
  toWaypoints(inputWaypoints, vias) {
    return vias.map((via, i) => {
      const [lng, lat] = via.location;
      const { name, options } = inputWaypoints[i];
      return new import_waypoint.default(import_leaflet.default.latLng(lat, lng), name, options);
    });
  }
  buildRouteUrl(waypoints, options) {
    const locations = [];
    const hints = [];
    for (const waypoint of waypoints.filter((waypoint2) => waypoint2.latLng)) {
      const locationKey = this.locationKey(waypoint.latLng);
      locations.push(locationKey);
      hints.push(this.hints.locations[locationKey] || "");
    }
    const { serviceUrl, profile, useHints } = this.options;
    const { simplifyGeometry = false, geometryOnly = false, allowUTurns = false } = options != null ? options : {};
    const overviewParam = geometryOnly ? simplifyGeometry ? "" : "overview=full" : "overview=false";
    const useHintsParam = useHints ? `&hints=${hints.join(";")}` : "";
    const allowUTurnsParam = allowUTurns ? `&continue_straight=${!allowUTurns}` : "";
    return `${serviceUrl}/${profile}/${locations.join(";")}?${overviewParam}&alternatives=true&steps=true${useHintsParam}${allowUTurnsParam}`;
  }
  locationKey({ lat, lng }) {
    return `${lng},${lat}`;
  }
  saveHintData(actualWaypoints, waypoints) {
    this.hints = {
      locations: {}
    };
    const validWaypoints = waypoints.filter((waypoint) => waypoint.latLng);
    for (let i = actualWaypoints.length - 1; i >= 0; i--) {
      const { latLng } = validWaypoints[i];
      this.hints.locations[this.locationKey(latLng)] = actualWaypoints[i].hint;
    }
  }
}
function osrmv1(options) {
  return new OSRMv1(options);
}
