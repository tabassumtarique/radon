const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const mid1 = function(req, res, next){
  let token = req.headers["x-Auth-token"];
  if (!token) token = req.headers["x-auth-token"];
  if (!token) return res.send({ status: false, msg: "token must be present" });    //If no token is present in the request header return error
  console.log(token);
  
  let decodedToken = jwt.verify(token, "functionup-radon");   // If a token is present then decode the token with verify function
  if (!decodedToken)                                         // Input 1 is the token to be decoded and Input 2 was same as generated earlier
    return res.send({ status: false, msg: "token is invalid" });

  next()
};

const mid2 = function(req, res, next){
  let userId = req.params.userId;
  let userDetails =  userModel.findById(userId);         
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });   //Return an error if no user with the given id exists in the db

  next()
}


module.exports.mid1 = mid1
module.exports.mid2 = mid2