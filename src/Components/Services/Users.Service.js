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

  passwordChange(id, data) {
    return http.put(`/users/passwordchange/${id}`, data);
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

  resetPassword(data) {
    return apicall("users/reset-password-request", "POST", data);
  }

  findByUserNamePassword(data) {
    return apicall("users/authenticate", "POST", data);
  }

  findByUserName(username) {
    return http.get(`/users/findByUsername/${username}`);
  }

  findByEmailAddress(emailaddress) {
    return http.get(`/users?emailaddress=${emailaddress}`);
  }

  createUser(data) {
    return apicall("/users/users/createUser", "POST", data);
  }

  updateUser(data) {
    return apicall("/users/users/updateUser", "PUT", data);
  }
  
  deleteUser(data) {
    return apicall("/users/users/deleteUser", "DELETE", data);
  }
  
  getUsers() {
    return http.get("/users/users/getUsers");
  }  
  
  getUsersByOption(data) {
    return apicall("/users/users/getUsersByOption", "POST", data);
  }  

  getDashBoardData(data) {
    return apicall("/users/users/getDashBoardData", "POST", data);
  }

  createDepartment(data) {
    return apicall("/users/departments/createDepartment", "POST", data);
  }

  updateDepartment(data) {
    return apicall("/users/departments/updateDepartment", "PUT", data);
  }
  
  deleteDepartment(data) {
    return apicall("/users/departments/deleteDepartment", "DELETE", data);
  }
  
  getDepartments() {
    return http.get("/users/departments/getDepartments");
  }  
  
  getDepartmentsByOption(data) {
    return apicall("/users/departments/getDepartmentsByOption", "POST", data);
  }  

  createStaff(data) {
    return apicall("/users/staff/createStaff", "POST", data);
  }

  updateStaff(data) {
    return apicall("/users/staff/updateStaff", "PUT", data);
  }
  
  deleteStaff(data) {
    return apicall("/users/staff/deleteStaff", "DELETE", data);
  }
  
  getStaffs() {
    return http.get("/users/staff/getStaffs");
  }  
  
  getStaffsByOption(data) {
    return apicall("/users/staff/getStaffsByOption", "POST", data);
  }

  createGate(data) {
    return apicall("/users/gate/createGate", "POST", data);
  }

  updateGate(data) {
    return apicall("/users/gate/updateGate", "PUT", data);
  }
  
  deleteGate(data) {
    return apicall("/users/gate/deleteGate", "DELETE", data);
  }
  
  getGates() {
    return http.get("/users/gate/getGates");
  }  
  
  getGatesByOption(data) {
    return apicall("/users/gate/getGatesByOption", "POST", data);
  }  

  // createVisitorRegister(data) {
  //   return apicall("/users/visitor_register/createVisitorRegister", "POST", data);
  // }

  // updateVisitorRegister(data) {
  //   return apicall("/users/visitor_register/updateVisitorRegister", "PUT", data);
  // }
  
  // deleteVisitorRegister(data) {
  //   return apicall("/users/visitor_register/deleteVisitorRegister", "DELETE", data);
  // }
  
  // getVisitorRegisters() {
  //   return http.get("/users/visitor_register/getVisitorRegisters");
  // }  
  
  // getVisitorRegistersByOption(data) {
  //   return apicall("/users/visitor_register/getVisitorRegistersByOption", "POST", data);
  // }  

  // createPurpose(data) {
  //   return apicall("/users/purpose/createPurpose", "POST", data);
  // }

  // updatePurpose(data) {
  //   return apicall("/users/purpose/updatePurpose", "PUT", data);
  // }
  
  // deletePurpose(data) {
  //   return apicall("/users/purpose/deletePurpose", "DELETE", data);
  // }
  
  // getPurposes(data) {
  //   return apicall("/users/purpose/getPurposes", "POST", data);
  // }  
  
  // getPurposesByOption(data) {
  //   return apicall("/users/purpose/getPurposesByOption", "POST", data);
  // }  

  // getVisitorReport(data) {
  //   return apicall("/users/visitor_report/getVisitorReport", "POST", data);
  // }
  

}

export default new UsersDataService();