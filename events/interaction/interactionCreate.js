const { EmbedBuilder, Collection, PermissionsBitField, InteractionType } = require('discord.js');
const ms = require('ms')

const cooldowns = new Collection();
module.exports = {
    name: "interactionCreate",
    execute: async(client, interaction) => {
        if(interaction.type !== InteractionType.ApplicationCommand) return;

        const command = client.slashCommands.get(interaction.commandName)
        if(!command) return client.slashCommands.delete(interaction.commandName)

        // Function to send a message inside embed to save time and code
        // Only if the interaction is already replied.
        interaction.embed = (text) => {
            let embed = new EmbedBuilder()
                .setColor(client.settings.color)
                .setDescription(text);

            interaction.editReply({ embeds: [embed] })
        }

        try {

            if(command.cooldown && cooldowns.has(`${interaction.user.id}|${command.commandName}`)) 
                return interaction.reply({ content: `You are on a **${ms(cooldowns.get(`${interaction.user.id}|${command.commandName}`) - Date.now(), {long : true})}** cooldown.` })

            if(command.user_perms || command.bot_perms) {
                if(!interaction.memberPermissions.has(PermissionsBitField.resolve(command.user_perms || []))) 
                    return interaction.reply({ content: `You don't have the required permissions to run this command.` })
                if(!interaction.guild.members.cache.get(client.user.id).permissions.has(PermissionsBitField.resolve(command.bot_perms || []))) 
                    return interaction.reply({ content: `The bot doesn't have the required permissions to run this command.` })
            }

            try {
                await command.execute(client, interaction)
            } catch(err) {
                console.log(err)
                interaction.reply({ content: `The bot ran into an error executing that command.` })
                console.log(`Failed to execute command /${command.name} --> ${err.message}`)
            }

            if(command.cooldown) {
                cooldowns.set(`${interaction.user.id}|${command.commandName}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    cooldowns.delete(`${interaction.user.id}|${command.commandName}`)
                }, command.cooldown);
            }

        } catch(err) {
            console.log(err)
        }
    }
}