import Axios from "axios";
import { getAPI_URL } from "../API_URL";

const API_URL = getAPI_URL();
//const API_URL = "http://bjelicaluka.live:4000";

export function getLocations() {
  return Axios.get(`${API_URL}/locations`);
}

export function addLocation(location, callback) {
  Axios.post(`${API_URL}/locations`, location)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}

export function editLocation(location, callback) {
  Axios.put(`${API_URL}/locations/${location.id}`, location)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}
