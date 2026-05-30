import fs from 'fs';
import type { BotClient, MessageCommand, Handler } from '../types';

const handler: Handler = {
    name: "messageCommands",
    execute: async (client: BotClient) => {
        const folder = fs.readdirSync('./commands/message');

        for (const dir of folder) {
            const commands = fs.readdirSync(`./commands/message/${dir}`).filter(f => (f.endsWith('.js') || f.endsWith('.ts')) && !f.startsWith('-'));
            for (const file of commands) {
                const fileWithoutExtension = file.replace(/\.[jt]s$/, '');
                const commandModule = await import(`../commands/message/${dir}/${fileWithoutExtension}.js`);
                const command: MessageCommand = commandModule.default || commandModule;
                if (command) {
                    command['category'] = dir;
                    client.commands.set(command.name, command);
                    if (command.aliases && Array.isArray(command.aliases)) {
                        command.aliases.forEach(a => client.aliases.set(a, command.name));
                    }
                }
            }
        }
    }
};

export default handler;
