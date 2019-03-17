class AuthService {
  static myInstance = null;
  constructor() {
    this.url = "http://localhost:5000/";
  }

  static getInstance() {
    if (AuthService.myInstance == null) {
      AuthService.myInstance = new AuthService();
    }
    return this.myInstance;
  }

  createUser = user => {
    return fetch(this.url + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  getProfile = () => {
    return fetch(this.url + "user/current", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  logIn = user => {
    return fetch(this.url + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  logOut = () => {
    return fetch(this.url + "logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(() => console.log("User successfully logged out!"))
      .catch(error => console.log(error));
  };

  findAllUsers = () => {
    return fetch(this.url + "users", {
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  findUserById = id => {
    const url = this.url + "user/" + id;
    return fetch(url, {
      credentials: "include"
    })
      .then(response => response.json())
      .catch(error => console.log(error));
  };

  updateUser = user => {
    const url = this.url + "user/" + user.id;
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
