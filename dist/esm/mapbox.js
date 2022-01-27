import OSRMv1 from "./osrm-v1";
class Mapbox extends OSRMv1 {
  constructor(accessToken, options) {
    super(options);
    this.options = {
      serviceUrl: "https://api.mapbox.com/directions/v5",
      profile: "mapbox/driving",
      useHints: false,
      requestParameters: {}
    };
    this.options.requestParameters = this.options.requestParameters || {};
    this.options.requestParameters.access_token = accessToken;
  }
}
function mapbox(accessToken, options) {
  return new Mapbox(accessToken, options);
}
export {
  Mapbox as default,
  mapbox
};
