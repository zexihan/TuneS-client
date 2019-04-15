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
  updateSubjectIntroById =(subjectId, intro)=>{
    return fetch(
      this.API_URL +'/subject/'+subjectId, //album with add intro field
      {
        method: "PUT",
        body: JSON.stringify(intro),
        headers: new Headers({ "Content-type": "application/json" }),
        credentials: "include"
      }
    )
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
  }

  getSubjectById =(subjectId)=>{
    return fetch(
      this.API_URL +'/subject/'+subjectId, //album with add intro field
      {
        method: "GET",
        headers: new Headers({ "Content-type": "application/json" }),
        credentials: "include"
      }
    )
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
      })
      .then(res => {
        return res.json();
      })
  }

  findTopSubjects = () => {
    return fetch(
      this.API_URL + "/subject/top",
      {
        credentials: "include"
      }
    )
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
        alert("findTopSubjects error");
      });
  }

  findCommentsBySubjectId = (type, id) => {
    return fetch(this.API_URL + "/subject/" + type + "/" + id + "/comments", {
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
        alert("findCommentsBySubjectId error");
      });
  };

  findCommentsByUserId = id => {
    console.log(this.API_URL + "/user/" + id + "/comments");
    return fetch(this.API_URL + "/user/" + id + "/comments", {
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
        alert("findCommentsByUserId error");
      });
  };

  addComment = (subject, commentContent) => {
    return fetch(
      this.API_URL +
        "/subject/" +
        subject.type +
        "/" +
        subject._id +
        "/comment",
      {
        method: "POST",
        body: JSON.stringify({ subject, commentContent }),
        headers: new Headers({ "Content-type": "application/json" }),
        credentials: "include"
      }
    )
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
        alert("addComment error");
      });
  };

  deleteComment = id => {
    return fetch(this.API_URL + "/current/comment/" + id, {
      method: "DELETE",
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
        alert("deleteComment may noy be successful");
      });
  };

  findSubjectIsLiked = (type, id) => {
    return fetch(this.API_URL + "/current/" + type + "/" + id + "/isliked", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(err);
        alert("findSubjectIsLiked error");
      });
  };

  likeSubject = subject => {
    return fetch(
      this.API_URL + "/subject/" + subject.type + "/" + subject._id + "/like",
      {
        method: "POST",
        body: JSON.stringify(subject),
        headers: new Headers({ "Content-type": "application/json" }),
        credentials: "include"
      }
    ).catch(err => {
      console.log(err);
      alert("likeSubject error");
    });
  };

  likeComment = id => {
    console.log("like comment: " + id);
    return fetch(this.API_URL + "/like/comment/" + id, {
      method: "POST",
      credentials: "include"
    }).catch(err => {
      console.log(err);
      alert("likeComment error/ you may need to log in to comment, will refresh");
      window.location.reload();
    });
  };

  findCommentLikesByCurrentUser = () => {
    return fetch(this.API_URL + "/current/likes/comment", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        let res_list = [];
        for (var i = 0; i < res.length; i++) {
          res_list.push(res[i].comment);
        }
        console.log(res_list);
        return res_list;
      })
      .catch(err => {
        console.log(err);
        alert("findCommentLikesByCurrentUser error/ you may need to log in to comment, will refresh");
        window.location.reload();
      });
  };

  findSubjectLikesByUserId = id => {
    return fetch(this.API_URL + "/user/" + id + "/likes/subject", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
        alert("findSubjectLikesByUserId error");
        // window.location.reload();
      });
  };

  findCommentLikesByUserId = id => {
    return fetch(this.API_URL + "/user/" + id + "/likes/comment", {
      method: "GET",
      credentials: "include"
    })
      .then(res => res.json())
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log(err);
        alert("findCommentLikesByUserId error");
        // window.location.reload();
      });
  };
}

export default SubjectService;