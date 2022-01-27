import L from 'leaflet';
import Line, { LineOptions } from './line';
import Plan, { PlanOptions } from './plan';
import { OSRMv1Options } from './osrm-v1';
import { IRoute, IRouter, ItineraryEvents, RouteEvent, RoutingOptions, RoutingStartEvent } from './common/types';
import Waypoint from './waypoint';
import ItineraryBuilder, { ItineraryBuilderOptions } from './itinerary-builder';
import EventHub from './eventhub';
interface ControlOptions extends L.ControlOptions {
    /**
     * Style for the CircleMarkers used when hovering an itinerary instruction
     * @default { radius: 5, color: '#03f', fillColor: 'white', opacity: 1, fillOpacity: 0.7 }
     */
    pointMarkerStyle?: L.CircleMarkerOptions;
    /**
     * How the map’s view is fitted to a selected route result: smart will fit only if no waypoint is within the current view, or if the result covers a very small part of the view; other truthy values will always fit the map, falsy will never fit the map
     * @default 'smart'
     */
    fitSelectedRoutes?: 'smart' | boolean;
    /**
     * Function to create the map line when a route is presented on the map
     */
    routeLine?: (route: IRoute, options: LineOptions) => Line;
    /**
     * If true, route will automatically be calculated every time waypoints change, otherwise route() has to be called by the app
     * @default true
     */
    autoRoute?: boolean;
    /**
     * If true, routes will continually be calculated while the user drags waypoints, giving immediate feedback
     * @default false
     */
    routeWhileDragging?: boolean;
    /**
     * The minimum number of milliseconds between route calculations when waypoints are dragged
     * @default 500
     */
    routeDragInterval?: number;
    /**
     * Set to either connect (waypoints are connected by a line to the closest point on the calculated route) or snap (waypoints are moved to the closest point on the calculated route)
     * @default 'connect'
     */
    waypointMode?: 'connect' | 'snap';
    /**
     * If true, alternative polyline[s] will be shown on the map when available at the same time as the primary polyline
     * @default false
     */
    showAlternatives?: boolean;
    defaultErrorHandler?: (e: any) => void;
    /**
     * The router to use to calculate routes between waypoints
     * @default [[OSRMv1]]
     */
    router?: IRouter;
    routerOptions?: OSRMv1Options;
    /**
     * The plan to use to store and edit the route’s waypoints
     * @default [[Plan]]
     */
    plan?: Plan;
    planOptions?: PlanOptions;
    /**
     * Initial waypoints for the control
     * @default []
     */
    waypoints?: Waypoint[];
    addWaypoints?: boolean;
    /**
     * If true, route will be recalculated when the map is zoomed
     * @default false
     */
    useZoomParameter?: boolean;
    /**
     * Options passed when creating a new [[Line]] for showing alternative line[s], when showAlternatives is set to true. If not set and showAlternatives is true, alternative lines will be styled using [[ControlOptions.lineOptions]]
     */
    altLineOptions?: LineOptions;
    /**
     * Options passed when creating a new [[Line]], for example styling
     */
    lineOptions?: LineOptions;
    itineraryBuilder?: ItineraryBuilder;
    itineraryBuilderOptions?: ItineraryBuilderOptions;
    eventHub?: EventHub<ItineraryEvents>;
}
interface ControlRoutingOptions extends RoutingOptions {
    zoom?: number;
    waypoints?: Waypoint[];
}
declare class RoutingControl {
    constructor(...args: any[]);
}
interface RoutingControl extends L.Control, L.Evented {
}
/**
 * Combining the other classes into a full routing user interface. The main class of the plugin. Extends [L.Control](https://leafletjs.com/reference.html#control).
 * ## Usage example
 *
 * ```typescript
 * var map = L.map('map');
 *
 * L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
 *  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
 * }).addTo(map);
 *
 * L.Routing.control({
 *  waypoints: [
 *    L.latLng(57.74, 11.94),
 *    L.latLng(57.6792, 11.949)
 *  ]
 * }).addTo(map);
 * ```
 */
export default class Control extends RoutingControl {
    private readonly defaultOptions;
    controlOptions: ControlOptions;
    map?: L.Map;
    private router;
    private plan;
    private requestCount;
    private selectedRoute?;
    private line?;
    private alternatives;
    private routes;
    private marker?;
    private itineraryBuilder;
    private eventHub;
    private pendingRequest;
    constructor(options?: ControlOptions);
    onAdd(map: L.Map): HTMLDivElement;
    onRemove(map: L.Map): void;
    /**
     * @returns The waypoints of the control’s plan
     */
    getWaypoints(): Waypoint[];
    /**
     * Sets the waypoints of the control’s plan
     */
    setWaypoints(waypoints: Waypoint[]): this;
    /**
     * Allows adding, removing or replacing waypoints in the control’s plan. Syntax is the same as in [Array#splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).
     */
    spliceWaypoints(startIndex: number, deleteCount?: number, ...newWaypoints: Waypoint[]): void;
    /**
     * @returns The plan instance used by the control
     */
    getPlan(): Plan;
    /**
     * @returns The router used by the control
     */
    getRouter(): IRouter;
    routeSelected(e: RouteEvent): void;
    waypointsVisible(): boolean;
    waypointsInViewport(): boolean;
    updateLines(route: IRoute, alternatives: IRoute[]): void;
    hookEvents(l: Line): void;
    hookAltEvents(l: Line): void;
    onWaypointsChanged(e: RoutingStartEvent): Promise<void>;
    setupRouteDragging(): void;
    updateLineCallback(routes: IRoute[]): void;
    /**
     * Calculates the route between the current waypoints and presents in the itinerary, displaying the first result on the map
     */
    route(options?: ControlRoutingOptions): Promise<IRoute[]>;
    clearLines(): void;
    setAlternatives(routes: IRoute[]): this;
    selectRoute(e: RouteEvent): void;
    onZoomEnd(): Promise<void>;
}
/**
 * Instantiates a new routing control with the provided options; unless specific router and/or plan instances are provided, options are also passed to their constructors
 */
export declare function routingControl(options?: ControlOptions): Control;
export {};
