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
var cachedVideos: Video[] = null;
const sleep = (seconds: number = 1) =>
  new Promise(resolve => setTimeout(resolve, seconds * 1000));
async function searchYoutubeVideos(searchTerm, amount) {
  var videos = [];
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

  const browser = await puppeteer.launch({ headless: !dev, devtools: dev });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(
    `https://www.youtube.com/results?${new URLSearchParams({
      search_query: searchTerm
    }).toString()}&sp=EgIQAQ%253D%253D`,
    { timeout: 60000 }
  );

  // await page.waitForSelector("ytd-video-renderer,ytd-grid-video-renderer", {
  //   timeout: 10000
  // });
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  await page.evaluate(() => {
    //@ts-ignore
    window.scrollTo(
      0,
      //@ts-ignore
      document.body.scrollHeight || document.documentElement.scrollHeight
    );
  });
  const results = await page.evaluate(() => {
    //@ts-ignore
    return window.ytInitialData;
  });
  videos = results.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer.contents[0].itemSectionRenderer.contents
    .map(v => v.videoRenderer)
    .filter(video => video.ownerText.runs[0].text === "Swiss001")
    .map(v => new Video(v));
  await browser.close();
  console.log(videos);
  return videos.slice(amount);
}

searchYoutubeVideos("Swiss001", 30).then((results: Video[]) => {
  cachedVideos = results;
});

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
