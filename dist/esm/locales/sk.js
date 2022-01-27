const skLocale = {
  directions: {
    N: "sever",
    NE: "serverov\xFDchod",
    E: "v\xFDchod",
    SE: "juhov\xFDchod",
    S: "juh",
    SW: "juhoz\xE1pad",
    W: "z\xE1pad",
    NW: "serveroz\xE1pad"
  },
  instructions: {
    "Head": ["Mierte na {dir}", " na {road}"],
    "Continue": ["Pokra\u010Dujte na {dir}", " na {road}"],
    "SlightRight": ["Mierne doprava", " na {road}"],
    "Right": ["Doprava", " na {road}"],
    "SharpRight": ["Prudko doprava", " na {road}"],
    "TurnAround": ["Oto\u010Dte sa"],
    "SharpLeft": ["Prudko do\u013Eava", " na {road}"],
    "Left": ["Do\u013Eava", " na {road}"],
    "SlightLeft": ["Mierne do\u013Eava", " na {road}"],
    "WaypointReached": ["Ste v prejazdovom bode."],
    "Roundabout": ["Odbo\u010Dte na {exitStr} v\xFDjazde", " na {road}"],
    "DestinationReached": ["Pri\u0161li ste do cie\u013Ea."]
  },
  formatOrder: function(n) {
    const i = n % 10 - 1, suffix = [".", ".", "."];
    return suffix[i] ? n + suffix[i] : n + ".";
  },
  ui: {
    startPlaceholder: "Za\u010Diatok",
    viaPlaceholder: "Cez {viaNumber}",
    endPlaceholder: "Koniec"
  }
};
var sk_default = skLocale;
export {
  sk_default as default
};
