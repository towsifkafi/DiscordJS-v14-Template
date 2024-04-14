const { EmbedBuilder } = require("discord.js");

module.exports = {
    custom_id: "modal_1",
    execute: async (client, interaction) => {

        await interaction.deferReply({ }).catch(err => console.log(err))

        let embed = new EmbedBuilder()
            .setColor(client.settings.color)
            .setTitle(`Modal Published`)
            .addFields([
                { name: "Text", value: `\`\`\`${interaction.fields.getTextInputValue("text")}\`\`\`` }
            ])

        interaction.editReply({ embeds: [embed] })
    }
}