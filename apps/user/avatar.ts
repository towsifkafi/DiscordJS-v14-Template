import { ApplicationCommandType, EmbedBuilder, UserContextMenuCommandInteraction } from "discord.js";
import type { BotClient, App } from '../../types';

const app: App = {
    name: "Avatar",
    type: ApplicationCommandType.User,
    execute: async (client: BotClient, interaction: UserContextMenuCommandInteraction) => {

        await interaction.deferReply({ ephemeral: true }).catch(err => console.log(err));

        const target = client.users.cache.get(interaction.targetId)!;

        const embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setTitle(`${target.username}'s Avatar`)
            .setImage(target.displayAvatarURL({ size: 4096 }));

        interaction.editReply({ embeds: [embed] });
    }
};

export default app;
