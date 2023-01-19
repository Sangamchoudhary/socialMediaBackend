module.exports.landingPage = function landingPage(req, res) {
  return res.json({
    "Welcome note" : "Welcome to social media backend ! Try out different API mentioned in github repo",
    "start with login" : "make a post request on this API https://socialmediabackendassignment.onrender.com/api/authenticate/login",
    "email" : "admin1@admin.com",
    "password" : "admin1"
  });
};
