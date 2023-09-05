const db = require("../models");
const LoginInfo = db.loginInfo;

exports.signUp = (req, res) => {

    // Validate request
    if (!req.body.loginName) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create a AccountInfo
    const account = new LoginInfo({
        loginName: req.body.loginName,
        loginEmail: req.body.loginEmail,
        loginPassWord: req.body.loginPassWord,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false
    });

    // Save AccountInfo in the database
    account
        .save(account)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the AccountInfo."
            });
        });


}