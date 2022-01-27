import L from 'leaflet';
import Waypoint from './waypoint';
import { RoutingOptions, IRouter, IRoute, InstructionType } from './common/types';
export interface OSRMv1Options {
    /**
     * Router service URL
     * @default https://router.project-osrm.org/route/v1
     */
    serviceUrl?: string;
    /**
     * The OSRM profile to use in requests
     * @default 'driving'
     */
    profile?: string;
    /**
     * Number of milliseconds before a route calculation times out, returning an error to the routing callback
     * @default 30000
     */
    timeout?: number;
    routingOptions?: RoutingOptions;
    /**
     * The precision to use when decoding polylines in responses from OSRM
     * @default 5
     */
    polylinePrecision?: number;
    /**
     * Whether hints should be included in server requests
     * @default true
     */
    useHints?: boolean;
    suppressDemoServerWarning?: boolean;
    language?: string;
    requestParameters?: any;
    stepToText?: (language: string | undefined, step: OSRMStep, properties: {
        legCount: number;
        legIndex: number;
    }) => string;
}
interface OSRMIntersection {
    in?: number;
    out: number;
    entry: boolean[];
    location: [number, number];
    bearings: number[];
}
interface OSRMManeuver {
    bearing_after: number;
    location: [number, number];
    type: string;
    bearing_before: number;
    modifier: InstructionType;
    exit: number;
}
interface OSRMStep {
    intersections: OSRMIntersection[];
    driving_side: 'right' | 'left';
    geometry: string;
    duration: number;
    distance: number;
    name: string;
    weight: number;
    mode: string;
    maneuver: OSRMManeuver;
}
/**
 * Handles communication with the OSRM backend, building the request and parsing the response. Implements [[IRouter]].
 * Note that this class supports the OSRM HTTP API v1, that is included with OSRM version 5 and up. OSRM 4 used another API that is not supported by this class.
 * See [OSRM HTTP API](https://github.com/Project-OSRM/osrm-backend/blob/master/docs/http.md) for the specification this implementation is built on.
 */
export default class OSRMv1 extends L.Class implements IRouter {
    private readonly defaultOptions;
    options: OSRMv1Options;
    private hints;
    constructor(options?: OSRMv1Options);
    route(waypoints: Waypoint[], options?: RoutingOptions, abortController?: AbortController): Promise<IRoute[]>;
    requiresMoreDetail(route: IRoute, zoom: number, bounds: L.LatLngBounds): boolean;
    private routeDone;
    private convertRoute;
    private bearingToDirection;
    private maneuverToInstructionType;
    private maneuverToModifier;
    private camelCase;
    private leftOrRight;
    private decodePolyline;
    private toWaypoints;
    /**
     * Returns the URL to calculate the route between the given waypoints; typically used for downloading the route in some other file format
     */
    buildRouteUrl(waypoints: Waypoint[], options?: RoutingOptions): string;
    private locationKey;
    private saveHintData;
}
/**
 * Instantiates a new router with the provided options
 */
export declare function osrmv1(options?: OSRMv1Options): OSRMv1;
export {};
