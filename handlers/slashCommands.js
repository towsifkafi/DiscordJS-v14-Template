const args = process.argv.slice(2);
const fs = require('fs')
const { PermissionsBitField, REST, Routes } = require('discord.js');
var colors = require('colors');

if(args[0] == 'sync' || args[0] == 'syncdev') {
    require('dotenv').config()
}

const { TOKEN, CLIENT_ID } = process.env


//const { Routes } = require('discord-api-types/v10');
//const { REST } = require('@discordjs/rest');

const api = new REST({ version: '10' }).setToken(TOKEN)

let client;
if(!args.length) client = require('../index');

let folder = fs.readdirSync('./commands/slash')
var slash_commands = []

// Importing Files

folder.forEach(dir => {
    const commands = fs.readdirSync(`./commands/slash/${dir}`).filter(f => f.endsWith('.js') && !f.startsWith('-'))
    
    for(var i in commands) {
        var command = require(`../commands/slash/${dir}/${commands[i]}`)
        if(command) {
            if(!args.length) client.slashCommands.set(command.name, command)
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

let appsFolder = fs.readdirSync('./apps/')

appsFolder.forEach(dir => {
    if(dir == 'modal') return
    
    const apps = fs.readdirSync(`./apps/${dir}`).filter(f => f.endsWith('.js') && !f.startsWith('-'))

    for(var i in apps) {
        var app = require(`../apps/${dir}/${apps[i]}`)
        if(app) {
            if(!args.length) client.slashCommands.set(app.name, app)
            slash_commands.push(
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


// Put Commands to Discord API

(async() => {

    try {
        
        if(args[0] == 'sync') {
            await api.put(Routes.applicationCommands(CLIENT_ID), { body: slash_commands })
        } else if(args[0] == "syncdev") {
            await api.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.TEST_GUILD), { body: slash_commands })
        } else {
            if(process.env.TEST_GUILD) {
                await api.put(Routes.applicationGuildCommands(CLIENT_ID, process.env.TEST_GUILD), { body: slash_commands })
            } else {
                await api.put(Routes.applicationCommands(CLIENT_ID), { body: slash_commands })
            }
        }

        console.log(`| Successfully Registered Slash Commands & Apps`.brightGreen)
    } catch (error) {
        console.log(error);
    }

})()