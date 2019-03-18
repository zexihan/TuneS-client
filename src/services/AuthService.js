class AuthService {
  // remote
  // API_URL = "https://tune-server.herokuapp.com/";
  //local
  API_URL = "http://localhost:5000/";
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
      .catch(error => console.log(error));
  };

  getProfile = () => {
    return fetch(this.API_URL + "user/current", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  logIn = user => {
    return fetch(this.API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  logOut = () => {
    return fetch(this.API_URL + "logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(() => console.log("User successfully logged out!"))
      .catch(error => console.log(error));
  };

  findAllUsers = () => {
    return fetch(this.API_URL + "users", {
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  findUserById = id => {
    const url = this.API_URL + "user/" + id;
    return fetch(url, {
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  updateUser = user => {
    const url = this.API_URL + "user/" + user.id;
    return fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };
}

export default AuthService;
