var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => fr_default
});
const frLocale = {
  directions: {
    N: "nord",
    NE: "nord-est",
    E: "est",
    SE: "sud-est",
    S: "sud",
    SW: "sud-ouest",
    W: "ouest",
    NW: "nord-ouest"
  },
  instructions: {
    "Head": ["Tout droit au {dir}", " sur {road}"],
    "Continue": ["Continuer au {dir}", " sur {road}"],
    "SlightRight": ["L\xE9g\xE8rement \xE0 droite", " sur {road}"],
    "Right": ["A droite", " sur {road}"],
    "SharpRight": ["Compl\xE8tement \xE0 droite", " sur {road}"],
    "TurnAround": ["Faire demi-tour"],
    "SharpLeft": ["Compl\xE8tement \xE0 gauche", " sur {road}"],
    "Left": ["A gauche", " sur {road}"],
    "SlightLeft": ["L\xE9g\xE8rement \xE0 gauche", " sur {road}"],
    "WaypointReached": ["Point d'\xE9tape atteint"],
    "Roundabout": ["Au rond-point, prenez la {exitStr} sortie", " sur {road}"],
    "DestinationReached": ["Destination atteinte"]
  },
  formatOrder: function(n) {
    return n + "\xBA";
  },
  ui: {
    startPlaceholder: "D\xE9part",
    viaPlaceholder: "Interm\xE9diaire {viaNumber}",
    endPlaceholder: "Arriv\xE9e"
  }
};
var fr_default = frLocale;
