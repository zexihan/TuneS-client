import port from '../port.js';

class AuthService {
  API_URL = port +'/';

  static myInstance = null;
  static getInstance() {
    if (AuthService.myInstance == null) {
      AuthService.myInstance = new AuthService();
    }
    return this.myInstance;
  }

  createUser = user => {
    return fetch(this.API_URL + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        alert("createUser error, try refresh")
      });
  };

  getProfile = () => {
    return fetch(this.API_URL + "user/current", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        alert("getProfile error, try refresh")
      });
  };

  getPublicProfile = (sid) => {
    return fetch(this.API_URL + "user/profile/" + sid, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        alert("getPublicProfile error, try refresh");
      });
  };

  logIn = user => {
    return fetch(this.API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        alert("logIn error, try refresh");
      });
  };

  logOut = () => {
    return fetch(this.API_URL + "logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(() => console.log("User successfully logged out!"))
      .catch(error => {
        console.log(error);
        alert("logOut error, try refresh");
      });
  };

  findAllUsers = () => {
    return fetch(this.API_URL + "users", {
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        alert("findAllUsers error, try refresh");
      });
  };

  findUserById = id => {
    const url = this.API_URL + "user/" + id;
    return fetch(url, {
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        alert("findUserById error, try refresh");
      });
  };

  updateUser = user => {
    const url = this.API_URL + "user/" + user.uid;
    return fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => {
        console.log(error);
        alert("updateUser error, try refresh");
      });
  };
}

export default AuthService;
