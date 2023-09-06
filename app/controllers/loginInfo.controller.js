const db = require("../models");
const LoginInfo = db.loginInfo;

exports.signUp = (req, res) => {

    // Validate request
    if (!req.body.loginName && !req.body.loginEmail) {
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
                    err.message || "Some error occurred while signUP."
            });
        });
}
exports.login = (req, res) => {
    const name = req.query.loginName;
    const email = req.query.loginEmail;
    const password = req.query.loginPassWord;

    var condition1 = {
        loginName: name,
        loginPassWord: password
    };

    var condition2 = {
        loginEmail: email,
        loginPassWord: password
    };

    var condition = name ? condition1 : condition2;


    LoginInfo.find(condition)
        .then(data => {
            if (data.length > 0) {
                var Token = require('crypto').randomBytes(64).toString('hex');
                res.status(200).send({
                    message:
                        "Login Success",
                    token: Token
                });
            }
            else
                res.status(404).send({
                    message:
                        "Login Failed"
                });

        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while Login."
            });
        });

}