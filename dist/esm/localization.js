import { en } from "./locales";
class Localization {
  constructor(locale) {
    this.locale = locale != null ? locale : en;
  }
  localize(keys) {
    const keyArray = Array.isArray(keys) ? keys : [keys];
    let intermediate = this.locale;
    for (const key of keyArray) {
      intermediate = intermediate[key];
      if (!intermediate) {
        break;
      }
    }
    return intermediate;
  }
}
function localization(locale) {
  return new Localization(locale);
}
export {
  Localization as default,
  localization
};
