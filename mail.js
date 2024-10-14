const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3001;

// Middleware pour parser le corps de la requête POST
app.use(bodyParser.json());

// Route pour gérer les demandes d'envoi d'email
app.post('/send-email', (req, res) => {
    const { to, subject, text } = req.body;

    // Créer un transporteur SMTP réutilisable pour l'envoi de courriels
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'bahaengazou@gmail.com', // votre adresse email
            pass: 'wpic pryc unez jukd' // votre mot de passe
        }
    });

    // Définir les options de message
    let mailOptions = {
        from: 'bahaengazou@gmail.com', // adresse email expéditeur
        to: to,
        subject: subject,
        text: text
    };

    // Envoyer l'email
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).send('Email sent successfully');
        }
    });
});

// Démarrer le serveur
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
