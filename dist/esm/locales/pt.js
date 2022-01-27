const ptLocale = {
  directions: {
    N: "norte",
    NE: "nordeste",
    E: "leste",
    SE: "sudeste",
    S: "sul",
    SW: "sudoeste",
    W: "oeste",
    NW: "noroeste",
    SlightRight: "curva ligeira a direita",
    Right: "direita",
    SharpRight: "curva fechada a direita",
    SlightLeft: "ligeira a esquerda",
    Left: "esquerda",
    SharpLeft: "curva fechada a esquerda",
    Uturn: "Meia volta"
  },
  instructions: {
    "Head": ["Siga {dir}", " na {road}"],
    "Continue": ["Continue {dir}", " na {road}"],
    "SlightRight": ["Curva ligeira a direita", " na {road}"],
    "Right": ["Curva a direita", " na {road}"],
    "SharpRight": ["Curva fechada a direita", " na {road}"],
    "TurnAround": ["Retorne"],
    "SharpLeft": ["Curva fechada a esquerda", " na {road}"],
    "Left": ["Curva a esquerda", " na {road}"],
    "SlightLeft": ["Curva ligueira a esquerda", " na {road}"],
    "WaypointReached": ["Ponto de interesse atingido"],
    "Roundabout": ["Pegue a {exitStr} sa\xEDda na rotat\xF3ria", " na {road}"],
    "DestinationReached": ["Destino atingido"],
    "Fork": ["Na encruzilhada, vire a {modifier}", " na {road}"],
    "Merge": ["Entre \xE0 {modifier}", " na {road}"],
    "OnRamp": ["Vire {modifier} na rampa", " na {road}"],
    "OffRamp": ["Entre na rampa na {modifier}", " na {road}"],
    "EndOfRoad": ["Vire {modifier} no fim da rua", " na {road}"],
    "Onto": "na {road}"
  },
  formatOrder: function(n) {
    return n + "\xBA";
  },
  ui: {
    startPlaceholder: "Origem",
    viaPlaceholder: "Interm\xE9dio {viaNumber}",
    endPlaceholder: "Destino"
  }
};
var pt_default = ptLocale;
export {
  pt_default as default
};
