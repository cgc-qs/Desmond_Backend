const db = require("./app/models");
const AccountInfo = db.accountInfo
exports.alertProcess = async (reset_Amount) => {
    var original = [];
    await AccountInfo.find({})
        .then(data => {
            original = data;
        })
    if (original.length > 0) {
        for (let i = 0; i < original.length; i++) {

            var dataUpdated = false;
            var id = original[i].id;
            if (original[i].currentEquity > original[i].threshold + reset_Amount && original[i].alertChecked) {
                original[i].alertChecked = false; dataUpdated = true;
            }

            if (original[i].currentEquity < original[i].threshold && !original[i].alertChecked) {
                // alert process here

                dataUpdated = true;
                console.log("====== Alert is happen", original[i].brokerName);
                original[i].alertChecked = true;

            }
            if (dataUpdated) {
                AccountInfo.findByIdAndUpdate(id, original[i], { useFindAndModify: false })
                    .then(data => {
                        console.log("====== ", original[i].brokerName, " alert checked is updated");
                    })
            }
        }
    }
}