const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
    name: "ping",
    description: "Displays the current ping of the bot's websocket connection to the API.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 1000,
    execute: async(client, interaction) => {

        await interaction.deferReply().catch(err => console.log(err))

        let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`🏓 Ping: ${Math.round(client.ws.ping)} ms`)

        interaction.editReply({ embeds: [embed] })
    }
}