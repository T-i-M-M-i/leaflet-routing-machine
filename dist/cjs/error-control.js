var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
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
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  default: () => ErrorControl,
  errorControl: () => errorControl
});
var import_leaflet = __toModule(require("leaflet"));
class ErrorControl extends import_leaflet.default.Control {
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
    this.element = import_leaflet.default.DomUtil.create("div", "leaflet-bar leaflet-routing-error");
    this.element.style.visibility = "hidden";
    const header = import_leaflet.default.DomUtil.create("h3", "", this.element);
    import_leaflet.default.DomUtil.create("span", "", this.element);
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
