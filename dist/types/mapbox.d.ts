import OSRMv1, { OSRMv1Options } from './osrm-v1';
export default class Mapbox extends OSRMv1 {
    options: OSRMv1Options;
    constructor(accessToken: string, options?: OSRMv1Options);
}
export declare function mapbox(accessToken: string, options?: OSRMv1Options): Mapbox;
