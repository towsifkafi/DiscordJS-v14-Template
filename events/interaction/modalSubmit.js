module.exports = {
    name: "interactionCreate",
    execute: async (client, interaction) => {
        if(interaction.isModalSubmit()) {
            const modal = client.modals.get(interaction.customId)
            if(!modal) return client.modals.delete(interaction.customId)

            await modal.execute(client, interaction)
        }
    }
}