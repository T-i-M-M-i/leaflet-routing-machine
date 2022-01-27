const svLocale = {
  directions: {
    N: "norr",
    NE: "nordost",
    E: "\xF6st",
    SE: "sydost",
    S: "syd",
    SW: "sydv\xE4st",
    W: "v\xE4st",
    NW: "nordv\xE4st",
    SlightRight: "svagt h\xF6ger",
    Right: "h\xF6ger",
    SharpRight: "skarpt h\xF6ger",
    SlightLeft: "svagt v\xE4nster",
    Left: "v\xE4nster",
    SharpLeft: "skarpt v\xE4nster",
    Uturn: "V\xE4nd"
  },
  instructions: {
    "Head": ["\xC5k \xE5t {dir}", " till {road}"],
    "Continue": ["Forts\xE4tt {dir}"],
    "SlightRight": ["Svagt h\xF6ger", " till {road}"],
    "Right": ["Sv\xE4ng h\xF6ger", " till {road}"],
    "SharpRight": ["Skarpt h\xF6ger", " till {road}"],
    "TurnAround": ["V\xE4nd"],
    "SharpLeft": ["Skarpt v\xE4nster", " till {road}"],
    "Left": ["Sv\xE4ng v\xE4nster", " till {road}"],
    "SlightLeft": ["Svagt v\xE4nster", " till {road}"],
    "WaypointReached": ["Viapunkt n\xE5dd"],
    "Roundabout": ["Tag {exitStr} avfarten i rondellen", " till {road}"],
    "DestinationReached": ["Framme vid resans m\xE5l"],
    "Fork": ["Tag av {modifier}", " till {road}"],
    "Merge": ["Anslut {modifier} ", " till {road}"],
    "OnRamp": ["Tag p\xE5farten {modifier}", " till {road}"],
    "OffRamp": ["Tag avfarten {modifier}", " till {road}"],
    "EndOfRoad": ["Sv\xE4ng {modifier} vid v\xE4gens slut", " till {road}"],
    "Onto": "till {road}"
  },
  formatOrder: function(n) {
    return [
      "f\xF6rsta",
      "andra",
      "tredje",
      "fj\xE4rde",
      "femte",
      "sj\xE4tte",
      "sjunde",
      "\xE5ttonde",
      "nionde",
      "tionde"
    ][n - 1];
  },
  ui: {
    startPlaceholder: "Fr\xE5n",
    viaPlaceholder: "Via {viaNumber}",
    endPlaceholder: "Till"
  }
};
var sv_default = svLocale;
export {
  sv_default as default
};
