/**
 * Fetch weather data
 */

export class Data {
  constructor(cityName, desc) {
    this.cityName = cityName;
    this.desc = desc;
    this.temperature = "";
  }
}

export const PROXY_HANDLER = {
  get: function (target, property) {
    return Reflect.get(target, property);
  },
  set: function (target, property, value) {
    // Convert Kelvin to Fahrenheit unit
    // const newValue = (value * 1.8 + 32).toFixed(2) + " F";
    const newValue = value.toFixed(1) + " °С";
    return Reflect.set(target, property, newValue);
  }
};
