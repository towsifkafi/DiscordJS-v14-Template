import { EmbedBuilder, ModalSubmitInteraction } from "discord.js";
import type { BotClient, Modal } from '../../types';

const modal: Modal = {
    custom_id: "modal_1",
    execute: async (client: BotClient, interaction: ModalSubmitInteraction) => {

        await interaction.deferReply({}).catch(err => console.log(err));

        const embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setTitle(`Modal Published`)
            .addFields([
                { name: "Text", value: `\`\`\`${interaction.fields.getTextInputValue("text")}\`\`\`` }
            ]);

        interaction.editReply({ embeds: [embed] });
    }
};

export default modal;
