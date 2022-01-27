var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  Direction: () => Direction,
  InstructionType: () => InstructionType
});
var InstructionType;
(function(InstructionType2) {
  InstructionType2["Straight"] = "Straight";
  InstructionType2["SlightRight"] = "SlightRight";
  InstructionType2["Right"] = "Right";
  InstructionType2["SharpRight"] = "SharpRight";
  InstructionType2["TurnAround"] = "TurnAround";
  InstructionType2["SharpLeft"] = "SharpLeft";
  InstructionType2["Left"] = "Left";
  InstructionType2["SlightLeft"] = "SlightLeft";
  InstructionType2["WaypointReached"] = "WaypointReached";
  InstructionType2["Roundabout"] = "Roundabout";
  InstructionType2["StartAt"] = "StartAt";
  InstructionType2["DestinationReached"] = "DestinationReached";
  InstructionType2["EnterAgainstAllowedDirection"] = "EnterAgainstAllowedDirection";
  InstructionType2["LeaveAgainstAllowedDirection"] = "LeaveAgainstAllowedDirection";
  InstructionType2["Head"] = "Head";
  InstructionType2["Continue"] = "Continue";
  InstructionType2["Uturn"] = "Uturn";
})(InstructionType || (InstructionType = {}));
var Direction;
(function(Direction2) {
  Direction2["N"] = "N";
  Direction2["NE"] = "NE";
  Direction2["E"] = "E";
  Direction2["SE"] = "SE";
  Direction2["S"] = "S";
  Direction2["SW"] = "SW";
  Direction2["W"] = "W";
  Direction2["NW"] = "NW";
})(Direction || (Direction = {}));
