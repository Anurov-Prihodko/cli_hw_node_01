const fs = require('fs/promises')
const chalk = require('chalk')
const contactsPath = require('./contactsPath')

const listContacts = async () => {
  try {
    const result = await fs.readFile(contactsPath, 'utf-8')
    return JSON.parse(result)
  } catch (error) {
    console.error(chalk.red(error.message))
  }
}

module.exports = listContacts
