require('dotenv').config()
const fs = require('fs')
const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js')

const config = require('./config.json')

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
})

// Settings
client.settings = {
    prefix: config.prefix,
    color: config.color
}

client.commands = new Collection()
client.events = new Collection()
client.aliases = new Collection()
client.slashCommands = new Collection()
client.modals = new Collection()

module.exports = client;

// Importing Handlers
var handlers = fs.readdirSync('./handlers')
handlers = handlers.filter(f => f.endsWith('js') && !f.startsWith('-'))
for(let i in handlers) {
    let handler = require(`./handlers/${handlers[i]}`)
    if(handler) handler.execute(client)
}

// Preventing Unwanted Crashes
process.on("uncaughtException", (err) => {
    console.log(err);
})
process.on('unhandledRejection', (message, err) => {
    console.log(message, err);
});
process.on('uncaughtExceptionMonitor', (err) => {
    console.log(err);
});



client.login(process.env.TOKEN)
