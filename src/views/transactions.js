import { insertTransaction, getTransactions, deleteTransaction, getCategories, insertCategory, updateCategory, deleteCategory, getGoals, updateGoal, getBudgetTracking, insertBudgetTracking, deleteBudgetTracking } from "../data/storage.js";
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
                <button id="btn-cancel-category">Ok</button>
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

export function funcTransactions() {
  const containerNewTransactions = document.querySelector(".cont-nav-trans");
  const containerCategoryTransactions = document.querySelector(
    ".cont-categories-list"
  );

  const transactionsTableBody = document.getElementById("body-table-transaction");

//   getTransactions().then(transactions => {
// }).catch(error => {
//     console.error(error);
// });

  async function renderTransactions() {
    try {
      const transactions = await getTransactions();
      transactionsTableBody.innerHTML = "";
      transactions.forEach(transaction => {
        const row = document.createElement("tr");
        row.className = "row-table-transaction";
        row.setAttribute("data-id", transaction.id);
        row.innerHTML = `
          <td class="col-table-transaction" data-label="Amount">$${transaction.amount}</td>
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
        // btnBoxEditCategory.addEventListener("click", () => {
        //   if (containerBoxEditCategory.style.display === "none") {
        //     containerBoxEditCategory.style.display = "block";
            
        //   }
        //   const btnCancelEditCategory = document.getElementById(
        //     "btn-cancel-edit-category"
        //   );
        //   btnCancelEditCategory.addEventListener("click", () => {
        //     if (containerBoxEditCategory.style.display === "block") {
        //       containerBoxEditCategory.style.display = "none";
        //     }
        //   });
        // });

        btnCancelNewCategory.addEventListener("click", () => {
          if (containerCategoryTransactions.style.display === "flex") {
            containerCategoryTransactions.style.display = "none";
          }
        });
      }
    });

    async function renderCategoryList() {
      try {
        const categories = await getCategories();
        const categoryList = document.querySelector(".cont-list-category ul");
        categoryList.innerHTML = "";
        categories.forEach(category => {
          const listItem = document.createElement("li");
          listItem.innerHTML = `
            <input type="checkbox" name="category-${category.id}" id="category-${category.id}" />
            <label for="category-${category.id}">${category.name}</label>
          `;
          categoryList.appendChild(listItem);
            listItem.querySelector(`#category-${category.id}`).addEventListener("change", (event) => {
            const isChecked = event.target.checked;
            // const btnEditItemCat = document.getElementById("btn-edit-item-cat");
            const btnDropItemCat = document.getElementById("btn-drop-item-cat");

            // btnEditItemCat.addEventListener("click", () => {
            //   if (isChecked) {
            //   document.getElementById("input-edit-cat").value = category.name;
            //   console.log("Category to edit:", category);
            //   const btnEditCategory = document.getElementById("btn-edit-category");
            //   btnEditCategory.addEventListener("click", async () => {
            //     const newCategoryName = document.getElementById("input-edit-cat").value;
            //     if (newCategoryName.trim() !== "") {
            //     try {
            //       await updateCategory(category.id, newCategoryName, category.type);
            //       document.getElementById("input-edit-cat").value = "";
            //       containerBoxEditCategory.style.display = "none";
            //       renderCategories();
            //       renderCategoryList();
            //     } catch (error) {
            //       console.error("Error updating category:", error);
            //     }
            //     }
            //   });
            //   }
            // });

            btnDropItemCat.addEventListener("click", async () => {
              if (isChecked) {
              try {
                await deleteCategory(category.id);
                renderCategories();
                renderCategoryList();
              } catch (error) {
                console.error("Error deleting category:", error);
              }
              }
            });
            });

        });
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    renderCategoryList();

    const btnAddCategory = document.getElementById("btn-add-category");
    btnAddCategory.addEventListener("click", async () => {
      const categoryName = document.getElementById("input-add-cat").value;
      const categoryType = document.getElementById("options-type-c").value;
      console.log('categoryType: ', categoryType);
      if (categoryName.trim() !== "") {
        try {
          await insertCategory(categoryName, categoryType);
          renderCategories();
          renderCategoryList();
          document.getElementById("input-add-cat").value = "";
        } catch (error) {
          console.error("Error adding category:", error);
        }
      }
    });
    const btnAddTransaction = document.getElementById("btn-add-transactions");
    btnAddTransaction.addEventListener("click", () => {
      const amount = document.getElementById("input-amount").value;
      const date = document.getElementById("input-date").value;
      const category = document.getElementById("options-category").value;
      const type = document.getElementById("options-type").value;
      const note = document.getElementById("input-note").value;

      if (amount.trim() === "" || date.trim() === "" || category.trim() === "" || type.trim() === "") {
        console.log("Please fill in all required fields.");
        return;
      }


      insertTransaction(amount, date, category, type, note);
      
      async function updateGoalIfMatch(categoryName, amount) {
        console.log("Category:", categoryName);
        try {
          const goals = await getGoals();
          console.log("Goals:", goals);
          const goal = goals.find(goal => goal.name === categoryName);
          if (goal) {
          const newCurrentAmount = goal.currentAmount + parseFloat(amount);
 
          await updateGoal(goal.id, goal.name, goal.amount, newCurrentAmount, goal.date);
          console.log(`Goal updated: ${goal.name}, new current amount: ${newCurrentAmount}`);
          }
        } catch (error) {
          console.error("Error updating goal:", error);
        }
      }

      updateGoalIfMatch(category, amount);

      containerNewTransactions.style.display = "none";
      document.getElementById("input-amount").value = "";
      document.getElementById("input-date").value = "";
      document.getElementById("options-category").value = "";
      document.getElementById("input-note").value = "";
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

  async function renderGoals() {
    try {
      const goals = await getGoals(); // Assuming you have a function to get goals from the database
      const optionsCategory = document.getElementById("options-category");
      const type = document.getElementById("options-type").value;
      optionsCategory.innerHTML = "";
      goals.forEach(goal => {
        if (type === "Goals") {
          optionsCategory.innerHTML += `<option value="${goal.name}">${goal.name}</option>`;
        }
      });
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  }

  document.getElementById("options-type").addEventListener("change", async (event) => {
    const type = event.target.value;
    if (type === "Goals") {
      await renderGoals();
    } else {
      renderCategories();
    }
  });

  async function renderCategories() {
    try {
      const categories = await getCategories();
      const optionsCategory = document.getElementById("options-category");
      const type = document.getElementById("options-type").value;
      optionsCategory.innerHTML = "";
      categories.forEach(category => {
        if (type === category.type) {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          optionsCategory.appendChild(option);
        }else if (type === "Goals") {
          renderGoals();
        }
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  document.getElementById("options-type").addEventListener("change", renderCategories);
  renderCategories();

  const btnShowFilter = document.getElementById("btn-show-filter");
  const filterList = document.querySelector(".list-filter-hidden");

  function toggleFilterList() {
    if (filterList.classList.contains("list-filter-hidden")) {
      filterList.classList.remove("list-filter-hidden");
      filterList.classList.add("list-filter");
    } else {
      filterList.classList.remove("list-filter");
      filterList.classList.add("list-filter-hidden");
    }
  }

  btnShowFilter.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleFilterList();
  });

  document.addEventListener("click", (event) => {
    if (!filterList.contains(event.target) && !btnShowFilter.contains(event.target)) {
      filterList.classList.remove("list-filter");
      filterList.classList.add("list-filter-hidden");
    }
  });

  const btnNewTracking = document.getElementById("btn-new-tracking");
  const containerNewTracking = document.querySelector(".cont-nav-trans-tracking");

  containerNewTracking.style.display = "none";

  btnNewTracking.addEventListener("click", () => {
    if (containerNewTracking.style.display === "none") {
      containerNewTracking.style.display = "flex";
      renderTrackingList();
    }
  });

  const btnCancelTracking = document.getElementById("btn-cancel-tracking");
  btnCancelTracking.addEventListener("click", () => {
    if (containerNewTracking.style.display === "flex") {
      containerNewTracking.style.display = "none";
    }
  });

  async function renderTrackingList() {
    try {
      const budgetTracking = await getBudgetTracking();
      console.log("Budget tracking:", budgetTracking);
      const trackingTableBody = document.getElementById("body-table-tracking");
      trackingTableBody.innerHTML = "";
      budgetTracking.forEach(tracking => {
        const row = document.createElement("tr");
        row.className = "row-table-tracking";
        row.setAttribute("data-id", tracking.id);
        row.innerHTML = `
          <td class="col-table-tracking" data-label="Category">${tracking.category}</td>
          <td class="col-table-tracking" data-label="Budgeted Amount">$${tracking.budgetedAmount}</td>
          <td class="col-table-tracking col-btn" data-label="Action">
            <div class="col-btn">
              <button id="btn-remove-tracking">Remove</button>
            </div>
          </td>
        `;
        trackingTableBody.appendChild(row);
      });
    } catch (error) {
      console.error("Error fetching budget tracking:", error);
    }
  }

  document.getElementById("btn-add-tracking").addEventListener("click", async () => {
    const category = document.getElementById("options-category-tracking").value;
    const amount = document.getElementById("input-amount-tracking").value;

    if (category.trim() === "" || amount.trim() === "") {
      console.log("Please fill in all required fields.");
      return;
    }

    try {
      await insertBudgetTracking(category, amount);
      renderTrackingList();
      document.getElementById("input-amount-tracking").value = "";
    } catch (error) {
      console.error("Error adding budget tracking:", error);
    }
  });

  document.getElementById("body-table-tracking").addEventListener("click", async (event) => {
    if (event.target && event.target.id === "btn-remove-tracking") {
      const row = event.target.closest("tr");
      const trackingId = row.getAttribute("data-id");
      try {
        await deleteBudgetTracking(Number(trackingId));
        row.remove();
      } catch (error) {
        console.error("Error deleting budget tracking:", error);
      }
    }
  });

  async function renderCategoriesForTracking() {
    try {
      const categories = await getCategories();
      const optionsCategoryTracking = document.getElementById("options-category-tracking");
      optionsCategoryTracking.innerHTML = "";
      categories.forEach(category => {
        if (category.type === "Expense") {
          const option = document.createElement("option");
          option.value = category.name;
          option.textContent = category.name;
          optionsCategoryTracking.appendChild(option);
        }
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  renderCategoriesForTracking();
  
}
