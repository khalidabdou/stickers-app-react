import http from "./http-common";

import axios from "axios";
class StickersDataService {
  getCategories() {
    return http.get("/categories");
  }
  addCat(category, file) {
    console.log(category, file);
    //return "success";
    console.log(file);
    return http.post(`/categories?cat=${category}&file=${file}`,);
  }

  upload(formData) {
    console.log(formData);
    return http.post(`/categories/upload`, {
      data: {
        name: formData.get('name'),
        fileName: formData.get('fileName'),
        
      }
    }
    );
  }

  delete(id) {
    return http.delete(`/categories/${id}`);
  }

  //get packs 
  getStickers() {
    return http.get("/stickers");
  }

}
export default new StickersDataService();
