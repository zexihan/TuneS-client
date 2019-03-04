class SearchService {
  SPOTIFY_WEB_API_URL = "https://api.spotify.com/v1/search";
  SPOTIFY_AUTHORIZE_URL = "https://accounts.spotify.com/authorize";
  SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
  CLIENT_ID = "a1e8617e0c7648d99634ae3a3d192590";
  static myInstance = null;
  static getInstance() {
    if (SearchService.myInstance == null) {
      SearchService.myInstance = new SearchService();
    }
    return this.myInstance;
  }

  authorize = () => {
    var request = require('request'); // "Request" library

    var client_id = 'a1e8617e0c7648d99634ae3a3d192590'; // Your client id
    var client_secret = '1215139e9bc046329a2e24582f5863b3'; // Your secret

// your application requests authorization
    var authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      form: {
        grant_type: 'client_credentials'
      },
      json: true
    };

    request.post(authOptions, function(error, response, body) {
      if (!error && response.statusCode === 200) {

        // use the access token to access the Spotify Web API
        var token = body.access_token;
        var options = {
          url: 'https://api.spotify.com/v1/users/jmperezperez',
          headers: {
            'Authorization': 'Bearer ' + token
          },
          json: true
        };
        request.get(options, function(error, response, body) {
          console.log(body);
        });
      }
    });
  }

  query = async (searchText) => {
     // let res = await fetch(this.MUSIC_API_URL + "/search?callback=fetch&amp;media=music&amp;term=" + searchText);
    // let res = await fetch(this.SPOTIFY_WEB_API_URL + "?media=music&amp;term=" + searchText);
    // let resList = await res.json();
    // console.log(resList);
    // return resList;
  }

}

export default SearchService;
