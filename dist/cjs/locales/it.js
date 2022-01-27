var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => it_default
});
const itLocale = {
  directions: {
    N: "nord",
    NE: "nord-est",
    E: "est",
    SE: "sud-est",
    S: "sud",
    SW: "sud-ovest",
    W: "ovest",
    NW: "nord-ovest"
  },
  instructions: {
    "Head": ["Dritto verso {dir}", " su {road}"],
    "Continue": ["Continuare verso {dir}", " su {road}"],
    "SlightRight": ["Mantenere la destra", " su {road}"],
    "Right": ["A destra", " su {road}"],
    "SharpRight": ["Strettamente a destra", " su {road}"],
    "TurnAround": ["Fare inversione di marcia"],
    "SharpLeft": ["Strettamente a sinistra", " su {road}"],
    "Left": ["A sinistra", " sur {road}"],
    "SlightLeft": ["Mantenere la sinistra", " su {road}"],
    "WaypointReached": ["Punto di passaggio raggiunto"],
    "Roundabout": ["Alla rotonda, prendere la {exitStr} uscita"],
    "DestinationReached": ["Destinazione raggiunta"]
  },
  formatOrder: function(n) {
    return n + "\xBA";
  },
  ui: {
    startPlaceholder: "Partenza",
    viaPlaceholder: "Intermedia {viaNumber}",
    endPlaceholder: "Destinazione"
  }
};
var it_default = itLocale;
