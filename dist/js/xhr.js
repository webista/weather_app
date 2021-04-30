/**
 * Handle XMLHttpRequest
 */

export class Request {
  static fetchData(url) {
    return new Promise((resolve, reject) => {
      const XHR = new XMLHttpRequest();

      XHR.open("GET", url);
      XHR.onload = function () {
        if (this.status >= 200 && this.status < 400) {
          const RESPONSE_DATA = JSON.parse(this.response);
          console.log("Response", RESPONSE_DATA);
          resolve(RESPONSE_DATA);
        } else {
          console.warn("API error");
          reject("City not found");
        }
      };
      XHR.onerror = function () {
        console.warn("Connection error");
        reject("Connection error");
      };
      XHR.send();
    });
  }
}
