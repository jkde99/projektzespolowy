import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, password) {
    return axios.post(API_URL + "signup", {
      username,
      password,
      roles: ["student"],
      subjects: []
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getSubjects() {
    return axios.get(API_URL + "getsubjects");
  }

  async addSubject(name, sub) {
    try{
      let result = await axios.patch(API_URL + "adds", {
        name,
        sub
      });
      console.log(result.response.data);
    } catch(error){
      console.log(error.response.data);
    }
  }

  removeSubject(name, sub){
    axios.put(API_URL + "removes", {
      name, sub
    })
  }
}

export default new AuthService();
