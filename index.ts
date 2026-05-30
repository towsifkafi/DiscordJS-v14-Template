import 'dotenv/config';
import fs from 'fs';
import { Client, Collection, GatewayIntentBits, Partials, ColorResolvable } from 'discord.js';
import config from './config.json' with { type: 'json' };
import type { BotClient, Handler, SlashCommand, MessageCommand, BotEvent, Modal, App } from './types';

import logger from './utils/logger.js';
import { cyanBright } from 'ansis';

const ascii = `
             ,\\             
              \\\\\\,_        
               \\\` ,\\       
          __,.-" =__)         Discord.js v14
        ."        )           Typescript Template
     ,_/   ,    \\/\\_        
     \\_|    )_-\\ \\_-\`     
        \`-----\` \`--\`      `;

console.log(cyanBright(ascii) + '\n');
logger.info("Initializing client and starting...");

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildPresences,  // Requires Presence Intent
        GatewayIntentBits.GuildMessages,   // Requires Message Intent
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,  // Requires Message Intent
        GatewayIntentBits.DirectMessages
    ],
    partials: [Partials.Channel, Partials.User, Partials.GuildMember, Partials.Message, Partials.Reaction]
}) as BotClient;

client.settings = {
    prefix: config.prefix,
    color: config.color as ColorResolvable
};
client.logger = logger;
client.commands = new Collection<string, MessageCommand>();
client.events = new Collection<string, BotEvent>();
client.aliases = new Collection<string, string>();
client.slashCommands = new Collection<string, SlashCommand | App>();
client.modals = new Collection<string, Modal>();

export default client;

let handlers = fs.readdirSync('./handlers');
const filteredHandlers = handlers.filter(f => (f.endsWith('.js') || f.endsWith('.ts')) && !f.startsWith('-'));
for (const file of filteredHandlers) {
    const fileWithoutExtension = file.replace(/\.[jt]s$/, '');
    const handlerModule = await import(`./handlers/${fileWithoutExtension}.js`);
    const handler: Handler = handlerModule.default || handlerModule;
    if (handler) await handler.execute(client);
}

// preventing unwanted Crashes
process.on("uncaughtException", (err) => {
    logger.error(err);
});
process.on('unhandledRejection', (message, err) => {
    logger.error(message, err);
});
process.on('uncaughtExceptionMonitor', (err) => {
    console.log(err);
});

client.login(process.env.TOKEN);
