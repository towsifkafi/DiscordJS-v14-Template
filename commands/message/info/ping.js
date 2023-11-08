const { EmbedBuilder } = require("discord.js")

module.exports = {
    name: "ping",
    description: "Displays the current ping of the bot's websocket connection to the API.",
    cooldown: 1000,
    execute: async (client, message, args) => {

        let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`🏓 Ping: ${Math.round(client.ws.ping)} ms`)

        message.reply({ embeds: [embed] })
    }
}