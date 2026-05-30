
import { ActivityType, Events } from 'discord.js';
import type { BotClient, BotEvent, SlashCommand, App } from '../../types';
import table from '../../utils/table.js';
import { greenBright, bold, cyanBright } from 'ansis';

const event: BotEvent = {
    name: Events.ClientReady,
    execute: async (client: BotClient) => {

        const tb = [
            [`Events`, `Commands`, `Slash Commands`, `Apps`],
            [
                greenBright([...client.events.keys()].join('\n')),
                cyanBright([...client.commands.keys()].map(x => client.settings.prefix + x).join('\n')),
                cyanBright([...client.slashCommands.filter((s: SlashCommand | App) => s.type == 1).keys()].map(x => '/' + x).join('\n')),
                cyanBright([...client.slashCommands.filter((s: SlashCommand | App) => s.type !== 1).keys()].join('\n'))
            ]
        ];

        console.log(table(tb));

        client.logger.info(`${bold.cyanBright`${client.user!.username}`} Online! --> Users: ${client.users.cache.size}, Guilds: ${client.guilds.cache.size}`);

        const activities = [
            { name: `${client.users.cache.size} users`, type: ActivityType.Listening },
            { name: `${client.guilds.cache.size} servers`, type: ActivityType.Watching }
        ];

        setInterval(() => {
            client.user!.setActivity(activities[Math.floor(Math.random() * activities.length)]);
            client.user!.setStatus(`online`);
        }, 10000);
    }
};

export default event;
