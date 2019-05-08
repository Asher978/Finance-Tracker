import fetch from "isomorphic-fetch";
import cookie from "js-cookie";

// TODO Move me elsewhere!
const host = window.location.protocol + "//localhost:3000";

export default class clientAPI {
  constructor() {
    this.headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
  }

  get(url, params) {
    const fullUrl = new URL(host + url);

    // Optional query parameters.
    if (params) {
      Object.keys(params).forEach(key =>
        fullUrl.searchParams.append(key, params[key])
      );
    }

    return fetch(fullUrl, {
      method: "GET",
      headers: Object.assign(this.headers, getCookie())
    });
  }

  post(url, params) {
    return fetch(host + url, {
      method: "POST",
      headers: Object.assign(this.headers, getCookie()),
      body: JSON.stringify(params.data)
    });
  }

  put(url, params) {
    return fetch(host + url, {
      method: "PUT",
      headers: Object.assign(this.headers, getCookie()),
      body: JSON.stringify(params.data)
    });
  }
}

/**
 * helper func to get and parse the cookie
 * since it was stringified before setting it
 */
function getCookie() {
  return cookie.getJSON("token");
}
