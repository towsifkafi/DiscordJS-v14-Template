const { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType } = require('discord.js');
const { creepify, roundsquares, bubbles, bent } = require('../../../utils/fancyfont');

module.exports = {
    name: "autocomplete",
    description: "Autocomplete command for testing.",
    type: ApplicationCommandType.ChatInput,
    cooldown: 1000,
    options: [
        {
            name: 'text',
            description: 'Autocomplete a text',
            type: ApplicationCommandOptionType.String,
            required: true,
            autocomplete: true
        }
    ],
    execute: async(client, interaction) => {

        await interaction.deferReply().catch(err => console.log(err))

        let text = interaction.options.getString('text');

        let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`\`\`\`${text}\`\`\``)

        interaction.editReply({ embeds: [embed] })
    },

    
    autocomplete: async (interaction, client) => {
        let focused = interaction.options.getFocused(true);

        if (focused.name === 'text') {
            
            let text = focused.value;
            if(!text) text = "Your text"
            let choices = [
                creepify(text), roundsquares(text), bubbles(text), bent(text)
            ]

            interaction.respond(choices.map(t => ({ name: t, value: t })));
        }
    }
}