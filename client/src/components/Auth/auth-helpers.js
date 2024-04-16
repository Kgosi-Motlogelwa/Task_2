const authenticate = (jwt, cb) => {
  if (typeof window !== "undefined") {
    sessionStorage.setItem("jwt", JSON.stringify(jwt));
  }

  cb();
};

const isAuthenticated = () => {
  if (typeof window == "undefined") return false;

  if (sessionStorage.getItem("jwt"))
    return JSON.parse(sessionStorage.getItem("jwt"));
  else return false;
};

const clearJWT = (cb) => {
  if (typeof window !== "undefined") sessionStorage.removeItem("jwt");
  cb();
};

const updateUser = (user, cb) => {
  if (typeof window !== "undefined") {
    if (sessionStorage.getItem("jwt")) {
      let auth = JSON.parse(sessionStorage.getItem("jwt"));
      auth.user = user;
      sessionStorage.setItem("jwt", JSON.stringify(auth));
      cb();
    }
  }
};

export { authenticate, isAuthenticated, clearJWT, updateUser };
