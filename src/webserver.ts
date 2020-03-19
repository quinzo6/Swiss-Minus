import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { MessageEmbed, TextChannel, Client } from "discord.js";
import { join } from "path";
const client = new Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] });
const version = "v" + require("../package.json").version;
const dev = process.env.dev ? true : false;

// YouTube search without API
import cheerio from "cheerio";
import axios from "axios";
import puppeteer from "puppeteer";
import { URLSearchParams } from "url";
class Video {
  id: string;
  url: string;
  title: string;
  numViews: string;
  thumbnail: string;
  releaseDate: string;

  constructor(_) {
    this.id = _.videoId;
    this.url = `https://youtube.com/watch?v=${_.videoId}`;
    this.title = _.title.runs[0].text;
    this.numViews = _.viewCountText.simpleText;
    this.thumbnail = _.thumbnail.thumbnails[0].url;
    this.releaseDate = _.publishedTimeText.simpleText;
  }
}
const sleep = (seconds: number = 1) =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));
async function searchYoutubeVideos(searchTerm, amount) {
  const browser = await puppeteer.launch({
    headless: !dev,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(
    `https://www.youtube.com/results?${new URLSearchParams({
      search_query: searchTerm
    }).toString()}&sp=EgIQAQ%253D%253D`,
    { timeout: 60000 }
  );
  await sleep(0.5);
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await sleep(0.5);
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await sleep(0.5);
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await sleep(0.5);
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await sleep(0.5);
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await sleep(0.5);
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await sleep(0.5);
  const results = await page.evaluate(() => {
    //@ts-ignore
    return window.ytInitialData.contents.twoColumnSearchResultsRenderer
      .primaryContents.sectionListRenderer.contents[0].itemSectionRenderer
      .contents;
  });
  const videos: Video[] = results
    .map(v => v.videoRenderer)
    .filter(video => video.ownerText.runs[0].text === "Swiss001")
    .map(v => new Video(v));
  await browser.close();
  return videos.slice(amount);
}
const cachedVideos = [];

// Express stuff
const app = express();
app.set("views", join(__dirname, "../webpage/views"));
app.set("view engine", "ejs");
app.use(express.static(join(__dirname, "../webpage/public")));
app.get("/", (req, res) => {
  res.render("home", { videos: cachedVideos });
});
app.get("/pubsubhubbub", (req, res) => {
  const { channel_id } = req.query;
  searchYoutubeVideos("Swiss001", 30)
    .then(() => {
      client.channels.fetch(channel_id).then((channel: TextChannel) => {
        const embed = new MessageEmbed()
          .setAuthor(`Swiss001 | New Video!`)
          .setTitle(cachedVideos[0].title)
          .setURL(`https://youtube.com/watch?v=${cachedVideos[0].id}`)
          .setFooter(version)
          .setTimestamp();
        channel.send(embed);
      });
      res.render("home", {
        videos: JSON.stringify(cachedVideos)
      });
    })
    .catch(error => {
      console.error(error);
      res.redirect("error");
      res.render("");
    });
});
app.get("/about", (req, res) => {
  res.render("about", {});
});
app.use("*", (req, res, next) => {
  res.render("404");
});

searchYoutubeVideos("Swiss001", 30)
  .then(results => {
    results.forEach(r => cachedVideos.push(r));
    app.listen(process.env.PORT, () => {
      console.log(
        `Webserver running on port ${process.env.PORT}, http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch(console.error);

export default app;
