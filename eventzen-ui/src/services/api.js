/*import axios from 'axios';

export const spring = axios.create({
  baseURL: "http://localhost:8081/api"
});

export const node = axios.create({
  baseURL: "http://localhost:3000/api"
});

export const dotnet = axios.create({
  baseURL: "http://localhost:5180/api"
});*/

import axios from "axios";

const host = window.location.hostname;

export const spring = axios.create({
  baseURL: "http://" + host + ":8081/api"
});

export const node = axios.create({
  baseURL: "http://" + host + ":3000/api"
});

export const dotnet = axios.create({
  baseURL: "http://" + host + ":5180/api"
});