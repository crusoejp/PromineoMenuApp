// Create a grocery item class with name, quantity, and price properties.
class GroceryItem {
  constructor(name, quantity, price) {
    this.name = name;
    this.quantity = quantity;
    this.price = price;
  }

  // quick maths to make things easier later
  getCost() {
    return this.quantity * this.price;
  }
}

// List class with name and items properties
// Contains methods to add items, get total cost, and get items
class GroceryList {
  constructor(name) {
    this.name = name;
    this.items = [];
  }

  addItem(item) {
    if (item instanceof GroceryItem) {
      this.items.push(item);
    } else {
      throw new Error(
        `Only GroceryItem objects can be added to a GroceryList. Argument ${item} is not a GroceryItem.`
      );
    }
  }

  removeItem(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  getItems() {
    let string = "";
    this.items.forEach((item, index) => {
      string += `${index} - ${item.name} ${item.quantity} @ ${
        item.price
      } --- $${item.getCost()}\n`;
    });
    return string;
  }
}

// Menu class with lists and selectedList properties
// Contains methods to start, create, view, delete, and show all lists
// Also contains methods to show main and list menu options
class Menu {
  constructor() {
    this.lists = [];
    this.selectedList = null;
  }

  // starts us up
  start() {
    let selection = this.showMainMenuOptions();
    while (selection != 0) {
      switch (selection) {
        case "1":
          this.createList();
          break;
        case "2":
          this.viewList();
          break;
        case "3":
          this.deleteList();
          break;
        case "4":
          this.showAllLists();
          break;
        default:
          selection = 0;
      }
      selection = this.showMainMenuOptions();
    }
    alert("Goodbye!");
  }

  // prompts the user on the main menu
  showMainMenuOptions() {
    return prompt(`
      0 - Exit
      1 - Create a new grocery list
      2 - View grocery list
      3 - Delete grocery list
      4 - Show all grocery lists
    `);
  }

  // creates a new list
  createList() {
    let name = prompt("Enter the name of the new list:");
    this.lists.push(new GroceryList(name));
  }

  getAllLists() {
    let listString = "";
    this.lists.forEach((list, index) => {
      listString += `${index} - ${list.name}\n`;
    });
    return listString;
  }

  // shows all lists
  showAllLists() {
    let listString = "";
    this.lists.forEach((list, index) => {
      listString += `${index} - ${list.name}\n`;
    });
    prompt(`${listString}`);
  }

  // shows a list after it's been selected
  viewList() {
    let index = prompt(
      `Enter the index of the list you wish to view:\n${this.getAllLists()}`
    );
    if (index != null && index < this.lists.length) {
      this.selectedList = this.lists[index];
      let selection = this.showListMenuOptions();
      while (selection != 0) {
        switch (selection) {
          case "1":
            this.addItem();
            break;
          case "2":
            this.removeItem();
            break;
          case "3":
            this.showAllItems();
            break;
          default:
            selection = 0;
        }
        selection = this.showListMenuOptions();
      }
      this.selectedList = null;
    }
  }

  // deletes a selected list
  deleteList() {
    let listString = "";
    this.lists.forEach((list, index) => {
      listString += `${index} - ${list.name}\n`;
    });
    let index = prompt(
      `Enter the index of the list you wish to delete:\n ${listString}`
    );
    if (index != null && index < this.lists.length) {
      this.lists.splice(index, 1);
    }
  }

  // prompts the user on the list menu
  showListMenuOptions() {
    return prompt(`
        ${this.selectedList.name} List Menu
        0 - Exit
        1 - Add an item
        2 - Remove an item
        3 - Show all items
        `);
  }

  // adds an item to a list
  addItem() {
    let name = prompt("Enter the name of the item:");
    let quantity = prompt("Enter the quantity of the item:");
    let price = prompt("Enter the price of the item:");
    this.selectedList.addItem(new GroceryItem(name, quantity, price));
  }

  // removes an item from a list
  removeItem() {
    let index = prompt(
      `Enter the index of the item you wish to remove:\n${this.selectedList.getItems()}`
    );
    if (index != null && index < this.selectedList.items.length) {
      this.selectedList.removeItem(this.selectedList.items[index]);
    }
  }

  // shows all items in a list
  showAllItems() {
    prompt(this.selectedList.getItems());
  }
}

let menu = new Menu();
menu.start();
