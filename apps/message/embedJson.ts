import { ApplicationCommandType, EmbedBuilder, MessageContextMenuCommandInteraction, TextChannel } from "discord.js";
import type { BotClient, App } from '../../types';

const app: App = {
    name: "View Embed JSON",
    type: ApplicationCommandType.Message,
    execute: async (client: BotClient, interaction: MessageContextMenuCommandInteraction) => {

        await interaction.deferReply({}).catch(err => console.log(err));

        const channel = client.channels.cache.get(interaction.channelId) as TextChannel;
        const message = await channel.messages.fetch(interaction.targetId);

        const embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`\`\`\`json\n${JSON.stringify(message.embeds, null, 4)}\`\`\``);

        interaction.editReply({ embeds: [embed] });
    }
};

export default app;
