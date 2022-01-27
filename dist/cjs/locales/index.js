var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __export = (target, all) => {
  __markAsModule(target);
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};
__export(exports, {
  ca: () => import_ca.default,
  de: () => import_de.default,
  el: () => import_el.default,
  en: () => import_en.default,
  es: () => import_es.default,
  fr: () => import_fr.default,
  it: () => import_it.default,
  nl: () => import_nl.default,
  pl: () => import_pl.default,
  pt: () => import_pt.default,
  ru: () => import_ru.default,
  sk: () => import_sk.default,
  sv: () => import_sv.default,
  uk: () => import_uk.default
});
var import_ca = __toModule(require("./ca"));
var import_de = __toModule(require("./de"));
var import_el = __toModule(require("./el"));
var import_en = __toModule(require("./en"));
var import_es = __toModule(require("./es"));
var import_fr = __toModule(require("./fr"));
var import_it = __toModule(require("./it"));
var import_nl = __toModule(require("./nl"));
var import_pl = __toModule(require("./pl"));
var import_pt = __toModule(require("./pt"));
var import_ru = __toModule(require("./ru"));
var import_sk = __toModule(require("./sk"));
var import_sv = __toModule(require("./sv"));
var import_uk = __toModule(require("./uk"));
