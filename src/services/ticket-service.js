import Axios from "axios";
import { getAPI_URL } from "../API_URL";

const API_URL = getAPI_URL();
//const API_URL = "http://bjelicaluka.live:4000";

export function getTickets() {
  return Axios.get(`${API_URL}/tickets`);
}

export function getTicketsByFlightId(flightId) {
  return Axios.get(`${API_URL}/tickets/flight/${flightId}`);
}

export function addTicket(ticket, callback) {
  Axios.post(`${API_URL}/tickets`, ticket)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}

export function editTicket(ticket, callback) {
  Axios.put(`${API_URL}/tickets/${ticket.id}`, ticket)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}
