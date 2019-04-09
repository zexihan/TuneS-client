import port from '../port.js';

class UserService {
  API_URL = port +'/';

  static myInstance = null;
  static getInstance() {
    if (UserService.myInstance == null) {
      UserService.myInstance = new UserService();
    }
    return this.myInstance;
  }

  getUserCount = () => {
    return fetch(this.API_URL + "usercount", {
      credentials: "include"
    })
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
      .catch(err => {
        console.log(err);
        alert("getUserCount error");
      });
  }

  createUser = user => {
    return fetch(this.API_URL + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("createUser error")
      });
  };

  getCurrentUser = () => {
    return fetch(this.API_URL + "user/current", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("getCurrentUser error")
      });
  };

  findUserById = userId => {
    return fetch(this.API_URL + "user/" + userId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
      .catch(error => {
        console.log(error);
        alert("findUserById error");
      });
  };

  login = user => {
    return fetch(this.API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("logIn error");
      });
  };

  logout = () => {
    return fetch(this.API_URL + "logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(() => console.log("User successfully logged out!"))
      .catch(err => {
        console.log(err);
        alert("logOut error");
      });
  };

  findAllUsers = () => {
    return fetch(this.API_URL + "users", {
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("findAllUsers error");
      });
  };

  findUserById = id => {
    const url = this.API_URL + "user/" + id;
    return fetch(url, {
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("findUserById error");
      });
  };

  updateUser = user => {
    const url = this.API_URL + "user/current";
    return fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("updateUser error");
      });
  };
}

export default UserService;
