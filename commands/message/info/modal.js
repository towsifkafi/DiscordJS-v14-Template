const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalBuilder, 
        TextInputBuilder, TextInputStyle 
} = require("discord.js")

module.exports = {
    name: "modal",
    description: "Displays a simple modal.",
    cooldown: 1000,
    execute: async (client, message, args) => {

        let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setDescription(`Press the button to open the modal.`)

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("modal")
                    .setLabel("Open Modal")
                    .setStyle(ButtonStyle.Primary)
            )
        
        const filter = i => i.user.id === message.author.id;
        let msg = await message.reply({ embeds: [embed], components: [row] })
        const collector = msg.createMessageComponentCollector({ filter, time: 15000 });

        let modal = new ModalBuilder()
            .setCustomId("modal_1")
            .setTitle("Simple Modal")
            .addComponents(
                new ActionRowBuilder()
                    .addComponents(
                        new TextInputBuilder()
                            .setCustomId("text")
                            .setLabel("Text")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                    )
            )

        collector.on('collect', async i => {
            if (i.customId === "modal") {
                let embed = new EmbedBuilder()
                    .setColor(client.settings.color)
                    .setDescription(`The modal has been opened.`)

                    await i.showModal(modal);
                    await i.editReply({ embeds: [embed], components: [] })
            }
        })
        

    }
}