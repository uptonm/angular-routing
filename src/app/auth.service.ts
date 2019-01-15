export class AuthService {
  loggedIn: Boolean = true;

  isAuthenticated = () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.loggedIn);
      }, 800);
    });
    return promise;
  };

  logOut = () => {
    this.loggedIn = false;
  };

  logIn = () => {
    this.loggedIn = true;
  };
}
