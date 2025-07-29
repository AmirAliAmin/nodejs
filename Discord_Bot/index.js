const express = require("express");
const { Client, GatewayIntentBits } = require("discord.js");
const { generateShortUrl } = require("./url");
const { ConnectToMongoos } = require("./connection");
const URL = require("./model/url"); // ✅ Import your model
require("dotenv").config();

const app = express();
const PORT = 8001;

// Discord client setup
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Discord message handler
client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith("create")) {
    const url = message.content.split("create")[1];
    if (!url) {
      return message.reply("Please provide a valid URL after 'create'");
    }

    try {
      const shortId = await generateShortUrl(url);
      return message.reply(`<http://localhost:8001/${shortId}>`);
    } catch (err) {
      console.error(err);
      return message.reply(" Failed to generate short URL. Try again later.");
    }
  }

  return message.reply("Hi from bot! Use `create <url>` to shorten a URL.");
});

client.on("interactionCreate", (interaction) => {
  console.log(interaction);
  interaction.reply("Pong!!");
});

client.login(process.env.DISCORD_BOT_TOKEN);



app.get("/:shortId", async (req, res) => {
  const { shortId } = req.params;
  
  console.log("Requested shortId:", shortId);  // Debug logging

  try {
    const entry = await URL.findOne({ shortId });
    if (!entry) {
      return res.status(404).send("URL not found");
    }

    entry.visitHistory.push({ timestamp: new Date() });
    await entry.save();

    return res.redirect(entry.redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Internal Server Error");
  }
});


// ✅ MongoDB connection
ConnectToMongoos("mongodb://127.0.0.1:27017/Discord-bot").then(() =>
  console.log("connect mongodb")
);

// ✅ Start Express server
app.listen(PORT, () => console.log(`Server start successful at PORT: ${PORT}`));
