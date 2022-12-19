import axios from "axios";
import authHeader from "./auth-header";

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
      let result = await axios.put(API_URL + "adds", {
        name,
        sub
      });
      console.log(result.response.data);
    } catch (error){
      const response = error.response;
      console.log(response.data.errors);
    }
  }

  async removeSubject(name, sub){
    try{
      let result = await axios.put(API_URL + "removes", {
        name, sub
      })
      console.log(result.response.data);
    } catch (error){
      const response = error.response;
      console.log(response.data.errors);
    }
  }

  async getQuizzes(sub){
    try{
      let result = await axios.get("http://localhost:3000/api/quiz/getquizzes", 
      {
        params: {subject: sub}, 
        headers:authHeader()
      }
      )
      console.log(result.data)
    } catch (error) {
      console.log(error)
    }
  }
}

export default new AuthService();
