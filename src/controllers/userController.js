const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");


//-------------------------------------- PROBLEM 1 ------------------------------------------------------------------------------------

const createUser = async function (abcd, xyz) {         //You can name the req, res objects anything
  let data = abcd.body;                                 //but the first parameter is always the request
  let savedData = await userModel.create(data);         //the second parameter is always the response
  console.log(abcd.newAtribute);
  xyz.send({ msg: savedData });
};                      


//-------------------------------------- PROBLEM 2 ------------------------------------------------------------------------------------

const loginUser = async function (req, res) {
  let userName = req.body.emailId;
  let password = req.body.password;

  let user = await userModel.findOne({ emailId: userName, password: password });
  if (!user)
    return res.send({
      status: false,
      msg: "username or the password is not corerct",
    });

  let token = jwt.sign(                  // Once the login is successful, create the jwt token with sign function
    {
      userId: user._id.toString(),      // Input 1 is the payload or the object containing data to be set in token
      batch: "radon",
      organisation: "FunctionUp",
    },
    "functionup-radon"                  // Input 2 is the secret
  );
  res.setHeader("x-auth-token", token);
  res.send({ status: true, token: token });
};


//-------------------------------------- PROBLEM 3 ------------------------------------------------------------------------------------

const getUserData = async function (req, res) { 
  let userId = req.params.userId;
  let userDetails = await userModel.findById(userId);
  if (!userDetails)
    return res.send({ status: false, msg: "No such user exists" });
  res.send({ status: true, data: userDetails });
};


//-------------------------------------- PROBLEM 4 ------------------------------------------------------------------------------------

const updateUser = async function (req, res) { 
  let userId = req.params.userId;
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData);  
  res.send({ status: updatedUser, data: updatedUser });
};


//-------------------------------------- PROBLEM 5 ------------------------------------------------------------------------------------
  
const deleteData = async function(req, res){
  let userId = req.params.userId;
  let userData = req.body;
  let updatedUser = await userModel.findOneAndUpdate(
    { _id: userId },{$set : {isDeleted: true}}, userData);
  res.send({ status: updatedUser, data: updatedUser });
};

module.exports.createUser = createUser;
module.exports.getUserData = getUserData;
module.exports.updateUser = updateUser;
module.exports.loginUser = loginUser;
module.exports.deleteData = deleteData