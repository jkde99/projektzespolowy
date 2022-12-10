import React, { Component } from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../services/auth.service";

export default class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { username: "" },
      subjects: []
    };
  }

  addSubject(name, sub){
    AuthService.addSubject(name, sub);
    let array = this.state.currentUser.subjects.slice();
    array.push(sub);
    const newObj = {...this.state.currentUser, subjects: array}
    this.setState({currentUser: newObj});
  }

  deleteSubject(name, sub){
    AuthService.removeSubject(name, sub);
    let array = this.state.currentUser.subjects.slice();
    array = array.filter(e=>e !== sub);
    const newObj = {...this.state.currentUser, subjects: array}
    this.setState({currentUser: newObj});
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) this.setState({ redirect: "/home" });
    AuthService.getSubjects()
      .then(result => this.setState({subjects: result.data}));
    this.setState({ currentUser: currentUser, userReady: true })
  }

  render() {
    if (this.state.redirect) {
      return <Navigate to={this.state.redirect} />
    }
    
    const { currentUser } = this.state;
    const { subjects } = this.state;


    return (
      <div className="container">
        {(this.state.userReady) ?
        <div>
        <header className="jumbotron">
          <h3>
            <strong>{currentUser.username}</strong> Profile
          </h3>
        </header>
        <p>
          <strong>Token:</strong>{" "}
          {currentUser.accessToken.substring(0, 20)} ...{" "}
          {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
        </p>
        <p>
          <strong>Id:</strong>{" "}
          {currentUser.id}
        </p>
        <strong>Authorities:</strong>
        <ul>
          {currentUser.roles &&
            currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
        </ul>
        <strong>Subjects: </strong>
        <ul>
          {subjects !== null && subjects.map((s) => 
            <>
            <li key={s.name}>{s}</li> <button type="button" onClick={() => this.addSubject(currentUser.username, s)}>Dodaj</button>
            <button type="button" onClick={() => this.deleteSubject(currentUser.username, s)}>Usun</button>
            </>
          )
        }
        </ul>
        <strong>User's subjects: </strong>
        <ul>
          {currentUser.subjects !== null &&
          currentUser.subjects.map((sub) => <li key={sub.name}>{sub}</li>)}
        </ul>
      </div>: null}
      </div>
    );
  }
}
