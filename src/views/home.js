import { getTransactions } from "../data/storage.js";
export function home() {
  return `
    <div class="container-home">
      <div class="container-summary">
        <div class="container-summary-exp-inc">
          <div class="cont-summary-income summary">
            <span class="title-income-summary title">Income</span>
            <div class="data-summary-income">
              <span class="iden-income">Total Income</span>
              <div class="cont-value-cash">
                <span class="value-money">$ 4,200</span>
              </div>
            </div>
          </div>
          <div class="cont-summary-expenses summary">
            <span class="title-expenses-summary title">Expenses</span>
            <div class="data-summary-expenses">
              <span class="iden-expenses">Total Monthly Expenses</span>
              <div class="cont-value-cash">
                <span class="value-money">$ 2,500</span>
              </div>
            </div>
          </div>

          <div class="cont-summary-balance summary">
            <span class="title-balance-summary title">Balance</span>
            <div class="data-summary-balance">
              <span class="iden-expenses">Final Balance</span>
              <div class="cont-value-cash">
                <span class="value-money">$ 1,700</span>
              </div>
            </div>
          </div>
        </div>
        <div class="container-summary-cat">
          <span class="title-summary-cat">Expenses by category </span>
          <div class="data-summary-cat">
            <table class="summary-cat">
              <tr>
                <td id="data-category">Housing</td>
                <td id="data-amount">$ 1,350</td>
                <td id="data-charts">
                  <div class"bar-container">
                    <div class="bar-progress housing" style="width: 40%;">40%</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td id="data-category">Transportation</td>
                <td id="data-amount">$ 200</td>
                <td id="data-charts">
                  <div class"bar-container">
                    <div class="bar-progress transportation" style="width: 10%;">10%</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td id="data-category">Groceries</td>
                <td id="data-amount">$ 300</td>
                <td id="data-charts">
                  <div class"bar-container">
                    <div class="bar-progress groceries" style="width: 20%;">20%</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td id="data-category">entertainment</td>
                <td id="data-amount">$ 100</td>
                <td id="data-charts">
                  <div class"bar-container">
                    <div class="bar-progress entertainment" style="width: 40%;">40%</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td id="data-category">Health</td>
                <td id="data-amount">$ 100</td>
                <td id="data-charts">
                  <div class"bar-container">
                    <div class="bar-progress health" style="width: 30%;">30%</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td id="data-category">Education</td>
                <td id="data-amount">$ 50</td>
                <td id="data-charts">
                  <div class"bar-container">
                    <div class="bar-progress education" style="width: 70%;">70%</div>
                  </div>
                </td>
              </tr>
              <tr>
                <td id="data-category">others</td>
                <td id="data-amount">$ 100</td>
                <td id="data-charts">
                  <div class"bar-container">
                    <div class="bar-progress others" style="width: 10%;">10%</div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>

      </div>
      <div class="container-summary-health-finance">
            <div class="body-gauge">
                <p class="title-health-finance">Financial Health Score</p>
                <div class="gauge-container">
                    <svg class="gauge" viewBox="0 0 100 50">
                        <!-- Fondo de la barra -->
                        <path d="M10,50 A40,40 0 0,1 90,50" stroke="#e0e0e0" stroke-width="10" fill="none" />
                        <!-- Barra de progreso -->
                        <path id="progress" d="M10,50 A40,40 0 0,1 90,50" stroke="#4CAF50" stroke-width="10" fill="none" stroke-dasharray="100" stroke-dashoffset="100" />
                    </svg>
                    <!-- Texto para el puntaje -->
                    <div class="score" id="score">0</div>
                </div>
            </div>
            

        </div>

      <div class="container-data">
        
        <div class="income-expenses data">
            <!-- Income Table -->
            <div class="income-data">
                <h3>Income</h3>
                <table border="1">
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <td>Monthly Income</td>
                    <td>$3,500</td>
                  </tr>
                  <tr>
                    <td>Freelance Work</td>
                    <td>$500</td>
                  </tr>
                  <tr>
                    <td>Investments</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <th>Total Income</th>
                    <th>$4,200</th>
                  </tr>
                </table>
            </div>
            </div>
        </div>
        

        <div class="categories-budget data">
            <!-- Categories Table -->
            <div class="categories">
                <h3>Categories</h3>
                <table border="1">
                  <tr>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <td>Housing</td>
                    <td>Rent + Utilities</td>
                    <td>$1,350</td>
                  </tr>
                  <tr>
                    <td>Transportation</td>
                    <td>Gas + Public Transport</td>
                    <td>$200</td>
                  </tr>
                  <tr>
                    <td>Groceries</td>
                    <td></td>
                    <td>$300</td>
                  </tr>
                  <tr>
                    <td>Entertainment</td>
                    <td></td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Health</td>
                    <td>Insurance + Medications</td>
                    <td>$100</td>
                  </tr>
                  <tr>
                    <td>Education</td>
                    <td>Online Courses</td>
                    <td>$50</td>
                  </tr>
                  <tr>
                    <td>Others</td>
                    <td>Miscellaneous</td>
                    <td>$100</td>
                  </tr>
                </table>
            </div>

            <!-- Budget Tracking Table -->
            <div class="budget">
                <h3>Budget Tracking</h3>
                <table border="1">
                  <tr>
                    <th>Category</th>
                    <th>Budgeted Amount</th>
                    <th>Actual Spent</th>
                    <th>Difference</th>
                  </tr>
                  <tr>
                    <td>Housing</td>
                    <td>$1,400</td>
                    <td>$1,350</td>
                    <td>+$50</td>
                  </tr>
                  <tr>
                    <td>Transportation</td>
                    <td>$250</td>
                    <td>$200</td>
                    <td>+$50</td>
                  </tr>
                  <tr>
                    <td>Groceries</td>
                    <td>$350</td>
                    <td>$300</td>
                    <td>+$50</td>
                  </tr>
                  <tr>
                    <td>Entertainment</td>
                    <td>$150</td>
                    <td>$100</td>
                    <td>+$50</td>
                  </tr>
                  <tr>
                    <td>Health</td>
                    <td>$150</td>
                    <td>$100</td>
                    <td>+$50</td>
                  </tr>
                </table>
            </div>
        </div>

        <!-- Savings Goals Table -->
        <div class="saving-tables data">
            <h3>Savings Goals</h3>
            <table border="1">
              <tr>
                <th>Goal</th>
                <th>Target Amount</th>
                <th>Current Savings</th>
                <th>Remaining Amount</th>
              </tr>
              <tr>
                <td>Emergency Fund</td>
                <td>$5,000</td>
                <td>$2,500</td>
                <td>$2,500</td>
              </tr>
              <tr>
                <td>Vacation</td>
                <td>$1,500</td>
                <td>$600</td>
                <td>$900</td>
              </tr>
            </table>
        </div>

        <!-- Debt Tracking Table -->
        <div class="tracking data">
            <h3>Debt Tracking</h3>
            <table border="1">
              <tr>
                <th>Debt Type</th>
                <th>Balance</th>
                <th>Monthly Payment</th>
                <th>Interest Rate</th>
                <th>Remaining Payments</th>
              </tr>
              <tr>
                <td>Student Loan</td>
                <td>$10,000</td>
                <td>$150</td>
                <td>5%</td>
                <td>80 months</td>
              </tr>
              <tr>
                <td>Credit Card</td>
                <td>$2,000</td>
                <td>$100</td>
                <td>15%</td>
                <td>20 months</td>
              </tr>
            </table>
        </div>

        <div class="summary-cashflow">
            <div class="cashflow data">
                <!-- Cash Flow Table -->
                <h3>Cash Flow</h3>
                <table border="1">
                  <tr>
                    <th>Description</th>
                    <th>Amount</th>
                  </tr>
                  <tr>
                    <td>Starting Balance</td>
                    <td>$1,000</td>
                  </tr>
                  <tr>
                    <td>Ending Balance</td>
                    <td>$2,700</td>
                  </tr>
                  <tr>
                    <td>Monthly Cash Flow</td>
                    <td>$1,700</td>
                  </tr>
                </table>
            </div>
             <div class="summary-table data">
                <!-- Summary Indicators Table -->
                <h3>Summary Indicators</h3>
                <table border="1">
                  <tr>
                    <th>Indicator</th>
                    <th>Value</th>
                  </tr>
                  <tr>
                    <td>Total Income vs. Expenses</td>
                    <td>$4,200 - $2,500</td>
                  </tr>
                  <tr>
                    <td>Savings Rate</td>
                    <td>25%</td>
                  </tr>
                  <tr>
                    <td>Debt-to-Income Ratio</td>
                    <td>30%</td>
                  </tr>
                  <tr>
                    <td>Financial Health Score</td>
                    <td>75/100</td>
                  </tr>
                </table>
            </div>   

        
        </div>
      </div>
    </div>
  `;
}

