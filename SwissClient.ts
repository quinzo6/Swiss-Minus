import { Client, Collection, ClientOptions } from "discord.js";
import { Client as PgClient } from "pg";
import { join } from "path";
import { readdirSync } from "fs";

interface SwissOptions {
  db: PgClient;
  dev: boolean;
}
class SwissClient extends Client {
  public db: PgClient;
  public dev: boolean;
  public commands: Collection<string, any>;

  public constructor(options: SwissOptions, discordOptions: ClientOptions) {
    super(discordOptions);
    this.db = options.db;
    this.dev = options.dev;
    this.commands = new Collection();
  }

  public readCommands(p: string) {
    const path = join(__dirname, p);
    const categories = readdirSync(path);
    const miscCommands = categories.filter(file =>
      file.endsWith(this.dev ? ".ts" : ".js")
    );
    miscCommands.forEach(m =>
      this.addCommandFromPath(join(__dirname, p, m), "Misc")
    );
    categories
      .filter(c => !c.includes("."))
      .forEach(category => {
        const commands = readdirSync(join(__dirname, category));
        commands.forEach(command => {
          this.addCommandFromPath(join(__dirname, category, command), category);
        });
      });
  }

  private addCommandFromPath(path: string, category: string) {
    const command = require(path);
    if (this.dev) {
      console.log(`Loading in command ${command.name} of category ${category}`);
    }
    command.category = category;
    this.commands.set(command.name, command);
  }
}

export default SwissClient;
