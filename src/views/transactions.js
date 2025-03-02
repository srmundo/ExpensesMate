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
  const containerFormTransactions = document.querySelector(".cont-nav-trans");
  const containerFormTracking = document.querySelector(".cont-nav-trans-tracking");
  const btnNewTransactions = document.getElementById("btn-new-transactions");
  const btnNewTracking = document.getElementById("btn-new-tracking");
  const containerCategories = document.querySelector(".cont-categories-list");
  const btnNewCategory = document.getElementById("btn-new-category");
  const btnOkCategory = document.getElementById("btn-ok-category");
  const btnCancelTransaction = document.getElementById("btn-cancel-transaction");
  const btnCancelTracking = document.getElementById("btn-cancel-tracking");
  
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
}
