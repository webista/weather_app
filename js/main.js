import * as ELEMENTS from "./form_elements.js";
import { Request } from "./xhr.js";
import { Data, PROXY_HANDLER } from "./data.js";

const APP_ID = "6434a1948af3021373f1e5fc2ed13b3f";

const animRender = (el, delay) => {
  el.classList.add("d-none");
  el.classList.remove("anim", "anim--fadeInUp");
  setTimeout(() => {
    el.classList.remove("d-none");
    el.classList.add("anim", "anim--fadeInUp");
  }, delay);
};

const renderWeather = (data) => {
  console.log("Weather data", data);

  ELEMENTS.LOADER.classList.add("d-none");

  ELEMENTS.RESULT_CITY_NAME.textContent = data.cityName;
  ELEMENTS.RESULT_CITY_NAME.classList.remove("d-none");

  ELEMENTS.RESULT_DESC.textContent = data.desc;
  animRender(ELEMENTS.RESULT_DESC, 500);

  ELEMENTS.RESULT_TEMPERATURE.textContent = data.temperature;
  animRender(ELEMENTS.RESULT_TEMPERATURE, 1000);

  ELEMENTS.RESULT.classList.remove("d-none");
};

const searchWeather = (ev) => {
  ev.preventDefault();

  ELEMENTS.LOADER.classList.remove("d-none");

  if (document.getElementById("js-form-weather-warning-message")) {
    document.getElementById("js-form-weather-warning-message").remove();
  }

  const CITY_NAME = ELEMENTS.INPUT_CITY.value.trim();

  if (!CITY_NAME) {
    ELEMENTS.LOADER.classList.add("d-none");
    ELEMENTS.RESULT.insertAdjacentHTML("beforebegin", '<p id="js-form-weather-warning-message" class="Text f-bold c-warning mt-20 mb-20">' + "Please enter a city name" + "</p>");

    return;
  }

  const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + CITY_NAME + "&units=metric&appid=" + APP_ID;

  // setTimeout here for Loader visibility only
  setTimeout(() => {
    Request.fetchData(URL)
      .then((responseData) => {
        const DATA = new Data(CITY_NAME, responseData.weather[0].description);
        const PROXY = new Proxy(DATA, PROXY_HANDLER);
        PROXY.temperature = responseData.main.temp;
        renderWeather(PROXY);
      })
      .catch((error) => {
        ELEMENTS.LOADER.classList.add("d-none");
        ELEMENTS.RESULT.insertAdjacentHTML("beforebegin", '<p id="js-form-weather-warning-message" class="Text f-bold c-warning mt-20 mb-20">' + error + "</p>");
      });
  }, 200);
};

ELEMENTS.BUTTON_SUBMIT.addEventListener("click", searchWeather);
