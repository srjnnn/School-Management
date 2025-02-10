import { apiRoutes } from "../globalConstants.js";
import apiRequest from "../utils/api.js";
import LocalDB from "./LocalDB.js";

class AuthService {
  static TOKEN_KEY = "authToken"; // The key used to store the auth token in LocalDB

  // Save token in LocalDB
  static saveToken(token) {
    LocalDB.setItem(AuthService.TOKEN_KEY, token);
  }

  // Get the saved token from LocalDB
  static getToken() {
    return LocalDB.getItem(AuthService.TOKEN_KEY);
  }

  // Remove token from LocalDB (log out user)
  static removeToken() {
    LocalDB.removeItem(AuthService.TOKEN_KEY);
  }

  // Check if token is valid
  static async queryToken() {
    const token = this.getToken();
    if (!token) return false; // No token found

    const payload = { token };

    try {
      const response = await apiRequest(apiRoutes.auth.validateToken, "POST", payload);
      localStorage.setItem("authResponse",JSON.stringify(response) );
      sessionStorage.setItem("User", response.userData.role);
      return true;
    } catch (error) {
      localStorage.clear();
      return false;
    }
  }

  // Check if user is logged in
  static async isLoggedIn() {
    return await AuthService.queryToken();
  }
}

// window.AuthService = AuthService;
export default AuthService;
