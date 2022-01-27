import { GeocodingResult, GeocodingCallback } from 'leaflet-control-geocoder/dist/geocoders/api';
declare type GeocoderQuery = (query: string, callback: GeocodingCallback) => void;
/**
 * Provides autocompletion for search entered into the geocoder. Uses [leaflet-control-geocoder](https://github.com/perliedman/leaflet-control-geocoder) by default
 */
export interface AutocompleteOptions {
    /**
     * Timeout in milliseconds before cancelling a running request
     * @default 500
     */
    timeout?: number;
    /**
     * Message to display when no results are found
     * @default 'No results found.'
     */
    noResultsMessage?: string;
    /**
     * Function that handles formatting a geocode result to a string
     */
    formatGeocoderResult?: (result: GeocodingResult) => string;
    /**
     * Equivalent to leaflet-control-geocoder.geocode
     */
    resultFn?: GeocoderQuery;
    /**
     * Equivalent to leaflet-control-geocoder.suggest
     */
    autocompleteFn?: GeocoderQuery;
}
export default class Autocomplete {
    private readonly defaultOptions;
    options: AutocompleteOptions;
    private readonly element;
    private readonly container;
    private readonly resultTable;
    private readonly resultFn?;
    private readonly autocomplete?;
    private readonly selectFn;
    private isOpen;
    private results;
    private timer;
    private lastCompletedText;
    private selection?;
    constructor(element: HTMLInputElement, callback: (result: GeocodingResult) => void | Promise<void>, options?: AutocompleteOptions);
    close(): void;
    open(): void;
    setResults(results: GeocodingResult[]): void;
    createClickListener(route: GeocodingResult): void;
    resultSelected(route: GeocodingResult): void;
    keyPressed(e: Event): void;
    select(dir: number): void;
    unselect(): void;
    keyDown(e: Event): void;
    complete(completeFn?: GeocoderQuery, trySelect?: boolean): void;
    completeResults(): void;
}
export declare function autocomplete(element: HTMLInputElement, callback: (result: GeocodingResult) => void | Promise<void>, options?: AutocompleteOptions): Autocomplete;
export {};
