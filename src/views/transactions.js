import { addTransaction, updateGoal, addBudgetTracking } from "../data/storage.js";
export function transactions() {
  return /*HTML*/ `
    <div class="container-transactions">
      <span class="title-transactions"><h4>Transactions</h4></span>
      <div class="body-transactions">
        <span class="cont-btn-new-trans">
          <button id="btn-new-transactions">
            <span class="icon-dollar-sign"></span>
            <p>New transactions</p>
          </button>
          <button id="btn-new-tracking">
            <span class="hugeicons--search-dollar"></span>
            <p>Budget Tracking</p>
          </button>
        </span>
        <div class="cont-nav-trans-tracking">
          <nav class="nav-transactions-tracking">
            <h4 class="title-add-trans-tracking">Add Budget Tracking</h4>
            <div class="cont-all-input">
              <div class="cont-input-category-tracking div-cont">
              <label for="options-category-tracking">Select a category:</label>
              <div class="input-category">
                <select id="options-category-tracking" name="options-category-tracking">
                </select>
              </div>
            </div>
            <div class="cont-input-amount-tracking div-cont">
              <label for="input-amount-tracking">Budgeted Amount:</label>
              <input id="input-amount-tracking" type="number" placeholder="Insert an amount" />
            </div>
            </div>
            <div class="cont-btn-add-cancel-tracking">
              <button id="btn-add-tracking">
                <span class="icon-plus"></span>
                <p>Add</p>
              </button>
              <button id="btn-cancel-tracking">
                <span class="icon-x"></span>
                <p>Back</p>
              </button>
            </div>
            <div class="cont-list-tracking">
            <table class="cont-table-tracking">
              <thead>
                <tr class="head-table-tracking">
                  <th>Category</th>
                  <th>Budgeted Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody id="body-table-tracking">
              </tbody>
            </table>
          </div>
        </nav>
        </div>
        <div class="cont-nav-trans">
          <nav class="nav-transactions">
            <h4 class="title-add-trans">Add new transactions</h4>
            <div class="cont-input-amount div-cont">
              <label for="input-amount">Amount:</label>
              <input
                id="input-amount"
                type="number"
                placeholder="Insert an amount"
              />
            </div>
            <div class="cont-input-date div-cont">
              <label for="input-date">Date:</label>
              <input id="input-date" type="date" placeholder="Insert a date" />
            </div>
            <div class="cont-type-transactions div-cont">
              <label for="options-type">Select a type:</label>
              <select id="options-type" name="options-type">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
                <option value="Goals">Goals</option>
              </select>
            </div>
            <div class="cont-input-category div-cont">
              <label for="options-category">Select a category:</label>
              <div class="input-category">
                <select id="options-category" name="options-category">
                  <option value="housting">Housting</option>
                  <option value="transportation">Transportation</option>
                </select>
                <button id="btn-new-category">New category</button>
              </div>
            </div>
            
            <textarea
              id="input-note"
              placeholder="Add a note or description (optional)"
            ></textarea>
            <div class="cont-btn-add-cancel">
              <button id="btn-add-transactions">
                <span class="icon-plus"></span>
                <p>Add</p>
              </button>
              <button id="btn-cancel-transaction">
                <span class="icon-x"></span>
                <p>Cancel</p>
              </button>
            </div>
          </nav>

          <div class="cont-categories-list">
            <div class="category-list">
              <h4 class="title-category-list">Categories</h4>
              <div class="cont-input-add-cat">
                <label for="input-add-cat">New category:</label>
                <div class="input-add-btn">
                  <input
                    type="text"
                    id="input-add-cat"
                    placeholder="Write your category"
                  />

                  <div class='cont-type-btn'>
                    <div class="cont-type-transactions div-cont">
                    <select id="options-type-c" name="options-type">
                      <option value="Income">Income</option>
                      <option value="Expense">Expense</option>
                    </select>
                    </div>
                  
                    <button id="btn-add-category">Add</button>
                  </div>
                </div>
              </div>
              <div class="box-edit-category">
                <div class="box-edit">
                  <label for="input-edit-cat">Edit this category:</label>
                  <div class="input-edit-btn">
                    <input
                      type="text"
                      id="input-edit-cat"
                      placeholder="Write your category"
                    />
                    <button id="btn-edit-category">Edit</button>
                    <button id="btn-cancel-edit-category">Cancel</button>
                  </div>
                </div>
              </div>
              <div class="cont-list-category">
                <ul>
                  <li>
                    <input
                      type="checkbox"
                      name="item-example"
                      id="item-example"
                    /><label for="item-example">Item for example</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="item-example2"
                      id="item-example2"
                    /><label for="item-example2">Item for example 2</label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      name="item-example3"
                      id="item-example3"
                    /><label for="item-example3">Item for example 3</label>
                  </li>
                </ul>

                <div class="option-items-cat">
                  <!--<button id="btn-edit-item-cat">
                    <span class="icon-edit"></span>
                    <p>Edit</p>
                  </button>-->
                  <button id="btn-drop-item-cat">
                    <span class="icon-trash"></span>
                    <p>Drop</p>
                  </button>
                </div>
              </div>
              <div class="cont-btn-cancel-add-cat">
                <!--<button id="btn-add-category">Add</button>-->
                <button id="btn-ok-category">Ok</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cont-transaction-list">
          <div class="content-filter">
            <button id="btn-show-filter"><span class="icon-filter"></span></button>
            <div class="content-search">
              <span class="icon-search"></span>
              <input type="search" name="search" id="filter-search" placeholder="Search by category, description, or transaction type"/>
            </div>
            <ul id="list-filter" class="list-filter-hidden">
              <li><button id="filter-all">All</button></li>
              <li id="filter-date-list"><label for="filter-date">By date</label><input type="date" id="filter-date"/></li>
              <li><button id="filter-transaction">By type</button>
                <select id="options-type" name="options-type">
                <option value="Income">Income</option>
                <option value="Expense">Expense</option>
              </select>
              </li>
              <li><button id="filter-category">By category</button>
                <select id="options-category" name="options-category">
                  <option value="housting">Housting</option>
                  <option value="transportation">Transportation</option>
                </select>
              </li>
              
            </ul>
          </div>
          <div class="cont-list-transaction-section">
            <table class="cont-table-transaction">
                <thead>
                <tr class="head-table-transaction">
                <th>Amount</th>
                <th>Date</th>
                <th>Category</th>
                <th>Type</th>
                <th>Description</th>
                <th>Action</th>
                </tr>
                </thead>

                <tbody id="body-table-transaction">
                  <tr class="row-table-transaction">
                  <td class="col-table-transaction" data-label="Amount">$ 0,00</td>
                  <td class="col-table-transaction" data-label="Date">00/00/0000</td>
                  <td class="col-table-transaction" data-label="Category">----------</td>
                  <td class="col-table-transaction" data-label="Type">----------</td>
                  <td class="col-table-transaction" data-label="Description">------------</td>
                  <td class="col-table-transaction col-btn" data-label="Action">
                    <div class="col-btn"><button id="btn-edit-transaction">Edit</button>
                    <button id="btn-remove-transaction">Remove</button></div>
                  </td>
                </tr>
                </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `;
}

