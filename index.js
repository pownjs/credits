exports.yargs = {
    command: 'credits [options]',
    describe: 'list contributors and credits',

    builder: {
        only: {
            alias: 'o'
        }
    },

    handler: (argv) => {
        const pownModules = require('pown-modules')

        console.log(`
88888b.  8888b. 888  888  88888888b.
888 "88b    "88b888  888  888888 "88b
888  888.d888888888  888  888888  888
888 d88P888  888Y88b 888 d88P888  888
88888P" "Y888888 "Y8888888P" 888  888
888    d8b
888    Y8P
888
      8888 .d8888b
      "888 88K
       888 "Y8888b.
       888      X88
       888  88888P'
       888
      d88P
    888P"
`)

        let list

        if (argv.only) {
            list = pownModules.listPownModules.bind(pownModules)
        } else {
            list = pownModules.listNodeModules.bind(pownModules)
        }

        list((err, modules) => {
            if (err) {
                console.error(err.message || err)

                return
            }

            let people = []

            modules.forEach(module => {
                if (module.package.author) {
                    people.push(module.package.author.name.trim())
                }

                if (module.package.contributors) {
                    people = people.concat(module.package.contributors.map(person => person.name.trim()))
                }
            })

            if (people.length) {
                console.log(`\nContributors:\n ${Array.from(new Set(people)).join(', ')}\n`)
            }
        })
    } 
}
