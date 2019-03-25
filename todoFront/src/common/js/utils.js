module.exports = {
  getLoginStatus: () => {
    const obj = {};
    switch (location.pathname) {
      case "/":
        obj.route = "/";
        obj.status = "登录";
        break;
      case "/login":
        obj.route = "/login";
        obj.status = "登录";
        break;
      case "/register":
        obj.route = "/register";
        obj.status = "注册";
        break;
    }
    return obj;
  }
};
