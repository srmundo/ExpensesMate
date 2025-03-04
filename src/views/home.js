export function home() {
  return /*html*/ `
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

        <!-- Debt Tracking Table 
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
        </div>-->

      <div class="summary-cashflow">
            <!-- <div class="cashflow data">
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
            </div> -->
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
let dataCurrency;

fetch("./src/locale/currency/currency.json")
  .then((response) => response.json())
  .then((data) => (dataCurrency = data))
  .catch((error) => console.log(error));

  const language = JSON.parse(localStorage.getItem("language")).lang;
let languageData = {};



export async function initializeHome() {
  const currencyData = JSON.parse(localStorage.getItem('currency')) || {};
    const currencySymbol = currencyData.symbol;
  const transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const goals = JSON.parse(localStorage.getItem("goals")) || [];
  const budgetTracking =
    JSON.parse(localStorage.getItem("budgetTracking")) || [];

    // const incomeElement = document.querySelector(".data-summary-income .value-money");
    // const expensesElement = document.querySelector(".data-summary-expenses .value-money");
    // const balanceElement = document.querySelector(".data-summary-balance .value-money");
    // const categoryElements = document.querySelectorAll(".summary-cat tr");

    // const incomeText = incomeElement.innerText;
    // const expensesText = expensesElement.innerText;
    // const balanceText = balanceElement.innerText;

    // const categoryData = Array.from(categoryElements).map(row => {
    //   const category = row.querySelector("#data-category").innerText;
    //   const amount = row.querySelector("#data-amount").innerText;
    //   const chart = row.querySelector("#data-charts .bar-progress").innerText;
    //   return { category, amount, chart };
    // });

    const categoryElements = document.querySelectorAll(".summary-cat tr");

    if (language === "en") {
      fetch("../src/locale/lang/en.json")
        .then((response) => response.json())
        .then((data) => {
          languageData = data;
          const titleIncomeSummary = document.querySelector(".title-income-summary");
    if (titleIncomeSummary) titleIncomeSummary.textContent = languageData.home.summary.income;
    const idenIncome = document.querySelector(".iden-income");
    if (idenIncome) idenIncome.textContent = languageData.home.summary.totalIncome;
    const titleExpensesSummary = document.querySelector(".title-expenses-summary");
    if (titleExpensesSummary) titleExpensesSummary.textContent = languageData.home.summary.expenses;
    const idenExpenses = document.querySelector(".iden-expenses");
    if (idenExpenses) idenExpenses.textContent = languageData.home.summary.totalMonthlyExpenses;
    const titleBalanceSummary = document.querySelector(".title-balance-summary");
    if (titleBalanceSummary) titleBalanceSummary.textContent = languageData.home.summary.balance;
    const dataSummaryBalanceIdenExpenses = document.querySelector(".data-summary-balance .iden-expenses");
    if (dataSummaryBalanceIdenExpenses) dataSummaryBalanceIdenExpenses.textContent = languageData.home.summary.finalBalance;
    const titleSummaryCat = document.querySelector(".title-summary-cat");
    if (titleSummaryCat) titleSummaryCat.textContent = languageData.home.summary.expensesByCategory;
    const titleHealthFinance = document.querySelector(".title-health-finance");
    if (titleHealthFinance) titleHealthFinance.textContent = languageData.home.summary.financialHealthScore;

    const categoryMapping = {
      "Housing": languageData.home.summary.categories.housing,
      "Transportation": languageData.home.summary.categories.transportation,
      "Groceries": languageData.home.summary.categories.groceries,
      "Entertainment": languageData.home.summary.categories.entertainment,
      "Health": languageData.home.summary.categories.health,
      "Education": languageData.home.summary.categories.education,
      "Others": languageData.home.summary.categories.others
    };

    categoryElements.forEach(row => {
      const categoryElement = row.querySelector("#data-category");
      if (categoryMapping[categoryElement.innerText]) {
        categoryElement.textContent = categoryMapping[categoryElement.innerText];
      }
    });

    document.querySelector(".income-data h3").textContent = languageData.home.summary.incomeData.title;
    const incomeTable = document.querySelector(".income-data table");
    const monthlyIncomeElement = incomeTable.querySelector("tr:nth-child(2) th");
    if (monthlyIncomeElement) {
        monthlyIncomeElement.textContent = languageData.home.summary.incomeData.monthlyIncome;
    }
    const freelanceWorkElement = incomeTable.querySelector("tr:nth-child(3) th");
    if (freelanceWorkElement) {
        freelanceWorkElement.textContent = languageData.home.summary.incomeData.freelanceWork;
    }
    const investmentsElement = incomeTable.querySelector("tr:nth-child(4) td:nth-child(1)");
    if (investmentsElement) {
        investmentsElement.textContent = languageData.home.summary.incomeData.investments;
    }
    const totalIncomeElement = incomeTable.querySelector("tr:nth-child(5) th");
    if (totalIncomeElement) {
        totalIncomeElement.textContent = languageData.home.summary.incomeData.totalIncome;
    }

    document.querySelector(".categories h3").textContent = languageData.home.summary.categories.title;

    document.querySelector(".budget h3").textContent = languageData.home.summary.budgetTracking.title;
    const budgetTable = document.querySelector(".budget table");
    budgetTable.querySelector("tr:nth-child(1) th:nth-child(1)").textContent = languageData.home.summary.budgetTracking.category;
    budgetTable.querySelector("tr:nth-child(1) th:nth-child(2)").textContent = languageData.home.summary.budgetTracking.budgetedAmount;
    budgetTable.querySelector("tr:nth-child(1) th:nth-child(3)").textContent = languageData.home.summary.budgetTracking.actualSpent;
    budgetTable.querySelector("tr:nth-child(1) th:nth-child(4)").textContent = languageData.home.summary.budgetTracking.difference;

    document.querySelector(".saving-tables h3").textContent = languageData.home.summary.savingsGoals.title;
    const savingsTable = document.querySelector(".saving-tables table");
    savingsTable.querySelector("tr:nth-child(1) th:nth-child(1)").textContent = languageData.home.summary.savingsGoals.goal;
    savingsTable.querySelector("tr:nth-child(1) th:nth-child(2)").textContent = languageData.home.summary.savingsGoals.targetAmount;
    savingsTable.querySelector("tr:nth-child(1) th:nth-child(3)").textContent = languageData.home.summary.savingsGoals.currentSavings;
    savingsTable.querySelector("tr:nth-child(1) th:nth-child(4)").textContent = languageData.home.summary.savingsGoals.remainingAmount;

    document.querySelector(".summary-table h3").textContent = languageData.home.summary.summaryIndicators.title;
    const summaryTable = document.querySelector(".summary-table table");
    summaryTable.querySelector("tr:nth-child(1) th:nth-child(1)").textContent = languageData.home.summary.summaryIndicators.totalIncomeVsExpenses;
    summaryTable.querySelector("tr:nth-child(1) th:nth-child(2)").textContent = languageData.home.summary.summaryIndicators.savingsRate;
    const debtToIncomeRatioElement = summaryTable.querySelector("tr:nth-child(1) th:nth-child(3)");
    if (debtToIncomeRatioElement) {
        debtToIncomeRatioElement.textContent = languageData.home.summary.summaryIndicators.debtToIncomeRatio;
    }
    const financialHealthScoreElement = summaryTable.querySelector("tr:nth-child(1) th:nth-child(4)");
    if (financialHealthScoreElement) {
        financialHealthScoreElement.textContent = languageData.home.summary.summaryIndicators.financialHealthScore;
    }

          // You can use the fetched data here
        })
        .catch((error) => console.error("Error fetching language file:", error));
    } else if (language === "es") {
      fetch("../src/locale/lang/es.json")
        .then((response) => response.json())
        .then((data) => {
          languageData = data;
          document.querySelector(".title-income-summary").textContent = languageData.home.summary.income;
    document.querySelector(".iden-income").textContent = languageData.home.summary.totalIncome;
    document.querySelector(".title-expenses-summary").textContent = languageData.home.summary.expenses;
    document.querySelector(".iden-expenses").textContent = languageData.home.summary.totalMonthlyExpenses;
    document.querySelector(".title-balance-summary").textContent = languageData.home.summary.balance;
    document.querySelector(".data-summary-balance .iden-expenses").textContent = languageData.home.summary.finalBalance;
    document.querySelector(".title-summary-cat").textContent = languageData.home.summary.expensesByCategory;
    document.querySelector(".title-health-finance").textContent = languageData.home.summary.financialHealthScore;

    const categoryMapping = {
      "Housing": languageData.home.summary.categories.housing,
      "Transportation": languageData.home.summary.categories.transportation,
      "Groceries": languageData.home.summary.categories.groceries,
      "Entertainment": languageData.home.summary.categories.entertainment,
      "Health": languageData.home.summary.categories.health,
      "Education": languageData.home.summary.categories.education,
      "Others": languageData.home.summary.categories.others
    };

    categoryElements.forEach(row => {
      const categoryElement = row.querySelector("#data-category");
      if (categoryMapping[categoryElement.innerText]) {
        categoryElement.textContent = categoryMapping[categoryElement.innerText];
      }
    });

    document.querySelector(".income-data h3").textContent = languageData.home.summary.incomeData.title;
    const incomeTable = document.querySelector(".income-data table");
    const monthlyIncomeElement = incomeTable.querySelector("tr:nth-child(2) th");
    if (monthlyIncomeElement) {
        monthlyIncomeElement.textContent = languageData.home.summary.incomeData.monthlyIncome;
    }
    const freelanceWorkElement = incomeTable.querySelector("tr:nth-child(3) th");
    if (freelanceWorkElement) {
        freelanceWorkElement.textContent = languageData.home.summary.incomeData.freelanceWork;
    }
    const investmentsElement = incomeTable.querySelector("tr:nth-child(4) td:nth-child(1)");
    if (investmentsElement) {
        investmentsElement.textContent = languageData.home.summary.incomeData.investments;
    }
    // const investmentsElement = incomeTable.querySelector("tr:nth-child(4) td:nth-child(1)");
    if (investmentsElement) {
        investmentsElement.textContent = languageData.home.summary.incomeData.investments;
    }
    const totalIncomeElement = incomeTable.querySelector("tr:nth-child(5) th");
    if (totalIncomeElement) {
        totalIncomeElement.textContent = languageData.home.summary.incomeData.totalIncome;
    }

    document.querySelector(".categories h3").textContent = languageData.home.summary.categories.title;

    document.querySelector(".budget h3").textContent = languageData.home.summary.budgetTracking.title;
    const budgetTable = document.querySelector(".budget table");
    budgetTable.querySelector("tr:nth-child(1) th:nth-child(1)").textContent = languageData.home.summary.budgetTracking.category;
    budgetTable.querySelector("tr:nth-child(1) th:nth-child(2)").textContent = languageData.home.summary.budgetTracking.budgetedAmount;
    budgetTable.querySelector("tr:nth-child(1) th:nth-child(3)").textContent = languageData.home.summary.budgetTracking.actualSpent;
    budgetTable.querySelector("tr:nth-child(1) th:nth-child(4)").textContent = languageData.home.summary.budgetTracking.difference;

    document.querySelector(".saving-tables h3").textContent = languageData.home.summary.savingsGoals.title;
    const savingsTable = document.querySelector(".saving-tables table");
    savingsTable.querySelector("tr:nth-child(1) th:nth-child(1)").textContent = languageData.home.summary.savingsGoals.goal;
    savingsTable.querySelector("tr:nth-child(1) th:nth-child(2)").textContent = languageData.home.summary.savingsGoals.targetAmount;
    savingsTable.querySelector("tr:nth-child(1) th:nth-child(3)").textContent = languageData.home.summary.savingsGoals.currentSavings;
    savingsTable.querySelector("tr:nth-child(1) th:nth-child(4)").textContent = languageData.home.summary.savingsGoals.remainingAmount;

    document.querySelector(".summary-table h3").textContent = languageData.home.summary.summaryIndicators.title;
    const summaryTable = document.querySelector(".summary-table table");
    summaryTable.querySelector("tr:nth-child(1) th:nth-child(1)").textContent = languageData.home.summary.summaryIndicators.totalIncomeVsExpenses;
    summaryTable.querySelector("tr:nth-child(1) th:nth-child(2)").textContent = languageData.home.summary.summaryIndicators.savingsRate;
    const debtToIncomeRatioElement = summaryTable.querySelector("tr:nth-child(1) th:nth-child(3)");
    if (debtToIncomeRatioElement) {
        debtToIncomeRatioElement.textContent = languageData.home.summary.summaryIndicators.debtToIncomeRatio;
    }
    const financialHealthScoreElement = summaryTable.querySelector("tr:nth-child(1) th:nth-child(4)");
    if (financialHealthScoreElement) {
        financialHealthScoreElement.textContent = languageData.home.summary.summaryIndicators.financialHealthScore;
    }

          // You can use the fetched data here
        })
        .catch((error) => console.error("Error fetching language file:", error));
    } else if (language === "pt") {
      fetch("../src/locale/lang/pt.json")
        .then((response) => response.json())
        .then((data) => {
          languageData = data;
          // You can use the fetched data here
        })
        .catch((error) => console.error("Error fetching language file:", error));
    }

    
  let totalIncome = 0;
  let totalExpenses = 0;
  let totalSavings = 0;
  let totalDebt = 0;
  let totalBalance = 0;

  transactions.forEach((transaction) => {
    console.log(transaction.type)
    if (transaction.type === "Income") {
      totalIncome += parseFloat(transaction.amount);
    } else if (transaction.type === "Expense") {
      totalExpenses += parseFloat(transaction.amount);
    }
  });

  totalBalance = totalIncome - totalExpenses;

  document.querySelector(".data-summary-income .value-money").textContent = `${currencySymbol} ${totalIncome.toFixed(2)}`;
  document.querySelector(".data-summary-expenses .value-money").textContent = `${currencySymbol} ${totalExpenses.toFixed(2)}`;
  document.querySelector(".data-summary-balance .value-money").textContent = `${currencySymbol} ${totalBalance.toFixed(2)}`;

  const summaryCategoriesContainer = document.querySelector('.summary-cat');
  summaryCategoriesContainer.innerHTML = '';

  function fillSummaryCategories(transactions) {
    const categories = {};

    transactions.forEach((transaction) => {
      if (transaction.type === "Expense") {
        if (!categories[transaction.category]) {
          categories[transaction.category] = 0;
        }
        categories[transaction.category] += parseFloat(transaction.amount);
      }
    });

    const totalExpenses = Object.values(categories).reduce((acc, amount) => acc + amount, 0);

    Object.keys(categories).forEach((category) => {
      const amount = categories[category];
      const percentage = ((amount / totalExpenses) * 100).toFixed(2);

      const row = document.createElement("tr");
      row.innerHTML = `
        <td id="data-category">${category}</td>
        <td id="data-amount">${currencySymbol} ${amount.toFixed(2)}</td>
        <td id="data-charts">
          <div class="bar-container">
            <div class="bar-progress ${category.toLowerCase()}" style="width: ${percentage}%;">${percentage}%</div>
          </div>
        </td>
      `;
      summaryCategoriesContainer.appendChild(row);
    });
  }

  fillSummaryCategories(transactions);

  const calculateFinancialHealthScore = (transactions) => {
    let income = 0;
    let expenses = 0;
    let savings = goals.reduce((acc, goal) => acc + parseFloat(goal.amount), 0);
    transactions.forEach((transaction) => {
      if (transaction.type === "goals" && goals.some(goal => goal.name === transaction.category)) {
      totalSavings += parseFloat(transaction.amount);
      }
    });
    let debt = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        income += parseFloat(transaction.amount);
      } else if (transaction.type === "Expense") {
        expenses += parseFloat(transaction.amount);
      } else if (transaction.type === "goals") {
        savings += parseFloat(transaction.amount);
      }
    });

    const savingsRate = (savings / income) * 100;
    const debtToIncomeRatio = (debt / income) * 100;
    const expenseToIncomeRatio = (expenses / income) * 100;

    let score = 100;

    if (savingsRate < 20) {
      score -= (20 - savingsRate) * 2;
    }

    if (debtToIncomeRatio > 30) {
      score -= (debtToIncomeRatio - 30) * 2;
    }

    if (expenseToIncomeRatio > 50) {
      score -= (expenseToIncomeRatio - 50) * 2;
    }

    return Math.max(score, 0);
  };

  const financialHealthScore = calculateFinancialHealthScore(transactions);
  updateScore(financialHealthScore.toFixed(0));

  function fillIncomeTable(transactions) {
    const incomeTable = document.querySelector(".income-data table");
    incomeTable.innerHTML = `
      <tr>
        <th>Category</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
    `;

    let totalIncome = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${transaction.category}</td>
          <td>${transaction.note}</td>
          <td>${currencySymbol} ${parseFloat(transaction.amount).toFixed(2)}</td>
        `;
        incomeTable.appendChild(row);
        totalIncome += parseFloat(transaction.amount);
      }
    });

    const totalRow = document.createElement("tr");
    totalRow.innerHTML = `
      <th>Total Income</th>
      <th>${currencySymbol} ${totalIncome.toFixed(2)}</th>
    `;
    incomeTable.appendChild(totalRow);
  }

  fillIncomeTable(transactions);

  function fillCategoriesTable(transactions) {
    const categoriesTable = document.querySelector(".categories table");
    categoriesTable.innerHTML = `
      <tr>
        <th>Category</th>
        <th>Description</th>
        <th>Amount</th>
      </tr>
    `;

    const categories = {};

    transactions.forEach((transaction) => {
      if (transaction.type === "Expense") {
        if (!categories[transaction.category]) {
          categories[transaction.category] = {
            description: transaction.note || "",
            amount: 0,
          };
        }
        categories[transaction.category].amount += parseFloat(transaction.amount);
      }
    });

    Object.keys(categories).forEach((category) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${category}</td>
        <td>${categories[category].description}</td>
        <td>${currencySymbol} ${categories[category].amount.toFixed(2)}</td>
      `;
      categoriesTable.appendChild(row);
    });
  }

  fillCategoriesTable(transactions);

  function fillBudgetTrackingTable(budgetTracking) {
    const budgetTable = document.querySelector(".budget table");
    budgetTable.innerHTML = `
      <tr>
        <th>Category</th>
        <th>Budgeted Amount</th>
        <th>Actual Spent</th>
        <th>Difference</th>
      </tr>
    `;

    budgetTracking.forEach((item) => {
      console.log(item)
      const difference = parseFloat(item.amount) - parseFloat(item.actualSpent);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${item.category}</td>
        <td>${currencySymbol} ${item.amount}</td>
        <td>${currencySymbol} ${item.actualSpent}</td>
        <td style="color:${difference >= 0 ? "green" : "red"};">${difference >= 0 ? "+" : ""}$${difference.toFixed(2)}</td>
      `;
      budgetTable.appendChild(row);
    });
  }

  fillBudgetTrackingTable(budgetTracking);

  function fillSavingsGoalsTable(goals) {
    const savingsTable = document.querySelector(".saving-tables table");
    savingsTable.innerHTML = `
      <tr>
        <th>Goal</th>
        <th>Target Amount</th>
        <th>Current Savings</th>
        <th>Remaining Amount</th>
      </tr>
    `;

    goals.forEach((goal) => {
      const matchingTransactions = transactions.filter(transaction => transaction.category === goal.name);
      const currentSavings = matchingTransactions.reduce((acc, transaction) => acc + parseFloat(transaction.amount), 0);
      const remainingAmount = parseFloat(goal.amount) - parseFloat(currentSavings);
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${goal.name}</td>
        <td>${currencySymbol} ${parseFloat(goal.amount).toFixed(2)}</td>
        <td style="color:${parseFloat(currentSavings).toFixed(2) >= parseFloat(goal.amount).toFixed(2) ? "green" : "orange"};">${currencySymbol} ${parseFloat(currentSavings).toFixed(2)}</td>
        <td style="color:${remainingAmount.toFixed(2) <= 0 ? "green" : "orange"};">${currencySymbol} ${remainingAmount.toFixed(2)}</td>
      `;
      savingsTable.appendChild(row);
    });
  }

  fillSavingsGoalsTable(goals);

  function fillSummaryIndicators(transactions) {
    const summaryTable = document.querySelector(".summary-table table");
    summaryTable.innerHTML = `
      <tr>
        <th>Indicator</th>
        <th>Value</th>
      </tr>
    `;

    let totalIncome = 0;
    let totalExpenses = 0;
    let totalSavings = goals.reduce((acc, goal) => acc + parseFloat(goal.amount), 0);
    transactions.forEach((transaction) => {
      if (transaction.type === "goals" && goals.some(goal => goal.name === transaction.category)) {
      totalSavings += parseFloat(transaction.amount);
      }
    });
    let totalDebt = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "Income") {
        totalIncome += parseFloat(transaction.amount);
      } else if (transaction.type === "Expense") {
        totalExpenses += parseFloat(transaction.amount);
      } else if (transaction.type === "Savings") {
        totalSavings += parseFloat(transaction.amount);
      } else if (transaction.type === "Debt") {
        totalDebt += parseFloat(transaction.amount);
      }
    });

    const savingsRate = ((totalSavings / totalIncome) * 100).toFixed(2);
    const debtToIncomeRatio = ((totalDebt / totalIncome) * 100).toFixed(2);
    const financialHealthScore = calculateFinancialHealthScore(transactions).toFixed(0);

    const indicators = [
      { name: "Total Income vs. Expenses", value: `${currencySymbol} ${totalIncome.toFixed(2)} - ${currencySymbol} ${totalExpenses.toFixed(2)}` },
      { name: "Savings Rate", value: `${savingsRate}%` },
      { name: "Debt-to-Income Ratio", value: `${debtToIncomeRatio}%` },
      { name: "Financial Health Score", value: `${financialHealthScore}/100` },
    ];

    indicators.forEach((indicator) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${indicator.name}</td>
        <td>${indicator.value}</td>
      `;
      summaryTable.appendChild(row);
    });
  }

  fillSummaryIndicators(transactions);

}
