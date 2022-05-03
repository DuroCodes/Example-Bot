import { type CommandOptions, Command } from '@sapphire/framework';
import { CommandInteraction, MessageEmbed } from 'discord.js';
import { ApplyOptions } from '@sapphire/decorators';

@ApplyOptions<CommandOptions>({
  name: 'ping',
  description: 'Get the bot\'s latency.',
  fullCategory: ['Information', 'Utility'],
  chatInputCommand: { register: true },
  enabled: true,
})

export class UserCommand extends Command {
  public override async chatInputRun(interaction: CommandInteraction): Promise<void> {
    const firstEmbed = new MessageEmbed()
      .setTitle('Ping 🏓')
      .setColor('#2E3037')
      .setDescription(`${this.container.client.ws.ping}ms!`);

    interaction.reply({ embeds: [firstEmbed], ephemeral: true });
  }
}
