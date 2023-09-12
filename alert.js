const db = require("./app/models");
const AccountInfo = db.accountInfo;
var nodemailer = require('nodemailer');

const reset_Amount = 1000;
var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.gmail.com",
    //port: 465,
    //secure: false,
    // secureConnection: false,
    // tls: {
    //     rejectUnauthorized: false,
    // },
    // requireTLS: true,
    auth: {
        user: 'brodybbdd@gmail.com',//'brodybbdd@gmail.com',//'youremail@gmail.com',
        pass: 'unxcfgnnpqrrdckw',//'Brody123.'//'yourpassword'
    },
    // connectionTimeout: 5 * 60 * 1000,//5min
    //logger: true,
    //debug: true
});

var mailOptions = {
    from: 'brodybbdd@gmail.com',//'brodybbdd@gmail.com',//'youremail@gmail.com',
    to: 'paulChoe31@gmail.com',//'myfriend@yahoo.com, myotherfriend@yahoo.com',
    subject: 'The Email test',
    text: 'The current equity is reached at threshold'
};

exports.sendEmail = async () => {
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("== Email is sent", info.messageId);
        return true;
    }
    catch (error) {
        console.error("Error sending email:", error);
        return false;
    }
}



exports.alertProcess = async () => {
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
                original[i].alertChecked = false;
                dataUpdated = true;
            }

            if (original[i].currentEquity < original[i].threshold && !original[i].alertChecked) {
                // alert process here
                mailOptions.text = "BrokerName: " + original[i].brokerName + "\n" +
                    "accountNumber: " + original[i].accountNumber+ "\n" +
                    "threshold: "+original[i].threshold+ "\n" +
                    "current Equity: "+original[i].currentEquity;
                console.log("Trying sending of email ... ...");

                var sent = await this.sendEmail();
                if (sent) {
                    console.log('------Email is sent: ',mailOptions.text);
                    dataUpdated = true;
                    original[i].alertChecked = true;
                }

                // transporter.sendMail(mailOptions, function (error, info) {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         console.log('------Email sent: ' + info.response);
                //         dataUpdated = true;
                //         original[i].alertChecked = true;
                //     }
                // });
            }
            if (dataUpdated) {
                AccountInfo.findByIdAndUpdate(id, original[i], { useFindAndModify: false })
                    .then(data => {
                        console.log("----", original[i].brokerName, " <alertchecked> is updated");
                    })
            }
        }
    }
}