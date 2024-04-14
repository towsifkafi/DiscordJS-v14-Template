const { InteractionType } = require('discord.js');

module.exports = {
    name: "interactionCreate",
    execute: async (client, interaction) => {
        if(interaction.type !== InteractionType.ApplicationCommandAutocomplete) return;

        const command = client.slashCommands.get(interaction.commandName)
        if(!command) return

        if(command.autocomplete) {
            await command.autocomplete(interaction)
        }

    }
}