import L from 'leaflet';
import { IRoute } from './common/types';
export interface LineOptions extends L.LayerOptions {
    /**
     * Can new waypoints be added by dragging the line
     * @default true
     */
    addWaypoints?: boolean;
    /**
     * The maximum distance between two waypoints before a non-routable line needs to be drawn
     * @default 10
     */
    missingRouteTolerance?: number;
    /**
     * If true, connects all waypoints, even if the route has a missing part
     * @default true
     */
    extendToWaypoints?: boolean;
    /**
     * Styles used for the line or lines drawn to represent the line
     * @default [{ color: 'black', opacity: 0.15, weight: 9 }, { color: 'white', opacity: 0.8, weight: 6 }, { color: 'red', opacity: 1, weight: 2 }]
     */
    styles?: L.PathOptions[];
    /**
     * Styles used for the line or lines drawn to connect waypoints to the closest point on the calculated route (the non-routable part)
     * @default [{ color: 'black', opacity: 0.15, weight: 7 } ,{ color: 'white', opacity: 0.6, weight: 4 }, { color: 'gray', opacity: 0.8, weight: 2, dashArray: '7,12' }]
     */
    missingRouteStyles?: L.PathOptions[];
}
/**
 * Displays a route on the map, and allows adding new waypoints by dragging the line. Extends [LayerGroup](https://leafletjs.com/reference.html#layergroup).
 */
export default class Line extends L.LayerGroup {
    private readonly defaultOptions;
    options: LineOptions;
    private route;
    private waypointIndices;
    constructor(route: IRoute, options?: LineOptions);
    /**
     * Returns the bounds of the line
     */
    getBounds(): L.LatLngBounds;
    findWaypointIndices(): number[];
    findClosestRoutePoint(latlng: L.LatLng): number;
    extendToWaypoints(): void;
    addSegment(coords: L.LatLng[], styles: L.PathOptions[], mouselistener?: boolean): void;
    findNearestWaypointBefore(index: number): number;
    onLineTouched(e: L.LeafletMouseEvent): void;
    getWaypointIndices(): number[];
}
/**
 * Instantiates a new line for the given route and provided options
 */
export declare function line(route: IRoute, options?: LineOptions): Line;
