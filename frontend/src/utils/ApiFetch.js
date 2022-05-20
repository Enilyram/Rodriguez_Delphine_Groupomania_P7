// partie commune des requetes //

import router from "../router/index";

class ApiFetch {
  constructor() {
    this.baseUrl = "http://localhost:3000/api";
  }

  headers(options = {}) {
    const contentType = options.isFormData
      ? {}
      : {
        "Content-Type": "application/json",
      };

    return {
      ...contentType,
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };
  }

  get(path) {
    return fetch(this.baseUrl + path, {
      method: "GET",
      headers: this.headers(),
    }).then((res) => {
      if (res.status === 401) {
        localStorage.clear();
        alert("Session expirée !");
        router.push({ name: "login" });

      }
      return res.json();
    });
  }

  post(path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: "POST",
      headers: this.headers(options),
      body: options.isFormData ? body : JSON.stringify(body),
    }).then((res) => res.json());
  }

  put(path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: "PUT",
      headers: this.headers(options),
      body: options.isFormData ? body : JSON.stringify(body),
    }).then((res) => res.json());
  }

  delete(path) {
    return fetch(this.baseUrl + path, {
      method: "DELETE",
      headers: this.headers(),
    }).then((res) => res.json());
  }
}

export const apiFetch = new ApiFetch();
