const { v4 } = require('uuid')
const fs = require('fs/promises')

const contactsPath = require('./contactsPath')
const listContacts = require('./listContacts')

const addContact = async (name, email, phone) => {
  if (!name && !email && !phone) {
    return null
  }
  const contacts = await listContacts()
  const newContact = { id: v4(), name, email, phone }
  contacts.push(newContact)
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2))
  return newContact
}

module.exports = addContact
