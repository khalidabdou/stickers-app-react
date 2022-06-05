import http from "./http-common";
class StickersDataService {
  getAllCats() {
    return http.get("/categories");
  }
  addCat(category) {
    console.log(category);
    return http.post(`/categories?cat=${category}`,);
  }
  get(id) {
    return http.get(`/tutorials/${id}`);
  }
  create(data) {
    return http.post("/tutorials", data);
  }
  update(id, data) {
    return http.put(`/tutorials/${id}`, data);
  }
  delete(id) {
    return http.delete(`/tutorials/${id}`);
  }
  deleteAll() {
    return http.delete(`/tutorials`);
  }
  findByTitle(title) {
    return http.get(`/tutorials?title=${title}`);
  }
}
export default new StickersDataService();
