import axios from "axios";

const base = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true, // ✅ Allows cookies to be sent and received
});

export { base };
