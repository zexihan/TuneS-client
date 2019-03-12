class SearchService {
  // remote
  API_URL = "https://tunes-api.herokuapp.com/api";

  //local
  // API_URL = "http://localhost:5000/api";
  static myInstance = null;
  static getInstance() {
    if (SearchService.myInstance == null) {
      SearchService.myInstance = new SearchService();
    }
    return this.myInstance;
  }

  query = async (searchText, searchType) => {
    let res = await fetch(this.API_URL + "/search/" + searchText + "/type/" + searchType);
    let resList = await res.json();
    console.log(resList);
    return resList;
  }

  getSubject = (type, id, callback) => {
    fetch(this.API_URL + "/" + type + "/" + id, {credentials: 'include'})
      .then(function(res){
        if (!res.ok) {
          throw Error(res.statusText)
        }
        return res
    }).then(function(response){
      return response.json()
    }).then(callback).catch(function(error){
      // alert("error check connection/ try refresh");
      console.log(error)})
  }
}

export default SearchService;
