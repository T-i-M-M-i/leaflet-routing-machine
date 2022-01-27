var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => el_default
});
const elLocale = {
  directions: {
    N: "\u03B2\u03CC\u03C1\u03B5\u03B9\u03B1",
    NE: "\u03B2\u03BF\u03C1\u03B5\u03B9\u03BF\u03B1\u03BD\u03B1\u03C4\u03BF\u03BB\u03B9\u03BA\u03AC",
    E: "\u03B1\u03BD\u03B1\u03C4\u03BF\u03BB\u03B9\u03BA\u03AC",
    SE: "\u03BD\u03BF\u03C4\u03B9\u03BF\u03B1\u03BD\u03B1\u03C4\u03BF\u03BB\u03B9\u03BA\u03AC",
    S: "\u03BD\u03CC\u03C4\u03B9\u03B1",
    SW: "\u03BD\u03BF\u03C4\u03B9\u03BF\u03B4\u03C5\u03C4\u03B9\u03BA\u03AC",
    W: "\u03B4\u03C5\u03C4\u03B9\u03BA\u03AC",
    NW: "\u03B2\u03BF\u03C1\u03B5\u03B9\u03BF\u03B4\u03C5\u03C4\u03B9\u03BA\u03AC"
  },
  instructions: {
    "Head": ["\u039A\u03B1\u03C4\u03B5\u03C5\u03B8\u03C5\u03BD\u03B8\u03B5\u03AF\u03C4\u03B5 {dir}", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "Continue": ["\u03A3\u03C5\u03BD\u03B5\u03C7\u03AF\u03C3\u03C4\u03B5 {dir}", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "SlightRight": ["\u0395\u03BB\u03B1\u03C6\u03C1\u03CE\u03C2 \u03B4\u03B5\u03BE\u03B9\u03AC", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "Right": ["\u0394\u03B5\u03BE\u03B9\u03AC", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "SharpRight": ["\u0391\u03C0\u03CC\u03C4\u03BF\u03BC\u03B7 \u03B4\u03B5\u03BE\u03B9\u03AC \u03C3\u03C4\u03C1\u03BF\u03C6\u03AE", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "TurnAround": ["\u039A\u03AC\u03BD\u03C4\u03B5 \u03B1\u03BD\u03B1\u03C3\u03C4\u03C1\u03BF\u03C6\u03AE"],
    "SharpLeft": ["\u0391\u03C0\u03CC\u03C4\u03BF\u03BC\u03B7 \u03B1\u03C1\u03B9\u03C3\u03C4\u03B5\u03C1\u03AE \u03C3\u03C4\u03C1\u03BF\u03C6\u03AE", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "Left": ["\u0391\u03C1\u03B9\u03C3\u03C4\u03B5\u03C1\u03AC", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "SlightLeft": ["\u0395\u03BB\u03B1\u03C6\u03C1\u03CE\u03C2 \u03B1\u03C1\u03B9\u03C3\u03C4\u03B5\u03C1\u03AC", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "WaypointReached": ["\u03A6\u03C4\u03AC\u03C3\u03B1\u03C4\u03B5 \u03C3\u03C4\u03BF \u03C3\u03B7\u03BC\u03B5\u03AF\u03BF \u03B1\u03BD\u03B1\u03C6\u03BF\u03C1\u03AC\u03C2"],
    "Roundabout": ["\u0391\u03BA\u03BF\u03BB\u03BF\u03C5\u03B8\u03AE\u03C3\u03C4\u03B5 \u03C4\u03B7\u03BD {exitStr} \u03AD\u03BE\u03BF\u03B4\u03BF \u03C3\u03C4\u03BF \u03BA\u03C5\u03BA\u03BB\u03B9\u03BA\u03CC \u03BA\u03CC\u03BC\u03B2\u03BF", " \u03C3\u03C4\u03B7\u03BD {road}"],
    "DestinationReached": ["\u03A6\u03C4\u03AC\u03C3\u03B1\u03C4\u03B5 \u03C3\u03C4\u03BF\u03BD \u03C0\u03C1\u03BF\u03BF\u03C1\u03B9\u03C3\u03BC\u03CC \u03C3\u03B1\u03C2"]
  },
  formatOrder: function(n) {
    return n + "\xBA";
  },
  ui: {
    startPlaceholder: "\u0391\u03C6\u03B5\u03C4\u03B7\u03C1\u03AF\u03B1",
    viaPlaceholder: "\u03BC\u03AD\u03C3\u03C9 {viaNumber}",
    endPlaceholder: "\u03A0\u03C1\u03BF\u03BF\u03C1\u03B9\u03C3\u03BC\u03CC\u03C2"
  }
};
var el_default = elLocale;