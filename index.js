const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

(async () => {
  console.log(
    await addContact({
      name: "Simon Morton",
      email: "dui.Fusce.diam@Donec.com",
      phone: "(233) 738-2360",
    })
  );
})();
