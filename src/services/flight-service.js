import Axios from "axios";
import { getAPI_URL } from "../API_URL";

const API_URL = getAPI_URL();
//const API_URL = "http://bjelicaluka.live:4000";

export function getFlights() {
  return Axios.get(`${API_URL}/flights`);
}

export function addFlight(flight, callback) {
  Axios.post(`${API_URL}/flights`, flight)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}

export function editFlight(flight, callback) {
  Axios.put(`${API_URL}/flights/${flight.id}`, flight)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}
