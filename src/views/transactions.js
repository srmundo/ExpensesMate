import { insertTransaction, getTransactions, deleteTransaction, getCategories } from "../data/storage.js";
export function transactions() {
  return `
    <div class="container-transactions">
      <span class="title-transactions"><h4>Transactions</h4></span>
      <div class="body-transactions">
        <span class="cont-btn-new-trans">
          <button id="btn-new-transactions">
            <span class="icon-dollar-sign"></span>
            <p>New transactions</p>
          </button>
        </span>
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
                  <button id="btn-add-category">Add category</button>
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
                  <button id="btn-edit-item-cat">
                    <span class="icon-edit"></span>
                    <p>Edit</p>
                  </button>
                  <button id="btn-drop-item-cat">
                    <span class="icon-trash"></span>
                    <p>Drop</p>
                  </button>
                </div>
              </div>
              <div class="cont-btn-cancel-add-cat">
                <button id="btn-add-category">Add</button>
                <button id="btn-cancel-category">Cancel</button>
              </div>
            </div>
          </div>
        </div>
        <div class="cont-transaction-list">
          <div class="content-filter">
            <div class="content-search">
              <span class="icon-search"></span>
              <input type="search" name="search" id="filter-search" placeholder="Search by category, description, or transaction type"/>
            </div>
            <ul class="list-filter">
              <li><button id="filter-all">All</button></li>
              <li id="filter-date-list"><label for="filter-date">By date</label><input type="date" id="filter-date"/></li>
              <li><button id="filter-category">By category</button>
                <ul class="filter-list-category">
                  <li><a href="#">Housting</a></li>
                  <li><a href="#">Transportation</a></li>
                </ul>
              </li>
              <li><button id="filter-transaction">By transaction type</button>
                <ul class="filter-list-transaction">
                  <li><a href="#">Income</a></li>
                  <li><a href="#">Expenses</a></li>
                </ul>
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
                  <td class="col-table-transaction" data-label="Amount">$$ 1,350</td>
                  <td class="col-table-transaction" data-label="Date">12/05/2024</td>
                  <td class="col-table-transaction" data-label="Category">Transportation</td>
                  <td class="col-table-transaction" data-label="Type">Exponses variable</td>
                  <td class="col-table-transaction" data-label="Description">Alquiler para las despensas</td>
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

export function funcTransactions() {
  const containerNewTransactions = document.querySelector(".cont-nav-trans");
  const containerCategoryTransactions = document.querySelector(
    ".cont-categories-list"
  );

  const transactionsTableBody = document.getElementById("body-table-transaction");

  getTransactions().then(transactions => {
    console.log("Transactions:", transactions);
}).catch(error => {
    console.error(error);
});

  async function renderTransactions() {
    try {
      const transactions = await getTransactions();
      transactionsTableBody.innerHTML = "";
      transactions.forEach(transaction => {
        const row = document.createElement("tr");
        row.className = "row-table-transaction";
        row.setAttribute("data-id", transaction.id);
        row.innerHTML = `
          <td class="col-table-transaction" data-label="Amount">$$ ${transaction.amount}</td>
          <td class="col-table-transaction" data-label="Date">${transaction.date}</td>
          <td class="col-table-transaction" data-label="Category">${transaction.categoryId}</td>
          <td class="col-table-transaction" data-label="Type">${transaction.type}</td>
          <td class="col-table-transaction" data-label="Description">${transaction.note}</td>
          <td class="col-table-transaction col-btn" data-label="Action">
            <div class="col-btn">
              <button id="btn-edit-transaction">Edit</button>
              <button id="btn-remove-transaction">Remove</button>
            </div>
          </td>
        `;
        transactionsTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }

  renderTransactions();

  const containerBoxEditCategory = document.querySelector(".box-edit-category");

  containerCategoryTransactions.style.display = "none";
  containerNewTransactions.style.display = "none";
  containerBoxEditCategory.style.display = "none";

  const btnNewTransaction = document.getElementById("btn-new-transactions");

  btnNewTransaction.addEventListener("click", () => {
    if (containerNewTransactions.style.display === "none") {
      containerNewTransactions.style.display = "flex";
    }
    const btnCancelTransaction = document.getElementById(
      "btn-cancel-transaction"
    );

    const btnNewCategory = document.getElementById("btn-new-category");
    btnCancelTransaction.addEventListener("click", () => {
      if (containerNewTransactions.style.display === "flex") {
        containerNewTransactions.style.display = "none";
      }
    });
    btnNewCategory.addEventListener("click", () => {
      if (containerCategoryTransactions.style.display === "none") {
        containerCategoryTransactions.style.display = "flex";
        const btnCancelNewCategory = document.getElementById(
          "btn-cancel-category"
        );

        const btnBoxEditCategory = document.getElementById("btn-edit-item-cat");
        btnBoxEditCategory.addEventListener("click", () => {
          if (containerBoxEditCategory.style.display === "none") {
            containerBoxEditCategory.style.display = "block";
          }
          const btnCancelEditCategory = document.getElementById(
            "btn-cancel-edit-category"
          );
          btnCancelEditCategory.addEventListener("click", () => {
            if (containerBoxEditCategory.style.display === "block") {
              containerBoxEditCategory.style.display = "none";
            }
          });
        });

        btnCancelNewCategory.addEventListener("click", () => {
          if (containerCategoryTransactions.style.display === "flex") {
            containerCategoryTransactions.style.display = "none";
          }
        });
      }
    });
    const btnAddTransaction = document.getElementById("btn-add-transactions");
    btnAddTransaction.addEventListener("click", () => {
      const amount = document.getElementById("input-amount").value;
      const date = document.getElementById("input-date").value;
      const category = document.getElementById("options-category").value;
      const type = document.getElementById("options-type").value;
      const note = document.getElementById("input-note").value;
      insertTransaction(amount, date, category, type, note);
      console.log(amount, date, category, type, note);
      containerNewTransactions.style.display = "none";
      renderTransactions();
    });
  });

  const btnRemoveTransaction = document.getElementById("btn-remove-transaction");
  transactionsTableBody.addEventListener("click", async (event) => {
    if (event.target && event.target.id === "btn-remove-transaction") {
      const row = event.target.closest("tr");
      const transactionId = row.getAttribute("data-id");
      console.log("Transaction ID to remove:", Number(transactionId));
      try {
        await deleteTransaction(Number(transactionId));
        row.remove();
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  });

  async function renderCategories() {
    try {
      const categories = await getCategories();
      const optionsCategory = document.getElementById("options-category");
      const type = document.getElementById("options-type").value;
      optionsCategory.innerHTML = "";
      categories.forEach(category => {
        if (category.type === type) {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          optionsCategory.appendChild(option);
        }
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  document.getElementById("options-type").addEventListener("change", renderCategories);
  renderCategories();
  
}
