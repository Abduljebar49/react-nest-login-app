import axios from "axios";
import useAuth from "../hooks/useAuth";

export default axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: `Bearer ${useAuth()?.token}`,
  },
});
