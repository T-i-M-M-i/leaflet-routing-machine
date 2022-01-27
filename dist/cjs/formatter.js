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
  default: () => Formatter,
  formatter: () => formatter
});
var import_leaflet = __toModule(require("leaflet"));
var import_localization = __toModule(require("./localization"));
function isTextInstruction(instruction) {
  return instruction.text !== void 0;
}
function isDirectionInstruction(instruction) {
  return instruction.type !== void 0;
}
class Formatter extends import_leaflet.default.Class {
  constructor(options) {
    super();
    this.defaultOptions = {
      units: "metric",
      unitNames: {
        meters: "m",
        kilometers: "km",
        yards: "yd",
        miles: "mi",
        hours: "h",
        minutes: "m\xEDn",
        seconds: "s"
      },
      roundingSensitivity: 1,
      distanceTemplate: "{value} {unit}"
    };
    this.options = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    this.localization = new import_localization.default(this.options.locale);
  }
  formatDistance(distance, sensitivity = 0) {
    const { distanceTemplate = this.defaultOptions.distanceTemplate } = this.options;
    const unitNames = this.options.unitNames || this.localization.localize("units");
    const simpleRounding = sensitivity <= 0;
    let value;
    let yards;
    let data;
    if (this.options.units === "imperial") {
      yards = distance / 0.9144;
      if (yards >= 1e3) {
        data = {
          value: this.round(distance / 1609.344, sensitivity),
          unit: unitNames.miles
        };
      } else {
        data = {
          value: this.round(yards, sensitivity),
          unit: unitNames.yards
        };
      }
    } else {
      value = this.round(distance, sensitivity);
      data = {
        value: value >= 1e3 ? value / 1e3 : value,
        unit: value >= 1e3 ? unitNames.kilometers : unitNames.meters
      };
    }
    if (simpleRounding) {
      data.value = parseFloat(data.value.toFixed(-sensitivity));
    }
    return import_leaflet.default.Util.template(distanceTemplate, data);
  }
  round(distance, sensitivity) {
    if (sensitivity <= 0) {
      return distance;
    }
    const { roundingSensitivity = this.defaultOptions.roundingSensitivity } = this.options;
    const s = sensitivity || roundingSensitivity;
    const pow10 = Math.pow(10, (Math.floor(distance / s) + "").length - 1);
    const r = Math.floor(distance / pow10);
    const p = r > 5 ? pow10 : pow10 / 2;
    return Math.round(distance / p) * p;
  }
  formatTime(time) {
    const unitNames = this.options.unitNames || this.localization.localize("units");
    const t = Math.round(time / 30) * 30;
    if (t > 86400) {
      return `${Math.round(t / 3600)} ${unitNames.hours}`;
    } else if (t > 3600) {
      return `${Math.round(t / 3600)} ${unitNames.hours} ${Math.round(t % 3600 / 60)} ${unitNames.minutes}`;
    } else if (t > 300) {
      return `${Math.round(t / 60)} ${unitNames.minutes}`;
    } else if (t > 60) {
      const seconds = t % 60 !== 0 ? `${t % 60} ${unitNames.seconds}` : "";
      return `${Math.round(t / 60)} ${unitNames.minutes}${seconds}`;
    } else {
      return `${t} ${unitNames.seconds}`;
    }
  }
  formatInstruction(instruction, index) {
    if (!isTextInstruction(instruction)) {
      return this.capitalize(import_leaflet.default.Util.template(this.getInstructionTemplate(instruction, index), __spreadValues(__spreadValues({}, instruction), {
        exitStr: instruction.exit ? this.localization.localize("formatOrder")(instruction.exit) : "",
        dir: this.localization.localize(["directions", instruction.direction]),
        modifier: this.localization.localize(["directions", instruction.modifier])
      })));
    } else {
      return instruction.text;
    }
  }
  getIconName(instruction, index) {
    if (!isDirectionInstruction(instruction)) {
      return "";
    }
    switch (instruction.type) {
      case "Head":
        if (index === 0) {
          return "depart";
        }
        break;
      case "WaypointReached":
        return "via";
      case "Roundabout":
        return "enter-roundabout";
      case "DestinationReached":
        return "arrive";
    }
    switch (instruction.modifier) {
      case "Straight":
        return "continue";
      case "SlightRight":
        return "bear-right";
      case "Right":
        return "turn-right";
      case "SharpRight":
        return "sharp-right";
      case "TurnAround":
      case "Uturn":
        return "u-turn";
      case "SharpLeft":
        return "sharp-left";
      case "Left":
        return "turn-left";
      case "SlightLeft":
        return "bear-left";
    }
  }
  capitalize(s) {
    return s.charAt(0).toUpperCase() + s.substring(1);
  }
  getInstructionTemplate(instruction, index) {
    const type = instruction.type === "Straight" ? index === 0 ? "Head" : "Continue" : instruction.type;
    let strings = this.localization.localize(["instructions", type]);
    if (!strings) {
      strings = [
        this.localization.localize(["directions", type]),
        ` ${this.localization.localize(["instructions", "Onto"])}`
      ];
    }
    return strings[0] + (strings.length > 1 && instruction.road ? strings[1] : "");
  }
}
function formatter(options) {
  return new Formatter(options);
}
