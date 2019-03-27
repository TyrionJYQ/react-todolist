module.exports = {
  getLoginStatus: () => {
    const obj = {};
    switch (location.pathname) {
      case "/":
        obj.route = "/";
        obj.text = "去注册";
        break;
      case "/login":
        obj.route = "/login";
        obj.text = "去注册";
        break;
      case "/register":
        obj.route = "/register";
        obj.text = "去登录";
        break;
    }
    return obj;
  }
};
