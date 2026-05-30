import { EmbedBuilder, Message } from "discord.js";
import type { BotClient, MessageCommand } from '../../../types';

const command: MessageCommand = {
    name: "help",
    description: "Displays all the commands that are available to the user",
    cooldown: 1000,
    execute: async (client: BotClient, message: Message, args: string[]) => {

        const embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setTitle(`❔ Help!`)
            .setDescription(`Hey there! It looks like you might need some help. Here are the commands that you can use:\nThe default prefix for these commands is \`${client.settings.prefix}\`.`);

        const commands = [...client.commands.values()];
        const categories: Record<string, MessageCommand[]> = {};

        commands.forEach(command => {
            const categoryName = command.category || 'uncategorized';
            if (!categories[categoryName]) {
                categories[categoryName] = [];
            }
            categories[categoryName].push(command);
        });

        const categoryArray = Object.entries(categories).map(([categoryName, commands]) => ({
            category: categoryName,
            commands: commands,
        }));

        embed.addFields(categoryArray.map(c => {
            return { name: `${c.category}`, value: `${c.commands.map(cmd => `\`${cmd.name}\` - ${cmd.description}`).join('\n')}` };
        }));

        message.reply({ embeds: [embed] });
    }
};

export default command;
