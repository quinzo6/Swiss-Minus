import { Client, Collection, ClientOptions } from "discord.js";
import { Client as PgClient } from "pg";

interface SwissOptions {
  db: PgClient;
}
class SwissClient extends Client {
  public db: PgClient;
  public commands: Collection<string, any>;

  public constructor(options: SwissOptions, discordOptions: ClientOptions) {
    super(discordOptions);
    this.db = options.db;
    this.commands = new Collection();
  }
}

export default SwissClient;
