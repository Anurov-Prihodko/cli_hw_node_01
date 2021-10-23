const { Command } = require('commander')
const chalk = require('chalk')
const contactsOptions = require('./db')
const program = new Command()
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone')

program.parse(process.argv)

const argv = program.opts()

const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case 'list':
        const contacts = await contactsOptions.listContacts()
        if (!contacts) {
          return console.log(chalk.yellow('Contacts not found'))
        }
        console.log(chalk.green('Here is your contacts'))
        console.table(contacts)
        break

      case 'get':
        const contactById = await contactsOptions.getContactById(id)
        if (!contactById) {
          return console.log(chalk.yellow('Contact not found'))
        }
        console.log(chalk.green('Contact found'))
        console.table(contactById)
        break

      case 'add':
        const contact = await contactsOptions.addContact(name, email, phone)
        if (!contact) {
          return console.log(chalk.yellow('Not possible to add a contact'))
        }
        console.log(chalk.green('Add new contact'))
        console.table(contact)
        break

      case 'remove':
        const removedContact = await contactsOptions.removeContact(id)
        if (!removedContact) {
          return console.log(chalk.yellow('Not possible to remove a contact'))
        }
        console.log(chalk.green('Removed successful'))
        console.table(removedContact)
        break

      default:
        console.warn('\x1b[33m Unknown action type!')
    }
  } catch (error) {
    console.error(`\x1b[31m${error.message})`)
  }
}

invokeAction(argv)
