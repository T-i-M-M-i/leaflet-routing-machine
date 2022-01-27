var __defProp = Object.defineProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
__export(exports, {
  default: () => EventHub
});
class EventHub {
  constructor() {
    this.eventTarget = new EventTarget();
  }
  on(eventName, fn) {
    this.eventTarget.addEventListener(eventName, (e) => this.customEventFunctionWrapper(fn, e.detail));
  }
  off(eventName, fn) {
    this.eventTarget.removeEventListener(eventName, (e) => this.customEventFunctionWrapper(fn, e.detail));
  }
  trigger(eventName, params) {
    this.eventTarget.dispatchEvent(new CustomEvent(eventName, { detail: params }));
  }
  customEventFunctionWrapper(fn, params) {
    fn(params);
  }
}
