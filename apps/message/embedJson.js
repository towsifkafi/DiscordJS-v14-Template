const { ApplicationCommandType, EmbedBuilder } = require("discord.js");

module.exports = {
    name: "View Embed JSON",
    type: ApplicationCommandType.Message,
    execute: async (client, interaction) => {

        await interaction.deferReply({ }).catch(err => console.log(err))

        const channel = client.channels.cache.get(interaction.channelId)
        const message = await channel.messages.fetch(interaction.targetId)

        let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`\`\`\`json\n${JSON.stringify(message.embeds, null, 4)}\`\`\``)

        interaction.editReply({ embeds: [embed] })
    }
}