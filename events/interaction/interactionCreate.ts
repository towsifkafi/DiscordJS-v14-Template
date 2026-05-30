import { EmbedBuilder, Collection, PermissionsBitField, Interaction, InteractionType, Events } from 'discord.js';
import ms from 'ms';
import type { BotClient, BotEvent, SlashCommand, App } from '../../types';

const cooldowns = new Collection<string, number>();

const event: BotEvent = {
    name: Events.InteractionCreate,
    execute: async (client: BotClient, interaction: Interaction) => {

        if (interaction.type === InteractionType.ApplicationCommandAutocomplete) {
            const command = client.slashCommands.get(interaction.commandName) as SlashCommand | undefined;
            if (!command) return;

            if (command.autocomplete) {
                try {
                    await command.autocomplete(interaction, client);
                } catch (err) {
                    console.error(`Autocomplete error for /${interaction.commandName}:`, err);
                }
            }
            return;
        }

        if (interaction.isModalSubmit()) {
            const modal = client.modals.get(interaction.customId);
            if (!modal) {
                client.modals.delete(interaction.customId);
                return;
            }

            try {
                await modal.execute(client, interaction);
            } catch (err) {
                console.error(`Modal submit error for customId ${interaction.customId}:`, err);
            }
            return;
        }


        if (interaction.type === InteractionType.ApplicationCommand) {
            const command = client.slashCommands.get(interaction.commandName) as SlashCommand | App | undefined;
            if (!command) {
                client.slashCommands.delete(interaction.commandName);
                return;
            }

            try {
                const commandWithCooldown = command as any;
                if (commandWithCooldown.cooldown && cooldowns.has(`${interaction.user.id}|${command.name}`)) {
                    await interaction.reply({
                        content: `You are on a **${ms(cooldowns.get(`${interaction.user.id}|${command.name}`)! - Date.now(), { long: true })}** cooldown.`,
                        ephemeral: true
                    });
                    return;
                }

                // check permissions (only relevant for guild interactions)
                const slashCmd = command as SlashCommand;
                if (slashCmd.user_perms || slashCmd.bot_perms) {
                    if (!interaction.guild) {
                        await interaction.reply({ content: `This command can only be used in servers.`, ephemeral: true });
                        return;
                    }
                    if (slashCmd.user_perms && (!interaction.memberPermissions || !interaction.memberPermissions.has(PermissionsBitField.resolve(slashCmd.user_perms)))) {
                        await interaction.reply({ content: `You don't have the required permissions to run this command.`, ephemeral: true });
                        return;
                    }
                    const botMember = interaction.guild.members.me || await interaction.guild.members.fetch(client.user!.id).catch(() => null);
                    if (slashCmd.bot_perms && (!botMember || !botMember.permissions.has(PermissionsBitField.resolve(slashCmd.bot_perms)))) {
                        await interaction.reply({ content: `The bot doesn't have the required permissions to run this command.`, ephemeral: true });
                        return;
                    }
                }

                await command.execute(client, interaction as any);

                // apply cooldown if command ran successfully
                if (commandWithCooldown.cooldown) {
                    cooldowns.set(`${interaction.user.id}|${command.name}`, Date.now() + commandWithCooldown.cooldown);
                    setTimeout(() => {
                        cooldowns.delete(`${interaction.user.id}|${command.name}`);
                    }, commandWithCooldown.cooldown);
                }

            } catch (err: any) {
                console.error(err);
                const payload = { content: `The bot ran into an error executing that command.`, ephemeral: true };
                if (interaction.replied || interaction.deferred) {
                    await interaction.followUp(payload).catch(console.error);
                } else {
                    await interaction.reply(payload).catch(console.error);
                }
                console.log(`Failed to execute command /${command.name} --> ${err.message}`);
            }
        }
    }
};

export default event;
