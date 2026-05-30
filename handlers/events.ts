import fs from 'fs';
import type { BotClient, BotEvent, Handler } from '../types';

const handler: Handler = {
    name: "events",
    execute: async (client: BotClient) => {
        const folder = fs.readdirSync('./events');

        for (const dir of folder) {
            const events = fs.readdirSync(`./events/${dir}`).filter(f => (f.endsWith('.js') || f.endsWith('.ts')) && !f.startsWith('-'));
            for (const file of events) {
                const fileWithoutExtension = file.replace(/\.[jt]s$/, '');
                const eventModule = await import(`../events/${dir}/${fileWithoutExtension}.js`);
                const event: BotEvent = eventModule.default || eventModule;

                if (event) {
                    client.events.set(`${dir}/${file}`, event);

                    if (event.once) {
                        client.once(event.name, (...args) => event.execute(client, ...args));
                    } else {
                        client.on(event.name, (...args) => { event.execute(client, ...args); });
                    }
                }
            }
        }
    }
};

export default handler;
