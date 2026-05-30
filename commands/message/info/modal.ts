import {
    EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder,
    TextInputBuilder, TextInputStyle, Message
} from "discord.js";
import type { BotClient, MessageCommand } from '../../../types';

const command: MessageCommand = {
    name: "modal",
    description: "Displays a simple modal.",
    cooldown: 1000,
    execute: async (client: BotClient, message: Message, args: string[]) => {

        const embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`Press the button to open the modal.`);

        const row = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("modal")
                    .setLabel("Open Modal")
                    .setStyle(ButtonStyle.Primary)
            );

        const filter = (i: any) => i.user.id === message.author.id;
        const msg = await message.reply({ embeds: [embed], components: [row] });
        const collector = msg.createMessageComponentCollector({ filter, time: 15000 });

        const modal = new ModalBuilder()
            .setCustomId("modal_1")
            .setTitle("Simple Modal")
            .addComponents(
                new ActionRowBuilder<TextInputBuilder>()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId("text")
                            .setLabel("Text")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    )
            );

        collector.on('collect', async i => {
            if (i.customId === "modal") {
                const embed = new EmbedBuilder()
                    .setColor(client.settings.color)
                    .setDescription(`The modal has been opened.`);

                await (i as any).showModal(modal);
                await i.editReply({ embeds: [embed], components: [] });
            }
        });


    }
};

export default command;
