var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
import L from "leaflet";
class Autocomplete {
  constructor(element, callback, options) {
    this.defaultOptions = {
      timeout: 500,
      noResultsMessage: "No results found."
    };
    this.options = this.defaultOptions;
    this.isOpen = false;
    this.results = [];
    this.lastCompletedText = "";
    this.selection = null;
    this.options = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    this.element = element;
    this.resultFn = options == null ? void 0 : options.resultFn;
    this.autocomplete = options == null ? void 0 : options.autocompleteFn;
    this.selectFn = callback;
    this.container = L.DomUtil.create("div", "leaflet-routing-geocoder-result");
    this.resultTable = L.DomUtil.create("table", "", this.container);
    L.DomEvent.addListener(this.element, "input", this.keyPressed, this);
    L.DomEvent.addListener(this.element, "keypress", this.keyPressed, this);
    L.DomEvent.addListener(this.element, "keydown", this.keyDown, this);
    L.DomEvent.addListener(this.element, "blur", () => {
      if (this.isOpen) {
        this.close();
      }
    }, this);
  }
  close() {
    L.DomUtil.removeClass(this.container, "leaflet-routing-geocoder-result-open");
    this.isOpen = false;
  }
  open() {
    const rect = this.element.getBoundingClientRect();
    if (!this.container.parentElement) {
      this.container.style.left = `${rect.left + window.scrollX}px`;
      this.container.style.top = `${rect.bottom + window.scrollY}px`;
      this.container.style.width = `${rect.right - rect.left}px`;
      document.body.appendChild(this.container);
    }
    L.DomUtil.addClass(this.container, "leaflet-routing-geocoder-result-open");
    this.isOpen = true;
  }
  setResults(results) {
    var _a;
    delete this.selection;
    this.results = results;
    while (this.resultTable.firstChild) {
      this.resultTable.removeChild(this.resultTable.firstChild);
    }
    for (const result of results) {
      const tr = L.DomUtil.create("tr", "", this.resultTable);
      tr.setAttribute("data-result-index", results.indexOf(result).toString());
      const td = L.DomUtil.create("td", "", tr);
      let text = result.name;
      if (this.options.formatGeocoderResult) {
        text = this.options.formatGeocoderResult(result);
      }
      td.append(text);
      L.DomEvent.addListener(td, "mousedown", L.DomEvent.preventDefault, this);
      L.DomEvent.addListener(td, "click", () => this.createClickListener(result), this);
    }
    if (!results.length) {
      const tr = L.DomUtil.create("tr", "", this.resultTable);
      const td = L.DomUtil.create("td", "leaflet-routing-geocoder-no-results", tr);
      td.innerHTML = (_a = this.options.noResultsMessage) != null ? _a : this.defaultOptions.noResultsMessage;
    }
    this.open();
    if (results.length > 0) {
      this.select(1);
    }
  }
  createClickListener(route) {
    this.element.blur();
    this.resultSelected(route);
  }
  resultSelected(route) {
    this.close();
    this.element.value = route.name;
    this.lastCompletedText = route.name;
    this.selectFn(route);
  }
  keyPressed(e) {
    var _a;
    const { keyCode } = e;
    if (this.isOpen && keyCode === 13 && this.selection) {
      const index = parseInt((_a = this.selection.getAttribute("data-result-index")) != null ? _a : "0", 10);
      this.resultSelected(this.results[index]);
      L.DomEvent.preventDefault(e);
      return;
    }
    if (keyCode === 13) {
      L.DomEvent.preventDefault(e);
      this.complete(this.resultFn, true);
      return;
    }
    if (this.autocomplete && document.activeElement === this.element) {
      if (this.timer) {
        clearTimeout(this.timer);
      }
      this.timer = setTimeout(() => this.complete(this.autocomplete), this.options.timeout);
      return;
    }
    this.unselect();
  }
  select(dir) {
    let selection = this.selection;
    if (selection) {
      L.DomUtil.removeClass(selection.firstElementChild, "leaflet-routing-geocoder-selected");
      selection = selection[dir > 0 ? "nextElementSibling" : "previousElementSibling"];
    }
    if (!selection) {
      selection = this.resultTable[dir > 0 ? "firstElementChild" : "lastElementChild"];
    }
    if (selection) {
      L.DomUtil.addClass(selection.firstElementChild, "leaflet-routing-geocoder-selected");
      this.selection = selection;
    }
  }
  unselect() {
    if (this.selection) {
      L.DomUtil.removeClass(this.selection.firstElementChild, "leaflet-routing-geocoder-selected");
    }
    delete this.selection;
  }
  keyDown(e) {
    const { keyCode } = e;
    if (this.isOpen) {
      switch (keyCode) {
        case 27:
          this.close();
          L.DomEvent.preventDefault(e);
          return;
        case 38:
          this.select(-1);
          L.DomEvent.preventDefault(e);
          return;
        case 40:
          this.select(1);
          L.DomEvent.preventDefault(e);
          return;
      }
    }
  }
  complete(completeFn, trySelect = false) {
    const { value } = this.element;
    if (!value || !completeFn) {
      return;
    }
    if (value !== this.lastCompletedText) {
      completeFn(value, this.completeResults);
    } else if (trySelect) {
      this.lastCompletedText = value;
      this.completeResults();
    }
  }
  completeResults() {
    if (this.results.length === 1) {
      this.resultSelected(this.results[0]);
    } else {
      this.setResults(this.results);
    }
  }
}
function autocomplete(element, callback, options) {
  return new Autocomplete(element, callback, options);
}
export {
  autocomplete,
  Autocomplete as default
};
