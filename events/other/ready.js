const AsciiTable = require('ascii-table/ascii-table');
var colors = require('colors');
const { ActivityType } = require('discord.js');

let join = (cmd, prefix) => {
    if(!cmd) return ' '
    return `${prefix}${cmd}`
}

let ascii = `             ,\\             
             \\\\\\,_        
              \\\` ,\\       
         __,.-" =__)         I like..
       ."        )           Discord.js v14
    ,_/   ,    \\/\\_        
    \\_|    )_-\\ \\_-\`     
       \`-----\` \`--\`      `

module.exports = {
    name: "ready",
    execute: async (client) => {
        let table = new AsciiTable()
        table.setBorder(['│'], ['─'])
        table.setHeading('Events', 'Commands', 'Slash Commands', 'Apps')

        let ev = [...client.events.keys()].length
        let cmd = [...client.commands.keys()].length
        let slash = [...client.slashCommands.filter(s => s.type == 1).keys()].length
        let apps = [...client.slashCommands.filter(s => s.type !== 1).keys()].length

        for(var i = 0; i < Math.max(ev, cmd, slash, apps)+1; i++) {

            let events = [...client.events.keys()]
            let commands = [...client.commands.keys()]
            let slashCommands = [...client.slashCommands.filter(s => s.type == 1).keys()]
            let apps = [...client.slashCommands.filter(s => s.type !== 1).keys()]

            table.addRow(events[i], join(commands[i], client.settings.prefix), join(slashCommands[i], '/'), apps[i])

        }

        console.log(ascii.bold.cyan+'\n'+table.toString().brightBlue)

        console.log(`| ${client.user.username} Online! --> Users: ${client.users.cache.size}, Guilds: ${client.guilds.cache.size}`.brightYellow)

        const activities = [
            { name: `${client.users.cache.size} users`, type: ActivityType.Listening },
            { name: `${client.guilds.cache.size} servers`, type: ActivityType.Watching }
        ]

        setInterval(() => {
            client.user.setActivity(activities[Math.floor(Math.random()*activities.length)])
            client.user.setStatus(`online`)
        }, 10000);

    } 
}