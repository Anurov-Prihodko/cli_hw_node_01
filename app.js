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

// TODO: рефакторить
const invokeAction = async ({ action, id, name, email, phone }) => {
  try {
    switch (action) {
      case 'list':
        const contacts = await contactsOptions.listContacts()
        console.table(contacts)
        break

      case 'get':
        // ... id
        break

      case 'add':
        const contact = await contactsOptions.addContact(name, email, phone)
        console.log(chalk.green('Add new contac'))
        console.table(contact)
        break

      case 'remove':
        // ... id
        break

      default:
        console.log(chalk.yellow('Unknown action type!'))
    }
  } catch (error) {
    console.error(chalk.red(error.message))
  }
}

invokeAction(argv)
