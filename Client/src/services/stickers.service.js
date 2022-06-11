import http from "./http-common";

import Cookies from 'universal-cookie';
let cookies =new Cookies();
class StickersDataService {
  getCategories() {

    return http.get("/categories/all",{ params: { language: cookies.get('language') } });
  }
  addCat(category, file) {
    
    return http.post(`/categories?cat=${category}&file=${file}`,);
  }

  upload(formData) {
    formData.append('language', cookies.get('language'));

    return http.post(`/categories/upload`, formData);
  }
  // {
  //   data: {
  //     name: formData.get('name'),
  //     fileName: formData.get('fileName'),
  //     formData: formData       
  //   }
  // }

  delete(id) {
    return http.delete(`/categories/${id}`);
  }

  uploadStikcers(formData) {
    return http.post("/stickers/", formData, {
      data: formData.name,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  //get packs 
  getStickers() {
    return http.get("/stickers");
  }

  //add pack
  addPack() {

    //return "success";
    return http.post(`/stickers`,);
  }

  //delete pack
  deletePack(id) {
    return http.delete(`/stickers/${id}`);
  }

  //get languages
  getLanguages() {
    return http.get("/languages");
  }

  login(username, password) {
    //console.log(username + password);
    return http.post("/login", {
      username: username ,password: password  ,
      headers: {
        'Content-Type': 'text/plain'
      }
    });
  }

}
export default new StickersDataService();
