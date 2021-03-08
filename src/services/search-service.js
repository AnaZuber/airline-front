import Axios from "axios";
import { getAPI_URL } from "../API_URL";

const API_URL = getAPI_URL();
//const API_URL = "http://bjelicaluka.live:4000";

export function search(
  departureDestination,
  arrivalDestination,
  departureDate,
  arrivalDate
) {
  return Axios.post(`${API_URL}/flights/search`, {
    departureDestination: departureDestination,
    arrivalDestination: arrivalDestination,
    departureDate: departureDate,
    arrivalDate: arrivalDate,
  });
}
