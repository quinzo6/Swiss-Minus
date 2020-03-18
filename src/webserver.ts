import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { MessageEmbed, TextChannel, Client } from "discord.js";
import { join } from "path";
import yt from "simple-youtube-api";
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
var cachedVideos = null;
const version = "v" + require("../package.json").version;
const dev = process.env.dev ? true : false;
const app = express();
const youtube = new yt(process.env.ytkey);
app.set("views", join(__dirname, "../webpage/views"));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "../webpage/public")));
app.get("/", (req, res) => {
  if (!cachedVideos) {
    youtube
      .searchVideos("Swiss001", 10)
      .then(results => {
        cachedVideos = results;
        res.render("home", { videos: JSON.stringify(results) });
      })
      .catch(error => {
        console.error(error);
        res.redirect("error");
      });
  } else {
    res.render("home", { videos: JSON.stringify(cachedVideos) });
  }
});
app.get("/pubsubhubbub", (req, res) => {
  const { channel_id } = req.query;
  youtube
    .searchVideos("Swiss001", 10)
    .then(results => {
      cachedVideos = results;
      client.channels.fetch(channel_id).then((channel: TextChannel) => {
        const embed = new MessageEmbed()
          .setAuthor(`Swiss001 | New Video!`)
          .setTitle(results[0].title)
          .setURL(`https://youtube.com/watch?v=${results[0].id}`)
          .setFooter(version)
          .setTimestamp();
        channel.send(embed);
      });
      res.render("home", { videos: JSON.stringify(results) });
    })
    .catch(error => {
      console.error(error);
      res.redirect("error");
    });
});
app.use("*", (req, res, next) => {
  res.render("404");
});

app.listen(process.env.PORT, () => {
  console.log(`Webserver running on port ${process.env.PORT}, http://localhost:${process.env.PORT}`);
});

export default app;
