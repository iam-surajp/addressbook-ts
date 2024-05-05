import * as readline from 'readline';

class Contact {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    phoneNumber: string;
    email: string;

    constructor(firstName: string, lastName: string, address: string, city: string, state: string, zip: string, phoneNumber: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }

    updateDetails(address: string, city: string, state: string, zip: string, phoneNumber: string, email: string): void {
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
}

class AddressBook {
    contacts: Contact[];

    constructor() {
        this.contacts = [];
    }

    addContact(contact: Contact): void {
        this.contacts.push(contact);
    }

    displayContacts(): void {
        console.log("Contacts in Address Book:");
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.getFullName()}`);
        });
    }

    findContactByName(firstName: string, lastName: string): Contact | undefined {
        return this.contacts.find(contact => contact.firstName === firstName && contact.lastName === lastName);
    }

    editContactByName(firstName: string, lastName: string): void {
        const contact = this.findContactByName(firstName, lastName);
        if (contact) {
            console.log(`Editing details for ${contact.getFullName()}:`);
            const newAddress = this.getInput("Enter new address: ");
            const newCity = this.getInput("Enter new city: ");
            const newState = this.getInput("Enter new state: ");
            const newZip = this.getInput("Enter new zip code: ");
            const newPhoneNumber = this.getInput("Enter new phone number: ");
            const newEmail = this.getInput("Enter new email: ");
            contact.updateDetails(newAddress, newCity, newState, newZip, newPhoneNumber, newEmail);
            console.log("Contact details updated successfully!");
        } else {
            console.log("Contact not found.");
        }
    }

    deleteContactByName(firstName: string, lastName: string): void {
        const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log("Contact deleted successfully!");
        } else {
            console.log("Contact not found.");
        }
    }
    private getInput(question: string): string {
        const readline = require('readline-sync');
        return readline.question(question);
    }
}

class AddressBookMain {
    addressBook: AddressBook;

    constructor() {
        this.addressBook = new AddressBook();
    }

    async addNewContact(): Promise<void> {
        const firstName = await this.getInput("Enter first name: ");
        const lastName = await this.getInput("Enter last name: ");
        const address = await this.getInput("Enter address: ");
        const city = await this.getInput("Enter city: ");
        const state = await this.getInput("Enter state: ");
        const zip = await this.getInput("Enter zip code: ");
        const phoneNumber = await this.getInput("Enter phone number: ");
        const email = await this.getInput("Enter email: ");
        const newContact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
        this.addressBook.addContact(newContact);
        console.log("New contact added successfully!");
    }

    async addMultipleContacts(){
        let addMore = true;
        while (addMore) {
            await this.addNewContact();
            const userInput = await this.getInput("Do you want to add another person? (yes/no): ");
            addMore = userInput.toLowerCase() === "yes";
        }
    }

    async editContact(): Promise<void> {
        const firstName = await this.getInput("Enter first name of contact to edit: ");
        const lastName = await this.getInput("Enter last name of contact to edit: ");
        this.addressBook.editContactByName(firstName, lastName);
    }

    async deleteContact(): Promise<void> {
        const firstName = await this.getInput("Enter first name of contact to delete: ");
        const lastName = await this.getInput("Enter last name of contact to delete: ");
        this.addressBook.deleteContactByName(firstName, lastName);
    }

    displayAddressBook(): void {
        this.addressBook.displayContacts();
    }

    private async getInput(question: string): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise<string>((resolve) => {
            rl.question(question, (answer) => {
                rl.close();
                resolve(answer);
            });
        });
    }
}

const addressBookMain = new AddressBookMain();
addressBookMain.addNewContact();
// addressBookMain.addMultipleContacts();
// addressBookMain.displayAddressBook();
// addressBookMain.deleteContact();
// addressBookMain.displayAddressBook();

