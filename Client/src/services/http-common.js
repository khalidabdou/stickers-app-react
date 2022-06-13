import axios from "axios";
import env from "react-dotenv";

export default axios.create({
  baseURL: env.REACT_APP_API ,
  headers: {
    'Content-Type': 'application/json',
    'Content-Type': 'multipart/form-data',
  
  }
});
