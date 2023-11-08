const fs = require('fs')
const client = require('../index')

// Importing Files

let folder = fs.readdirSync('./commands/message')
folder.forEach(dir => {
    const commands = fs.readdirSync(`./commands/message/${dir}`).filter(f => f.endsWith('.js'))
    for(var i in commands) {
        var command = require(`../commands/message/${dir}/${commands[i]}`)
        if(command) {
            command['category'] = dir
            client.commands.set(command.name, command)
            if(command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach(a => client.aliases.set(a, command.name))
            }
        }
    }
})