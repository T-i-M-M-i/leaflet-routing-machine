import L from 'leaflet';
import Control from './control';
interface Error {
    message: string;
    status: number;
}
interface ErrorControlOptions extends L.ControlOptions {
    header?: string;
    formatMessage?: (error: Error) => string;
}
export default class ErrorControl extends L.Control {
    private readonly defaultOptions;
    options: ErrorControlOptions;
    private element?;
    constructor(routingControl: Control, options?: ErrorControlOptions);
    onAdd(): HTMLDivElement;
    onRemove(): void;
}
export declare function errorControl(routingControl: Control, options?: ErrorControlOptions): ErrorControl;
export {};
