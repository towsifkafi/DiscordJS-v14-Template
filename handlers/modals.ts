import fs from 'fs';
import type { BotClient, Modal, Handler } from '../types';

const handler: Handler = {
    name: "modals",
    execute: async (client: BotClient) => {
        const appsFolder = fs.readdirSync('./apps/');

        for (const dir of appsFolder) {
            if (dir !== 'modal') continue;

            const modals = fs.readdirSync(`./apps/${dir}`).filter(f => (f.endsWith('.js') || f.endsWith('.ts')) && !f.startsWith('-'));

            for (const file of modals) {
                const fileWithoutExtension = file.replace(/\.[jt]s$/, '');
                const modalModule = await import(`../apps/${dir}/${fileWithoutExtension}.js`);
                const modal: Modal = modalModule.default || modalModule;
                if (modal) {
                    client.modals.set(modal.custom_id, modal);
                }
            }
        }
    }
};

export default handler;
