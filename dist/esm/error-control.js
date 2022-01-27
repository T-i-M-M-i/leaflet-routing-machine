var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import L from "leaflet";
class ErrorControl extends L.Control {
  constructor(routingControl, options) {
    super(options);
    this.defaultOptions = {
      header: "Routing error",
      formatMessage: (error) => {
        if (error.status < 0) {
          return `Calculating the route caused an error. Technical description follows: <code><pre>${error.message}</pre></code`;
        } else {
          return `The route could not be calculated. ${error.message}`;
        }
      }
    };
    this.options = this.defaultOptions;
    this.options = __spreadValues(__spreadValues(__spreadValues({}, super.options), this.defaultOptions), options);
    routingControl.on("routingerror", (e) => {
      var _a;
      if (this.element) {
        const formatter = (_a = this.options.formatMessage) != null ? _a : this.defaultOptions.formatMessage;
        this.element.children[1].innerHTML = formatter(e.error);
        this.element.style.visibility = "visible";
      }
    }).on("routingstart", () => {
      if (this.element) {
        this.element.style.visibility = "hidden";
      }
    });
  }
  onAdd() {
    var _a;
    this.element = L.DomUtil.create("div", "leaflet-bar leaflet-routing-error");
    this.element.style.visibility = "hidden";
    const header = L.DomUtil.create("h3", "", this.element);
    L.DomUtil.create("span", "", this.element);
    header.innerHTML = (_a = this.options.header) != null ? _a : this.defaultOptions.header;
    return this.element;
  }
  onRemove() {
    delete this.element;
  }
}
function errorControl(routingControl, options) {
  return new ErrorControl(routingControl, options);
}
export {
  ErrorControl as default,
  errorControl
};
