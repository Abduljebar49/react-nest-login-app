import axios from "axios";
import useAuth from "../hooks/useAuth";

export default axios.create({
  baseURL: "http://localhost:3000/api/",
  headers: {
    Authorization: `Bearer ${useAuth()?.token}`,
  },
});
