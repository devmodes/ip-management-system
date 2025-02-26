import axios from "axios";

const AUTH_BASE_URL = "http://localhost:8000/api";

export const isAuthorized = (token?: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`${AUTH_BASE_URL}/me`, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};

export const userCan = (key: string, token?: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(AUTH_BASE_URL, {
        headers: {
          Authorization: token,
        },
        data: {
          type: "permission",
          key,
        },
      })
      .then((res) => resolve(res))
      .catch((error) => reject(error));
  });
};
