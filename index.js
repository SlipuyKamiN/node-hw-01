const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./db/contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  try {
    switch (action) {
      case "list":
        const allContacts = await listContacts();
        return console.table(allContacts);

      case "get":
        const contact = await getContactById(id);
        return console.table(contact);

      case "add":
        const addedContact = await addContact({ name, email, phone });
        return console.table(addedContact);

      case "remove":
        const removedContact = await removeContact(id);
        return console.table(removedContact);

      default:
        console.warn("\x1B[31m Unknown action type!");
    }
  } catch (error) {
    console.log(error);
  }
}

invokeAction(argv);
