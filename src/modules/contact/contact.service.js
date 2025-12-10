import Contact from "./contact.model.js";

export const createContact = async (data) => {
    const contact = new Contact(data);
    return await contact.save();
}

export const getAllContacts = async () => {
    return await Contact.find();
}

export const getContactById = async (id) => {
    return await Contact.findById(id);
}

export const deleteContact = async (id) => {
    return await Contact.findByIdAndDelete(id);
}