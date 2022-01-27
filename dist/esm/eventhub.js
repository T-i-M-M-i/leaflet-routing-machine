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
export {
  EventHub as default
};
