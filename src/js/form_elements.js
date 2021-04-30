/**
 * Fetch form elements
 */

const PARENT_ID = "#js-form-weather";
const PARENT_RESULT_ID = "#js-form-weather-result";

export const BUTTON_SUBMIT = document.querySelector(PARENT_ID + "-submit");
export const INPUT_CITY = document.querySelector(PARENT_ID + "-input");
export const LOADER = document.querySelector(PARENT_ID + "-loader");
export const RESULT = document.querySelector(PARENT_ID + "-result");
export const RESULT_CITY_NAME = document.querySelector(
  PARENT_RESULT_ID + "-city"
);
export const RESULT_DESC = document.querySelector(PARENT_RESULT_ID + "-desc");
export const RESULT_TEMPERATURE = document.querySelector(
  PARENT_RESULT_ID + "-temperature"
);
