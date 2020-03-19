import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { MessageEmbed, TextChannel, Client } from "discord.js";
import { join } from "path";
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
var cachedVideos = null;
const version = "v" + require("../package.json").version;
const dev = process.env.dev ? true : false;

// YouTube search without API
import cheerio from "cheerio";
import axios from "axios";
import { URLSearchParams } from "url";
class Video {
  url: string;
  title: string;
  amountOfViews: string;
  thumbnail: string;
  timestamp: string;

  constructor(title, url, thumbnail, amountOfViews, timestamp) {
    this.title = title;
    this.url = url;
    this.thumbnail = thumbnail;
    this.amountOfViews = amountOfViews;
    this.timestamp = timestamp;
  }
}
const sleep = (seconds: number = 1) =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));
async function searchYoutubeVideos(searchTerm, amount) {
  const videos = [];
  const thumbnailSelector =
    "$('div#contents>ytd-video-renderer:nth-child(index)>div:nth-child(1)>ytd-thumbnail>a>yt-img-shadow>img').attr('src')";
  const titleSelector =
    "$('div#contents>ytd-video-renderer:nth-child(index)>div:nth-child(1)>div>div:nth-child(1)>div>h3>a>yt-formatted-string').html()";
  const urlSelector =
    "$('div#contents>ytd-video-renderer:nth-child(index)>div:nth-child(1)>div>div:nth-child(1)>div>h3>a').attr('href')";
  const amountOfViewsSelector =
    "$('div#contents>ytd-video-renderer:nth-child(index)>div:nth-child(1)>div>div:nth-child(1)>ytd-video-meta-block>div:nth-child(1)>div:nth-child(2)>span:nth-child(1)').text()";
  const timestampSelector =
    "$('div#contents>ytd-video-renderer:nth-child(index)>div:nth-child(1)>div>div:nth-child(1)>ytd-video-meta-block>div:nth-child(1)>div:nth-child(2)>span:nth-child(2)').html()";

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(
    `https://www.youtube.com/results?search_query=${new URLSearchParams(
      searchTerm
    ).toString()}&sp=EgIQAQ%253D%253D`
  );
  let html = await page.content();
  const $ = cheerio.load(html);
  for (let index = 1; index < amount; index++) {
    const video = new Video(
      eval(titleSelector.replace("index", index.toString())),
      eval(urlSelector.replace("index", index.toString())),
      eval(thumbnailSelector.replace("index", index.toString())),
      eval(amountOfViewsSelector.replace("index", index.toString())),
      eval(timestampSelector.replace("index", index.toString()))
    );
    console.log(video);
    videos.push(video);
  }
  return videos;
}

// Express stuff
const app = express();
app.set("views", join(__dirname, "../webpage/views"));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "../webpage/public")));
app.get("/", (req, res) => {
  if (!cachedVideos) {
    searchYoutubeVideos("Swiss001", 30)
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
  searchYoutubeVideos("Swiss001", 30)
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
  console.log(
    `Webserver running on port ${process.env.PORT}, http://localhost:${process.env.PORT}`
  );
});

export default app;
