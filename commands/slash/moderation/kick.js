const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');

module.exports = {
    name: "kick",
    description: "Kicks a member from the current discord server",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: ['Administrator'],
    user_perms: ['Administrator'],
    bot_perms: ['Administrator'],
    options: [
        {
            name: "user",
            description: "The member you want to kick out",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Reason",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    cooldown: 1000,
    execute: async(client, interaction) => {

        await interaction.deferReply().catch(err => console.log(err))

        let user = interaction.options.getUser('user')
        let reason = interaction.options.getString('reason')
        let member = interaction.guild.members.cache.get(user.id)

        try {

            await member.kick(reason ? reason : `No reason provided by ${interaction.user.id}`)

            let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`**✔ Successfully kicked \`${member.user.username}#${member.user.discriminator}\`**\nReason: \`${reason ? reason : 'None'}\``)

            interaction.editReply({ embeds: [embed] })

        } catch(err) {

            let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`**❌ Failed to kick \`${member.user.username}#${member.user.discriminator}\`. Make sure to check bot/user permissions.**`)

            interaction.editReply({ embeds: [embed] })

        }

    }
}