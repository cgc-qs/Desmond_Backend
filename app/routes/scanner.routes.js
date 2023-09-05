module.exports = app => {
  const AccountInfo = require("../controllers/accountInfo.controller.js");
  const loginInfo = require("../controllers/loginInfo.controller.js");

  var router = require("express").Router();
  // SignUp
  router.post("/signUp", loginInfo.signUp);

  // Create a new Tutorial
  router.post("/", AccountInfo.create);

  // Retrieve all Tutorials
  router.get("/", AccountInfo.findAll);

  // Retrieve all published Tutorials
  router.get("/activated", AccountInfo.findAllActivated);

  // Retrieve a single Tutorial with id
  router.get("/:id", AccountInfo.findOne);

  // Update a Tutorial with id
  router.put("/:id", AccountInfo.update);

  // Delete a Tutorial with id
  router.delete("/:id", AccountInfo.delete);

  // Delete  a new Tutorial
  router.delete("/", AccountInfo.deleteAll);

  app.use("/api/scanner", router);
};
