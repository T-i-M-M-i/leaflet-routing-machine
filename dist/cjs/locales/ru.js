var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => ru_default
});
const ruLocale = {
  directions: {
    N: "\u0441\u0435\u0432\u0435\u0440",
    NE: "\u0441\u0435\u0432\u0435\u0440\u043E\u0432\u043E\u0441\u0442\u043E\u043A",
    E: "\u0432\u043E\u0441\u0442\u043E\u043A",
    SE: "\u044E\u0433\u043E\u0432\u043E\u0441\u0442\u043E\u043A",
    S: "\u044E\u0433",
    SW: "\u044E\u0433\u043E\u0437\u0430\u043F\u0430\u0434",
    W: "\u0437\u0430\u043F\u0430\u0434",
    NW: "\u0441\u0435\u0432\u0435\u0440\u043E\u0437\u0430\u043F\u0430\u0434",
    SlightRight: "\u043F\u043B\u0430\u0432\u043D\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043E",
    Right: "\u043D\u0430\u043F\u0440\u0430\u0432\u043E",
    SharpRight: "\u0440\u0435\u0437\u043A\u043E \u043D\u0430\u043F\u0440\u0430\u0432\u043E",
    SlightLeft: "\u043F\u043B\u0430\u0432\u043D\u043E \u043D\u0430\u043B\u0435\u0432\u043E",
    Left: "\u043D\u0430\u043B\u0435\u0432\u043E",
    SharpLeft: "\u0440\u0435\u0437\u043A\u043E \u043D\u0430\u043B\u0435\u0432\u043E",
    Uturn: "\u0440\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F"
  },
  instructions: {
    "Head": ["\u041D\u0430\u0447\u0430\u0442\u044C \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 {dir}", " \u043F\u043E {road}"],
    "Continue": ["\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0430\u0442\u044C \u0434\u0432\u0438\u0436\u0435\u043D\u0438\u0435 \u043D\u0430 {dir}", " \u043F\u043E {road}"],
    "SlightRight": ["\u041F\u043B\u0430\u0432\u043D\u044B\u0439 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430\u043F\u0440\u0430\u0432\u043E", " \u043D\u0430 {road}"],
    "Right": ["\u041D\u0430\u043F\u0440\u0430\u0432\u043E", " \u043D\u0430 {road}"],
    "SharpRight": ["\u0420\u0435\u0437\u043A\u0438\u0439 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430\u043F\u0440\u0430\u0432\u043E", " \u043D\u0430 {road}"],
    "TurnAround": ["\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F"],
    "SharpLeft": ["\u0420\u0435\u0437\u043A\u0438\u0439 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430\u043B\u0435\u0432\u043E", " \u043D\u0430 {road}"],
    "Left": ["\u041F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430\u043B\u0435\u0432\u043E", " \u043D\u0430 {road}"],
    "SlightLeft": ["\u041F\u043B\u0430\u0432\u043D\u044B\u0439 \u043F\u043E\u0432\u043E\u0440\u043E\u0442 \u043D\u0430\u043B\u0435\u0432\u043E", " \u043D\u0430 {road}"],
    "WaypointReached": ["\u0422\u043E\u0447\u043A\u0430 \u0434\u043E\u0441\u0442\u0438\u0433\u043D\u0443\u0442\u0430"],
    "Roundabout": ["{exitStr} \u0441\u044A\u0435\u0437\u0434 \u0441 \u043A\u043E\u043B\u044C\u0446\u0430", " \u043D\u0430 {road}"],
    "DestinationReached": ["\u041E\u043A\u043E\u043D\u0447\u0430\u043D\u0438\u0435 \u043C\u0430\u0440\u0448\u0440\u0443\u0442\u0430"],
    "Fork": ["\u041D\u0430 \u0440\u0430\u0437\u0432\u0438\u043B\u043A\u0435 \u043F\u043E\u0432\u0435\u0440\u043D\u0438\u0442\u0435 {modifier}", " \u043D\u0430 {road}"],
    "Merge": ["\u041F\u0435\u0440\u0435\u0441\u0442\u0440\u043E\u0439\u0442\u0435\u0441\u044C {modifier}", " \u043D\u0430 {road}"],
    "OnRamp": ["\u041F\u043E\u0432\u0435\u0440\u043D\u0438\u0442\u0435 {modifier} \u043D\u0430 \u0441\u044A\u0435\u0437\u0434", " \u043D\u0430 {road}"],
    "OffRamp": ["\u0421\u044A\u0435\u0437\u0436\u0430\u0439\u0442\u0435 \u043D\u0430 {modifier}", " \u043D\u0430 {road}"],
    "EndOfRoad": ["\u041F\u043E\u0432\u0435\u0440\u043D\u0438\u0442\u0435 {modifier} \u0432 \u043A\u043E\u043D\u0446\u0435 \u0434\u043E\u0440\u043E\u0433\u0438", " \u043D\u0430 {road}"],
    "Onto": "\u043D\u0430 {road}"
  },
  formatOrder: function(n) {
    return n + "-\u0439";
  },
  ui: {
    startPlaceholder: "\u041D\u0430\u0447\u0430\u043B\u043E",
    viaPlaceholder: "\u0427\u0435\u0440\u0435\u0437 {viaNumber}",
    endPlaceholder: "\u041A\u043E\u043D\u0435\u0446"
  },
  units: {
    meters: "\u043C",
    kilometers: "\u043A\u043C",
    yards: "\u044F\u0440\u0434",
    miles: "\u043C\u0438",
    hours: "\u0447",
    minutes: "\u043C",
    seconds: "\u0441"
  }
};
var ru_default = ruLocale;
