const caLocale = {
  directions: {
    N: "nord",
    NE: "nord-est",
    E: "est",
    SE: "sud-est",
    S: "sud",
    SW: "sud-oest",
    W: "oest",
    NW: "nord-oest",
    SlightRight: "lleu gir a la dreta",
    Right: "dreta",
    SharpRight: "gir pronunciat a la dreta",
    SlightLeft: "gir pronunciat a l'esquerra",
    Left: "esquerra",
    SharpLeft: "lleu gir a l'esquerra",
    Uturn: "mitja volta"
  },
  instructions: {
    "Head": ["Recte {dir}", " sobre {road}"],
    "Continue": ["Continuar {dir}"],
    "TurnAround": ["Donar la volta"],
    "WaypointReached": ["Ha arribat a un punt del cam\xED"],
    "Roundabout": ["Agafar {exitStr} sortida a la rotonda", " a {road}"],
    "DestinationReached": ["Arribada al dest\xED"],
    "Fork": ["A la cru\xEFlla gira a la {modifier}", " cap a {road}"],
    "Merge": ["Incorpora't {modifier}", " a {road}"],
    "OnRamp": ["Gira {modifier} a la sortida", " cap a {road}"],
    "OffRamp": ["Pren la sortida {modifier}", " cap a {road}"],
    "EndOfRoad": ["Gira {modifier} al final de la carretera", " cap a {road}"],
    "Onto": "cap a {road}"
  },
  formatOrder: function(n) {
    return n + "\xBA";
  },
  ui: {
    startPlaceholder: "Origen",
    viaPlaceholder: "Via {viaNumber}",
    endPlaceholder: "Dest\xED"
  },
  units: {
    meters: "m",
    kilometers: "km",
    yards: "yd",
    miles: "mi",
    hours: "h",
    minutes: "min",
    seconds: "s"
  }
};
var ca_default = caLocale;
export {
  ca_default as default
};
