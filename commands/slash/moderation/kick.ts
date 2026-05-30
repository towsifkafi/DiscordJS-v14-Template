import { EmbedBuilder, ApplicationCommandType, ApplicationCommandOptionType, ChatInputCommandInteraction, GuildMember } from 'discord.js';
import type { BotClient, SlashCommand } from '../../../types';

const command: SlashCommand = {
    name: "kick",
    description: "Kicks a member from the current discord server",
    type: ApplicationCommandType.ChatInput,
    default_member_permissions: ['Administrator'],
    user_perms: ['Administrator'],
    bot_perms: ['Administrator'],
    options: [
        {
            name: "user",
            description: "The member you want to kick out",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "reason",
            description: "Reason",
            type: ApplicationCommandOptionType.String,
            required: false
        }
    ],
    cooldown: 1000,
    execute: async (client: BotClient, interaction: ChatInputCommandInteraction) => {

        await interaction.deferReply().catch(err => console.log(err));

        const user = interaction.options.getUser('user')!;
        const reason = interaction.options.getString('reason');
        const member = interaction.options.getMember('user') as GuildMember || await interaction.guild!.members.fetch(user.id).catch(() => null);

        if (!member) {
            interaction.editReply({ content: "Could not find that member in this server." });
            return;
        }

        try {

            await member.kick(reason ? reason : `No reason provided by ${interaction.user.id}`);

            const embed = new EmbedBuilder()
                .setColor(client.settings.color)
                .setDescription(`**✔ Successfully kicked \`${member.user.tag}\`**\nReason: \`${reason ? reason : 'None'}\``);

            interaction.editReply({ embeds: [embed] });

        } catch (err) {

            const embed = new EmbedBuilder()
                .setColor(client.settings.color)
                .setDescription(`**❌ Failed to kick \`${member.user.tag}\`. Make sure to check bot/user permissions.**`);

            interaction.editReply({ embeds: [embed] });

        }

    }
};

export default command;
