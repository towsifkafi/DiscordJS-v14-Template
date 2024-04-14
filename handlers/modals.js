const fs = require('fs')
const client = require('../index');

let appsFolder = fs.readdirSync('./apps/')

appsFolder.forEach(dir => {
    if(dir !== 'modal') return

    const modals = fs.readdirSync(`./apps/${dir}`).filter(f => f.endsWith('.js') && !f.startsWith('-'))

    for(var i in modals) {
        var modal = require(`../apps/${dir}/${modals[i]}`)
        if(modal) {
            client.modals.set(modal.custom_id, modal)
        }
    }

})