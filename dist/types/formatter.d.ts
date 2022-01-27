import L from 'leaflet';
import { Locale, Units } from './locales/types';
import { IInstruction, IDirectionInstruction } from './common/types';
export interface FormatterOptions {
    /**
     * Units to use
     * @default 'metric'
     */
    units?: 'imperial' | 'metric';
    /**
     * Hash of unit names to use
     * @default { meters: 'm', kilometers: 'km', yards: 'yd', miles: 'mi', hours: 'h', minutes: 'mín', seconds: 's' }
     */
    unitNames?: Units | null;
    /**
     * Locale to use to convert instructions to text. Either use a provided one or bring your own
     * @default English
     */
    locale?: Locale;
    /**
     * How much rounding should be applied to distances: positive values use smart rounding, where higher means more accurate, lower less accurate; negative values means fixed precision, where the number of decimals is -roundingSensitivity
     * @default 1
     */
    roundingSensitivity?: number;
    /**
     * String template to use for formatting distances as a string; passed properties value and unit
     * @default '{value} {unit}'
     */
    distanceTemplate?: string;
}
/**
 * Implements functions to convert distances and times to strings, as well as converting an [[IInstruction]] to a string. Override or implement your own if you need to customize formatting.
 */
export default class Formatter extends L.Class {
    private readonly defaultOptions;
    options: FormatterOptions;
    private readonly localization;
    constructor(options?: FormatterOptions);
    /**
     * Formats a distance given in meters to a string with the given (or suitable if not provided) precision and unit
     */
    formatDistance(distance: number, sensitivity?: number): string;
    private round;
    /**
     * Formats a time duration, given in seconds, to a string with suitable precision and unit
     */
    formatTime(time: number): string;
    /**
     * Formats an instruction to a human readable text
     */
    formatInstruction(instruction: IInstruction, index: number): string;
    /**
     * Returns an icon name depending on the instruction type or modifier
     * If it's a simple text instruction, no icon is returned by default
     */
    getIconName(instruction: IInstruction, index: number): "" | "depart" | "arrive" | "via" | "enter-roundabout" | "continue" | "bear-right" | "turn-right" | "sharp-right" | "u-turn" | "sharp-left" | "turn-left" | "bear-left" | undefined;
    capitalize(s: string): string;
    getInstructionTemplate(instruction: IDirectionInstruction, index: number): any;
}
/**
 * Instantiates a new formatter with the provided options
 */
export declare function formatter(options?: FormatterOptions): Formatter;
