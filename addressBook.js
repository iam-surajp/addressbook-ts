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
    return Contact;
}());
var AddressBook = /** @class */ (function () {
    function AddressBook() {
        this.contacts = [];
    }
    AddressBook.prototype.addContact = function (contact) {
        this.contacts.push(contact);
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
var AddressBookMain = /** @class */ (function () {
    function AddressBookMain() {
        this.addressBook = new AddressBook();
    }
    AddressBookMain.prototype.addNewContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName, address, city, state, zip, phoneNumber, email, newContact;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter first name: ")];
                    case 1:
                        firstName = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter last name: ")];
                    case 2:
                        lastName = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter address: ")];
                    case 3:
                        address = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter city: ")];
                    case 4:
                        city = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter state: ")];
                    case 5:
                        state = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter zip code: ")];
                    case 6:
                        zip = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter phone number: ")];
                    case 7:
                        phoneNumber = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter email: ")];
                    case 8:
                        email = _a.sent();
                        newContact = new Contact(firstName, lastName, address, city, state, zip, phoneNumber, email);
                        this.addressBook.addContact(newContact);
                        console.log("New contact added successfully!");
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.addMultipleContacts = function () {
        return __awaiter(this, void 0, void 0, function () {
            var addMore, userInput;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        addMore = true;
                        _a.label = 1;
                    case 1:
                        if (!addMore) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.addNewContact()];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.getInput("Do you want to add another person? (yes/no): ")];
                    case 3:
                        userInput = _a.sent();
                        addMore = userInput.toLowerCase() === "yes";
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.editContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter first name of contact to edit: ")];
                    case 1:
                        firstName = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter last name of contact to edit: ")];
                    case 2:
                        lastName = _a.sent();
                        this.addressBook.editContactByName(firstName, lastName);
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.deleteContact = function () {
        return __awaiter(this, void 0, void 0, function () {
            var firstName, lastName;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getInput("Enter first name of contact to delete: ")];
                    case 1:
                        firstName = _a.sent();
                        return [4 /*yield*/, this.getInput("Enter last name of contact to delete: ")];
                    case 2:
                        lastName = _a.sent();
                        this.addressBook.deleteContactByName(firstName, lastName);
                        return [2 /*return*/];
                }
            });
        });
    };
    AddressBookMain.prototype.displayAddressBook = function () {
        this.addressBook.displayContacts();
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
    return AddressBookMain;
}());
var addressBookMain = new AddressBookMain();
addressBookMain.addNewContact();
addressBookMain.addMultipleContacts();
// addressBookMain.displayAddressBook();
// addressBookMain.deleteContact();
// addressBookMain.displayAddressBook();
