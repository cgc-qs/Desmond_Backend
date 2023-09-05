const db = require("../models");
const AccountInfo = db.accountInfo;

// Create and Save a new AccountInfo
exports.create = (req, res) => {
  // Validate request
  if (!req.body.brokerName) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a AccountInfo
  const account = new AccountInfo({
    brokerName: req.body.brokerName,
    accountNumber: req.body.accountNumber,
    currentEquity: req.body.currentEquity,
    threshold: req.body.threshold,
    topUpAmount: req.body.topUpAmount,
    activeStatus: req.body.activeStatus ? req.body.activeStatus : false,
    totalSwap: req.body.totalSwap,
    longSwap: req.body.longSwap,
    shortSwap: req.body.shortSwap
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
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const bName = req.query.brokerName;
  const accNum = req.query.accountNumber;

  var condition = {};

  if (bName && accNum) {
    condition = {
      brokerName: { $regex: new RegExp(bName), $options: "i" },
      accountNumber: accNum
    };
  }
  else if (bName && !accNum)
    condition = { brokerName: { $regex: new RegExp(bName), $options: "i" } };
  else if (!bName && accNum)
    condition = {
      accountNumber: accNum
    };

  AccountInfo.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

// Find a single AccountInfo with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  AccountInfo.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found AccountInfo with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving AccountInfo with id=" + id });
    });
};

// Update a AccountInfo by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  AccountInfo.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update AccountInfo with id=${id}. Maybe AccountInfo was not found!`
        });
      } else res.send({ message: "AccountInfo was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating AccountInfo with id=" + id
      });
    });
};

// Delete a AccountInfo with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  AccountInfo.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete AccountInfo with id=${id}. Maybe AccountInfo was not found!`
        });
      } else {
        res.send({
          message: "AccountInfo was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete AccountInfo with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  AccountInfo.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllActivated = (req, res) => {
  AccountInfo.find({ activeStatus: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
