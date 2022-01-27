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
import Formatter from "./formatter";
class ItineraryBuilder {
  constructor(options) {
    this.defaultOptions = {
      summaryTemplate: "<h2>{name}</h2><h3>{distance}, {time}</h3>",
      containerClassName: "",
      alternativeClassName: "",
      minimizedClassName: "",
      itineraryClassName: "",
      totalDistanceRoundingSensitivity: -1,
      show: true,
      collapsible: void 0,
      collapseBtn: (itinerary) => {
        var _a;
        const collapseBtn = document.createRange().createContextualFragment(`<span class='${itinerary.options.collapseBtnClass}'></span>`);
        collapseBtn.addEventListener("click", itinerary.toggle);
        (_a = itinerary.container) == null ? void 0 : _a.insertBefore(collapseBtn, itinerary.container.firstChild);
      },
      collapseBtnClass: "leaflet-routing-collapse-btn"
    };
    this.altElements = [];
    this.options = __spreadValues(__spreadValues({}, this.defaultOptions), options);
    this.formatter = this.options.formatter || new Formatter(this.options);
  }
  registerEventHub(hub) {
    this.eventHub = hub;
  }
  buildItinerary(collapse) {
    var _a;
    const { collapsible, show, containerClassName, collapseBtn = this.defaultOptions.collapseBtn } = this.options;
    const isCollapsible = collapsible || collapse;
    const conditionalClassNames = `${!show ? "leaflet-routing-container-hide " : ""} ${isCollapsible ? "leaflet-routing-collapsible " : ""}`;
    const container = document.createRange().createContextualFragment(`
      <div class='leaflet-routing-container leaflet-bar ${conditionalClassNames} ${containerClassName}'>
      </div>
    `);
    this.container = container.firstElementChild;
    (_a = this.container) == null ? void 0 : _a.addEventListener("mousedown touchstart dblclick mousewheel", (e) => e.stopPropagation());
    this.altContainer = this.createAlternativesContainer();
    this.container.append(this.altContainer);
    if (isCollapsible) {
      collapseBtn(this);
    }
    return this.container;
  }
  createAlternativesContainer() {
    return document.createRange().createContextualFragment('<div class="leaflet-routing-alternatives-container"></div>').firstElementChild;
  }
  setAlternatives(routes) {
    var _a;
    this.clearAlts();
    for (const alt of routes) {
      const altDiv = this.createAlternative(alt, routes.indexOf(alt));
      (_a = this.altContainer) == null ? void 0 : _a.appendChild(altDiv);
      this.altElements.push(altDiv);
    }
    return this;
  }
  show() {
    var _a;
    (_a = this.container) == null ? void 0 : _a.classList.remove("leaflet-routing-container-hide");
  }
  hide() {
    var _a;
    (_a = this.container) == null ? void 0 : _a.classList.add("leaflet-routing-container-hide");
  }
  toggle() {
    var _a;
    (_a = this.container) == null ? void 0 : _a.classList.toggle("leaflet-routing-container-hide");
  }
  createAlternative(alt, index) {
    var _a;
    const {
      minimizedClassName,
      alternativeClassName
    } = this.options;
    const className = index > 0 ? `leaflet-routing-alt-minimized ${minimizedClassName}` : "";
    const altDiv = document.createRange().createContextualFragment(`
        <div class='leaflet-routing-alt ${alternativeClassName} ${className}'>
        ${this.createSummaryTemplate(alt)}
        </div>
      `).firstElementChild;
    altDiv.append(this.createItineraryContainer(alt));
    altDiv.addEventListener("click", (e) => this.onAltClicked(e));
    (_a = this.eventHub) == null ? void 0 : _a.on("routeselected", (e) => this.selectAlt(e));
    return altDiv;
  }
  createSummaryTemplate(alt) {
    const { summaryTemplate: defaultTemplate } = this.defaultOptions;
    const { summaryTemplate, totalDistanceRoundingSensitivity } = this.options;
    let template = summaryTemplate != null ? summaryTemplate : defaultTemplate;
    const data = __spreadValues(__spreadValues({}, {
      distance: this.formatter.formatDistance(alt.summary.totalDistance, totalDistanceRoundingSensitivity),
      time: this.formatter.formatTime(alt.summary.totalTime)
    }), alt);
    if (typeof template === "function") {
      return template(data);
    }
    for (const [key, value] of Object.entries(data)) {
      template = template.replace(`{${key}}`, (s) => {
        return typeof value === "function" ? value(s) : value;
      });
    }
    return template;
  }
  clearAlts() {
    const el = this.altContainer;
    while (el && el.firstChild) {
      el.removeChild(el.firstChild);
    }
    this.altElements = [];
  }
  createItineraryContainer(route) {
    const container = this.createContainer();
    const steps = this.createStepsContainer();
    container.appendChild(steps);
    for (const instruction of route.instructions) {
      const currentIndex = route.instructions.indexOf(instruction);
      const text = this.formatter.formatInstruction(instruction, currentIndex);
      const distance = this.formatter.formatDistance(instruction.distance);
      const icon = this.formatter.getIconName(instruction, currentIndex);
      const step = this.createStep(text, distance, icon, steps);
      if (instruction.index) {
        this.addRowListeners(step, route.coordinates[instruction.index]);
      }
    }
    return container;
  }
  addRowListeners(row, coordinate) {
    row.addEventListener("mouseover", () => {
      var _a;
      (_a = this.eventHub) == null ? void 0 : _a.trigger("altRowMouseOver", coordinate);
    });
    row.addEventListener("mouseout", () => {
      var _a;
      (_a = this.eventHub) == null ? void 0 : _a.trigger("altRowMouseOut");
    });
    row.addEventListener("click", () => {
      var _a;
      (_a = this.eventHub) == null ? void 0 : _a.trigger("altRowClick", coordinate);
    });
  }
  onAltClicked(e) {
    var _a;
    const altElem = e.target.closest(".leaflet-routing-alt");
    if (!altElem) {
      return;
    }
    (_a = this.eventHub) == null ? void 0 : _a.trigger("routeselected", {
      routeIndex: this.altElements.indexOf(altElem)
    });
  }
  selectAlt(e) {
    const altElem = this.altElements[e.routeIndex];
    if (altElem.classList.contains("leaflet-routing-alt-minimized")) {
      for (const altElement of this.altElements) {
        const currentIndex = this.altElements.indexOf(altElement);
        altElement.classList.toggle("leaflet-routing-alt-minimized");
        if (this.options.minimizedClassName) {
          altElement.classList.toggle(this.options.minimizedClassName);
        }
        if (currentIndex !== e.routeIndex) {
          altElement.scrollTop = 0;
        }
      }
    }
  }
  createContainer(className = "") {
    const { containerClassName } = this.options;
    return document.createRange().createContextualFragment(`
        <table class='${className} ${containerClassName}'>
          <colgroup>
            <col class='leaflet-routing-instruction-icon'></col>
            <col class='leaflet-routing-instruction-text'></col>
            <col class='leaflet-routing-instruction-distance'></col>
          </colgroup>
        </table>
      `).firstElementChild;
  }
  createStepsContainer() {
    return document.createElement("tbody");
  }
  createStep(text, distance, icon, steps) {
    const template = document.createElement("template");
    template.insertAdjacentHTML("afterbegin", `
        <tr>
          <td>
            <span class='leaflet-routing-icon leaflet-routing-icon-${icon}'></span>
          </td>
          <td>
            <span>${text}</span>
          </td>
          <td>
            <span>${distance}</span>
          </td>
        </tr>
      `);
    const row = template.firstElementChild;
    steps == null ? void 0 : steps.appendChild(row);
    return row;
  }
}
function itineraryBuilder(options) {
  return new ItineraryBuilder(options);
}
export {
  ItineraryBuilder as default,
  itineraryBuilder
};
