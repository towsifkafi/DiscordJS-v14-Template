const args = process.argv.slice(2);
import 'dotenv/config';
import fs from 'fs';
import { PermissionsBitField, REST, Routes } from 'discord.js';
import type { BotClient, SlashCommand, App, Handler } from '../types';

const { TOKEN, CLIENT_ID } = process.env;

const api = new REST({ version: '10' }).setToken(TOKEN!);

async function getSlashCommands(client: BotClient | null) {

    const folder = fs.readdirSync('./commands/slash');
    const slash_commands: any[] = [];

    for (const dir of folder) {
        const commands = fs.readdirSync(`./commands/slash/${dir}`).filter(f => (f.endsWith('.js') || f.endsWith('.ts')) && !f.startsWith('-'));

        for (const file of commands) {
            const fileWithoutExtension = file.replace(/\.[jt]s$/, '');
            const commandModule = await import(`../commands/slash/${dir}/${fileWithoutExtension}.js`);
            const command: SlashCommand = commandModule.default || commandModule;
            if (command) {
                if (client) client.slashCommands.set(command.name, command);
                slash_commands.push(
                    {
                        name: command.name,
                        description: command.description,
                        type: command.type,
                        options: command.options || null,
                        default_permission: command.default_permission || null,
                        default_member_permission: command.default_member_permissions ? PermissionsBitField.resolve(command.default_member_permissions).toString() : null,
                        integration_types: command.integration_types || [0],
                        contexts: command.contexts || [0]
                    }
                );
            }
        }
    }

    return slash_commands;

}

async function getApps(client: BotClient | null) {
    const appsFolder = fs.readdirSync('./apps/');
    const appsList: any[] = [];

    for (const dir of appsFolder) {
        if (dir == 'modal') continue;

        const apps = fs.readdirSync(`./apps/${dir}`).filter(f => (f.endsWith('.js') || f.endsWith('.ts')) && !f.startsWith('-'));

        for (const file of apps) {
            const fileWithoutExtension = file.replace(/\.[jt]s$/, '');
            const appModule = await import(`../apps/${dir}/${fileWithoutExtension}.js`);
            const app: App = appModule.default || appModule;
            if (app) {
                if (client) client.slashCommands.set(app.name, app);
                appsList.push(
                    {
                        name: app.name,
                        type: app.type,
                        default_permission: app.default_permission || null,
                        default_member_permission: app.default_member_permissions ? PermissionsBitField.resolve(app.default_member_permissions).toString() : null
                    }
                );
            }
        }
    }

    return appsList;
}

async function registerCommands(client: BotClient | null, dev: boolean = false) {

    const slashCommands = await getSlashCommands(client);
    const apps = await getApps(client);

    const body = [...slashCommands, ...apps];

    try {

        if (dev) {
            await api.put(Routes.applicationGuildCommands(CLIENT_ID!, process.env.TEST_GUILD!), { body });
        } else {
            await api.put(Routes.applicationCommands(CLIENT_ID!), { body });
        }

        client?.logger.success('Successfully Registered Slash Commands & Apps');
    } catch (error) {
        client?.logger.error(error);
    }
}


if (args[0] == 'sync') {
    (async () => { await registerCommands(null, false); })();
} else {
    (async () => { await registerCommands(null, (process.env.TEST_GUILD !== null)); });
}

const handler: Handler = {
    name: "slashCommands",
    execute: async (client: BotClient) => {
        await registerCommands(client, (process.env.TEST_GUILD !== null));
    }
};

export default handler;
