const fs = require('fs/promises')

const contactsPath = require('./contactsPath')
const listContacts = require('./listContacts')

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const filteredContacts = contacts.filter(
    (contact) => String(contact.id) !== String(contactId)
  )
  if (!filteredContacts) {
    return null
  }
  const idx = contacts.findIndex(
    (item) => String(item.id) === String(contactId)
  )
  if (idx === -1) {
    return null
  }
  await fs.writeFile(contactsPath, JSON.stringify(filteredContacts, null, 2))
  return contacts[idx]
}

module.exports = removeContact
