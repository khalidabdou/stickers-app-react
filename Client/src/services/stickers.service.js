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
    console.log(formData.data);
    return http.post(`/categories/upload`, formData , { 
      data:{name: formData.name,},
      headers : {'Content-Type': 'multipart/form-data'}});
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

  uploadStikcers(formData){
    return http.post("/stickers/",formData,{data:formData.name,
      headers:{
        'Content-Type': 'multipart/form-data'
    }});
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

}
export default new StickersDataService();
