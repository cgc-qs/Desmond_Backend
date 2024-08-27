
var nodemailer = require('nodemailer');
const imaps = require('imap-simple');
const simpleParser = require('mailparser').simpleParser;

// Email account credentials
const imapConfig = {
    imap: {
        user: 'paul.choeh@prosol-engineers.com',
        password: 'Ycd8dQb0b7RtnsNLbLfb',
        host: 'imap.strato.com',
        port: 993,
        tls: true
    }
};

var transporter = nodemailer.createTransport({
    //service: 'gmail',
    host: 'smtp.strato.com',
    port: 465,// use 587 for TLS
    secure: true,// true for 465, false for 587
    // secureConnection: false,
    // tls: {
    //     rejectUnauthorized: false,
    // },
    // requireTLS: true,
    auth: {
        user: 'paul.choeh@prosol-engineers.com',
        pass: 'Ycd8dQb0b7RtnsNLbLfb',
    },
    // connectionTimeout: 5 * 60 * 1000,//5min
    //logger: true,
    //debug: true
});

var mailOptions = {
    from: 'paul.choeh@prosol-engineers.com',
    to: '',
    subject: 'Wir fertigen Heizlastberechnungen für Sie schnell und günstig an',
    text: `Sehr geehrte Damen und Herren,
    die Installation von Wärmepumpen wird immer beliebter, doch gerade bei der Projektabwicklung treten häufig Schwierigkeiten auf, die zu Verzögerungen und unnötigen Kosten führen. Ein häufiges Problem ist die präzise und zeitnahe Berechnung der Heizlast für Bauwerke. Ohne eine genaue Heizlastberechnung kann es leicht zu Fehldimensionierungen kommen, was die Effizienz der Anlage mindert und den Energieverbrauch in die Höhe treibt.
    Hier kommen wir ins Spiel. Wir bieten Ihnen eine schnelle und kostengünstige Lösung für die Heizlastberechnung Ihrer Bauprojekte. Mit unserer langjährigen Erfahrung garantieren wir präzise Ergebnisse in kürzester Zeit. Unser Service richtet sich speziell an Wärmepumpeninstallateure, die sich auf die optimale Dimensionierung ihrer Anlagen verlassen müssen.
    Unsere Dienstleistung spart Ihnen Zeit und Geld, sodass Sie sich voll und ganz auf die Installation und Betreuung der Wärmepumpenanlagen konzentrieren können. Wir übernehmen für Sie die komplexen Berechnungen und liefern Ihnen die notwendigen Daten zuverlässig und zeitnah.
    Lassen Sie uns gemeinsam dafür sorgen, dass Ihre Projekte reibungslos und erfolgreich verlaufen. Wir stehen Ihnen jederzeit zur Verfügung und freuen uns darauf, Sie bei Ihren nächsten Projekten zu unterstützen.
    Mit freundlichen Grüßen,
    Dipl. -Ing. Paul Choeh
    PROSOL Engineers Limited
    
    No. 2 San Ping Circuit,
    Tuen Mun, Hong Kong
    Tel: +852 8193 3234
    mail: paul.choeh@prosol-engineers.com
    www.prosol-engineers.com`
    
};

exports.sendEmail = async (clientEmail) => {
    try {
        mailOptions.to=clientEmail;
        const info = await transporter.sendMail(mailOptions);
        console.log("== Email is sent ==", info.response);

        // Now save the email to the "Sent" folder using IMAP
        const connection = await imaps.connect(imapConfig);
        await connection.openBox('Sent');  // Open the "Sent" folder

        // Parse the email into a format suitable for IMAP
        const parsedEmail = await simpleParser(info.response);

        // Append the email to the "Sent" folder
        await connection.append(parsedEmail.text, { mailbox: 'Sent', flags: ['Seen'] });

        await connection.end();  // Close the IMAP connection

        return true;
    }
    catch (error) {
        console.error("????? Error sending email:", error);
        return false;
    }
}


