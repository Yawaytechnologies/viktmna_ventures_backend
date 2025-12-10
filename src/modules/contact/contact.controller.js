import { createContact, getAllContacts, getContactById, deleteContact } from "./contact.service.js";
import { emailValidator, mobileNumberValidator } from "./contact.validation.js";

export const createContactController = async (req, res) => {
    try {
        const { firstName, lastName, address, email, mobileNumber, message } = req.body;
        if (!emailValidator(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        if (!mobileNumberValidator(mobileNumber)) {
            return res.status(400).json({ message: "Invalid mobile number format" });
        }
        const contact = await createContact({
            firstName,
            lastName,
            address,
            email,
            mobileNumber,
            message
        });
        res.status(201).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const getAllContactsController = async (req, res) => {
    try {
        const contacts = await getAllContacts();

        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }   
};

export const getContactByIdController = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await getContactById(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json(contact);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteContactController = async (req, res) => {
    try {
        const { id } = req.params;
        const contact = await deleteContact(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};