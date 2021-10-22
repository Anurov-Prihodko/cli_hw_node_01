const { v4 } = require('uuid')
// console.log(v4())
const fs = require('fs/promises')
const chalk = require('chalk')
const contactsPath = require('./contactsPath')
const listContacts = require('./listContacts')

const addContact = async (name, email, phone) => {
  try {
    const contacts = await listContacts()
    const newContact = { id: v4(), name, email, phone }
    contacts.push(newContact)
    await fs.readFile(contactsPath, 'utf-8')
    JSON.stringify(contacts, null, 2)
    return newContact
  } catch (error) {
    console.error(chalk.red(error.message))
  }
}

module.exports = addContact
