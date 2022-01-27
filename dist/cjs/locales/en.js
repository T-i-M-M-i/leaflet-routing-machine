var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => en_default
});
const enLocale = {
  directions: {
    N: "north",
    NE: "northeast",
    E: "east",
    SE: "southeast",
    S: "south",
    SW: "southwest",
    W: "west",
    NW: "northwest",
    SlightRight: "slight right",
    Right: "right",
    SharpRight: "sharp right",
    SlightLeft: "slight left",
    Left: "left",
    SharpLeft: "sharp left",
    Uturn: "Turn around"
  },
  instructions: {
    "Head": ["Head {dir}", " on {road}"],
    "Continue": ["Continue {dir}"],
    "TurnAround": ["Turn around"],
    "WaypointReached": ["Waypoint reached"],
    "Roundabout": ["Take the {exitStr} exit in the roundabout", " onto {road}"],
    "DestinationReached": ["Destination reached"],
    "Fork": ["At the fork, turn {modifier}", " onto {road}"],
    "Merge": ["Merge {modifier}", " onto {road}"],
    "OnRamp": ["Turn {modifier} on the ramp", " onto {road}"],
    "OffRamp": ["Take the ramp on the {modifier}", " onto {road}"],
    "EndOfRoad": ["Turn {modifier} at the end of the road", " onto {road}"],
    "Onto": "onto {road}"
  },
  formatOrder: function(n) {
    const i = n % 10 - 1;
    const suffix = ["st", "nd", "rd"];
    return suffix[i] ? n + suffix[i] : n + "th";
  },
  ui: {
    startPlaceholder: "Start",
    viaPlaceholder: "Via {viaNumber}",
    endPlaceholder: "End"
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
var en_default = enLocale;
