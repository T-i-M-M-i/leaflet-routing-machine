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
  default: () => Control,
  routingControl: () => routingControl
});
var import_leaflet = __toModule(require("leaflet"));
var import_line = __toModule(require("./line"));
var import_plan = __toModule(require("./plan"));
var import_osrm_v1 = __toModule(require("./osrm-v1"));
var import_itinerary_builder = __toModule(require("./itinerary-builder"));
var import_eventhub = __toModule(require("./eventhub"));
class RoutingControl {
  constructor(...args) {
  }
}
import_leaflet.default.Util.extend(RoutingControl.prototype, import_leaflet.default.Control.prototype);
import_leaflet.default.Util.extend(RoutingControl.prototype, import_leaflet.default.Evented.prototype);
class Control extends RoutingControl {
  constructor(options) {
    super(options);
    this.defaultOptions = {
      pointMarkerStyle: {
        radius: 5,
        color: "#03f",
        fillColor: "white",
        opacity: 1,
        fillOpacity: 0.7
      },
      fitSelectedRoutes: "smart",
      routeLine: (route, options) => {
        return new import_line.default(route, options);
      },
      autoRoute: true,
      routeWhileDragging: false,
      routeDragInterval: 500,
      waypointMode: "connect",
      showAlternatives: false,
      defaultErrorHandler: (e) => {
        console.error("Routing error:", e.error);
      }
    };
    this.alternatives = [];
    this.routes = [];
    this.pendingRequest = null;
    var _a;
    this.controlOptions = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    const { routeWhileDragging = this.defaultOptions.routeWhileDragging } = this.controlOptions;
    this.router = this.controlOptions.router || new import_osrm_v1.default(this.controlOptions.routerOptions);
    this.plan = this.controlOptions.plan || new import_plan.default(this.controlOptions.waypoints || [], this.controlOptions.planOptions);
    this.eventHub = (_a = this.controlOptions.eventHub) != null ? _a : new import_eventhub.default();
    this.itineraryBuilder = this.controlOptions.itineraryBuilder || new import_itinerary_builder.default(this.controlOptions.itineraryBuilderOptions);
    this.itineraryBuilder.registerEventHub(this.eventHub);
    this.requestCount = 0;
    if (this.controlOptions.defaultErrorHandler) {
      this.on("routingerror", this.controlOptions.defaultErrorHandler, this);
    }
    this.plan.on("waypointschanged", this.onWaypointsChanged, this);
    if (routeWhileDragging) {
      this.setupRouteDragging();
    }
  }
  onAdd(map) {
    this.map = map;
    this.map.addLayer(this.plan);
    this.map.on("zoomend", this.onZoomEnd, this);
    this.eventHub.on("routeselected", (e) => this.routeSelected(e));
    this.eventHub.on("altRowMouseOver", (coordinate) => {
      if (this.map) {
        this.marker = import_leaflet.default.circleMarker(coordinate, this.controlOptions.pointMarkerStyle).addTo(this.map);
      }
    });
    this.eventHub.on("altRowMouseOut", () => {
      var _a;
      if (this.marker) {
        (_a = this.map) == null ? void 0 : _a.removeLayer(this.marker);
        delete this.marker;
      }
    });
    this.eventHub.on("altRowClick", (coordinate) => {
      var _a;
      (_a = this.map) == null ? void 0 : _a.panTo(coordinate);
    });
    const container = this.itineraryBuilder.buildItinerary(map.getSize().x <= 640);
    if (this.plan.options.geocoder) {
      container.insertBefore(this.plan.createGeocoders(), container.firstChild);
    }
    if (this.controlOptions.autoRoute) {
      this.route();
    }
    return container;
  }
  onRemove(map) {
    map.off("zoomend", this.onZoomEnd, this);
    if (this.line) {
      map.removeLayer(this.line);
    }
    map.removeLayer(this.plan);
    for (const alternative of this.alternatives) {
      map.removeLayer(alternative);
    }
  }
  getWaypoints() {
    return this.plan.getWaypoints();
  }
  setWaypoints(waypoints) {
    this.plan.setWaypoints(waypoints);
    return this;
  }
  spliceWaypoints(startIndex, deleteCount = 0, ...newWaypoints) {
    this.plan.spliceWaypoints(startIndex, deleteCount, ...newWaypoints);
  }
  getPlan() {
    return this.plan;
  }
  getRouter() {
    return this.router;
  }
  routeSelected(e) {
    const { routeIndex } = e;
    const selectRoute = this.routes.find((r) => r.routesIndex === routeIndex);
    if (!selectRoute) {
      return;
    }
    const route = this.selectedRoute = selectRoute;
    const alternatives = this.controlOptions.showAlternatives ? this.routes.filter((r) => r.routesIndex !== routeIndex) : [];
    const fitMode = this.controlOptions.fitSelectedRoutes;
    const fitBounds = fitMode === "smart" && !this.waypointsVisible() || fitMode !== "smart" && fitMode;
    this.updateLines(route, alternatives);
    if (fitBounds && this.map && this.line) {
      this.map.fitBounds(this.line.getBounds());
    }
    if (this.controlOptions.waypointMode === "snap") {
      this.plan.off("waypointschanged", this.onWaypointsChanged, this);
      this.setWaypoints(route.waypoints);
      this.plan.on("waypointschanged", this.onWaypointsChanged, this);
    }
  }
  waypointsVisible() {
    if (!this.map) {
      return false;
    }
    const waypoints = this.getWaypoints().filter((waypoint) => waypoint.latLng);
    const { lat, lng } = this.map.getCenter();
    let bounds = import_leaflet.default.bounds([this.map.latLngToLayerPoint([lat, lng])]);
    try {
      const mapSize = this.map.getSize();
      for (const waypoint of waypoints) {
        const point = this.map.latLngToLayerPoint(waypoint.latLng);
        if (bounds) {
          bounds.extend(point);
        } else {
          bounds = import_leaflet.default.bounds([point]);
        }
      }
      const boundsSize = bounds.getSize();
      return (boundsSize.x > mapSize.x / 5 || boundsSize.y > mapSize.y / 5) && this.waypointsInViewport();
    } catch (e) {
      return false;
    }
  }
  waypointsInViewport() {
    if (!this.map) {
      return false;
    }
    try {
      const mapBounds = this.map.getBounds();
      return this.getWaypoints().filter((waypoint) => waypoint.latLng).some((waypoint) => mapBounds.contains(waypoint.latLng));
    } catch (e) {
      return false;
    }
  }
  updateLines(route, alternatives) {
    var _a;
    const { routeLine = this.defaultOptions.routeLine } = this.controlOptions;
    const addWaypoints = (_a = this.controlOptions.addWaypoints) != null ? _a : true;
    this.clearLines();
    this.alternatives = [];
    alternatives == null ? void 0 : alternatives.forEach((alt, i) => {
      this.alternatives[i] = routeLine(alt, __spreadValues(__spreadValues({}, {
        isAlternative: true
      }), this.controlOptions.altLineOptions || this.controlOptions.lineOptions));
      if (!this.map) {
        return;
      }
      this.alternatives[i].addTo(this.map);
      this.hookAltEvents(this.alternatives[i]);
    });
    this.line = routeLine(route, __spreadValues(__spreadValues({}, {
      addWaypoints,
      extendToWaypoints: this.controlOptions.waypointMode === "connect"
    }), this.controlOptions.lineOptions));
    if (!this.map) {
      return;
    }
    this.line.addTo(this.map);
    this.hookEvents(this.line);
  }
  hookEvents(l) {
    l.on("linetouched", (e) => {
      if (e.afterIndex < this.getWaypoints().length - 1) {
        this.plan.dragNewWaypoint(e);
      }
    });
  }
  hookAltEvents(l) {
    l.on("linetouched", (e) => {
      this.eventHub.trigger("routeselected", { routeIndex: e.target.route.routesIndex });
    });
  }
  async onWaypointsChanged(e) {
    if (this.controlOptions.autoRoute) {
      await this.route({});
    }
    if (!this.plan.isReady()) {
      this.clearLines();
      this.itineraryBuilder.clearAlts();
    }
    this.fire("waypointschanged", { waypoints: e.waypoints });
  }
  setupRouteDragging() {
    let timer = 0;
    this.plan.on("waypointdrag", (e) => {
      const { waypoints } = e.target;
      if (!timer) {
        timer = setTimeout(async () => {
          const routes = await this.route({
            waypoints,
            geometryOnly: true,
            customRouteTransform: true
          });
          this.updateLineCallback(routes);
          clearTimeout(timer);
        }, this.controlOptions.routeDragInterval);
      }
    });
    this.plan.on("waypointdragend", async () => {
      if (timer) {
        clearTimeout(timer);
      }
      await this.route();
    });
  }
  updateLineCallback(routes) {
    if (!this.selectedRoute) {
      return;
    }
    const alternatives = [...routes];
    const selected = alternatives.splice(this.selectedRoute.routesIndex, 1)[0];
    this.updateLines(selected, this.controlOptions.showAlternatives ? alternatives : []);
  }
  async route(options) {
    var _a, _b;
    const ts = ++this.requestCount;
    if ((_a = this.pendingRequest) == null ? void 0 : _a.abortController) {
      setTimeout(() => {
        var _a2, _b2;
        (_b2 = (_a2 = this.pendingRequest) == null ? void 0 : _a2.abortController) == null ? void 0 : _b2.abort();
        this.pendingRequest = null;
      }, 1e3);
    }
    const routeOptions = options || {};
    if (this.plan.isReady()) {
      if (this.controlOptions.useZoomParameter) {
        routeOptions.zoom = (_b = this.map) == null ? void 0 : _b.getZoom();
      }
      const waypoints = routeOptions.waypoints || this.plan.getWaypoints();
      this.fire("routingstart", { waypoints });
      const controller = new AbortController();
      this.pendingRequest = {
        request: this.router.route(waypoints, routeOptions, controller),
        abortController: controller
      };
      try {
        const routes = await this.pendingRequest.request;
        this.pendingRequest = null;
        if (routeOptions == null ? void 0 : routeOptions.customRouteTransform) {
          return routes;
        }
        if (ts === this.requestCount) {
          this.clearLines();
          routes.forEach((route, i) => {
            route.routesIndex = i;
          });
          if (!routeOptions.geometryOnly) {
            this.fire("routesfound", { waypoints, routes });
            this.itineraryBuilder.clearAlts();
            this.setAlternatives(routes);
          } else {
            this.routeSelected({ routeIndex: routes[0].routesIndex });
          }
        }
      } catch (err) {
        if ((err == null ? void 0 : err.type) !== "abort") {
          this.fire("routingerror", { error: err });
        }
      } finally {
        this.pendingRequest = null;
      }
    }
    return [];
  }
  clearLines() {
    var _a, _b;
    if (this.line) {
      (_a = this.map) == null ? void 0 : _a.removeLayer(this.line);
      delete this.line;
    }
    for (const alternative of this.alternatives) {
      (_b = this.map) == null ? void 0 : _b.removeLayer(alternative);
    }
    this.alternatives = [];
  }
  setAlternatives(routes) {
    this.routes = routes;
    this.itineraryBuilder.setAlternatives(this.routes);
    this.selectRoute({ routeIndex: this.routes[0].routesIndex });
    return this;
  }
  selectRoute(e) {
    var _a;
    if (this.marker) {
      (_a = this.map) == null ? void 0 : _a.removeLayer(this.marker);
      delete this.marker;
    }
    this.eventHub.trigger("routeselected", e);
  }
  async onZoomEnd() {
    if (!this.selectedRoute || !this.router.requiresMoreDetail || !this.map) {
      return;
    }
    if (this.router.requiresMoreDetail(this.selectedRoute, this.map.getZoom(), this.map.getBounds())) {
      try {
        const routes = await this.route({
          simplifyGeometry: false,
          geometryOnly: true,
          customRouteTransform: true
        });
        for (const route of routes) {
          const i = routes.indexOf(route);
          this.routes[i].properties = routes[i].properties;
        }
        this.updateLineCallback(routes);
      } catch (err) {
        if (err.type !== "abort") {
          this.clearLines();
        }
      }
    }
  }
}
function routingControl(options) {
  return new Control(options);
}
