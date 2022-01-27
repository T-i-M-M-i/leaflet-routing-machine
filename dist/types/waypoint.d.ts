import L from 'leaflet';
interface WaypointOptions {
    /**
     * When using OSRM for routing, allow U-turn at this waypoint
     * @default false
     */
    allowUTurn?: boolean;
}
/**
 * A specific waypoint on a route
 */
export default class Waypoint extends L.Class {
    options: WaypointOptions;
    latLng: L.LatLng | null;
    name?: string;
    constructor(latLng?: L.LatLngExpression, name?: string, options?: WaypointOptions);
}
/**
 * Utility function to create a new waypoint
 */
export declare function waypoint(latLng?: L.LatLngExpression, name?: string, options?: WaypointOptions): Waypoint;
export {};
