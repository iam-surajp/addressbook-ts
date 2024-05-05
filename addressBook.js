"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var readline = require("readline");
var Contact = /** @class */ (function () {
    function Contact(firstName, lastName, address, city, state, zip, phoneNumber, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }
    Contact.prototype.getFullName = function () {
        return "".concat(this.firstName, " ").concat(this.lastName);
    };
    Contact.prototype.updateDetails = function (address, city, state, zip, phoneNumber, email) {
        this.address = address;
        this.city = city;
        this.state = state;
        this.zip = zip;
        this.phoneNumber = phoneNumber;
        this.email = email;
    };
    // Override equals method to check for duplicate contacts
    Contact.prototype.equals = function (other) {
        return this.firstName === other.firstName && this.lastName === other.lastName;
    };
    return Contact;
}());
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        this.contacts = [];
    }
    AddressBook.prototype.addContact = function (contact) {
        // Check for duplicate contacts before adding
        if (this.findDuplicate(contact)) {
            console.log("Duplicate entry. This contact already exists in the address book.");
        }
        else {
            this.contacts.push(contact);
            console.log("Contact added successfully!");
        }
    };
    AddressBook.prototype.findDuplicate = function (contact) {
        return this.contacts.some(function (existingContact) { return existingContact.equals(contact); });
    };
    AddressBook.prototype.displayContacts = function () {
        console.log("Contacts in Address Book:");
        this.contacts.forEach(function (contact, index) {
            console.log("".concat(index + 1, ". ").concat(contact.getFullName()));
        });
    };
    AddressBook.prototype.findContactByName = function (firstName, lastName) {
        return this.contacts.find(function (contact) { return contact.firstName === firstName && contact.lastName === lastName; });
    };
    AddressBook.prototype.editContactByName = function (firstName, lastName) {
        var contact = this.findContactByName(firstName, lastName);
        if (contact) {
            console.log("Editing details for ".concat(contact.getFullName(), ":"));
            var newAddress = this.getInput("Enter new address: ");
            var newCity = this.getInput("Enter new city: ");
            var newState = this.getInput("Enter new state: ");
            var newZip = this.getInput("Enter new zip code: ");
            var newPhoneNumber = this.getInput("Enter new phone number: ");
            var newEmail = this.getInput("Enter new email: ");
            contact.updateDetails(newAddress, newCity, newState, newZip, newPhoneNumber, newEmail);
            console.log("Contact details updated successfully!");
        }
        else {
            console.log("Contact not found.");
        }
    };
    AddressBook.prototype.deleteContactByName = function (firstName, lastName) {
        var index = this.contacts.findIndex(function (contact) { return contact.firstName === firstName && contact.lastName === lastName; });
        if (index !== -1) {
            this.contacts.splice(index, 1);
            console.log("Contact deleted successfully!");
        }
        else {
            console.log("Contact not found.");
        }
    };
    AddressBook.prototype.getInput = function (question) {
        var readline = require('readline-sync');
        return readline.question(question);
    };
    return AddressBook;
}());
var AddressBookManager = /** @class */ (function () {
    function AddressBookManager() {
        this.addressBooks = new Map();
        this.cityPersonMap = {};
        this.statePersonMap = {};
    }
    AddressBookManager.prototype.addAddressBook = function (name) {
        if (!this.addressBooks.has(name)) {
            this.addressBooks.set(name, new AddressBook());
            console.log("Address book '".concat(name, "' created successfully."));
        }
        else {
            console.log("Address book with name '".concat(name, "' already exists."));
        }
    };
    AddressBookManager.prototype.getAddressBook = function (name) {
        return this.addressBooks.get(name);
    };
    AddressBookManager.prototype.displayAllAddressBooks = function () {
        console.log("All Address Books:");
        this.addressBooks.forEach(function (_, name) {
            console.log(name);
        });
    };
    AddressBookManager.prototype.searchPersonByCityOrState = function (cityOrState) {
        var searchResults = [];
        this.addressBooks.forEach(function (addressBook) {
            for (var _i = 0, _a = addressBook.contacts; _i < _a.length; _i++) {
                var contact = _a[_i];
                if (contact.city === cityOrState || contact.state === cityOrState) {
                    searchResults.push(contact);
                }
            }
        });
        return searchResults;
    };
    AddressBookManager.prototype.addContact = function (contact) {
        // Add contact to address book
        this.addressBooks.forEach(function (addressBook) {
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
    };
    AddressBookManager.prototype.viewPersonsByCity = function (city) {
        return this.cityPersonMap[city] || [];
    };
    AddressBookManager.prototype.viewPersonsByState = function (state) {
        return this.statePersonMap[state] || [];
    };
    return AddressBookManager;
}());
var AddressBookMain = /** @class */ (function () {
    function AddressBookMain() {
        this.addressBookManager = new AddressBookManager();
    }
    AddressBookMain.prototype.addNewAddressBook = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter the name for the new address book: ")];
                    case 1:
                        name = _a.sent();
                        this.addressBookManager.addAddressBook(name);
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.addNewContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name, addressBook, firstName, lastName, address, city, state, zip, phoneNumber, email, newContact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter the name of the address book to add a contact to: ")];
                    case 1:
                        name = _a.sent();
                        addressBook = this.addressBookManager.getAddressBook(name);
                        if (!addressBook) return [3 /*break*/, 10];
                        return [4 /*yield*/, this.getInput("Enter first name: ")];
                    case 2:
                        firstName = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter last name: ")];
                    case 3:
                        lastName = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter address: ")];
                    case 4:
                        address = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter city: ")];
                    case 5:
                        city = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter state: ")];
                    case 6:
                        state = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter zip code: ")];
                    case 7:
                        zip = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter phone number: ")];
                    case 8:
                        phoneNumber = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter email: ")];
                    case 9:
                        email = _a.sent();
                        newContact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
                        addressBook.addContact(newContact);
                        console.log("New contact added successfully!");
                        return [3 /*break*/, 11];
                    case 10:
                        console.log("Address book with name '".concat(name, "' does not exist."));
                        _a.label = 11;
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.editContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name, addressBook, firstName, lastName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter the name of the address book to edit a contact in: ")];
                    case 1:
                        name = _a.sent();
                        addressBook = this.addressBookManager.getAddressBook(name);
                        if (!addressBook) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getInput("Enter first name of contact to edit: ")];
                    case 2:
                        firstName = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter last name of contact to edit: ")];
                    case 3:
                        lastName = _a.sent();
                        addressBook.editContactByName(firstName, lastName);
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("Address book with name '".concat(name, "' does not exist."));
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.deleteContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var name, addressBook, firstName, lastName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter the name of the address book to delete a contact from: ")];
                    case 1:
                        name = _a.sent();
                        addressBook = this.addressBookManager.getAddressBook(name);
                        if (!addressBook) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getInput("Enter first name of contact to delete: ")];
                    case 2:
                        firstName = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter last name of contact to delete: ")];
                    case 3:
                        lastName = _a.sent();
                        addressBook.deleteContactByName(firstName, lastName);
                        return [3 /*break*/, 5];
                    case 4:
                        console.log("Address book with name '".concat(name, "' does not exist."));
                        _a.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.displayAllAddressBooks = function () {
        this.addressBookManager.displayAllAddressBooks();
    };
    AddressBookMain.prototype.getInput = function (question) {
        return __awaiter(this, void 0, void 0, function () {
            var rl;
            return __generator(this, function (_a) {
                rl = readline.createInterface({
                    input: process.stdin,
                    output: process.stdout
                });
                return [2 /*return*/, new Promise(function (resolve) {
                        rl.question(question, function (answer) {
                            rl.close();
                            resolve(answer);
                        });
                    })];
            });
        });
    };
    AddressBookMain.prototype.searchPersonByCityOrState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var cityOrState, searchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter the city or state to search for: ")];
                    case 1:
                        cityOrState = _a.sent();
                        searchResults = this.addressBookManager.searchPersonByCityOrState(cityOrState);
                        if (searchResults.length > 0) {
                            console.log("Search Results:");
                            searchResults.forEach(function (contact, index) {
                                console.log("".concat(index + 1, ". ").concat(contact.getFullName(), " - ").concat(contact.city, ", ").concat(contact.state));
                            });
                        }
                        else {
                            console.log("No matching contacts found.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.viewPersonsByCityOrState = function () {
        return __awaiter(this, void 0, void 0, function () {
            var option, city, persons, state, persons;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter 1 to view persons by city, 2 to view persons by state: ")];
                    case 1:
                        option = _a.sent();
                        if (!(option === '1')) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.getInput("Enter the city: ")];
                    case 2:
                        city = _a.sent();
                        persons = this.addressBookManager.viewPersonsByCity(city);
                        this.displayPersons(persons);
                        return [3 /*break*/, 6];
                    case 3:
                        if (!(option === '2')) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.getInput("Enter the state: ")];
                    case 4:
                        state = _a.sent();
                        persons = this.addressBookManager.viewPersonsByState(state);
                        this.displayPersons(persons);
                        return [3 /*break*/, 6];
                    case 5:
                        console.log("Invalid option.");
                        _a.label = 6;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.displayPersons = function (persons) {
        if (persons.length > 0) {
            console.log("Persons:");
            persons.forEach(function (contact, index) {
                console.log("".concat(index + 1, ". ").concat(contact.getFullName(), " - ").concat(contact.city, ", ").concat(contact.state));
            });
        }
        else {
            console.log("No matching persons found.");
        }
    };
    return AddressBookMain;
}());
var addressBookMain = new AddressBookMain();
// addressBookMain.addNewAddressBook();
addressBookMain.addNewContact();
// addressBookMain.displayAllAddressBooks();
// addressBookMain.searchPersonByCityOrState();
addressBookMain.viewPersonsByCityOrState();
