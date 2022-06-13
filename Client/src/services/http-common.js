import axios from "axios";

export default axios.create({
  baseURL: process.env.API || "http://localhost:9000",
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
    
  }
});
