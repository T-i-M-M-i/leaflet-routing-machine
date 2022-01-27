const plLocale = {
  directions: {
    N: "p\xF3\u0142noc",
    NE: "p\xF3\u0142nocny wsch\xF3d",
    E: "wsch\xF3d",
    SE: "po\u0142udniowy wsch\xF3d",
    S: "po\u0142udnie",
    SW: "po\u0142udniowy zach\xF3d",
    W: "zach\xF3d",
    NW: "p\xF3\u0142nocny zach\xF3d",
    SlightRight: "lekko w prawo",
    Right: "w prawo",
    SharpRight: "ostro w prawo",
    SlightLeft: "lekko w lewo",
    Left: "w lewo",
    SharpLeft: "ostro w lewo",
    Uturn: "zawr\xF3\u0107"
  },
  instructions: {
    "Head": ["Kieruj si\u0119 na {dir}", " na {road}"],
    "Continue": ["Jed\u017A dalej przez {dir}"],
    "TurnAround": ["Zawr\xF3\u0107"],
    "WaypointReached": ["Punkt po\u015Bredni"],
    "Roundabout": ["Wyjed\u017A {exitStr} zjazdem na rondzie", " na {road}"],
    "DestinationReached": ["Dojechano do miejsca docelowego"],
    "Fork": ["Na rozwidleniu {modifier}", " na {road}"],
    "Merge": ["Zjed\u017A {modifier}", " na {road}"],
    "OnRamp": ["Wjazd {modifier}", " na {road}"],
    "OffRamp": ["Zjazd {modifier}", " na {road}"],
    "EndOfRoad": ["Skr\u0119\u0107 {modifier} na ko\u0144cu drogi", " na {road}"],
    "Onto": "na {road}"
  },
  formatOrder: function(n) {
    return n + ".";
  },
  ui: {
    startPlaceholder: "Pocz\u0105tek",
    viaPlaceholder: "Przez {viaNumber}",
    endPlaceholder: "Koniec"
  },
  units: {
    meters: "m",
    kilometers: "km",
    yards: "yd",
    miles: "mi",
    hours: "godz",
    minutes: "min",
    seconds: "s"
  }
};
var pl_default = plLocale;
export {
  pl_default as default
};
