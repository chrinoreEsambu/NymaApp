const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const os = require("os");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
// const session = require("express-session");

const getWifiIP = () => {
  const interfaces = os.networkInterfaces();
  return (
    (interfaces["Wi-Fi"] &&
      interfaces["Wi-Fi"].find((i) => i.family === "IPv4")?.address) ||
    ip.address()
  );
};

const port = 3000;
const url = "mongodb://localhost:27017/nymadb";
// const url ="mongodb+srv://sixteentech6:gQw8ZuVGY6Opr1Rk@cluster0.fgdzale.mongodb.net/nymadb";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

(async () => {
  try {
    await mongoose.connect(url, options);
    console.log("Connecté à MongoDB avec succès");

    const iplocal = getWifiIP();
    app.listen(port, "0.0.0.0", () => {
      console.log(`Votre serveur est disponible sur http://${iplocal}:${port}`);
    });
  } catch (error) {
    console.log("Erreur de connexion à la base de données", error);
  }
})();

const mailschema = new mongoose.Schema(
  {
    mail: {
      type: String,
      required: true,
    },
  },
  { collection: "mail" }
);

const mailmodel = mongoose.model("mail", mailschema);

app.post("/addmail", async (req, res) => {
  const { mail } = req.body;
  try {
    const user = new mailmodel({ mail });
    await user.save();
    res.status(201).send("Email ajouté");
  } catch (error) {
    res.status(500).send("Erreur lors de l'ajout de l'email");
  }
});

app.get("/getmails", async (req, res) => {
  try {
    const mails = await mailmodel.find();
    res.status(200).json(mails);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des emails");
  }
});

app.delete("/deletemail/:id", async (req, res) => {
  try {
    const mailId = req.params.id;
    await mailmodel.findByIdAndDelete(mailId);
    res.status(200).send("Email supprimé");
  } catch (error) {
    res.status(500).send("Erreur lors de la suppression de l'email");
  }
});

// =========== SECTION CRÉATION D'UTILISATEUR =========== //
app.get("/usermessage", (req, res) => {
  res.sendFile(path.join(__dirname, "usermessage", "message.html"));
});

const newuserschema = new mongoose.Schema(
  {
    pseudo: {
      type: String,
      required: true,
    },
    usermail: {
      type: String,
      required: true,
    },
    userpassword: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      unique: true,
    },
  },
  { collection: "newuser" }
);

// Middleware pour générer un lien unique avant de sauvegarder
newuserschema.pre("save", async function (next) {
  try {
    // Hachage du mot de passe
    if (this.isModified("userpassword")) {
      this.userpassword = await bcrypt.hash(this.userpassword, 10);
    }

    // Génération du lien unique si non déjà défini
    if (!this.link) {
      const generatedLink = crypto.randomBytes(2).toString("hex"); // Générer une chaîne de 4 bits
      this.link = `https://nyma.app/message/${this.pseudo}/${generatedLink}`;
    }
    next();
  } catch (err) {
    next(err);
  }
});

const newusermodel = mongoose.model("newuser", newuserschema);

app.post("/adduser", async (req, res) => {
  const { pseudo, usermail, userpassword } = req.body;
  try {
    const newuser = new newusermodel({ pseudo, usermail, userpassword });
    await newuser.save();
    res
      .status(201)
      .json({ message: "Utilisateur ajouté avec succès", link: newuser.link });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur lors de l'ajout de l'utilisateur");
  }
});

app.post("/signin", async (req, res) => {
  const { pseudo, userpassword } = req.body;

  try {
    const user = await newusermodel.findOne({ pseudo });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(userpassword, user.userpassword);
    if (!isMatch) {
      return res
        .status(401)
        .json({ message: "Login ou sMot de passe incorrect" });
    }

    res.status(200).json({
      message: "Connexion réussie",
      link: user.link,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
});

// =========== SECTION MESSAGES =========== //

const messageschema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    // le destinateur
    recipient: {
      type: String,
      required: true,
    },
    link: {
      type: String,
      required: true,
    },
  },
  { collection: "messages" }
);
app.get("/usermessage", (req, res) => {
  res.sendFile(path.join(__dirname, "usermessage", "message.html"));
});

const messagemodel = mongoose.model("messages", messageschema);

app.post("/message/:pseudo/:uniqueLink", async (req, res) => {
  const { pseudo, uniqueLink } = req.params;
  const { message } = req.body;

  try {
    const user = await newusermodel.findOne({
      link: `https://nyma.app/message/${pseudo}/${uniqueLink}`,
    });

    if (!user) {
      return res.status(404).send("Utilisateur non trouvé");
    }

    const newMessage = new messagemodel({
      content: message,
      sender: pseudo,
      recipient: user.pseudo,
      link: user.link,
    });

    await newMessage.save();

    res.status(200).send("Message envoyé et enregistré avec succès");
  } catch (error) {
    console.error("Erreur lors de l'envoi du message:", error);
    res.status(500).send("Erreur lors de l'envoi du message");
  }
});

app.get("/messages/:pseudo/:uniqueLink", async (req, res) => {
  const { pseudo, uniqueLink } = req.params;

  try {
    const messages = await messagemodel.find({
      link: `https://nyma.app/message/${pseudo}/${uniqueLink}`,
    });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).send("Erreur lors de la récupération des messages");
  }
});

module.exports = {
  mailmodel,
  newusermodel,
};
