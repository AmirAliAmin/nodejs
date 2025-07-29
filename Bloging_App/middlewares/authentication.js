const { validateToken } = require("../services/authentication");

function checkForAuthCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayload = validateToken(tokenCookieValue);
      req.user = userPayload;
    //   next();
    } catch (error) {
      console.error("Invalid token:", error.message); // Helps debugging
      req.user = null;
    }
    return next();
  };
}

module.exports ={
    checkForAuthCookie
}
