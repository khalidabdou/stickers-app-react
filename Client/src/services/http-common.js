import axios from "axios";
import env from "react-dotenv";

export default axios.create({
  baseURL: 'http://77.243.85.134:9000' ,
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
  
  }
});
