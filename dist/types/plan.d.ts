import L from 'leaflet';
import { LineTouchedEvent } from './common/types';
import GeocoderElement, { GeocoderElementsOptions } from './geocoder-element';
import Waypoint from './waypoint';
export interface PlanOptions extends GeocoderElementsOptions {
    /**
     * Styles used for the line or lines drawn when dragging a waypoint
     * @default [{ color: 'black', opacity: 0.15, weight: 7 }, { color: 'white', opacity: 0.8, weight: 4 }, { color: 'orange', opacity: 1, weight: 2, dashArray: '7,12' }]
     */
    dragStyles?: L.PathOptions[];
    /**
     * Can waypoints be dragged in the map
     * @default true
     */
    draggableWaypoints?: boolean;
    /**
     * If true, the route is continously recalculated while waypoint markers are dragged
     * @default false
     */
    routeWhileDragging?: boolean;
    /**
     * Can new waypoints be added by the user
     * @default true
     */
    addWaypoints?: boolean;
    /**
     * If true, a button to reverse the order of the waypoints is enabled
     * @default false
     */
    reverseWaypoints?: boolean;
    /**
     * HTML classname to assign to the add waypoint button
     */
    addButtonClassName?: string;
    /**
     * HTML classname to assign to geocoders container
     * @default ''
     */
    geocodersClassName?: string;
    /**
     * Provides a function to create a custom geocoder element
     * @default [[GeocoderElement]]
     */
    createGeocoderElement?: (waypoint: Waypoint, waypointIndex: number, numberOfWaypoints: number, plan: GeocoderElementsOptions) => GeocoderElement;
    /**
     * Creates a marker to use for a waypoint. If return value is falsy, no marker is added for the waypoint
     */
    createMarker?: (waypointIndex: number, waypoint: Waypoint, numberOfWaypoints?: number) => L.Marker;
}
/**
 * User interface to edit the plan for a route (an ordered list of waypoints). Implements [Layer](https://leafletjs.com/reference.html#layer).
 */
export default class Plan extends L.Layer {
    private readonly defaultOptions;
    options: PlanOptions;
    private waypoints;
    private geocoderContainer?;
    private geocoderElements;
    private markers;
    constructor(waypoints: (Waypoint | L.LatLng)[], options?: PlanOptions);
    /**
     * Returns true if the plan is ready to be routed, meaning it has at least a start and end waypoint, and both have coordinates
     */
    isReady(): boolean;
    /**
     * Returns the plan’s waypoints
     */
    getWaypoints(): Waypoint[];
    /**
     * Sets the plan’s waypoints
     */
    setWaypoints(waypoints: Waypoint[]): this;
    /**
     * Allows adding, removing or replacing the plan’s waypoints. Syntax is the same as in Array#splice
     */
    spliceWaypoints(startIndex: number, deleteCount?: number, ...newWaypoints: Waypoint[]): void;
    onAdd(map: L.Map): this;
    onRemove(): this;
    /**
     * Creates and returns an HTML widget with geocoder input fields for editing waypoints by address
     */
    createGeocoders(): HTMLDivElement;
    createGeocoder(waypointIndex: number): GeocoderElement;
    updateGeocoders(): void;
    removeMarkers(): void;
    updateMarkers(): void;
    fireChanged(startIndex?: number, deleteCount?: number, ...newWaypoints: Waypoint[]): void;
    hookWaypointEvents(marker: L.Marker, waypointIndex: number, trackMouseMove?: boolean): void;
    dragNewWaypoint(e: LineTouchedEvent): void;
    private _dragNewWaypoint;
    focusGeocoder(index: number): void;
}
/**
 * Instantiates a new plan with given waypoint locations and options
 */
export declare function plan(waypoints: (Waypoint | L.LatLng)[], options?: PlanOptions): Plan;
