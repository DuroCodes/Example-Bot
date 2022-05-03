# **Example Discord Bot**

> This is an example of a Discord bot. You can use this as a starting point for your own bots. Feel free to edit the code to your liking.\
> This bot is written in TypeScript using the [Discord.js](https://discord.js.org/) library and is powered by [Sapphire](https://sapphirejs.dev/).

## **<u>Installation:</u>**

- Install the dependencies using the following command: `npm i`.
- Rename the `.env.example` file to `.env` and fill in the required information.
- Use the following command to run the bot: `npm run start`.
- Enjoy!

## **<u>Usage:</u>**

### **Commands**

- The commands that come pre-installed with the bot are:
  - `/ping`: Returns the latency of the bot.
  - `/eval <code>`: Evaluates the code provided.
- Add your own commands by adding new files to the `commands` directory.
  - You can add folders to the `commands` directory to group commands together.
  - When adding new commands, make sure to follow this structure:

```ts
import { type CommandOptions, Command } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';
import { CommandInteraction } from 'discord.js';

@ApplyOptions<CommandOptions>({
  name: '', // The name of the command.
  description: '', // The description of the command.
  fullCategory: [''], // The full category of the command. You can have multiple categories.
  chatInputCommand: { register: true }, // Whether the command should be registered automatically when the bot is started.
  enabled: true, // Whether the command is enabled.
})

export class UserCommand extends Command {
  public override async chatInputRun(interaction: CommandInteraction): Promise<void> {
    // Your code here
  }
}
```

### **Events**

**Notes:**

- Make sure your event is a valid event from the [Discord.js](https://discord.js.org/) library.
- Make sure you pass the correct arguments through the event.
  - For example, if you use an `interactionCreate` event, you need to pass through `interaction` as an argument.
    - You can add types to the arguments to make it more clear what you're passing through. (Such as `interaction: Interaction`)

**Info:**

- The only event that is pre-installed with the bot is the `ready` event.
  - This just logs that the bot is online, and you can use it to do things like set the bot's status.

- Add your own events by adding new files to the `listener` directory.
  - You can add folders to the `listener` directory to group events together.
  - When adding a new event, make sure to follow this structure:

```ts
import { Listener, type ListenerOptions } from '@sapphire/framework';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<ListenerOptions>({
  name: '', // The name of the event.
  once: true, // Whether the event should only be called once.
})

export class UserListener extends Listener {
  public run(/* arguments for your event */): void {
    // Your code here
  }
}

```
