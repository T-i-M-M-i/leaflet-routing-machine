import L from 'leaflet';
import { IGeocoder } from 'leaflet-control-geocoder/dist/geocoders/api';
import { AutocompleteOptions } from './autocomplete';
import { Locale } from './locales/types';
import Waypoint from './waypoint';
interface GeocoderElementCollection {
    container: HTMLElement;
    input: HTMLInputElement;
    closeButton?: HTMLElement;
}
export interface GeocoderElementsOptions extends L.ControlOptions {
    autocompleteOptions?: AutocompleteOptions;
    /**
     * Create a geocoder for a waypoint
     */
    createGeocoder?: (waypointIndex: number, numberOfWaypoints: number, options: GeocoderElementsOptions) => GeocoderElementCollection;
    /**
     * Function to generate placeholder text for a waypoint geocoder. By default, gives text “Start” for first waypoint, “End” for last, and “Via x” in between
     */
    geocoderPlaceholder?: (waypointIndex: number, numberOfWaypoints: number, geocoderElement: any) => string;
    /**
     * A function that returns the HTML classname to assign to individual geocoder inputs
     */
    geocoderClass?: (waypointIndex?: number, numberOfWaypoints?: number) => string;
    locale?: Locale;
    /**
     * Maximum distance in meters from a reverse geocoding result to a waypoint, to consider the address valid
     * @default 200
     */
    maxGeocoderTolerance?: number;
    /**
     * When a waypoint’s name can’t be reverse geocoded, this function will be called to generate a name. Default will give a name based on the waypoint’s latitude and longitude.
     */
    waypointNameFallback?: (latLng: L.LatLng) => string;
    /**
     * The geocoder to use (both address lookup and reverse geocoding when dragging waypoints)
     */
    geocoder?: IGeocoder;
    addWaypoints?: boolean;
}
declare class EventedControl {
    constructor(...args: any[]);
}
interface EventedControl extends L.Control, L.Evented {
}
export default class GeocoderElement extends EventedControl {
    private readonly defaultOptions;
    options: GeocoderElementsOptions;
    private element;
    private waypoint;
    constructor(waypoint: Waypoint, waypointIndex: number, numberOfWaypoints: number, options?: GeocoderElementsOptions);
    getContainer(): HTMLElement;
    setValue(value: string): void;
    update(force?: boolean): void;
    focus(): void;
    setReverseGeocodeResult(): void;
    selectInputText(input: HTMLInputElement): void;
}
export declare function geocoderElement(waypoint: Waypoint, waypointIndex: number, numberOfWaypoints: number, options?: GeocoderElementsOptions): GeocoderElement;
export {};
