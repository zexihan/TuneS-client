import port from '../port.js';

class SubjectService {
  API_URL = port + "/api";

  static myInstance = null;

  static getInstance() {
    if (SubjectService.myInstance == null) {
      SubjectService.myInstance = new SubjectService();
    }
    return this.myInstance;
  }

  // app.get('/api/albumOrTrack/:id/comments'
  getComments = (type, id) => {
    return fetch(this.API_URL + "/comments/" + type + "/" + id, {
      credentials: "include"
    })
      .then(function(res) {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(function(response) {
        return response.json();
      })
      .catch(function(error) {
        // alert("error check connection/ try refresh");
        console.log(error);
        alert("error, try refresh");
      });
  };

  // app.post('/api/album/:id/comment'
  addComment = (type, id, comment) => {
    return fetch(this.API_URL + "/comment/" + type + "/" + id, {
      method: "POST",
      body: JSON.stringify({ comment: comment }),
      headers: new Headers({ "Content-type": "application/json" }),
      credentials: "include"
    })
      .then(function(res) {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(function(response) {
        return response.json();
      })
      .catch(function(error) {
        // alert("error check connection/ try refresh");
        console.log(error);
        alert("error, try refresh");
      });
  };

  isLiked = (type, id) => {
    return fetch(this.API_URL + "/isliked/" + type + "/" + id, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res)
        return res
      })
      .catch(err => console.log(err));
  };

  likeSubject = (type, id) => {
    return fetch(this.API_URL + "/like/" + type + "/" + id, {
      method: "POST",
      credentials: "include"
    })
      .catch(err => console.log(err));
  };

  likeComment = id => {
    return fetch(this.API_URL + "/like/comment/" + id, {
      method: "POST",
      credentials: "include"
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }
}

export default SubjectService;