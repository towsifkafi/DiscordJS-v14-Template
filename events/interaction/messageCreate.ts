import { EmbedBuilder, Collection, PermissionsBitField, Message, ColorResolvable, Events } from 'discord.js';
import ms from 'ms';
import type { BotClient, BotEvent, MessageCommand } from '../../types';

const cooldowns = new Collection<string, number>();

interface ExtendedMessage extends Message {
    return: (text: string, color?: ColorResolvable) => Promise<Message>;
    error: (text: string) => Promise<Message>;
}

const event: BotEvent = {
    name: Events.MessageCreate,
    execute: async (client: BotClient, message: Message): Promise<void> => {
        if (message.author.bot) return;
        if (!message.content.startsWith(client.settings.prefix)) return;
        const args = message.content.slice(client.settings.prefix.length).trim().split(/ +/g);
        let commandName = args.shift()?.toLowerCase();

        if (!commandName) return;
        const command: MessageCommand | undefined = client.commands.get(commandName) || client.commands.get(client.aliases.get(commandName)!);

        const msg = message as ExtendedMessage;

        msg.return = async (text: string, color: ColorResolvable = client.settings.color) => {
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(color)
                        .setDescription(text)
                ]
            });
        };
        msg.error = (text: string) => msg.return(text, '#fc3c35');

        if (command) {
            if (command.cooldown && cooldowns.has(`${message.author.id}|${command.name}`)) {
                msg.error(`You are on a **${ms(cooldowns.get(`${message.author.id}|${command.name}`)! - Date.now(), { long: true })}** cooldown.`);
                return;
            }

            if (command.user_perms || command.bot_perms) {
                if (command.user_perms && !message.member?.permissions.has(PermissionsBitField.resolve(command.user_perms))) {
                    msg.error(`You don't have the required permissions to run this command.`);
                    return;
                }
                const botMember = message.guild?.members.me || (message.guild ? await message.guild.members.fetch(client.user!.id).catch(() => null) : null);
                if (command.bot_perms && (!botMember || !botMember.permissions.has(PermissionsBitField.resolve(command.bot_perms)))) {
                    msg.error(`The bot doesn't have the required permissions to run this command.`);
                    return;
                }
            }

            try {
                command.execute(client, message, args);
            } catch (err) {
                console.log(err);
                msg.error(`The bot ran into an error executing that command.`);
            }

            if (command.cooldown) {
                cooldowns.set(`${message.author.id}|${command.name}`, Date.now() + command.cooldown);
                setTimeout(() => {
                    cooldowns.delete(`${message.author.id}|${command.name}`);
                }, command.cooldown);
            }
        }
    }
};

export default event;
