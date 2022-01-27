import { Locale } from './locales/types';
/**
 * Contains localization for strings used by the control. The object is a simple hash with language code as key.
 */
export default class Localization {
    private readonly locale;
    constructor(locale?: Locale);
    localize(keys: string | string[]): any;
}
export declare function localization(locale?: Locale): Localization;
