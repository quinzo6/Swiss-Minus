/* eslint-disable consistent-return */
/* eslint-disable global-require */
import { join } from "path";
import { config as dotenv_config } from "dotenv";
dotenv_config({ path: join(__dirname, "../.env") });
import { Client as PgClient } from "pg";
// import { version } from "../package.json"; importing it like this includes the package.json in the build which includes the src folder
const { version } = require("../package.json");
import planes from "./planes";
import SwissClient from "./SwissClient";
// import { log_yellow, error_red } from "./config";
// import ffmpeg from "ffmpeg-static";
// import opus from "node-opus";
// import ytdl from "ytdl-core";

const dev = process.env.dev ? true : false;
const aplanes = Object.values(planes);
const db = new PgClient({
  connectionString: dev ? process.env.dev_db_url : process.env.DATABASE_URL,
  ssl: true
});
db.connect().then(_ => {
  console.log("Connected to database.");
});

const client = new SwissClient(
  { db, dev, version, commandPath: "./commands", eventPath: "./events" },
  { partials: ["MESSAGE", "CHANNEL", "REACTION"] }
);
let count: number;
let lengthe = aplanes.length;
const forloop = async (_: string) => {
  for (
    count = 1;
    lengthe * 2 >
    (((
      await db.query(
        "SELECT count(*) FROM information_schema.columns WHERE table_name = 'cards'"
      )
    ).rows[0].count - 8) as number);
    count++
  ) {
    let levels = planes[count].name + "levels";
    let counts = planes[count].name + "count";
    let textl = `ALTER TABLE cards ADD COLUMN IF NOT EXISTS ${levels} int`;
    let textc = `ALTER TABLE cards ADD COLUMN IF NOT EXISTS ${counts} int`;
    await db.query(textl);
    await db.query(textc);
  }
};
forloop("_");
client.on("messageReactionAdd", async reaction => {
  if (reaction.message.partial) await reaction.message.fetch();
  if (reaction.message.id === "687721364098252811") {
    await db.query("UPDATE settings SET value = 'on' WHERE name = 'bot'");
  }
});
client.login(process.env.token).then(async _token => {
  console.log(`Ready as ${client.user.tag}`);
  client.user
    .setActivity(`the ${version} update`, { type: "WATCHING" })
    .then()
    .catch(console.error);
});

export async function getSetting(name: string) {
  const res = await db.query("SELECT value FROM settings WHERE name = $1", [
    name
  ]);
  return res.rows[0].value;
}

export default client;
