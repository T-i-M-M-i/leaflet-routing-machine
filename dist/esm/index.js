import * as L from "leaflet";
import RoutingControl, { routingControl } from "./control";
import Line, { line } from "./line";
import OSRMv1, { osrmv1 } from "./osrm-v1";
import Plan, { plan } from "./plan";
import Waypoint, { waypoint } from "./waypoint";
import Autocomplete, { autocomplete } from "./autocomplete";
import Formatter, { formatter } from "./formatter";
import GeocoderElement, { geocoderElement } from "./geocoder-element";
import Localization, { localization } from "./localization";
import ItineraryBuilder, { itineraryBuilder } from "./itinerary-builder";
import ErrorControl, { errorControl } from "./error-control";
import Mapbox, { mapbox } from "./mapbox";
const Routing = {
  Control: RoutingControl,
  Line,
  OSRMv1,
  Plan,
  Waypoint,
  Autocomplete,
  Formatter,
  GeocoderElement,
  Localization,
  ItineraryBuilder,
  Mapbox,
  control: routingControl,
  line,
  plan,
  waypoint,
  osrmv1,
  localization,
  formatter,
  geocoderElement,
  itineraryBuilder,
  mapbox,
  errorControl,
  autocomplete
};
if (typeof window !== "undefined" && window.L) {
  window.L.Routing = Routing;
}
const Leaflet = L;
Leaflet.Routing = Routing;
export {
  Autocomplete,
  ErrorControl,
  Formatter,
  GeocoderElement,
  ItineraryBuilder,
  Line,
  Localization,
  Mapbox,
  OSRMv1,
  Plan,
  RoutingControl,
  Waypoint,
  autocomplete,
  errorControl,
  formatter,
  geocoderElement,
  itineraryBuilder,
  line,
  localization,
  mapbox,
  osrmv1,
  plan,
  routingControl,
  waypoint
};
