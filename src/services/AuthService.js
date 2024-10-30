import LocalDB from "./LocalDB.js";

class AuthService {
  static TOKEN_KEY = "authToken"; // The key used to store the auth token in LocalDB

  // Method to save token in LocalDB
  static saveToken(token) {
    LocalDB.setItem(AuthService.TOKEN_KEY, token);
  }

  // Method to get the saved token from LocalDB
  static getToken() {
    return LocalDB.getItem(AuthService.TOKEN_KEY);
  }

  // Method to remove token from LocalDB (log out user)
  static removeToken() {
    LocalDB.removeItem(AuthService.TOKEN_KEY);
  }

  // Method to check if the user is logged in
  static isLoggedIn() {
    return !!AuthService.getToken();
  }
}

export default AuthService;
