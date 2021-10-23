const listContacts = require('./listContacts')

const getContactById = async (contactId) => {
  if (!contactId) {
    return null
  }
  const contacts = await listContacts()
  const [contactById] = contacts.filter(
    (contact) => String(contact.id) === String(contactId)
  )
  return contactById
}

module.exports = getContactById
