import { JwtPayload } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

class AuthService {
  getToken() {
    return localStorage.getItem("token") || "";
  }

  login(token: string) {
    localStorage.setItem("token", token);
    window.location.assign("/");
  }

  logout() {
    localStorage.removeItem("token");
    window.location.assign("/");
  }

  getProfile() {
    return jwtDecode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token: string) {
    try {
      const decoded: any = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      return false;
    }
  }
}

const Auth = new AuthService();

export default Auth;
