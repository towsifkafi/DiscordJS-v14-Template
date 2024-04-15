const args = process.argv.slice(2);
const fs = require('fs')
const { PermissionsBitField, REST, Routes } = require('discord.js');
var colors = require('colors');

if(args.length > 0) {
    require('dotenv').config()
}

const { TOKEN, CLIENT_ID } = process.env

//const { Routes } = require('discord-api-types/v10');
//const { REST } = require('@discordjs/rest');

const api = new REST({ version: '10' }).setToken(TOKEN)

async function getSlashCommands(client) {

    let folder = fs.readdirSync('./commands/slash');
    var slash_commands = [];

    folder.forEach(dir => {
        const commands = fs.readdirSync(`./commands/slash/${dir}`).filter(f => f.endsWith('.js') && !f.startsWith('-'))
        
        for(var i in commands) {
            var command = require(`../commands/slash/${dir}/${commands[i]}`)
            if(command) {
                if(client) client.slashCommands.set(command.name, command)
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
                )
            }
        }
    });

    return slash_commands;

}

async function getApps(client) {
    let appsFolder = fs.readdirSync('./apps/')
    let apps = []

    appsFolder.forEach(dir => {
        if(dir == 'modal') return
        
        const apps = fs.readdirSync(`./apps/${dir}`).filter(f => f.endsWith('.js') && !f.startsWith('-'))

        for(var i in apps) {
            var app = require(`../apps/${dir}/${apps[i]}`)
            if(app) {
                if(client) client.slashCommands.set(app.name, app)
                apps.push(
                    {
                        name: app.name,
                        type: app.type,
                        default_permission: app.default_permission || null,
                        default_member_permission: app.default_member_permissions ? PermissionsBitField.resolve(app.default_member_permissions).toString() : null
                    }
                )
            }
        }

    });

    return apps;
}

async function registerCommands(client, dev = false) {

    let slashCommands = await getSlashCommands(client)
    let apps = await getApps(client)

    let body = [...slashCommands, ...apps]

    try {

        if(dev) {
            await api.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.TEST_GUILD), { body })
        } else {
            await api.put(Routes.applicationCommands(CLIENT_ID), { body })
        }
        
        console.log(`| Successfully Registered Slash Commands & Apps`.brightGreen)
    } catch (error) {
        console.log(error);
    }
}


if(args[0] == 'sync') {
    (async() => { await registerCommands(null, false); })()
} else {
    (async() => { await registerCommands(null, (process.env.TEST_GUILD !== null))  })
}

// Put Commands to Discord API
module.exports = {
    name: "slashCommands",
    execute: async (client) => {
        await registerCommands(client, (process.env.TEST_GUILD !== null)) 
    }
}
