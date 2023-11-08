const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js")

module.exports = {
    name: "invite",
    description: "Sends an invite link for the bot, for users to add it to their server",
    cooldown: 1000,
    execute: async (client, message, args) => {

        let invite = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`
        let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setTitle(`${client.user.username}`)
            .setThumbnail(client.user.displayAvatarURL())
            .setDescription(`[\`Invite Link\`](${invite})\n**Current Active Servers: ${client.guilds.cache.size}**`)

        const row = new ActionRowBuilder()
		.addComponents([
			new ButtonBuilder()
			.setLabel('Invite')
			.setURL(invite)
			.setStyle(5)
			.setStyle(ButtonStyle.Link)
            .setEmoji(`🎫`)
		])

        message.reply({ content: `${invite}`, embeds: [embed], components: [row] })
    }
}