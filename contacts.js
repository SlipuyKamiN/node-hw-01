const fs = require("fs").promises;

const contactsPath = "./db/contacts.json";

// TODO: задокументувати кожну функцію
async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const contacts = await fs
    .readFile(contactsPath, "utf-8")
    .then((data) => JSON.parse(data))
    .catch(console.log);

  return contacts;
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();

  return contacts.find(({ id }) => id === contactId) || null;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const contactToRemove = contacts.find(({ id }) => id === contactId);

  if (contactToRemove) {
    const filteredContacts = contacts.filter(({ id }) => id !== contactId);

    fs.writeFile(contactsPath, JSON.stringify(filteredContacts));

    return contactToRemove;
  }

  return null;
}

async function addContact({ name, email, phone }) {
  // ...твій код. Повертає об'єкт доданого контакту.
  const contacts = (await listContacts()) || [];
  const contactToUpdate = { id: "Qwe", name, email, phone };
  const isContactInContacts = contacts.find(
    ({ name, email, phone }) =>
      contactToUpdate.name === name ||
      contactToUpdate.email === email ||
      contactToUpdate.phone === phone
  );

  if (!isContactInContacts) {
    contacts.push(contactToUpdate);

    fs.writeFile(contactsPath, JSON.stringify(contacts));

    return contactToUpdate;
  }

  return null;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
