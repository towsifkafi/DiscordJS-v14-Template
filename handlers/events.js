const fs = require('fs')
const client = require('../index')

let folder = fs.readdirSync('./events')
folder.forEach(dir => {
    const events = fs.readdirSync(`./events/${dir}`).filter(f => f.endsWith('.js') && !f.startsWith('-'))
    for(let i in events) {
        let event = require(`../events/${dir}/${events[i]}`)

        if(event) {
            client.events.set(`${dir}/${events[i]}`, event)

            if(event.once) {
                client.once(event.name, (...args) => event.execute(client, ...args))
            } else {
                client.on(event.name, (...args) => { event.execute(client, ...args) })
            }
        }
    }
})
