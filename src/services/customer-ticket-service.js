import Axios from "axios";
import { getAPI_URL } from "../API_URL";

const API_URL = getAPI_URL();

//const API_URL = "http://bjelicaluka.live:4000";

export function buyTicket(customerId, ticketId) {
  Axios.post(`${API_URL}/customer-tickets`, {
    customer: {
      id: customerId,
    },
    ticket: {
      id: ticketId,
    },
  })
    .then((resp) => { })
    .catch((e) => {
      console.log(e);
    });
}

export function getTicketsByCustomerId(customerId) {
  return Axios.get(`${API_URL}/customer-tickets/customer/${customerId}`);
}

export function cancelReservation(customerTicketId, callback) {
  Axios.delete(`${API_URL}/customer-tickets/${customerTicketId}`)
    .then((resp) => {
      callback();
    })
    .catch((e) => {
      console.log(e);
    });
}
