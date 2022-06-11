import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:9000",
  headers: {
    'Content-Type': 'multipart/form-data'
   
  }
});
