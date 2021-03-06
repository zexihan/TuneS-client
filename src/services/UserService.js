import port from '../port.js';

class UserService {
  API_URL = port + "/";

  static myInstance = null;
  static getInstance() {
    if (UserService.myInstance == null) {
      UserService.myInstance = new UserService();
    }
    return this.myInstance;
  }

  followUser=(fid)=>{
    return fetch(this.API_URL + "user/"+String(fid) +'/follow', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
  }

  unfollowUser=(fid)=>{
    return fetch(this.API_URL + "user/"+String(fid) +'/unfollow', {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
  }

  findFollowersById=(fid)=>{
    return fetch(this.API_URL + "user/"+String(fid) +'/followers', {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
  }

  findFolloweesById=(fid)=>{
    return fetch(this.API_URL + "user/"+String(fid) +'/followees', {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
  }

  checkFollowing=(fid)=>{
    return fetch(this.API_URL + "user/"+String(fid) +'/checkfollow', {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
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
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("getUserCount error");
      });
  };

  register = user => {
    return fetch(this.API_URL + "register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("register error");
      });
  };

  login = user => {
    console.log(user);
    return fetch(this.API_URL + "login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => {
        console.log(err);
        alert("The username or password is incorrect.");
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
        alert("getCurrentUser error");
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
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => res.json());
    // .catch(err => {
    //   // console.log(err);
    //   alert("updateUser error");
    // });
  };
}

export default UserService;