let dataCurrency;

fetch("./src/locale/currency/currency.json")
  .then((response) => response.json())
  .then((data) => (dataCurrency = data))
  .catch((error) => console.log(error));

export async function funcTransactions() {
  const currencyData = JSON.parse(localStorage.getItem('currency')) || {};
  const currencySymbol = currencyData.symbol;
  const containerFormTransactions = document.querySelector(".cont-nav-trans");
  const containerFormTracking = document.querySelector(".cont-nav-trans-tracking");
  const btnNewTransactions = document.getElementById("btn-new-transactions");
  const btnNewTracking = document.getElementById("btn-new-tracking");
  const containerCategories = document.querySelector(".cont-categories-list");
  const btnNewCategory = document.getElementById("btn-new-category");
  const btnOkCategory = document.getElementById("btn-ok-category");
  const btnCancelTransaction = document.getElementById("btn-cancel-transaction");
  const btnCancelTracking = document.getElementById("btn-cancel-tracking");
  const selectCategory = document.getElementById("options-category");
  const selectType = document.getElementById("options-type");
  
  containerFormTransactions.style.display = "none";
  containerCategories.style.display = "none";

  // Add new transactions
  btnNewTransactions.addEventListener("click", () => {
    containerFormTransactions.style.display = "block";

    // Add new category
    btnNewCategory.addEventListener("click", () => {
      containerCategories.style.display = "block";

      // Ok category
      btnOkCategory.addEventListener("click", () => {
        containerCategories.style.display = "none";
      }
      )
    }
    )

    // Cancel transaction
    btnCancelTransaction.addEventListener("click", () => {
      containerFormTransactions.style.display = "none";
    }
    )
  });

  // Budget tracking
  btnNewTracking.addEventListener("click", () => {
    containerFormTracking.style.display = "block";

    // Cancel tracking
    btnCancelTracking.addEventListener("click", () => {
      containerFormTracking.style.display = "none";
    }
    )
  }
  )

  const budgetCategories = JSON.parse(localStorage.getItem('budgetCategories'));

  function renderCategories(type) {
    const selectCategory = document.getElementById("options-category");
    selectCategory.innerHTML = ""; // Clear existing options

    if (budgetCategories && budgetCategories[type]) {
      budgetCategories[type].forEach(category => {
      const option = document.createElement("option");
      option.value = category.name;
      option.textContent = category.name;
      selectCategory.appendChild(option);
      });
    }

    if (type === "goals") {
      const goals = JSON.parse(localStorage.getItem('goals')) || [];
      goals.forEach(goal => {
      const option = document.createElement("option");
      option.value = goal.name;
      option.textContent = goal.name;
      selectCategory.appendChild(option);
      });
    }
    selectCategory.addEventListener("change", (event) => {
      const selectedCategory = event.target.value;
      const categoryType = budgetCategories[selectType.value.toLowerCase()];
      const category = categoryType ? categoryType.find(cat => cat.name === selectedCategory) : null;
      const inputNote = document.getElementById("input-note");
      inputNote.value = category ? category.description : "";
    });
  }

  selectType.addEventListener("change", (event) => {
    renderCategories(event.target.value.toLowerCase());
  });

  // Initial render based on default selected type
  renderCategories(selectType.value.toLowerCase());

  const btnAddTransactions = document.getElementById("btn-add-transactions");

  //validation form transactions
  btnAddTransactions.addEventListener("click", () => {
    const inputAmount = document.getElementById("input-amount");
    const inputDate = document.getElementById("input-date");
    const selectType = document.getElementById("options-type");
    const selectCategory = document.getElementById("options-category");
    const inputNote = document.getElementById("input-note");

    let isValid = true;

    if (!inputAmount.value) {
      inputAmount.style.border = "1px solid red";
      isValid = false;
    } else {
      inputAmount.style.border = "";
    }

    if (!inputDate.value) {
      inputDate.style.border = "1px solid red";
      isValid = false;
    } else {
      inputDate.style.border = "";
    }

    if (!selectType.value) {
      selectType.style.border = "1px solid red";
      isValid = false;
    } else {
      selectType.style.border = "";
    }

    if (!selectCategory.value) {
      selectCategory.style.border = "1px solid red";
      isValid = false;
    } else {
      selectCategory.style.border = "";
    }

    if (isValid) {
      // Proceed with adding the transaction
      console.log("Transaction added successfully");
      const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
      const newTransaction = {
        amount: inputAmount.value,
        date: inputDate.value,
        type: selectType.value,
        category: selectCategory.value,
        note: inputNote.value
      };
      transactions.push(newTransaction);
      const budgetTracking = JSON.parse(localStorage.getItem('budgetTracking')) || [];
      const tracking = budgetTracking.find(track => track.category === newTransaction.category);
      
      if (tracking) {
        tracking.actualSpent += parseFloat(newTransaction.amount);
        // localStorage.setItem('budgetTracking', JSON.stringify(budgetTracking));
        const difference = tracking.amount - tracking.actualSpent;
        addBudgetTracking(tracking.category, tracking.amount, tracking.actualSpent, difference).then(() => {
          renderBudgetTracking();
        }).catch(error => {
          console.error('Error updating budget tracking:', error);
        });
      }

      if (newTransaction.type.toLowerCase() === 'goals') {
        const goals = JSON.parse(localStorage.getItem('goals')) || [];
        const goal = goals.find(goal => goal.name === newTransaction.category);
        if (goal) {
          goal.currentAmount += parseFloat(newTransaction.amount);
          updateGoal(goal.id, goal.name, goal.amount, goal.currentAmount, goal.date).then(() => {
        localStorage.setItem('goals', JSON.stringify(goals));
        renderTransactions();
          }).catch(error => {
        console.error('Error updating goal:', error);
          });
        }
      }
      // localStorage.setItem('transactions', JSON.stringify(transactions));
      addTransaction(newTransaction.amount, newTransaction.date, newTransaction.category, newTransaction.type, newTransaction.note, null).then(() => {
        // console.log("Transaction saved to API");
        renderTransactions();
      }
      );
      console.log("Transaction saved to localStorage");
      // Clear the form
      inputAmount.value = "";
      inputDate.value = "";
      selectType.value = "Income";
      selectCategory.value = "";
      inputNote.value = "";
      containerFormTransactions.style.display = 'none';


    } else {
      console.log("Please fill in all fields");
    }

  });

  function renderTransactions() {
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const tbody = document.getElementById('body-table-transaction');
    tbody.innerHTML = ''; // Clear existing rows

    transactions.forEach(transaction => {
      const row = document.createElement('tr');
      row.classList.add('row-table-transaction');

      row.innerHTML = `
        <td class="col-table-transaction" data-label="Amount">${currencySymbol} ${transaction.amount}</td>
        <td class="col-table-transaction" data-label="Date">${transaction.date}</td>
        <td class="col-table-transaction" data-label="Category">${transaction.categoryId}</td>
        <td class="col-table-transaction" data-label="Type">${transaction.type}</td>
        <td class="col-table-transaction" data-label="Description">${transaction.note}</td>
        <td class="col-table-transaction col-btn" data-label="Action">
          <div class="col-btn">
            <button class="btn-edit-transaction">Edit</button>
            <button class="btn-remove-transaction">Remove</button>
          </div>
        </td>
      `;

      tbody.appendChild(row);

      //Remove transactions
      const btnRemoveTransaction = row.querySelector('.btn-remove-transaction');
      btnRemoveTransaction.addEventListener('click', () => {
      const index = transactions.indexOf(transaction);
      if (index > -1) {
      transactions.splice(index, 1);
      localStorage.setItem('transactions', JSON.stringify(transactions));
      renderTransactions();
      }
    });
    });

    
  }

  function renderCategoryList() {
    const ul = document.querySelector(".cont-list-category ul");
    ul.innerHTML = ""; // Clear existing list

    if (budgetCategories) {
      Object.keys(budgetCategories).forEach(type => {
        budgetCategories[type].forEach(category => {
          const li = document.createElement("li");
          li.innerHTML = `
            <input type="checkbox" name="${category.name}" id="${category.name}" />
            <label for="${category.name}">${category.name}</label>
          `;
          ul.appendChild(li);
        });
      });
    }
  }

  const btnAddCategory = document.getElementById("btn-add-category");
  btnAddCategory.addEventListener("click", () => {
    const inputAddCat = document.getElementById("input-add-cat");
    const selectTypeC = document.getElementById("options-type-c");

    if (inputAddCat.value && selectTypeC.value) {
      const newCategory = {
        name: inputAddCat.value,
        description: ""
      };

      if (!budgetCategories[selectTypeC.value.toLowerCase()]) {
        budgetCategories[selectTypeC.value.toLowerCase()] = [];
      }

      budgetCategories[selectTypeC.value.toLowerCase()].push(newCategory);
      localStorage.setItem('budgetCategories', JSON.stringify(budgetCategories));
      renderCategoryList();
      renderCategories(selectType.value.toLowerCase());
      inputAddCat.value = "";
    }
  });

  const btnDropItemCat = document.getElementById("btn-drop-item-cat");
  btnDropItemCat.addEventListener("click", () => {
    const checkboxes = document.querySelectorAll(".cont-list-category ul input[type='checkbox']:checked");

    checkboxes.forEach(checkbox => {
      const type = Object.keys(budgetCategories).find(type => budgetCategories[type].some(cat => cat.name === checkbox.name));
      if (type) {
        budgetCategories[type] = budgetCategories[type].filter(cat => cat.name !== checkbox.name);
      }
    });

    localStorage.setItem('budgetCategories', JSON.stringify(budgetCategories));
    renderCategoryList();
    renderCategories(selectType.value.toLowerCase());
  });

  renderCategoryList();

  renderTransactions();

  function renderBudgetTrackingCategories() {
    const selectCategoryTracking = document.getElementById("options-category-tracking");
    selectCategoryTracking.innerHTML = ""; // Clear existing options

    if (budgetCategories) {
      Object.keys(budgetCategories).forEach(type => {
        budgetCategories[type].forEach(category => {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          selectCategoryTracking.appendChild(option);
        });
      });
    }
  }

  const btnAddTracking = document.getElementById("btn-add-tracking");

  btnAddTracking.addEventListener("click", () => {
    const selectCategoryTracking = document.getElementById("options-category-tracking");
    const inputAmountTracking = document.getElementById("input-amount-tracking");

    let isValid = true;

    if (!selectCategoryTracking.value) {
      selectCategoryTracking.style.border = "1px solid red";
      isValid = false;
    } else {
      selectCategoryTracking.style.border = "";
    }

    if (!inputAmountTracking.value) {
      inputAmountTracking.style.border = "1px solid red";
      isValid = false;
    } else {
      inputAmountTracking.style.border = "";
    }

    if (isValid) {
      const budgetTracking = JSON.parse(localStorage.getItem('budgetTracking')) || [];
      const newTracking = {
        category: selectCategoryTracking.value,
        amount: inputAmountTracking.value,
        actualSpent: 0
      };
      budgetTracking.push(newTracking);
      localStorage.setItem('budgetTracking', JSON.stringify(budgetTracking));
      renderBudgetTracking();
      // containerFormTracking.style.display = 'none';
      selectCategoryTracking.value = "";
      inputAmountTracking.value = "";
    } else {
      console.log("Please fill in all fields");
    }
  });

  function renderBudgetTracking() {
    const budgetTracking = JSON.parse(localStorage.getItem('budgetTracking')) || [];
    const tbody = document.getElementById('body-table-tracking');
    tbody.innerHTML = ''; // Clear existing rows

    budgetTracking.forEach(tracking => {
      const row = document.createElement('tr');
      row.classList.add('row-table-tracking');

      row.innerHTML = `
        <td class="col-table-tracking" data-label="Category">${tracking.category}</td>
        <td class="col-table-tracking" data-label="Budgeted Amount">${currencySymbol} ${tracking.amount}</td>
        <td class="col-table-tracking col-btn" data-label="Action">
          <div class="col-btn">
            <button class="btn-remove-tracking">Remove</button>
          </div>
        </td>
      `;

      tbody.appendChild(row);

      const btnRemoveTracking = row.querySelector('.btn-remove-tracking');
      btnRemoveTracking.addEventListener('click', () => {
        const index = budgetTracking.indexOf(tracking);
        if (index > -1) {
          budgetTracking.splice(index, 1);
          localStorage.setItem('budgetTracking', JSON.stringify(budgetTracking));
          renderBudgetTracking();
        }
      });
    });
  }

  renderBudgetTrackingCategories();
  renderBudgetTracking();

  const filterSearch = document.getElementById("filter-search");

  filterSearch.addEventListener("input", () => {
    const searchTerm = filterSearch.value.toLowerCase();
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    const filteredTransactions = transactions.filter(transaction => {
      return (
        transaction.category.toLowerCase().includes(searchTerm) ||
        transaction.note.toLowerCase().includes(searchTerm) ||
        transaction.type.toLowerCase().includes(searchTerm)
      );
    });
    renderFilteredTransactions(filteredTransactions);
  });

  function renderFilteredTransactions(transactions) {
    const tbody = document.getElementById('body-table-transaction');
    tbody.innerHTML = ''; // Clear existing rows

    transactions.forEach(transaction => {
      const row = document.createElement('tr');
      row.classList.add('row-table-transaction');

      row.innerHTML = `
        <td class="col-table-transaction" data-label="Amount">${currencySymbol} ${transaction.amount}</td>
        <td class="col-table-transaction" data-label="Date">${transaction.date}</td>
        <td class="col-table-transaction" data-label="Category">${transaction.category}</td>
        <td class="col-table-transaction" data-label="Type">${transaction.type}</td>
        <td class="col-table-transaction" data-label="Description">${transaction.note}</td>
        <td class="col-table-transaction col-btn" data-label="Action">
          <div class="col-btn">
            <button class="btn-edit-transaction">Edit</button>
            <button class="btn-remove-transaction">Remove</button>
          </div>
        </td>
      `;

      tbody.appendChild(row);

      // Remove transactions
      const btnRemoveTransaction = row.querySelector('.btn-remove-transaction');
      btnRemoveTransaction.addEventListener('click', () => {
        const index = transactions.indexOf(transaction);
        if (index > -1) {
          transactions.splice(index, 1);
          localStorage.setItem('transactions', JSON.stringify(transactions));
          renderFilteredTransactions(transactions);
        }
      });
    });
  }
}
