import Axios from "axios";
import { getAPI_URL } from "../API_URL";

const API_URL = getAPI_URL();
//const API_URL = "http://bjelicaluka.live:4000";

export function getAirlines() {
  return Axios.get(`${API_URL}/airlines`);
}

export function addAirline(airline, callback) {
  Axios.post(`${API_URL}/airlines`, airline)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}

export function editAirline(airline, callback) {
  Axios.put(`${API_URL}/airlines/${airline.id}`, airline)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}
