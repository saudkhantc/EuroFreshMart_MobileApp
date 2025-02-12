
import { ENDPOINTS } from "../API/apiRoutes";
import request from "./axiosConfig";

function get(url, isTokenNeeded = true) {
  return request(
    {
      url,
      method: "GET",
      crossDomain: true,
    },
    isTokenNeeded
  );
}

function post(url, body, isTokenNeeded = true) {
  const headers =
    body instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

  return request(
    {
      url,
      method: "POST",
      data: body,
      crossDomain: true,
      headers,
    },
    isTokenNeeded
  );
}

function put(url, body, isTokenNeeded = true) {
  const headers =
    body instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

  return request(
    {
      url,
      method: "PUT",
      data: body,
      crossDomain: true,
      headers,
    },
    isTokenNeeded
  );
}

function deleteResource(url, isTokenNeeded = true) {
  return request(
    {
      url,
      method: "DELETE",
      crossDomain: true,
    },
    isTokenNeeded
  );
}

function patch(url, body, isTokenNeeded = true) {
  const headers =
    body instanceof FormData
      ? { "Content-Type": "multipart/form-data" }
      : { "Content-Type": "application/json" };

  return request(
    {
      url,
      method: "PATCH",
      data: body,
      crossDomain: true,
      headers,
    },
    isTokenNeeded
  );
}

const API = {
  get,
  post,
  put,
  patch,
  deleteResource,
};

export { API as default, ENDPOINTS };
