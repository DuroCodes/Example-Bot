import type { ApplicationCommandRegistry, CommandOptions } from '@sapphire/framework';
import { ApplicationCommandOptionTypes } from 'discord.js/typings/enums';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';
import { Command } from '@sapphire/framework';
import { env } from '../../lib';

@ApplyOptions<CommandOptions>({
  name: 'eval',
  description: 'Evaluate code.',
  fullCategory: ['Utility', 'Administration'],
  enabled: true,
  chatInputCommand: { register: true },
})

export class UserCommand extends Command {
  public override async chatInputRun(interaction: CommandInteraction) {
    if (interaction.user.id !== env.DISCORD_OWNER) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('❌ | You do not have permission for this command.')
            .setColor('#2E3037'),
        ],
      });
    }

    const code = interaction.options.get('code')?.value as string;
    try {
      // eslint-disable-next-line no-eval
      const result: string = eval(code);
      interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('💫 | Eval')
            .setColor('#2E3037')
            .setDescription(`\`\`\`ts\n${result}\n\`\`\``),
        ],
        ephemeral: true,
      });
    } catch (err) {
      return interaction.reply({
        embeds: [
          new MessageEmbed()
            .setTitle('❌ | An error occurred while evaluating your code.')
            .setColor('#2E3037')
            .setDescription(`\`\`\`ts\n${err}\`\`\``),
        ],
        ephemeral: true,
      });
    }
  }

  public override registerApplicationCommands(registry: ApplicationCommandRegistry) {
    registry.registerChatInputCommand({
      name: this.name,
      description: this.description,
      options: [
        {
          type: ApplicationCommandOptionTypes.STRING,
          name: 'code',
          description: 'Code to evaluate.',
          required: true,
        },
      ],
    });
  }
}
