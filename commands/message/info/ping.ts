import { EmbedBuilder, Message } from "discord.js";
import type { BotClient, MessageCommand } from '../../../types';

const command: MessageCommand = {
    name: "ping",
    description: "Displays the current ping of the bot's websocket connection to the API.",
    cooldown: 1000,
    execute: async (client: BotClient, message: Message, args: string[]) => {

        const embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`🏓 Ping: ${Math.round(client.ws.ping)} ms`);

        message.reply({ embeds: [embed] });
    }
};

export default command;
