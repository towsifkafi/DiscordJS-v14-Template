import { EmbedBuilder, ApplicationCommandType, ChatInputCommandInteraction } from 'discord.js';
import type { BotClient, SlashCommand } from '../../../types';

const command: SlashCommand = {
    name: "ping",
    description: "Displays the current ping of the bot's websocket connection to the API.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 1000,
    execute: async (client: BotClient, interaction: ChatInputCommandInteraction) => {

        await interaction.deferReply().catch(err => console.log(err));

        const embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`🏓 Ping: ${Math.round(client.ws.ping)} ms`);

        interaction.editReply({ embeds: [embed] });
    }
};

export default command;
