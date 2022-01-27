import Formatter, { FormatterOptions } from './formatter';
import { IRoute, ItineraryEvents, RouteEvent } from './common/types';
import EventHub from './eventhub';
interface ISummary extends IRoute {
    name: string;
    distance: string;
    time: string;
}
export interface ItineraryBuilderOptions extends FormatterOptions {
    /**
     * Class name to add for the widget’s container element
     * @default ''
     */
    containerClassName?: string;
    /**
     * String template to use for summarizing a route; the template is passed properties name, distance, where the latter has already been processed through distanceTemplate respectively
     * @default '<h2>{name}</h2><h3>{distance}, {time}</h3>'
     */
    summaryTemplate?: string | ((data: ISummary) => string);
    /**
     * Class name to add to routing alternatives’ elements
     * @default ''
     */
    alternativeClassName?: string;
    /**
     * Class name to add to minimized routing alternatives’ elements
     * @default ''
     */
    minimizedClassName?: string;
    /**
     * Class name to add to route itinerary container
     * @default ''
     */
    itineraryClassName?: string;
    /**
     * How much rounding should be applied to total route distance: positive values use smart rounding, where higher means more accurate, lower less accurate; negative values means fixed precision, where the number of decimals is -roundingSensitivity.
     * @default -1
     */
    totalDistanceRoundingSensitivity?: number;
    /**
     * Display the itinerary initially; can later be changed with hide() and show() methods
     * @default true
     */
    show?: boolean;
    /**
     * If true, a collapse button is added, if false, no button is added, if undefined, a button is added if the screen width is small (typically mobile devices)
     * @default undefined
     */
    collapsible?: boolean;
    /**
     * Function that takes the L.Routing.Itinerary instance as argument, and creates a collapse button
     */
    collapseBtn?: (itinerary: ItineraryBuilder) => void;
    /**
     * Class used by default for the collapse button
     * @default 'leaflet-routing-collapse-btn'
     */
    collapseBtnClass?: string;
    /**
     * The formatter to use when converting itinerary instructions, distances and times to strings
     * @default [[Formatter]]
     */
    formatter?: Formatter;
}
/**
 * Creates the DOM structure for an itinerary. Subclass or reimplement to create your own itinerary structure.
 */
export default class ItineraryBuilder {
    private readonly defaultOptions;
    options: ItineraryBuilderOptions;
    private formatter;
    private container?;
    private altContainer?;
    private altElements;
    private eventHub?;
    constructor(options?: ItineraryBuilderOptions);
    registerEventHub(hub: EventHub<ItineraryEvents>): void;
    /**
     * Builds the itinerary container that will be added to the map together with the control
     */
    buildItinerary(collapse: boolean): HTMLDivElement;
    /**
     * Creates the alternatives container, so it can be added to the DOM
     */
    createAlternativesContainer(): HTMLDivElement;
    /**
     * Sets the routing alternatives to display itineraries for
     */
    setAlternatives(routes: IRoute[]): this;
    /**
     * Shows the itinerary control
     */
    show(): void;
    /**
     * Hides the itinerary control
     */
    hide(): void;
    toggle(): void;
    createAlternative(alt: IRoute, index: number): HTMLDivElement;
    createSummaryTemplate(alt: IRoute): string;
    /**
     * Removes all alternative routes from the container
     */
    clearAlts(): void;
    createItineraryContainer(route: IRoute): HTMLTableElement;
    addRowListeners(row: HTMLTableRowElement, coordinate: L.LatLng): void;
    onAltClicked(e: MouseEvent): void;
    selectAlt(e: RouteEvent): void;
    /**
     * Create the container in which the itinerary will be put; default will create a table
     */
    createContainer(className?: string): HTMLTableElement;
    /**
     * Create the container for the instructions/steps; default will create a tbody
     */
    createStepsContainer(): HTMLTableSectionElement;
    /**
     * Creates a DOM element for an instruction, with the provided text and distance (already formatted as string with unit); default will create a tr
     */
    createStep(text: string, distance: string, icon?: string, steps?: HTMLElement): HTMLTableRowElement;
}
/**
 * Instantiates a new itinerary widget with the provided options
 */
export declare function itineraryBuilder(options?: ItineraryBuilderOptions): ItineraryBuilder;
export {};
