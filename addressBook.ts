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
    
    // Override equals method to check for duplicate contacts
    equals(other: Contact): boolean {
        return this.firstName === other.firstName && this.lastName === other.lastName;
    }

    toString(): string {
        return `${this.getFullName()} - ${this.address}, ${this.city}, ${this.state}, ${this.zip}, ${this.phoneNumber}, ${this.email}`;
    }
}

class AddressBook {
    contacts: Contact[];

    constructor() {
        this.contacts = [];
    }

    addContact(contact: Contact): void {
        // Check for duplicate contacts before adding
        if (this.findDuplicate(contact)) {
            console.log("Duplicate entry. This contact already exists in address book.");
        } else {
            this.contacts.push(contact);
            console.log("New contact added successfully!");
        }
        console.log("\n");
    }

    private findDuplicate(contact: Contact): boolean {
        return this.contacts.some(existingContact => existingContact.equals(contact));
    }

    displayContacts(): void {
        console.log("Contacts in Address Book:");
        this.contacts.forEach((contact, index) => {
            console.log(`${index + 1}. ${contact.getFullName()}`);
        });
        console.log("\n");
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
        console.log("\n");
    }

    deleteContactByName(firstName: string, lastName: string): void {
        const index = this.contacts.findIndex(contact => contact.firstName === firstName && contact.lastName === lastName);
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log("Contact deleted successfully!");
        } else {
            console.log("Contact not found.");
        }
        console.log("\n");
    }

    private getInput(question: string): string {
        const readline = require('readline-sync');
        return readline.question(question);
    }

    sortContactsByName(): void {
        this.contacts.sort((a, b) => {
            const nameA = a.getFullName().toLowerCase();
            const nameB = b.getFullName().toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
        });
    }

    // Sort contacts by city
    sortContactsByCity(): void {
        this.contacts.sort((a, b) => a.city.localeCompare(b.city));
    }

    // Sort contacts by state
    sortContactsByState(): void {
        this.contacts.sort((a, b) => a.state.localeCompare(b.state));
    }

    // Sort contacts by zip
    sortContactsByZip(): void {
        this.contacts.sort((a, b) => a.zip.localeCompare(b.zip));
    }
}

class AddressBookManager {
    addressBooks: Map<string, AddressBook>;
    cityPersonMap: { [city: string]: Contact[] };
    statePersonMap: { [state: string]: Contact[] };

    constructor() {
        this.addressBooks = new Map();
        this.cityPersonMap = {};
        this.statePersonMap = {};
    }

    addAddressBook(name: string): void {
        if (!this.addressBooks.has(name)) {
            this.addressBooks.set(name, new AddressBook());
            console.log(`Address book '${name}' created successfully.`);
        } else {
            console.log(`Address book with name '${name}' already exists.`);
        }
        // console.log("\n");
    }

    getAddressBook(name: string): AddressBook | undefined {
        return this.addressBooks.get(name);
    }

    displayAllAddressBooks(): void {
        console.log("All Address Books:");
        this.addressBooks.forEach((_, name) => {
            console.log(name);
        });
        console.log("\n");
    }

    searchPersonByCityOrState(cityOrState: string): Contact[] {
        const searchResults: Contact[] = [];
        this.addressBooks.forEach((addressBook) => {
            for (const contact of addressBook.contacts) {
                if (contact.city === cityOrState || contact.state === cityOrState) {
                    searchResults.push(contact);
                }
            }
        });
        return searchResults;
    }

    addContact(contact: Contact): void {
        // Add contact to address book
        this.addressBooks.forEach((addressBook) => {
            addressBook.contacts.push(contact);
        });
        // Update city-person map
        if (!this.cityPersonMap[contact.city]) {
            this.cityPersonMap[contact.city] = [];
        }
        this.cityPersonMap[contact.city].push(contact);
        // Update state-person map
        if (!this.statePersonMap[contact.state]) {
            this.statePersonMap[contact.state] = [];
        }
        this.statePersonMap[contact.state].push(contact);
    }

    viewPersonsByCity(city: string): Contact[] {
        return this.cityPersonMap[city] || [];
    }

    viewPersonsByState(state: string): Contact[] {
        return this.statePersonMap[state] || [];
    }

    getContactCountByCity(city: string): number {
        const persons = this.cityPersonMap[city] || [];
        return persons.length;
    }

    getContactCountByState(state: string): number {
        const persons = this.statePersonMap[state] || [];
        return persons.length;
    }
}

class AddressBookMain {
    addressBookManager: AddressBookManager;

    constructor() {
        this.addressBookManager = new AddressBookManager();
    }

    async run(){
        // Main entry point to start interacting with the address book system
        // Perform operations like adding new address books, adding contacts, editing contacts, etc.
        console.log("\nWelcome to Addressbook program\n");
        // await this.addNewAddressBook();
        await this.addAddressBooks();
        // await this.addNewContact();
        this.displayAllAddressBooks();
        await this.addMoreContacts();
        await this.searchPersonByCityOrState();
    }

    async addNewAddressBook(){
        const name = await this.getInput("Enter the name to add a new address book: ");
        this.addressBookManager.addAddressBook(name);
    }

    async addAddressBooks(){
        do{
            await this.addNewAddressBook();
            const addBook = await this.getInput("Do you want to add more address books? (yes,no): ");
            if (addBook.toLowerCase()!=='yes'){
                break;
            }
        } while (true);
        // console.log("\n");
    }
    

    async addNewContact(){
        const name = await this.getInput("Enter the name of the address book to add a contact to: ");
        const addressBook = this.addressBookManager.getAddressBook(name);
        if (addressBook) {
            const firstName = await this.getInput("Enter first name: ");
            const lastName = await this.getInput("Enter last name: ");
            const address = await this.getInput("Enter address: ");
            const city = await this.getInput("Enter city: ");
            const state = await this.getInput("Enter state: ");
            const zip = await this.getInput("Enter zip code: ");
            const phoneNumber = await this.getInput("Enter phone number: ");
            const email = await this.getInput("Enter email: ");
            const newContact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
            addressBook.addContact(newContact);
            // console.log("New contact added successfully!");
        } else {
            console.log(`Address book with name '${name}' does not exist.`);
        }
    }

    async addMoreContacts(){
        do{
        await this.addNewContact();
        const response = await this.getInput("\nDo you want to add more contacts? (yes,no): ");
        if (response !== 'yes'){
            break;
        }
        }while(true);
        console.log("\n"); 
    }

    async searchPersonByCityOrState(){
        const cityOrState = await this.getInput("Enter the city or state to search for: ");
        const searchResults = this.addressBookManager.searchPersonByCityOrState(cityOrState);
        if (searchResults.length > 0) {
            searchResults.forEach((contact, index) => {
                console.log(`${index + 1}. ${contact.getFullName()} - ${contact.city}, ${contact.state}`);
            });
        } else {
            console.log("No matching contacts found.");
        }
        console.log("\n");
    }

    async getInput(question: string): Promise<string> {
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

    displayAllAddressBooks(): void {
        this.addressBookManager.displayAllAddressBooks();
    }
}

const addressBookMain = new AddressBookMain();
addressBookMain.run();
