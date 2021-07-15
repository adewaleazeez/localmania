import http from "../../http-common";
import apicall from "../../Utils/APICall";

class UsersDataService {
  getAll() {
    console.log(http.get("/users"));
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  create(data) {
    return apicall("users/register", "POST", data);
  }

  update(id, data) {
    return http.put(`/users/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  findByUserNamePassword(username, password) {
    return apicall(`/users/?username=${username}&password=${password}`, "GET");
    /*mysqlConnection.query('SELECT * FROM products', (err, rows, fields) => {
      if (!err)
          res.send(rows);
      else
          console.log(err);
      })*/
  }

  findByUserName(username) {
    return http.get(`/users?username=${username}`);
  }

  findByEmailAddress(emailaddress) {
    return http.get(`/users?emailaddress=${emailaddress}`);
  }
}

export default new UsersDataService();