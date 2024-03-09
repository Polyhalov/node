const fs = require('fs/promises');
const { nanoid } = require('nanoid');
const path = require('path');

const contactsPath = path.resolve('db', 'contacts.json')

const listContacts = async () => {
    const data = await fs.readFile(contactsPath, 'utf-8');
    return JSON.parse(data);
}

const getContactById = async (contactID) => {
    const contacts = await listContacts();
    const result =  contacts.find(item => item.id===contactID);
    return result || null;
}
const removeContact = async (contactID) => {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactID);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return result;
}

const addContact = async (data)=>{
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        ...data
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

// addContact({ name: 'Andriy2', email: 'asdadasd2@gmail.com', phone: '0931991919192' })

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}