// Función para actualizar el gráfico con un nuevo puntaje
export function updateScore(score) {
  const maxScore = 100; // Puntaje máximo (ajusta según tus necesidades)
  const percentage = Math.min(score / maxScore, 1); // Limita a 1 (100%)
  const dashOffset = 100 - percentage * 100;

  // Actualiza la barra de progreso
  const progress = document.getElementById("progress");
  progress.style.strokeDashoffset = dashOffset;

  // Cambia el color según el puntaje
  if (score < 30) {
    progress.style.stroke = "red";
  } else if (score < 60) {
    progress.style.stroke = "orange";
  } else {
    progress.style.stroke = "#4CAF50"; // Verde
  }

  // Actualiza el texto del puntaje
  const scoreText = document.getElementById("score");
  scoreText.textContent = score;
}

export async function initializeHome() {
  // Obtener las transacciones y calcular el puntaje
  const transactions = await getTransactions();
  let totalIncome = 0;
  let totalExpenses = 0;

  transactions.forEach(transaction => {
    if (transaction.type === 'Income') {
      totalIncome += Number(transaction.amount);
    } else if (transaction.type === 'Expense') {
      totalExpenses += Number(transaction.amount);
    }
  });

  const financialHealthScore = calculateFinancialHealthScore(totalIncome, totalExpenses);
  updateScore(financialHealthScore);

  function calculateFinancialHealthScore(income, expenses) {
    if (income <= 0) {
      return 0; // or any default value you prefer
    }
    const savings = income - expenses;
    const savingsRate = savings / income;
    return Math.round(savingsRate * 100);
  }

  const finalBalance = totalIncome - totalExpenses;

  // Render the values in the DOM
  document.querySelector('.data-summary-income .value-money').textContent = `$ ${totalIncome}`;
  document.querySelector('.data-summary-expenses .value-money').textContent = `$ ${totalExpenses}`;
  document.querySelector('.data-summary-balance .value-money').textContent = `$ ${finalBalance}`;

  function updateCategoryData(transactions) {
  
    const categoryTotals = transactions.reduce((acc, transaction) => {
      if (transaction.type === 'Expense') {
        if (!acc[transaction.categoryId]) {
          acc[transaction.categoryId] = 0;
        }
        acc[transaction.categoryId] += Number(transaction.amount);
      }
      return acc;
    }, {});

    const totalExpenses = Object.values(categoryTotals).reduce((acc, amount) => acc + amount, 0);

    const categoryRows = Object.entries(categoryTotals).map(([category, amount]) => {
      const percentage = ((amount / totalExpenses) * 100).toFixed(2);
      return `
        <tr>
          <td id="data-category">${category}</td>
          <td id="data-amount">$ ${amount}</td>
          <td id="data-charts">
            <div class="bar-container">
              <div class="bar-progress ${category.toLowerCase()}" style="width: ${percentage}%;">${percentage}%</div>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    document.querySelector('.summary-cat').innerHTML = categoryRows;

    function updateIncomeExpensesData(transactions) {
      const incomeRows = transactions
        .filter(transaction => transaction.type === 'Income')
        .map(transaction => `
          <tr>
            <td>${transaction.categoryId}</td>
            <td>$${transaction.amount}</td>
          </tr>
        `).join('');

      const expenseRows = transactions
        .filter(transaction => transaction.type === 'Expense')
        .map(transaction => `
          <tr>
            <td>${transaction.description}</td>
            <td>$${transaction.amount}</td>
          </tr>
        `).join('');

      document.querySelector('.income-data table').innerHTML = `
        <tr>
          <th>Description</th>
          <th>Amount</th>
        </tr>
        ${incomeRows}
        <tr>
          <th>Total Income</th>
          <th>$${totalIncome}</th>
        </tr>
      `;
    }

    updateIncomeExpensesData(transactions);

    function updateCategoriesBudgetData(transactions) {
      const categoryRows = transactions
        .filter(transaction => transaction.type === 'Expense')
        .map(transaction => `
          <tr>
            <td>${transaction.categoryId}</td>
            <td>${transaction.note}</td>
            <td>$${transaction.amount}</td>
          </tr>
        `).join('');

      document.querySelector('.categories table').innerHTML = `
        <tr>
          <th>Category</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
        ${categoryRows}
      `;
    }

    updateCategoriesBudgetData(transactions);

    function updateBudgetTrackingData(transactions) {
      const budgetData = {
        Housing: { budgeted: 1400, actual: 0 },
        Transportation: { budgeted: 250, actual: 0 },
        Groceries: { budgeted: 350, actual: 0 },
        Entertainment: { budgeted: 150, actual: 0 },
        Health: { budgeted: 150, actual: 0 }
      };

      transactions.forEach(transaction => {
        if (transaction.type === 'Expense' && budgetData[transaction.categoryId]) {
          budgetData[transaction.categoryId].actual += Number(transaction.amount);
        }
      });

      const budgetRows = Object.entries(budgetData).map(([category, data]) => {
        const difference = data.budgeted - data.actual;
        const differenceText = difference >= 0 ? `+$${difference}` : `-$${Math.abs(difference)}`;
        return `
          <tr>
            <td>${category}</td>
            <td>$${data.budgeted}</td>
            <td>$${data.actual}</td>
            <td>${differenceText}</td>
          </tr>
        `;
      }).join('');

      document.querySelector('.budget table').innerHTML = `
        <tr>
          <th>Category</th>
          <th>Budgeted Amount</th>
          <th>Actual Spent</th>
          <th>Difference</th>
        </tr>
        ${budgetRows}
      `;
    }

    updateBudgetTrackingData(transactions);

  }

  updateCategoryData(transactions);
}