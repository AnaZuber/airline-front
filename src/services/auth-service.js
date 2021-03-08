import Axios from "axios";
import { getAPI_URL } from "../API_URL";

const API_URL = getAPI_URL();

export function login(username, password) {
  return Axios.post(`${API_URL}/login`, {
    username: username,
    password: password,
  });
}

export function register(account) {
  Axios.post(`${API_URL}/account`, {
    username: account.username,
    password: account.password,
    user: {
      firstName: account.firstName,
      lastName: account.lastName,
    },
    role: 0,
  })
    .then((resp) => {
      alert(`Successful registration`);
      localStorage.setItem("user", resp.data);
    })
    .catch((e) => {
      alert("Registration error");
    });
  return;
}

export function editProfile(user) {
  Axios.put(`${API_URL}/customer/${user.id}`, {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    cardNumber: user.cardNumber,
    location: {
      id: user.location,
    },
  })
    .then((resp) => {
      alert(`You have successfully edited the profile!`);
      const role = JSON.parse(localStorage.getItem("user")).role;
      localStorage.setItem(
        "user",
        JSON.stringify({ user: resp.data, role: role })
      );
    })
    .catch((e) => {
      alert("Edit profile error");
    });
  return;
}

export function logout() {
  localStorage.removeItem("user");
}
