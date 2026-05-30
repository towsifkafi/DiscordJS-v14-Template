import { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ChatInputCommandInteraction, AutocompleteInteraction } from 'discord.js';
import { creepify, roundsquares, bubbles, bent } from '../../../utils/fancyfont.js';
import type { BotClient, SlashCommand } from '../../../types';

const command: SlashCommand = {
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
    execute: async (client: BotClient, interaction: ChatInputCommandInteraction) => {

        await interaction.deferReply().catch(err => console.log(err));

        const text = interaction.options.getString('text');

        const embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`\`\`\`${text}\`\`\``);

        interaction.editReply({ embeds: [embed] });
    },


    autocomplete: async (interaction: AutocompleteInteraction) => {
        const focused = interaction.options.getFocused(true);

        if (focused.name === 'text') {

            let text = focused.value;
            if (!text) text = "Your text";
            const choices = [
                creepify(text), roundsquares(text), bubbles(text), bent(text)
            ];

            interaction.respond(choices.map(t => ({ name: t, value: t })));
        }
    }
};

export default command;
