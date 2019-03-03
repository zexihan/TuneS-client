class SearchService {
  MUSIC_API_URL = "https://itunes.apple.com";
  static myInstance = null;
  static getInstance() {
    if (SearchService.myInstance == null) {
      SearchService.myInstance = new SearchService();
    }
    return this.myInstance;
  }

  query = async (searchText) => {
    let res = await fetch(this.MUSIC_API_URL + "/search?media=music&amp;term=" + searchText,{mode: 'no-cors'});
    let resList = await res.json();
    console.log(resList);
    return resList;
  }

}

export default SearchService;
