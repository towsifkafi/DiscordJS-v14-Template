const { ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "Avatar",
    type: ApplicationCommandType.User,
    execute: async (client, interaction) => {

        await interaction.deferReply({ ephemeral: true }).catch(err => console.log(err))

        let target = client.users.cache.get(interaction.targetId)

        let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setTitle(`${target.username}'s Avatar`)
            .setImage(target.displayAvatarURL({ size: 4096, dynamic: true }))

        interaction.editReply({ embeds: [embed] })
    }
}