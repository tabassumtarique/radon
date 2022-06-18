const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController");
const MW = require("../middleware/auth");

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", MW.mid1, userController.getUserData)

router.put("/users/:userId", MW.mid1, MW.mid2, userController.updateUser)

router.delete("/users/:userId",MW.mid1,MW.mid2,  userController.deleteData)

module.exports = router;