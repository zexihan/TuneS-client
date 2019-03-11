import port from '../port.js'
class LandingService {
  // remote
  // API_URL = "https://tune-server.herokuapp.com/api";

  //local
  API_URL = port;
  static myInstance = null;
  static getInstance() {
    if (LandingService.myInstance == null) {
      LandingService.myInstance = new LandingService();
    }
    return this.myInstance;
  }
}

export default LandingService;
