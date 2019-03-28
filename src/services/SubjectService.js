import port from '../port.js';

class SubjectService {
  // remote
  API_URL = port + '/';

  //local
  // API_URL = "http://localhost:5000/";
  static myInstance = null;

  static getInstance() {
    if (AuthService.myInstance == null) {
      AuthService.myInstance = new AuthService();
    }
    return this.myInstance;
  }

  isLiked = (type, itemId) => {
    return fetch(this.API_URL + type + "/islike/" + itemId, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(res => res.json()).catch(err => console.log(err));
  }

  likeSubject = (type, itemId) => {
    return fetch(this.API_URL + type + "/like/" + itemId, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    }).then(res => res.json()).catch(err => console.log(err));
  }

}

export default SubjectService;