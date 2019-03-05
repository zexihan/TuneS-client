class SearchService {
  API_URL = "http://localhost:8050/api";
  static myInstance = null;
  static getInstance() {
    if (SearchService.myInstance == null) {
      SearchService.myInstance = new SearchService();
    }
    return this.myInstance;
  }

  query = async (searchText) => {
    let res = await fetch(this.API_URL + "/search/" + searchText);
    let resList = await res.json();
    console.log(resList);
    return resList;
  }
}

export default SearchService;
