class LandingService {
  // remote
  // API_URL = "https://tune-server.herokuapp.com/api";

  //local
  API_URL = process.env.PORT || "http://localhost:5009/api";
  static myInstance = null;
  static getInstance() {
    if (LandingService.myInstance == null) {
      LandingService.myInstance = new LandingService();
    }
    return this.myInstance;
  }
}

export default LandingService;
