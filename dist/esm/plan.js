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
import GeocoderElement from "./geocoder-element";
import Waypoint from "./waypoint";
class Plan extends L.Layer {
  constructor(waypoints, options) {
    super();
    this.defaultOptions = {
      dragStyles: [
        { color: "black", opacity: 0.15, weight: 9 },
        { color: "white", opacity: 0.8, weight: 6 },
        { color: "red", opacity: 1, weight: 2, dashArray: "7,12" }
      ],
      draggableWaypoints: true,
      routeWhileDragging: false,
      addWaypoints: true,
      reverseWaypoints: false,
      addButtonClassName: "",
      language: "en",
      createGeocoderElement: (waypoint, waypointIndex, numberOfWaypoints, plan2) => {
        return new GeocoderElement(waypoint, waypointIndex, numberOfWaypoints, plan2);
      },
      createMarker: (waypointIndex, waypoint) => {
        var _a;
        const options = {
          draggable: this.options.draggableWaypoints
        };
        return L.marker((_a = waypoint.latLng) != null ? _a : [0, 0], options);
      },
      geocodersClassName: ""
    };
    this.geocoderElements = [];
    this.markers = [];
    this.options = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    this.waypoints = [];
    this.setWaypoints(waypoints.map((waypoint) => waypoint instanceof Waypoint ? waypoint : new Waypoint(waypoint)));
  }
  isReady() {
    return this.waypoints.every((waypoint) => {
      const { latLng } = waypoint;
      return latLng && (latLng.lat > 0 && latLng.lng > 0 || latLng.lat === 0 && latLng.lng > 0 || latLng.lng === 0 && latLng.lat > 0);
    });
  }
  getWaypoints() {
    return [...this.waypoints];
  }
  setWaypoints(waypoints) {
    this.spliceWaypoints(0, this.waypoints.length, ...waypoints);
    return this;
  }
  spliceWaypoints(startIndex, deleteCount = 0, ...newWaypoints) {
    this.waypoints.splice(startIndex, deleteCount, ...newWaypoints);
    while (this.waypoints.length < 2) {
      this.spliceWaypoints(this.waypoints.length, 0);
    }
    this.updateMarkers();
    this.fireChanged(startIndex, deleteCount, ...newWaypoints);
  }
  onAdd(map) {
    this._map = map;
    this.updateMarkers();
    return this;
  }
  onRemove() {
    this.removeMarkers();
    return this;
  }
  createGeocoders() {
    const container = L.DomUtil.create("div", `leaflet-routing-geocoders ${this.options.geocodersClassName}`);
    this.geocoderContainer = container;
    this.geocoderElements = [];
    if (this.options.addWaypoints) {
      const addWaypointButton = L.DomUtil.create("button", `leaflet-routing-add-waypoint ${this.options.addButtonClassName}`, container);
      addWaypointButton.setAttribute("type", "button");
      L.DomEvent.addListener(addWaypointButton, "click", () => {
        this.spliceWaypoints(this.waypoints.length, 0, new Waypoint());
      }, this);
    }
    if (this.options.reverseWaypoints) {
      const reverseButton = L.DomUtil.create("button", "leaflet-routing-reverse-waypoints", container);
      reverseButton.setAttribute("type", "button");
      L.DomEvent.addListener(reverseButton, "click", () => {
        this.waypoints.reverse();
        this.setWaypoints(this.waypoints);
      }, this);
    }
    this.updateGeocoders();
    this.on("waypointsspliced", this.updateGeocoders, this);
    return container;
  }
  createGeocoder(waypointIndex) {
    const { createGeocoderElement = this.defaultOptions.createGeocoderElement } = this.options;
    const geocoder = createGeocoderElement(this.waypoints[waypointIndex], waypointIndex, this.waypoints.length, this.options);
    geocoder.on("delete", () => {
      if (waypointIndex > 0 || this.waypoints.length > 2) {
        this.spliceWaypoints(waypointIndex, 1);
      } else {
        this.spliceWaypoints(waypointIndex, 1, new Waypoint([0, 0]));
      }
    }).on("geocoded", (e) => {
      this.updateMarkers();
      this.fireChanged();
      this.focusGeocoder(waypointIndex + 1);
      this.fire("waypointgeocoded", {
        waypointIndex,
        waypoint: e.waypoint
      });
    }).on("reversegeocoded", (e) => {
      this.fire("waypointgeocoded", {
        waypointIndex,
        waypoint: e.waypoint
      });
    });
    return geocoder;
  }
  updateGeocoders() {
    var _a;
    for (const geocoderElement of this.geocoderElements) {
      (_a = this.geocoderContainer) == null ? void 0 : _a.removeChild(geocoderElement.getContainer());
    }
    const elements = [...this.waypoints].reverse().map((waypoint) => {
      var _a2;
      const geocoderElement = this.createGeocoder(this.waypoints.indexOf(waypoint));
      (_a2 = this.geocoderContainer) == null ? void 0 : _a2.insertBefore(geocoderElement.getContainer(), this.geocoderContainer.firstChild);
      return geocoderElement;
    });
    this.geocoderElements = elements.reverse();
  }
  removeMarkers() {
    if (this.markers) {
      for (const marker of this.markers) {
        this._map.removeLayer(marker);
      }
    }
    this.markers = [];
  }
  updateMarkers() {
    if (!this._map) {
      return;
    }
    this.removeMarkers();
    const { createMarker = this.defaultOptions.createMarker } = this.options;
    for (const waypoint of this.waypoints) {
      if (waypoint.latLng) {
        const waypointIndex = this.waypoints.indexOf(waypoint);
        const marker = createMarker(waypointIndex, waypoint, this.waypoints.length);
        if (marker) {
          marker.addTo(this._map);
          if (this.options.draggableWaypoints) {
            this.hookWaypointEvents(marker, waypointIndex);
          }
          this.markers.push(marker);
        }
      }
    }
  }
  fireChanged(startIndex, deleteCount, ...newWaypoints) {
    this.fire("waypointschanged", { waypoints: this.getWaypoints() });
    if (startIndex) {
      this.fire("waypointsspliced", {
        index: startIndex,
        nRemoved: deleteCount,
        added: newWaypoints
      });
    }
  }
  hookWaypointEvents(marker, waypointIndex, trackMouseMove = false) {
    const eventLatLng = (e) => {
      return trackMouseMove ? e.latlng : e.target.getLatLng();
    };
    const dragStart = (e) => {
      this.fire("waypointdragstart", { index: waypointIndex, latlng: eventLatLng(e) });
    };
    const drag = (e) => {
      this.waypoints[waypointIndex].latLng = eventLatLng(e);
      this.fire("waypointdrag", { index: waypointIndex, latlng: eventLatLng(e) });
    };
    const dragEnd = (e) => {
      this.waypoints[waypointIndex].latLng = eventLatLng(e);
      this.waypoints[waypointIndex].name = "";
      if (this.geocoderElements) {
        this.geocoderElements[waypointIndex].update(true);
      }
      this.fire("waypointdragend", { index: waypointIndex, latlng: eventLatLng(e) });
      this.fireChanged();
    };
    if (trackMouseMove) {
      const mouseMove = (e) => {
        this.markers[waypointIndex].setLatLng(e.latlng);
        drag(e);
      };
      const mouseUp = (e) => {
        this._map.dragging.enable();
        this._map.off("mouseup", mouseUp, this);
        this._map.off("mousemove", mouseMove, this);
        dragEnd(e);
      };
      this._map.dragging.disable();
      this._map.on("mousemove", mouseMove, this);
      this._map.on("mouseup", mouseUp, this);
      dragStart({ latlng: this.waypoints.filter((waypoint) => waypoint.latLng)[waypointIndex].latLng });
    } else {
      marker.on("dragstart", dragStart, this);
      marker.on("drag", drag, this);
      marker.on("dragend", dragEnd, this);
    }
  }
  dragNewWaypoint(e) {
    const newWaypointIndex = e.afterIndex + 1;
    if (this.options.routeWhileDragging) {
      this.spliceWaypoints(newWaypointIndex, 0, new Waypoint(e.latlng));
      this.hookWaypointEvents(this.markers[newWaypointIndex], newWaypointIndex, true);
    } else {
      this._dragNewWaypoint(newWaypointIndex, e.latlng);
    }
  }
  _dragNewWaypoint(newWaypointIndex, initialLatLng) {
    const waypoint = new Waypoint(initialLatLng);
    const validWaypoints = this.waypoints.filter((waypoint2) => waypoint2.latLng);
    const previousWaypoint = validWaypoints[newWaypointIndex - 1];
    const nextWaypoint = validWaypoints[newWaypointIndex];
    const { createMarker = this.defaultOptions.createMarker } = this.options;
    const marker = createMarker(newWaypointIndex, waypoint, this.waypoints.length + 1);
    const lines = [];
    const draggingEnabled = this._map.dragging.enabled();
    const mouseMove = (e) => {
      if (marker) {
        marker.setLatLng(e.latlng);
      }
      for (const line of lines) {
        const latLngs = line.getLatLngs();
        latLngs.splice(1, 1, e.latlng);
        line.setLatLngs(latLngs);
      }
      L.DomEvent.stop(e);
    };
    const mouseUp = (e) => {
      if (marker) {
        this._map.removeLayer(marker);
      }
      for (const line of lines) {
        this._map.removeLayer(line);
      }
      this._map.off("mousemove", mouseMove, this);
      this._map.off("mouseup", mouseUp, this);
      this.spliceWaypoints(newWaypointIndex, 0, new Waypoint(e.latlng));
      if (draggingEnabled) {
        this._map.dragging.enable();
      }
      L.DomEvent.stop(e);
    };
    if (marker) {
      marker.addTo(this._map);
    }
    const { dragStyles = this.defaultOptions.dragStyles } = this.options;
    for (const dragStyle of dragStyles) {
      lines.push(L.polyline([previousWaypoint.latLng, initialLatLng, nextWaypoint.latLng], dragStyle).addTo(this._map));
    }
    if (draggingEnabled) {
      this._map.dragging.disable();
    }
    this._map.on("mousemove", mouseMove, this);
    this._map.on("mouseup", mouseUp, this);
  }
  focusGeocoder(index) {
    if (this.geocoderElements[index]) {
      this.geocoderElements[index].focus();
    } else {
      document.activeElement.blur();
    }
  }
}
function plan(waypoints, options) {
  return new Plan(waypoints, options);
}
export {
  Plan as default,
  plan
};
